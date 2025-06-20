import Lot from "../../../models/hot/lotModel.js";
import * as utils from "../../../utils/index.js";

export const createLot = async (req, res) => {
  try {
    req.body.houseId = req.user.houseId || req.body.houseId;
    const lot = await Lot.create(req.body);

    return res.status(200).json({
        success: true,
        lot
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
