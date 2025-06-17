import mongoose from "mongoose";
import Durian from "../../../models/hot/durianModel.js";

export const unassignLot = async (req, res) => {
  try {
    const { duriansId } = req.body;

    // 1️⃣ Basic validation
    if (!Array.isArray(duriansId) || duriansId.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "duriansId[] is required" });
    }
    if (
      !duriansId.every(id => mongoose.Types.ObjectId.isValid(id))
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Mongo ObjectId supplied" });
    }

    // 2️⃣ Build query – optionally gate by current lotId
    const filter = { _id: { $in: duriansId } };

    // 3️⃣ Unset the lotId (runValidators: false ‑ just like assignLot)
    const updateResult = await Durian.updateMany(filter, { $set: { lotId: null } });

    // 4️⃣ Fetch updated durians for confirmation (optional)
    const durians = await Durian.find({ _id: { $in: duriansId } });

    return res.status(200).json({
      success: true,
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
