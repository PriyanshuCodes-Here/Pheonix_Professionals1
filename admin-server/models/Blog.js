import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String,
      required: true,
    },

    tags: {
      type: [String],
      default: [],
    },

    author: {
      type: String,
      default: "Admin",
    },
  },
  {
    timestamps: true, // createdAt & updatedAt auto
  }
);

export default mongoose.model("Blog", blogSchema);
