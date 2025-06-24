import Lot from "../../../models/hot/lotModel.js";
import Shipping from "../../../models/hot/shippingModel.js";
import mongoose from "mongoose";

export const assignToShipping = async (req, res) => {
  try {
    const lotId = req.params.id;
    const { shippingId } = req.body;

    if (!shippingId) {
      return res.status(400).json({ success: false, message: "shippingId is required." });
    }

    // Use mongoose's ObjectId validation
    let shipping;
    if (mongoose.Types.ObjectId.isValid(shippingId)) shipping = await Shipping.findById(shippingId);
    if (!shipping) shipping = await Shipping.findOne({ displayId: shippingId });
    if (!shipping) return res.status(404).json({ success: false, message: "Shipping not found." });
    

    // Assign lot to shipping
    const lot = await Lot.findByIdAndUpdate(
      lotId,
      { shippingId: shipping._id },
      { new: true, runValidators: true }
    );

    if (!lot) {
      return res.status(404).json({ success: false, message: "Lot not found." });
    }

    return res.status(200).json({ success: true, lot });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};