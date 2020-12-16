import mongoose from "mongoose";

const { Schema } = mongoose;

const PharmacyProfileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    contact_person: {
      type: String,
      required: true,
      unique: true,
    },
    pharmacy_address: {
      type: String,
      required: true,
    },
    license_number: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    // verified: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PharmacyProfile", PharmacyProfileSchema);
