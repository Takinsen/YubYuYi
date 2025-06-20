import Lot from "../../../models/hot/lotModel.js";
import * as utils from "../../../utils/index.js";

export const myLot = async (req, res) => {
  try {

    // const { select, populate, sort, limit, page, ...filters } = req.query;
    let { lang = "th" } = req.query;
    if(["th", "TH", "thai", "THAI"].includes(lang)) lang = "th"
    if(["en", "EN", "eng", "ENG"].includes(lang)) lang = "en"

    const role = req.user.role;
    const farmId = req.user.farmId;
    const houseId = req.user.houseId;

    let filter = {};
    switch(role) {
      case "farmer":
        filter = { farmId }
        break;
      case "house":
        filter = { houseId }
        break;  
      default:
        null
    }

    const customQuery = getRoleQuery(role);
    if(!customQuery || !filter) return res.status(400).json({ success: false, message: "Invalid Role" }); 
    const { select, populate } = customQuery;

    const lots = await Lot.find(filter)
      .select(select)         
      .populate(populate)    
      .lean();

    const flattened = lots.map(lot => {
      const { farmId, ...rest } = lot;
      return {
        ...rest,
        farmName: farmId?.name?.[lang],
        farmGAP: farmId?.GAP,
      };
    });  

    return res.status(200).json({
        success: true,
        lots : flattened
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
