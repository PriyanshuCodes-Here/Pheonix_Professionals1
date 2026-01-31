const Contact = require('../models/Contact');
const { sendContactEmail } = require('../config/resend');

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
const submitContact = async (req, res) => {
  try {
    const { name, email, phone, company, service, message } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !service || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all required fields'
      });
    }

    // Validate email format
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email'
      });
    }

    // Validate phone format
    const phoneRegex = /^[0-9]{10}$/;
    const cleanPhone = phone.replace(/\D/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid 10-digit phone number'
      });
    }

    // Check for recent duplicate submissions (same email within last hour)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const recentSubmission = await Contact.findOne({
      email: email.toLowerCase(),
      submittedAt: { $gte: oneHourAgo }
    });

    if (recentSubmission) {
      return res.status(429).json({
        success: false,
        message: 'Please wait before submitting another request'
      });
    }

    // Create contact submission
    const contact = await Contact.create({
      name,
      email: email.toLowerCase(),
      phone: cleanPhone,
      company: company || '',
      service,
      message,
      status: 'new',
      priority: service === 'Other' ? 'low' : 'medium',
      ipAddress: req.ip,
      userAgent: req.headers['user-agent']
    });

    console.log('Contact submission saved:', contact._id);

    // Send email notification
    try {
      const emailResult = await sendContactEmail({
        name,
        email,
        phone: cleanPhone,
        company,
        service,
        message,
        ipAddress: req.ip
      });

      if (emailResult.success) {
        console.log('Contact email sent successfully');
      } else {
        console.warn('Contact email failed:', emailResult.error);
        // Don't fail the request if email fails
      }
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      // Continue even if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Thank you for contacting us! We will get back to you within 24 hours.',
      data: {
        id: contact._id,
        submittedAt: contact.submittedAt,
        reference: `CON${contact._id.toString().slice(-6).toUpperCase()}`
      }
    });

  } catch (error) {
    console.error('Contact submission error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
};

// @desc    Get all contact submissions (Admin only)
// @route   GET /api/contact
// @access  Private/Admin
const getContacts = async (req, res) => {
  try {
    const { 
      status, 
      service, 
      dateFrom, 
      dateTo, 
      search,
      page = 1, 
      limit = 20,
      sortBy = 'submittedAt',
      sortOrder = 'desc'
    } = req.query;
    
    // Build query
    const query = {};
    
    if (status) query.status = status;
    if (service) query.service = service;
    
    // Date range filter
    if (dateFrom || dateTo) {
      query.submittedAt = {};
      if (dateFrom) query.submittedAt.$gte = new Date(dateFrom);
      if (dateTo) query.submittedAt.$lte = new Date(dateTo);
    }
    
    // Search filter
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Sort configuration
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    
    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Get contacts with pagination
    const contacts = await Contact.find(query)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('assignedTo', 'name email')
      .lean();
    
    // Get total count for pagination
    const total = await Contact.countDocuments(query);
    
    // Get statistics
    const stats = await Contact.aggregate([
      { $match: query },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    
    const statusStats = {
      new: 0,
      contacted: 0,
      converted: 0,
      archived: 0
    };
    
    stats.forEach(stat => {
      statusStats[stat._id] = stat.count;
    });
    
    res.json({
      success: true,
      data: contacts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      },
      stats: statusStats,
      totalStats: {
        total,
        ...statusStats
      }
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get contact by ID (Admin only)
// @route   GET /api/contact/:id
// @access  Private/Admin
const getContactById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const contact = await Contact.findById(id)
      .populate('assignedTo', 'name email')
      .populate('notes.createdBy', 'name email');
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }
    
    res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update contact status (Admin only)
// @route   PUT /api/contact/:id
// @access  Private/Admin
const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, priority, assignedTo, notes } = req.body;
    const userId = req.user.id;
    
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }
    
    // Update fields
    if (status && ['new', 'contacted', 'converted', 'archived'].includes(status)) {
      contact.status = status;
    }
    
    if (priority && ['low', 'medium', 'high'].includes(priority)) {
      contact.priority = priority;
    }
    
    if (assignedTo) {
      contact.assignedTo = assignedTo;
    }
    
    // Add note if provided
    if (notes && notes.trim()) {
      contact.notes.push({
        content: notes,
        createdBy: userId
      });
    }
    
    await contact.save();
    
    res.json({
      success: true,
      message: 'Contact updated successfully',
      data: contact
    });
  } catch (error) {
    console.error('Update contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get contact statistics (Admin only)
// @route   GET /api/contact/stats
// @access  Private/Admin
const getContactStats = async (req, res) => {
  try {
    // Daily submissions for last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const dailyStats = await Contact.aggregate([
      {
        $match: {
          submittedAt: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$submittedAt" }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    
    // Service-wise distribution
    const serviceStats = await Contact.aggregate([
      {
        $group: {
          _id: '$service',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);
    
    // Status distribution
    const statusStats = await Contact.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    
    // Total contacts
    const totalContacts = await Contact.countDocuments();
    
    // Recent contacts (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentContacts = await Contact.countDocuments({
      submittedAt: { $gte: sevenDaysAgo }
    });
    
    res.json({
      success: true,
      data: {
        dailyStats,
        serviceStats,
        statusStats,
        totals: {
          total: totalContacts,
          recent: recentContacts
        }
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = {
  submitContact,
  getContacts,
  getContactById,
  updateContact,
  getContactStats
};