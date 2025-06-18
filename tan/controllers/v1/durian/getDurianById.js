import Durian from "../../../models/hot/durianModel.js";
import FIELD_MAP from "../../../constants/field.js";
import LOT_STATUS from "../../../constants/lotStatus.js";
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
    status: { 
      path: "lotId.status", 
      format: (v, _doc, lang) => LOT_STATUS[v]?.[lang] ?? v,
    } 
  },
  {
    farmName: "lotId.farmId.name.{lang}",
    harvestAt: { path: "harvestAt", format: formatDateDMY },
    variety: {
      path: "variety",
      format: (v, _doc, lang) => VARIETY[v]?.[lang] ?? v,
    },
  },
  {
    houseName: "lotId.houseId.name.{lang}",
    sortedAt: { path: "lotId.createdAt", format: formatDateDMY },
    weight: {
      path: "lotId.weight.absolute",
      format: (v, _doc, lang) => v != null ? `${v} ${lang === "th" ? "กก." : "kg"}` : null,
    },
    grade: "lotId.grade",
    pallet: "lotId.palletId",
    import: "lotId.shippingId.importBy",
    export: "lotId.shippingId.exportBy",
  }
];

const INSPECT_GROUP = [
  {
    inspectStatus: "lotId.inspect.status",
    inspectAt: "lotId.inspect.inspectAt",
    reason: "lotId.inspect.note",
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
      inspectedAt: formatDateDMY(get(doc, "lotId.inspect.inspectAt")),
      status: get(doc, "lotId.inspect.inspectAt") ? "completed" : "",
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

    console.log(req.params.id)

    const durian = await Durian.findById(req.params.id)
      .populate({
        path: "lotId",
        populate: [
          { path: "farmId" },
          { path: "houseId" },
          { path: "shippingId" },
        ],
      })
      .lean();

    if (!durian) {
      return res.status(404).json({ status: false, message: "Durian not found" });
    }

    return res.status(200).json(transformDurian(durian, role, lang));
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: "Server error", error: err.message });
  }
};
