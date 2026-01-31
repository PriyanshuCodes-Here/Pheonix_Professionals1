const mongoose = require('mongoose');
const slugify = require('slugify');

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
    minlength: [10, 'Title must be at least 10 characters'],
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  excerpt: {
    type: String,
    required: [true, 'Please provide an excerpt'],
    maxlength: [300, 'Excerpt cannot exceed 300 characters']
  },
  content: {
    type: String,
    required: [true, 'Please provide content'],
    minlength: [100, 'Content must be at least 100 characters']
  },
  author: {
    type: String,
    default: 'Phoenix Professionals Team'
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  image: {
    url: {
      type: String,
      default: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200'
    },
    alt: {
      type: String,
      default: 'Blog image'
    }
  },
  tags: [{
    type: String,
    enum: [
      'Taxation',
      'GST',
      'Accounting',
      'Compliance',
      'Finance',
      'Business',
      'Startup',
      'Investment',
      'Legal',
      'Technology',
      'Economy',
      'Tax Planning',
      'Business Growth',
      'Financial Planning'
    ]
  }],
  category: {
    type: String,
    enum: [
      'Tax Updates',
      'Business Advice',
      'Financial Tips',
      'Compliance Guide',
      'Industry Insights',
      'Success Stories'
    ],
    default: 'Business Advice'
  },
  readTime: {
    type: Number,
    default: 5,
    min: [1, 'Read time must be at least 1 minute']
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  shares: {
    type: Number,
    default: 0
  },
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    name: String,
    email: String,
    content: {
      type: String,
      required: true,
      maxlength: [500, 'Comment cannot exceed 500 characters']
    },
    isApproved: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  meta: {
    title: String,
    description: String,
    keywords: [String]
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  publishedAt: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Generate slug from title before saving
BlogSchema.pre('save', function(next) {
  if (!this.isModified('title')) return next();
  
  const slug = slugify(this.title, {
    lower: true,
    strict: true,
    trim: true
  });
  
  // Ensure slug is unique
  const originalSlug = slug;
  let slugCount = 0;
  let finalSlug = originalSlug;
  
  // This will be handled in controller with async logic
  this.slug = finalSlug;
  this.updatedAt = Date.now();
  
  next();
});

// Update publishedAt when isPublished changes to true
BlogSchema.pre('save', function(next) {
  if (this.isModified('isPublished') && this.isPublished && !this.publishedAt) {
    this.publishedAt = Date.now();
  }
  next();
});

// Calculate read time based on content length
BlogSchema.pre('save', function(next) {
  if (this.isModified('content')) {
    const words = this.content.split(/\s+/).length;
    this.readTime = Math.ceil(words / 200); // 200 words per minute
  }
  next();
});

// Indexes for better query performance
BlogSchema.index({ slug: 1 });
BlogSchema.index({ isPublished: 1, publishedAt: -1 });
BlogSchema.index({ tags: 1 });
BlogSchema.index({ category: 1 });
BlogSchema.index({ views: -1 });
BlogSchema.index({ isFeatured: 1 });

// Virtual property for SEO URL
BlogSchema.virtual('url').get(function() {
  return `/blogs/${this.slug}`;
});

// Static method to get popular blogs
BlogSchema.statics.getPopular = function(limit = 5) {
  return this.find({ isPublished: true })
    .sort({ views: -1 })
    .limit(limit)
    .select('title slug excerpt image views readTime publishedAt');
};

// Static method to get recent blogs
BlogSchema.statics.getRecent = function(limit = 5) {
  return this.find({ isPublished: true })
    .sort({ publishedAt: -1 })
    .limit(limit)
    .select('title slug excerpt image views readTime publishedAt');
};

module.exports = mongoose.model('Blog', BlogSchema);