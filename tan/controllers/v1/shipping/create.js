import Shipping from "../../../models/hot/shippingModel.js";
import * as utils from "../../../utils/index.js";

export const createShipping = async (req, res) => {
  try {
    req.body.userId = req.user.id;
    const shipping = await Shipping.create(req.body);

    return res.status(200).json({
        success: true,
        shipping
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
