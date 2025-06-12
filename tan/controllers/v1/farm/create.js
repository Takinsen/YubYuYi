import Farm from "../../../models/cold/farmModel.js";
import * as utils from "../../../utils/index.js";

export const createFarm = async (req, res) => {
  try {
    const { name , nameEN , GAP } = req.body;
    const payload = {
        name :{
            th: name,
            en: nameEN
        },
        GAP
    }
    const farm = await Farm.create(payload);

    return res.status(200).json({
        success: true,
        farm
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
