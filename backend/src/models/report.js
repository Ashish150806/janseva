import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  address: String
}, { _id: false });

const ProofSchema = new mongoose.Schema({
  url: String,
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  note: String,
  createdAt: { type: Date, default: Date.now }
}, { _id: false });

const ReportSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    category: { type: String, enum: ["pothole","streetlight","garbage","water","other"], default: "other" },
    imageUrl: String,
    status: {
      type: String,
      enum: ["submitted","acknowledged","assigned","in_progress","completed_pending_review","resolved","rejected"],
      default: "submitted"
    },
    location: { type: LocationSchema, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // contractor
    completionProofs: [ProofSchema],
    priority: { type: Number, default: 0 }, // computed or manual
    meta: { type: Object }
  },
  { timestamps: true }
);

export default mongoose.model("Report", ReportSchema);
