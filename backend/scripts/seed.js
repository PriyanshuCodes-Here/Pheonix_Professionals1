require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Blog = require('../models/Blog');

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Blog.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', salt);

    const adminUser = await User.create({
      name: 'Admin User',
      email: process.env.ADMIN_EMAIL || 'admin@phoenixprofessionals.com',
      password: hashedPassword,
      phone: '9876543210',
      company: 'Phoenix Professionals',
      role: 'admin',
      provider: 'local'
    });

    console.log('Admin user created:', adminUser.email);

    // Create sample blogs
    const sampleBlogs = [
      {
        title: 'Understanding GST Compliance for Small Businesses',
        excerpt: 'A comprehensive guide to GST compliance requirements and best practices for small business owners.',
        content: 'Full article content here...',
        author: 'Rajesh Sharma',
        tags: ['GST', 'Compliance', 'Small Business'],
        category: 'Tax Updates',
        readTime: 8,
        isFeatured: true
      },
      {
        title: 'Tax Saving Strategies for FY 2024-25',
        excerpt: 'Learn about the latest tax saving investment options and strategies for the upcoming financial year.',
        content: 'Full article content here...',
        author: 'Priya Patel',
        tags: ['Taxation', 'Investment', 'Planning'],
        category: 'Financial Tips',
        readTime: 10,
        isFeatured: true
      },
      {
        title: 'Company Registration Process in India',
        excerpt: 'Step-by-step guide to registering your company in India with minimal hassle.',
        content: 'Full article content here...',
        author: 'Amit Verma',
        tags: ['Company Registration', 'Legal', 'Startup'],
        category: 'Business Advice',
        readTime: 6
      }
    ];

    const createdBlogs = await Blog.insertMany(sampleBlogs);
    console.log(`Created ${createdBlogs.length} sample blogs`);

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Database seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();