import mongoose from "mongoose";

const { Schema } = mongoose;

const ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
}, { timestamps: true });

module.exports = mongoose.model("Item", ItemSchema);
