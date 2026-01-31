const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Get the URI from environment variable
    const mongoURI = process.env.MONGO_URI;
    
    console.log('🔗 MongoDB URI:', mongoURI ? 'Present' : 'Missing');
    
    if (!mongoURI) {
      throw new Error('MONGO_URI is not defined in .env file');
    }
    
    // Validate the URI format
    if (!mongoURI.startsWith('mongodb://') && !mongoURI.startsWith('mongodb+srv://')) {
      throw new Error('Invalid MongoDB URI format. Must start with mongodb:// or mongodb+srv://');
    }
    
    console.log('🔗 Attempting MongoDB connection...');
    
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    console.log(`✅ MongoDB Connected Successfully! Host: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Failed: ${error.message}`);
    console.log('💡 Tips:');
    console.log('1. Check your .env file has correct MONGO_URI');
    console.log('2. Verify MongoDB Atlas IP whitelist includes your IP');
    console.log('3. Check your internet connection');
    
    // Don't crash the server if DB fails
    return null;
  }
};

module.exports = connectDB;