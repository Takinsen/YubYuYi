import mongoose from "mongoose";

const inspectLogSchema = new mongoose.Schema({
  shippingId: { type: mongoose.Schema.Types.ObjectId, ref: "Shipping" },
  status: { type: String, enum: ["VERIFIED", "REJECT"], required: true },
  note: { type: String },
  inspectedAt: { type: Date, default: Date.now },
  durian: { type: String },
}, { timestamps: true });

const inspectLog = mongoose.model("InspectLog", inspectLogSchema);

export default inspectLog;