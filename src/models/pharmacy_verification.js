import mongoose from "mongoose";

const { Schema } = mongoose;

const PharmacyVerificationSchema = new Schema({
  pharmacy_id: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  certificate: {
    type: String,
    required: true,
    unique: true
  },
  pharmacy_licence: {
    type: Number,
    required: true
  },
  verification_status: {
    type: String,
    default: "pending",
    enum: ["pending", "success", "expired"],
  },
  verified_at: {
    type: Date
  }
}, { timestamps: true });

module.exports = mongoose.model("PharmacyVerification", PharmacyVerificationSchema);
