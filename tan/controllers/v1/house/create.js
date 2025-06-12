import House from "../../../models/cold/houseModel.js";
import * as utils from "../../../utils/index.js";

export const createHouse = async (req, res) => {
  try {
    const { name , nameEN } = req.body;
    const payload = {
        name :{
            th: name,
            en: nameEN
        },
    }
    const house = await House.create(payload);

    return res.status(200).json({
        success: true,
        house
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
