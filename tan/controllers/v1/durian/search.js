import Durian from "../../../models/durianModel.js";
import * as utils from "../../../utils/index.js";

export const searchDurian = async (req, res) => {
  try {

    // const { select, populate, sort, limit, page, ...filters } = req.query;
    let { lang } = req.query;
    if(["th", "TH", "thai", "THAI"].includes(lang)) lang = "th"
    if(["en", "EN", "eng", "ENG"].includes(lang)) lang = "en"

    console.log(req.user.role)

    const customQuery = getRoleQuery(req.user.role || "user" , lang || "th");
    if(!customQuery) return res.status(400).json({ success: false, message: "Invalid Role" }); 

    const { select, populate, sort, limit, page, ...filters } = customQuery;

    let filter = utils.buildFilter(filters);

    let query = Durian.find(filter);

    const selectFields = utils.buildSelect(select);
    if (selectFields) query.select(selectFields);

    const sortFields = utils.buildSort(sort);
    if (Object.keys(sortFields).length > 0) query.sort(sortFields);

    const populateFields = utils.buildPopulate(populate);
    if (populateFields.length > 0) query.populate(populateFields);

    if (limit && !isNaN(limit) && limit > 0) {
      const limitDocs = parseInt(limit);
      query.limit(limitDocs);

      if (page && !isNaN(page) && page > 0) {
        const pageDocs = parseInt(page);
        query.skip((pageDocs - 1) * limitDocs);
      }
    }

    const durians = await query.lean();

    return res.status(200).json({
        success: true,
        durians
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

const getRoleQuery = (role , lang) => {
    switch(role){
      case "border":
        return {
          select: '-__v',
          populate: `farmId:name.${lang};GAP;updatedAt,houseId:name.${lang}`
        }   
      case "ministry":
        return {
          select: '-__v',
          populate: `farmId:name.${lang},houseId:name.${lang}`
        }
      case "transport":
        return {
          select: '-inspect,-__v',
          populate: `farmId:name.${lang},houseId:name.${lang}`
        }                     
      case "house":
        return {
          select: '-shippingId,-inspect,-__v',
          populate: `farmId:name.${lang};GAP;updatedAt,houseId:name.${lang}`
        }      
      default:
        return {
            select: 'displayId,farmId,variety,status,date,image_url',
            populate: `farmId:name.${lang}`
        }
    }

}
