import mongoose from "mongoose";
import Durian from "../../../models/hot/durianModel.js";
import Lot from "../../../models/hot/lotModel.js";

export const assignToLot = async (req, res) => {
  try {
    const { displayId , lotId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(lotId)) 
      return res.status(400).json({ success: false, message: "Invalid Mongo ObjectId supplied" });
    

    const lotExists = await Lot.exists({ _id: lotId });
    if (!lotExists) return res.status(404).json({ success: false, message: "Lot not found" });

    const durian = await Durian.findOneAndUpdate(
      { displayId },           
      { $set: { lotId }}, 
      {
        new: true,        
        upsert: true, 
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    return res.status(200).json({ success: true , durian });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
