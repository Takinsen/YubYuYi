import Lot from "../../../models/hot/lotModel.js";
import * as utils from "../../../utils/index.js";

const ROLE_FIELD_MAP = {
  border: [],
  ministry: ["inspect.status", "inspect.note", "inspect.inspectAt"],
  transport: ["status", "status", "shippingId"],
  house: ["status", "grade", "weight.approximate", "weight.absolute", "palletId", "importBy", "exportBy"],
  farmer: [],
};

const filterAllowedFields = (input, allowedFields) => {
  const filtered = {};
  for (const key of allowedFields) {
    const keys = key.split(".");
    let current = filtered;
    let source = input;

    for (let i = 0; i < keys.length - 1; i++) {
      if (source[keys[i]] == null) break;
      current[keys[i]] = current[keys[i]] || {};
      current = current[keys[i]];
      source = source[keys[i]];
    }

    const finalKey = keys[keys.length - 1];
    if (source && finalKey in source) {
      current[finalKey] = source[finalKey];
    }
  }
  return filtered;
};

export const editLot = async (req, res) => {
  try {
    const { id, ...updateData } = req.body;
    const role = req.user?.role;

    const allowedFields = ROLE_FIELD_MAP[role] || [];
    const filteredUpdate = filterAllowedFields(updateData, allowedFields);

    if (Object.keys(filteredUpdate).length === 0) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update any fields.",
      });
    }
    const lot = await Lot.findByIdAndUpdate(id, filteredUpdate, {
      new: true,
      runValidators: true,
    });

    if (!lot)
      return res.status(404).json({ success: false, message: "Lot not found" });

    return res.status(200).json({
      success: true,
      lot,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
