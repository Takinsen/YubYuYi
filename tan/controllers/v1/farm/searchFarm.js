import Farm from "../../../models/cold/farmModel.js";
import * as utils from "../../../utils/index.js";

export const searchFarm = async (req, res) => {
  try {

    // const { select, populate, sort, limit, page, ...filters } = req.query;
    let { lang = "th" } = req.query;
    if(["th", "TH", "thai", "THAI"].includes(lang)) lang = "th"
    if(["en", "EN", "eng", "ENG"].includes(lang)) lang = "en"

    const farms = await Farm.find().lean();

    console.log(farms);

    const flattened = farms.map(farm => {
      farm.name = farm.name?.[lang] ?? null
      return farm
    });  

    return res.status(200).json({
        success: true,
        farms : flattened
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

const getRoleQuery = (role) => {
    switch(role){
      case "farmer":
        return {
          select: 'displayId status variety createdAt',
          populate: {
            path: "farmId",
            select: `name GAP`
          }
        }   
      case "house":
        return {
          select: 'displayId status variety createdAt',
          populate: {
            path: "farmId",
            select: `name GAP`
          }
        }   
      default:
        return null;
    }
}
