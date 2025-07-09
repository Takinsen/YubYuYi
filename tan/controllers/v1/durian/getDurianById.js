import mongoose from "mongoose";
import Durian from "../../../models/hot/durianModel.js";
import Lot from "../../../models/hot/lotModel.js";
import FIELD_MAP from "../../../constants/field.js";
import LOT_STATUS from "../../../constants/lotStatus.js";
import PRODUCT_TYPE from "../../../constants/productType.js";
import VARIETY from "../../../constants/variety.js";

/* ---------- Helpers ---------- */
const get = (obj, path, fallback = null) =>
  path.split(".").reduce((cur, key) =>
    cur && cur[key] !== undefined ? cur[key] : fallback, obj);

const formatDateDMY = (iso) => {
  if (!iso) return null;
  try {
    const date = new Date(iso);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  } catch {
    return iso;
  }
};

const tKey = (key, lang) => FIELD_MAP[key]?.[lang] ?? key;

/* ---------- Field Configurations ---------- */
const COMMON_GROUP = [
  { displayId: "displayId", 
    status: { path: "lotId.status", format: (v, _doc, lang) => LOT_STATUS[v]?.[lang] ?? v } 
  },
  {
    farmName: "lotId.farmId.name.{lang}",
    harvestAt: { path: "harvestAt", format: formatDateDMY },
    variety: { path: "lotId.variety", format: (v, _doc, lang) => VARIETY[v]?.[lang] ?? v },
  },
  {
    houseName: "lotId.houseId.name.{lang}",
    sortedAt: { path: "lotId.createdAt", format: formatDateDMY },
    weight_net: {
      path: "lotId.weight.net",
      format: (v, _doc, lang) => v != null ? `${v} ${lang === "th" ? "กก." : "kg"}` : null,
    },
    weight_gross: {
      path: "lotId.weight.gross",
      format: (v, _doc, lang) => v != null ? `${v} ${lang === "th" ? "กก." : "kg"}` : null,
    },
    type: { 
      path: "lotId.type", 
      format: (v, _doc, lang) => PRODUCT_TYPE[v]?.[lang] ?? v
    },
    verify: { 
      path: "lotId.verify", 
      format: (v, _doc, lang) => {
        if (v == null) return lang === "th" ? "ไม่ทราบ" : "Unknown";
        const isYes = !!v;
        return lang === "th" ? (isYes ? "ใช่" : "ไม่ใช่") : (isYes ? "Yes" : "No");
      }
    },
    grade: "lotId.grade",
    pallet: "lotId.palletId",
    import: "lotId.shippingId.importBy",
    export: "lotId.shippingId.exportBy",
    transportId: "lotId.shippingId.displayId",
    containerId: "lotId.shippingId.containerId",
  }
];

const INSPECT_GROUP = [
  {
    inspectStatus: "lotId.shippingId.inspect.status",
    inspectAt: "lotId.shippingId.inspect.inspectAt",
    reason: "lotId.shippingId.inspect.note",
  }
];

const ROLE_MAP = {
  default: COMMON_GROUP,
  ministry: [...COMMON_GROUP, ...INSPECT_GROUP],
  border: [...COMMON_GROUP, ...INSPECT_GROUP],
};

/* ---------- Data Transformer ---------- */
const resolveValue = (desc, doc, lang) => {
  if (typeof desc === "string") {
    return get(doc, desc.replace("{lang}", lang));
  }
  if (typeof desc === "object" && desc !== null) {
    const path = (desc.path || "").replace("{lang}", lang);
    let val = path ? get(doc, path) : undefined;
    if (typeof desc.format === "function") val = desc.format(val, doc, lang);
    return val;
  }
  return null;
};

const transformDurian = (doc, role, lang) => {
  const sections = ROLE_MAP[role] || ROLE_MAP.default;

  const data = sections.map((group) => {
    const result = {};
    for (const [key, descriptor] of Object.entries(group)) {
      let value = resolveValue(descriptor, doc, lang);
      if (value === null || value === undefined || value === "") value = "-";
      result[tKey(key, lang)] = value;
    }
    return result;
  });

  const rawStatus = [
    {
      sortedAt: formatDateDMY(get(doc, "lotId.createdAt")),
      status: get(doc, "lotId.createdAt") ? "completed" : "",
    },
    {
      transportedAt: formatDateDMY(get(doc, "lotId.transportAt")),
      status: get(doc, "lotId.transportAt") ? "completed" : "",
    },
    {
      inspectedAt: formatDateDMY(get(doc, "lotId.shippingId.inspect.inspectAt")),
      status: (() => {
        const inspectAt = get(doc, "lotId.shippingId.inspect.inspectAt");
        const inspectStatus = get(doc, "lotId.shippingId.inspect.status");
        if (inspectAt) {
          if (inspectStatus === "VERIFIED") return "completed";
          if (inspectStatus === "REJECT") return "failed";
        }
        return "";
      })(),
    },
    {
      arrivedAt: formatDateDMY(get(doc, "lotId.shippingId.arrivedAt")),
      status: get(doc, "lotId.shippingId.arrivedAt") ? "completed" : "",
    },
  ];

  return { status: true, data, timeline: rawStatus };
};

/* ---------- Controller ---------- */
export const getDurianById = async (req, res) => {
  try {
    const langQuery = (req.query.lang || "").toLowerCase();
    const lang = ["th", "thai"].includes(langQuery) ? "th" : "en";
    const role = req.user?.role || "default";

    const param = req.params.id;
    let durian;
    let isCondition3 = false;
    let lotForCondition3 = null;

    // Check if param is a valid Mongo ObjectId
    if (mongoose.Types.ObjectId.isValid(param)) {
      durian = await Durian.findById(param)
        .populate({
          path: "lotId",
          populate: [
            { path: "farmId" },
            { path: "houseId" },
            { path: "shippingId" },
          ],
        })
        .lean();
    }
    // If not found by ObjectId or not a valid ObjectId, try displayId
    if (!durian) {
      durian = await Durian.findOne({ displayId: param })
        .populate({
          path: "lotId",
          populate: [
            { path: "farmId" },
            { path: "houseId" },
            { path: "shippingId" },
          ],
        })
        .lean();
    }

    // Condition 3
    if (!durian) {
      let lot;
      if (mongoose.Types.ObjectId.isValid(param)) lot = await Lot.findById(param);
      if (!lot) lot = await Lot.findOne({ displayId: param });
      if (!lot) return res.status(404).json({ status: false, message: "Durian or Lot not found" });
      durian = await Durian.findOne({ lotId: lot._id })
        .populate({
          path: "lotId",
          populate: [
            { path: "farmId" },
            { path: "houseId" },
            { path: "shippingId" },
          ],
        }).lean();
      isCondition3 = true;
      lotForCondition3 = lot;
    }

    let result = transformDurian(durian, role, lang);

    // If Condition 3, override displayId in all data groups with lot.displayId
    if (isCondition3 && lotForCondition3 && result && Array.isArray(result.data)) {
      result.data = result.data.map(group => {
        // Overwrite if any key in group matches (case-insensitive) 'displayId', 'Tracking No.', or 'รหัสติดตาม'
        const displayIdKey = Object.keys(group).find(
          k => k.toLowerCase().includes("displayid") ||
               k.toLowerCase().includes("tracking no") ||
               k.includes("รหัสติดตาม")
        );
        if (displayIdKey) {
          return { ...group, [displayIdKey]: lotForCondition3.displayId };
        }
        return group;
      });
    }

    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: "Server error", error: err.message });
  }
};
