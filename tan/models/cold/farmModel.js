import mongoose from "mongoose";

const farmSchema = new mongoose.Schema(
  {
    name: { 
      th: { type: String , required: true },
      en: { type: String , required: true },
    },
    GAP: { type: String, required: true },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

const Farm = mongoose.model("Farm", farmSchema);
export default Farm;
