const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    points: {
      type: [String],
      default: [],
    },

    icon: {
      type: String,
      default: "Settings",
    },

    color: {
      type: String,
      default: "#C5A059",
    },

    featured: {
      type: Boolean,
      default: false,
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
