import mongoose from "mongoose";

const { Schema } = mongoose;

const PharmacyProfileSchema = new Schema(
  {
    user_id: { 
      type: Schema.Types.ObjectId, 
      ref: "User"
    },
    company_name: {
      type: String,
      required: true,
      unique: true,
    },
    company_email: {
      type: String,
      required: true,
      unique: true,
    },
    company_address: {
      type: String,
    },
    company_phone_number: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PharmacyProfile", PharmacyProfileSchema);
