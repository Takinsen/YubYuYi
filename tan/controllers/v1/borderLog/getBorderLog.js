import BorderLog from "../../../models/hot/borderLogModel.js";

export const getBorderLogs = async (req, res) => {
  try {

    const logs = await BorderLog.find()
      .populate("shippingId")
      .sort({ createdAt: -1 })

    return res.status(200).json({ success: true, data: logs });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};