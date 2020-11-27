import mongoose from "mongoose";

const { Schema } = mongoose;

const InventorySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  pharmacy: {
    type: Schema.Types.ObjectId,
    ref: "PharmacyProfile",
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  price: {
    type: Number,
    required: true,
  },
  nafdac_number: {
    type: String,
    required: true,
  },
  modifiedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Inventory", InventorySchema);
