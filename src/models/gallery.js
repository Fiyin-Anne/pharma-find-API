import mongoose from "mongoose";

const { Schema } = mongoose;

const GallerySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gallery", GallerySchema);
