import mongoose from "mongoose";
import Durian from "../../../models/hot/durianModel.js";
import Lot from "../../../models/hot/lotModel.js";

export const assignLot = async (req, res) => {
  try {
    const { duriansId, lotId } = req.body;

    if (!Array.isArray(duriansId) || duriansId.length === 0 || !lotId) {
      return res
        .status(400)
        .json({
          success: false,
          message: "duriansId[] and lotId are required",
        });
    }
    if (
      !duriansId.every((id) => mongoose.Types.ObjectId.isValid(id)) ||
      !mongoose.Types.ObjectId.isValid(lotId)
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Mongo ObjectId supplied" });
    }

    const lotExists = await Lot.exists({ _id: lotId });
    if (!lotExists) {
      return res.status(404).json({ success: false, message: "Lot not found" });
    }

    const updateResult = await Durian.updateMany(
      { _id: { $in: duriansId } },
      { $set: { lotId } }
    );

    const durians = await Durian.find({ _id: { $in: duriansId } });

    return res.status(200).json({
      success: true,
      matched: updateResult.matchedCount,
      modified: updateResult.modifiedCount,
      durians,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
