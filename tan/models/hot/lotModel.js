import mongoose from "mongoose";

const lotSchema = new mongoose.Schema(
  {
    displayId: {
      type: String,
      unique: true,
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
      required: true,
    },
    status: {
      type: String,
      enum: ["harvest", "sorted", "inspected", "shipped"],
      default: "harvest"
    },
    inspect: {
      status: {
        type: String,
        enum: ["PENDING", "VERIFIED", "REJECT"],
        default: "PENDING",
      },
      note: { type: String, default: null },
      inspectAt: { type: Date, default: null },
    },
    weight: {
      approximate: { type: Number, default: null },
      absolute: { type: Number, default: null },
    },
    grade: { type: String, default: null },
    palletId: { type: String, default: null },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

const Lot = mongoose.model("Lot", lotSchema);
export default Lot;
