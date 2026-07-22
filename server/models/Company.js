import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: [
        "Wishlist",
        "Applied",
        "OA Scheduled",
        "OA Completed",
        "Interview",
        "Offer",
        "Rejected",
      ],
      default: "Wishlist",
    },

    applicationDate: {
      type: Date,
      default: Date.now,
    },

    deadline: {
      type: Date,
    },

    location: {
      type: String,
      default: "",
    },

    salary: {
      type: String,
      default: "",
    },

    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Company", companySchema);