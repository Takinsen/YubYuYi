import Lot from "../../../models/hot/lotModel.js";
import Shipping from "../../../models/hot/shippingModel.js";
import mongoose from "mongoose";

export const getShippingContents = async (req, res) => {
  try {
    const param = req.params.id;
    let shipping;

    // If param is a valid ObjectId, use it directly, else find by displayId
    if (mongoose.Types.ObjectId.isValid(param)) {
      shipping = await Shipping.findById(param).lean();
    } else {
      shipping = await Shipping.findOne({ displayId: param }).lean();
    }
    if (!shipping) {
      return res.status(404).json({ success: false, message: "Shipping not found" });
    }

    // Find all lots assigned to this shipping
    const lots = await Lot.find({ shippingId: shipping._id }).lean();

    return res.status(200).json({
      success: true,
      data: lots,
      shippingData: shipping,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};