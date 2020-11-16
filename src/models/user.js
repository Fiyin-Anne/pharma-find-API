import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone_number: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "User",
    enum: ["User", "Pharmacy Admin", "Admin"],
  },
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
