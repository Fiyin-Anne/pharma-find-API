import mongoose from "mongoose";

const { Schema } = mongoose;

const LocationSchema = new Schema({
  pharmacy_id: {
    type: Schema.Types.ObjectId,
    ref: "PharmacyProfile",
  },
  state: {
    type: String,
    required: true,
  },
  local_govt: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  modifiedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Location", LocationSchema);
