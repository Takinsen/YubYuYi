import mongoose from "mongoose";

function generateDisplayId() {
  const chars = "0123456789";
  let id = "";
  for (let i = 0; i < 8; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id.slice(0, 6) + "-" + id.slice(6);
};

const lotSchema = new mongoose.Schema(
  {
    displayId: {
      type: String,
      default: null
    },
    farmId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Farm",
      required: true,
    },
    houseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "House",
      required: true,
    },
    shippingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shipping",
      default: null
    },
    variety: {
      type: String,
      enum: ["MONTHONG", "KANYAO", "CHANEE", "PUANGMANEE"],
      required: true,
    },
    type: {
      type: String,
      enum: ["FRESH", "FREEZE"],
      required: true
    },
    status: {
      type: String,
      enum: ["sorting", "transporting", "inspecting", "arriving"],
      default: "sorting"
    },
    weight: {
      net: { type: Number, required: true },
      gross: { type: Number, required: true },
    },
    size: {
      width: { type: Number, required: true },
      length: { type: Number, required: true }, 
      height: { type: Number, required: true },    
    },
    verify: { type: Boolean, default: false },
    transportAt: { type: Date, default: null }, 
    grade: { type: String, required: true },
    palletId: { type: String, required: true },  
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

const Lot = mongoose.model("Lot", lotSchema);
export default Lot;
