import Lot from "../../../models/hot/lotModel.js";

export const unassignToShipping = async (req, res) => {
  try {
    const lotId = req.body.lotId;

    const lot = await Lot.findByIdAndUpdate(
      lotId,
      { shippingId: null },
      { new: true, runValidators: true }
    );

    if (!lot) return res.status(404).json({ success: false, message: "Lot not found." });

    return res.status(200).json({ success: true, lot });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
}