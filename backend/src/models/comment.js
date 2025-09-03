import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    report: { type: mongoose.Schema.Types.ObjectId, ref: "Report", required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // optional if anonymous
    isAnonymous: { type: Boolean, default: false },
    text: { type: String, required: true },
    approved: { type: Boolean, default: false }, // official approval for public display
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

export default mongoose.model("Comment", CommentSchema);
