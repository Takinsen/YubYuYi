import mongoose from "mongoose";

const borderLogSchema = new mongoose.Schema({
  shippingId: { type: mongoose.Schema.Types.ObjectId, ref: "Shipping", required: true },
  status: { type: String, enum: ["VERIFIED", "REJECT"], required: true },
  confirmedAt: { type: Date, default: Date.now },
}, { timestamps: true });

const BorderLog = mongoose.model("BorderLog", borderLogSchema);

export default BorderLog;