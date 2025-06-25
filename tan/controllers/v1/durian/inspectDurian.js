import Durian from "../../../models/hot/durianModel.js";
import Lot from "../../../models/hot/lotModel.js";
import Shipping from "../../../models/hot/shippingModel.js";
import InspectLog from "../../../models/hot/inspectLogModel.js";
import mongoose from "mongoose";

export const inspectDurian = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { durianId, status, note } = req.body;

    if (!durianId || !["VERIFIED", "REJECT"].includes(status)) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ success: false, message: "Invalid input." });
    }

    // Find durian by mongoId or displayId
    let durian;
    if (mongoose.Types.ObjectId.isValid(durianId)) durian = await Durian.findById(durianId).session(session).lean(); 
    if (!durian) durian = await Durian.findOne({ displayId: durianId }).session(session).lean();
    if (!durian) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ success: false, message: "Durian not found." });
    }

    // Find the lot of this durian
    const lot = await Lot.findById(durian.lotId).session(session).lean();
    if (!lot) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ success: false, message: "Lot not found." });
    }
    if (!lot.shippingId) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ success: false, message: "Lot is not assigned to any shipping." });
    }

    // Find the shipping of this lot
    const shipping = await Shipping.findById(lot.shippingId).session(session);
    if (!shipping) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ success: false, message: "Shipping not found." });
    }

    // Update inspect status and note for shipping
    shipping.inspect = shipping.inspect || {};
    shipping.inspect.status = status;
    shipping.inspect.note = note;
    shipping.inspect.inspectAt = new Date();
    await shipping.save({ session });

    // Delete the durian
    await Durian.deleteOne({ _id: durian._id }).session(session);

    // Create inspect log
    await InspectLog.create([{
      shippingId: shipping._id,
      status,
      note,
      inspectedAt: new Date(),
      durian: durian.displayId,
    }], { session });

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      success: true,
      shipping,
      deletedDurian: durian,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};