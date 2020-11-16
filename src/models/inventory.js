import mongoose from "mongoose";

const { Schema } = mongoose;

const InventorySchema = new Schema({
  pharmacy_id: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  items: [
    {
      name: String,
      quantity: Number,
      price: Number,
      nafdac_number: Number
    }
  ],
  modifiedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Inventory", InventorySchema);
