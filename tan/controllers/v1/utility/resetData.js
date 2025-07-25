import Durian from "../../../models/hot/durianModel.js";
import Lot from "../../../models/hot/lotModel.js";
import Shipping from "../../../models/hot/shippingModel.js";
import InspectLog from "../../../models/hot/inspectLogModel.js";
import BorderLog from "../../../models/hot/borderLogModel.js";

export const resetData = async (req, res) => {
  try {
    // Logic to reset data goes here
    // For example, clearing a database or resetting application state
    const durians = await Durian.deleteMany({});
    const lots = await Lot.deleteMany({});
    const shippings = await Shipping.deleteMany({});
    const inspectLogs = await InspectLog.deleteMany({});
    const borderLogs = await BorderLog.deleteMany({});

    res
      .status(200)
      .json({
        message: "Data has been successfully reset.",
        durians: durians?.length || 0,
        lots: lots?.length || 0,
        shippings: shippings?.length || 0,
        inspectLogs: inspectLogs?.length || 0,
        borderLogs: borderLogs?.length || 0,
      });
  } catch (error) {
    console.error("Error resetting data:", error);
    res.status(500).json({ error: "An error occurred while resetting data." });
  }
};
