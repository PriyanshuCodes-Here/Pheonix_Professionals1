import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      default: "About Us",
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("About", aboutSchema);
