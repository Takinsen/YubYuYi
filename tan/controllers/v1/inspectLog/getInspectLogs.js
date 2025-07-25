import InspectLog from "../../../models/hot/inspectLogModel.js";

export const getInspectLogs = async (req, res) => {
  try {
    // Optional: filter by shippingId, status, or date range via query params
    const { shippingId, status, from, to } = req.query;
    const filter = {};

    if (shippingId) filter.shippingId = shippingId;
    if (status) filter.status = status;
    if (from || to) {
      filter.inspectedAt = {};
      if (from) filter.inspectedAt.$gte = new Date(from);
      if (to) filter.inspectedAt.$lte = new Date(to);
      // Remove inspectedAt if empty
      if (Object.keys(filter.inspectedAt).length === 0) delete filter.inspectedAt;
    }

    const logs = await InspectLog.find(filter)
      .populate("shippingId")
      .sort({ inspectedAt: -1 })
      .lean();

    return res.status(200).json({ success: true, data: logs });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};