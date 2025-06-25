import Lot from "../../../models/hot/lotModel.js";
import Shipping from "../../../models/hot/shippingModel.js";
import mongoose from "mongoose";

export const assignToShipping = async (req, res) => {
  try {
    const { shippingId , lotId } = req.body;

    if (!shippingId) {
      return res.status(400).json({ success: false, message: "shippingId is required." });
    }

    // Use mongoose's ObjectId validation
    let shipping;
    if (mongoose.Types.ObjectId.isValid(shippingId)) shipping = await Shipping.findById(shippingId);
    if (!shipping) shipping = await Shipping.findOne({ displayId: shippingId });
    if (!shipping) return res.status(404).json({ success: false, message: "Shipping not found." });
    

    // Assign lot to shipping
    let lotDoc;
    if (mongoose.Types.ObjectId.isValid(lotId)) lotDoc = await Lot.findById(lotId);
    if (!lotDoc) lotDoc = await Lot.findOne({ displayId: lotId });
    if (!lotDoc) return res.status(404).json({ success: false, message: "Lot not found." });

    // Assign lot to shipping
    lotDoc.shippingId = shipping._id;
    lotDoc.transportAt = new Date();
    await lotDoc.save();

    return res.status(200).json({ success: true, lot: lotDoc });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};