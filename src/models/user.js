import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  email_verified: {
    type: Boolean,
    default: false,
    required: true
  },
  phone_number: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "Pharmacy Admin",
    enum: ["User", "Pharmacy Admin", "Admin"],
  },
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
