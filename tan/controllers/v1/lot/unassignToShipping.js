import mongoose from "mongoose";
import Lot from "../../../models/hot/lotModel.js";

export const unassignToShipping = async (req, res) => {
  try {
    const lotId = req.body.lotId;

    // unassign lot to shipping
    let lotDoc;
    if (mongoose.Types.ObjectId.isValid(lotId)) lotDoc = await Lot.findById(lotId);
    if (!lotDoc) lotDoc = await Lot.findOne({ displayId: lotId });
    if (!lotDoc) return res.status(404).json({ success: false, message: "Lot not found." });
    lotDoc.shippingId = null;
    await lotDoc.save();

    return res.status(200).json({ success: true, lot: lotDoc });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
}