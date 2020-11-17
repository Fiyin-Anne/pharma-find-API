import mongoose from "mongoose";

const { Schema } = mongoose;

const PharmacyProfileSchema = new Schema({
  company_name: {
    type: String,
    required: true,
    unique: true
  },
  company_email: {
    type: String,
    required: true,
    unique: true
  },
  company_address: {
    type: String,
    required: true
  },
  company_phone_number: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  verified: {
    type: Boolean,
    default: false,
  },
  inventory_id: {
    type: String,
    default: "User"
  },
}, { timestamps: true });

module.exports = mongoose.model("PharmacyProfile", PharmacyProfileSchema);
