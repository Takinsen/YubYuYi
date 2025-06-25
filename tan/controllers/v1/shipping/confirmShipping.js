import Lot from "../../../models/hot/lotModel.js";
import Shipping from "../../../models/hot/shippingModel.js";
import mongoose from "mongoose";

export const confirmShipping = async (req, res) => {
  try {
    const { id } = req.params;

    // Find shipping by ObjectId or displayId
    let shipping;
    if (mongoose.Types.ObjectId.isValid(id)) {
      shipping = await Shipping.findById(id);
    }
    if (!shipping) {
      shipping = await Shipping.findOne({ displayId: id });
    }
    if (!shipping) {
      return res.status(404).json({ success: false, message: "Shipping not found." });
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