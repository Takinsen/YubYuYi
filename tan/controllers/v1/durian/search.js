import Durian from "../../../models/durianModel.js";
import { roleQuery } from "../../../constants/roleQuery.js";
import * as utils from "../../../utils/index.js";

export const searchDurian = async (req, res) => {
  try {

    // const { select, populate, sort, limit, page, ...filters } = req.query;

    const customQuery = roleQuery["farm"];
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
