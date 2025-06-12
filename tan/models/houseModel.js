import mongoose from "mongoose";

const houseSchema = new mongoose.Schema(
  {
    name: { 
      th: { type: String , required: true },
      en: { type: String , required: true },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

const House = mongoose.model("House", houseSchema);
export default House;
