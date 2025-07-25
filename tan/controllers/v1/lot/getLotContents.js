import Durian from "../../../models/hot/durianModel.js";
import Lot from "../../../models/hot/lotModel.js";
import mongoose from "mongoose";

export const getLotContents = async (req, res) => {
  try {
    const param = req.params.id;
    let lot;
    let lotQuery = {};

    // If param is a valid ObjectId, search by _id, else by displayId
    if (mongoose.Types.ObjectId.isValid(param)) {
      lot = await Lot.findById(param).lean();
      if (!lot)
        return res
          .status(404)
          .json({ status: false, message: "Lot not found" });
      lotQuery = { lotId: lot._id };
    } else {
      lot = await Lot.findOne({ displayId: param }).lean();
      if (!lot)
        return res
          .status(404)
          .json({ status: false, message: "Lot not found" });
      lotQuery = { lotId: lot._id };
    }

    const durians = await Durian.find(lotQuery).lean();

    return res.status(200).json({
      success: true,
      data: durians,
      lotData: lot,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};
