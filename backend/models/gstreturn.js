const mongoose = require("mongoose");

const gstReturnSchema = new mongoose.schema({
  GSTIN: {
    type: String,
    required: [true, "Please provide the GST number"],
    minlength: [15, "GSTIN must be of 15 Characters"],
    maxlength: [15, "Please enter the valid GST Number"],
  },
  ComName: {
    type: String,
    required: [true, "Please provide the Business Name"],
    trim: true,
    minlength: [3, "Please provide valid Business Name"],
    maxlength: [200, "Please provide valid Business name"],
  },
  returnDate: {
    type: Date,
    required: true,
    default: null
  },
  totalPurchase: {
    type: Number,
    required: true,
    default: null
  },
  totalSales: {
    type: Number,
    required: true,
    default: null
  },
  CGST: Number,
  SGST: Number,
  totalTax: Number,
    
  status: {
    type: String,
    enum: ["DRAFT", "READY_FOR_FILING", "FILED_MOCK"],
    default: "DRAFT"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('gstreturn', gstReturnSchema);