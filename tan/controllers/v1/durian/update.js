import Durian from "../../../models/hot/durianModel.js";
import * as utils from "../../../utils/index.js";

export const updateDurian = async (req, res) => {
  try {
    

    return res.status(200).json({
        success: true,

    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
