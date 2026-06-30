import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      trim: true,
    },
    company: {
      type: String,
      trim: true,
      default: "",
    },
    source: {
      type: String,
      enum: ["Website", "Referral", "Social Media", "Email Campaign", "Cold Call", "Other"],
      default: "Website",
    },
    status: {
      type: String,
      enum: ["New", "Contacted", "Follow-up", "Converted", "Lost"],
      default: "New",
    },
    notes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Lead = mongoose.model("Lead", leadSchema);
export default Lead;