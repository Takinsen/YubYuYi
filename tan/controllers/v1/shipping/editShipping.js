import Shipping from "../../../models/hot/shippingModel.js";
import * as utils from "../../../utils/index.js";

export const editShipping = async (req, res) => {
  try {
    const shipping = await Shipping.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!shipping) return res.status(404).json({ success: false, message: "Shipping not found" });
    
    return res.status(200).json({
      success: true,
      shipping
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
