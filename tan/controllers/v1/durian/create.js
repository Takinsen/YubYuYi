import Durian from "../../../models/hot/durianModel.js";
import * as utils from "../../../utils/index.js";

export const createDurian = async (req, res) => {
  try {
    const durian = await Durian.create(req.body);

    return res.status(200).json({
        success: true,
        durian
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
