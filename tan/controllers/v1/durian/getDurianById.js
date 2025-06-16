import { populate } from "dotenv";
import Durian from "../../../models/hot/durianModel.js";

export const getDurianById = async (req, res) => {
  try {
    // const { select, populate, sort, limit, page, ...filters } = req.query;
    let { lang } = req.query;
    if (["th", "TH", "thai", "THAI"].includes(lang)) lang = "th";
    if (["en", "EN", "eng", "ENG"].includes(lang)) lang = "en";

    const customQuery = getRoleQuery(req.user.role || "user", lang || "th");
    if (!customQuery)
      return res.status(400).json({ success: false, message: "Invalid Role" });

    const { select, populate } = customQuery;

    const durianId = req.params.id;

    let query = Durian.findById(durianId);

    query.select(select);
    query.populate(populate);

    const durian = await query.lean();

    if (!durian)
      return res
        .status(404)
        .json({ success: false, message: "Durian not found" });

    return res.status(200).json({
      success: true,
      durian,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const getRoleQuery = (role, lang) => {
  switch (role) {
    case "border":
      return {
        select: "harvestAt variety",
        populate: {
          path: "lotId",
          select:
            "displayId status weight grade palletId importBy exportBy createdAt inspect",
          populate: [
            {
              path: "farmId",
              select: `name.${lang} GAP`,
            },
            {
              path: "shippingId",
              select: "displayId status licensePlate pickedAt",
            },
          ],
        },
      };
    case "ministry":
      return {
        select: "harvestAt variety",
        populate: {
          path: "lotId",
          select:
            "displayId status weight grade palletId importBy exportBy createdAt inspect",
          populate: [
            {
              path: "farmId",
              select: `name.${lang}`,
            },
            {
              path: "shippingId",
              select: "displayId status licensePlate pickedAt",
            },
          ],
        },
      };
    case "transport":
      return {
        select: "harvestAt variety",
        populate: {
          path: "lotId",
          select:
            "displayId status weight grade palletId importBy exportBy createdAt",
          populate: [
            {
              path: "farmId",
              select: `name.${lang}`,
            },
            {
              path: "shippingId",
              select: "displayId status licensePlate pickedAt",
            },
          ],
        },
      };
    case "house":
      return {
        select: "harvestAt variety",
        populate: {
          path: "lotId",
          select:
            "displayId status weight grade palletId importBy exportBy createdAt",
          populate: [
            {
              path: "farmId",
              select: `name.${lang}`,
            },
            {
              path: "shippingId",
              select: "displayId status licensePlate pickedAt",
            },
          ],
        },
      };
    default:
      return {
        select: "harvestAt variety",
        populate: {
          path: "lotId",
          select: "createdAt",
          populate: [
            {
              path: "farmId",
              select: `name.${lang}`,
            },
            {
              path: "shippingId",
              select: "pickedAt",
            },
          ],
        },
      };
  }
};
