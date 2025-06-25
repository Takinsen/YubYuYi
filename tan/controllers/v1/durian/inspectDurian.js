import Durian from "../../../models/hot/durianModel.js";
import Lot from "../../../models/hot/lotModel.js";
import Shipping from "../../../models/hot/shippingModel.js";
import InspectLog from "../../../models/hot/inspectLogModel.js";
import mongoose from "mongoose";

export const inspectDurian = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { displayId, status, note } = req.body;

    if (!displayId || !["VERIFIED", "REJECT"].includes(status)) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ success: false, message: "Invalid input." });
    }

    // Try to find Durian by displayId or ObjectId
    let durian = null;
    if (mongoose.Types.ObjectId.isValid(displayId)) durian = await Durian.findById(displayId).session(session).lean();
    if (!durian) durian = await Durian.findOne({ displayId }).session(session).lean();
    

    let lot = null;
    // If not found as durian, try as lot
    if (!durian) {
      if (mongoose.Types.ObjectId.isValid(displayId)) {
        lot = await Lot.findById(displayId).session(session);
      }
      if (!lot) {
        lot = await Lot.findOne({ displayId }).session(session);
      }
      if (!lot) {
        await session.abortTransaction();
        session.endSession();
        return res.status(404).json({ success: false, message: "Durian or Lot not found." });
      }
    } else {
      // If found durian, get its lot
      lot = await Lot.findById(durian.lotId).session(session);
      if (!lot) {
        await session.abortTransaction();
        session.endSession();
        return res.status(404).json({ success: false, message: "Lot not found." });
      }
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

    lot.status = "inspecting";
    await lot.save({ session });

    // Update inspect status and note for shipping
    shipping.inspect = shipping.inspect || {};
    shipping.inspect.status = status;
    shipping.inspect.note = note;
    shipping.inspect.inspectAt = new Date();
    await shipping.save({ session });

    // If durian was found, delete it
    if (durian) await Durian.deleteOne({ _id: durian._id }).session(session);

    // Create inspect log
    await InspectLog.create([{
      shippingId: shipping._id,
      status,
      note,
      inspectedAt: new Date(),
      durian: durian ? durian.displayId : null,
    }], { session });

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      success: true,
      shipping,
      deletedDurian: durian || null,
      inspectedLot: lot.displayId,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};