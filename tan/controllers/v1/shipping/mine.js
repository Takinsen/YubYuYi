import Shipping from "../../../models/hot/shippingModel.js";
import * as utils from "../../../utils/index.js";

export const myShipping = async (req, res) => {
  try {

    // const { select, populate, sort, limit, page, ...filters } = req.query;
    let { lang = "th" } = req.query;
    if(["th", "TH", "thai", "THAI"].includes(lang)) lang = "th"
    if(["en", "EN", "eng", "ENG"].includes(lang)) lang = "en"

    const shippings = await Shipping.find();

    return res.status(200).json({
        success: true,
        shippings
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
