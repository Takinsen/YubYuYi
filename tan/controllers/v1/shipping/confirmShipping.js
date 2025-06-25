import Lot from "../../../models/hot/lotModel.js";
import Shipping from "../../../models/hot/shippingModel.js";
import Durian from "../../../models/hot/durianModel.js";
import mongoose from "mongoose";

export const confirmShipping = async (req, res) => {
  try {
    const { id } = req.params;
    let shipping = null;

    // Try as shipping mongoId or displayId first
    if (mongoose.Types.ObjectId.isValid(id)) shipping = await Shipping.findById(id);
    if (!shipping) shipping = await Shipping.findOne({ displayId: id });

    // If not found as shipping, try as durian or lot
    let lot = null;
    if (!shipping) {
      if (mongoose.Types.ObjectId.isValid(id)) {
        const durian = await Durian.findById(id).lean();
        if (durian) lot = await Lot.findById(durian.lotId);
      }
      if (!lot) {
        const durian = await Durian.findOne({ displayId: id }).lean();
        if (durian) lot = await Lot.findById(durian.lotId);
      }
      // Try as Lot
      if (!lot) {
        if (mongoose.Types.ObjectId.isValid(id)) lot = await Lot.findById(id);
        if (!lot) lot = await Lot.findOne({ displayId: id });      
      }
      if (!lot || !lot.shippingId) return res.status(404).json({ success: false, message: "Lot or its shipping not found." });
      shipping = await Shipping.findById(lot.shippingId);
      if (!shipping) return res.status(404).json({ success: false, message: "Shipping not found." });
    }

    // Update all lots in this shipping to status "arriving"
    const result = await Lot.updateMany(
      { shippingId: shipping._id },
      { status: "arriving" }
    );

    // Optionally, update arrivedAt in shipping
    shipping.arrivedAt = new Date();
    shipping.status = "verified";
    await shipping.save();

    return res.status(200).json({
      success: true,
      updatedLots: result.modifiedCount,
      shipping
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
}