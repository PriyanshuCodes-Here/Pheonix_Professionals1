const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  phone: {
    type: String,
    required: [true, 'Please provide your phone number'],
    match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit phone number']
  },
  company: {
    type: String,
    default: '',
    maxlength: [100, 'Company name cannot exceed 100 characters']
  },
  service: {
    type: String,
    required: [true, 'Please select a service'],
    enum: [
      'GST Compliance',
      'Income Tax Filing',
      'Company Registration',
      'Accounting Services',
      'Audit & Assurance',
      'Financial Consulting',
      'Investment Advisory',
      'Business Valuation',
      'Succession Planning',
      'Other'
    ]
  },
  message: {
    type: String,
    required: [true, 'Please provide a message'],
    minlength: [10, 'Message must be at least 10 characters'],
    maxlength: [1000, 'Message cannot exceed 1000 characters']
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'converted', 'archived'],
    default: 'new'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  notes: [{
    content: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  source: {
    type: String,
    enum: ['website', 'referral', 'social_media', 'other'],
    default: 'website'
  },
  ipAddress: String,
  userAgent: String,
  submittedAt: {
    type: Date,
    default: Date.now
  },
  contactedAt: {
    type: Date
  },
  convertedAt: {
    type: Date
  },
  archivedAt: {
    type: Date
  }
});

// Index for better query performance
ContactSchema.index({ status: 1, submittedAt: -1 });
ContactSchema.index({ email: 1 });
ContactSchema.index({ service: 1 });

// Pre-save middleware
ContactSchema.pre('save', function(next) {
  if (this.isModified('status')) {
    const now = new Date();
    
    if (this.status === 'contacted' && !this.contactedAt) {
      this.contactedAt = now;
    }
    
    if (this.status === 'converted' && !this.convertedAt) {
      this.convertedAt = now;
    }
    
    if (this.status === 'archived' && !this.archivedAt) {
      this.archivedAt = now;
    }
  }
  next();
});

// Virtual property for time since submission
ContactSchema.virtual('timeSinceSubmission').get(function() {
  const now = new Date();
  const diff = now - this.submittedAt;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
});

module.exports = mongoose.model('Contact', ContactSchema);