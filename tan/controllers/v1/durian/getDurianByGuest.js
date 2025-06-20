import Durian from "../../../models/hot/durianModel.js";
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

/* ---------- Field Configurations ---------- */
const FIELD_ESSENTIAL = [
  {
    farmName: "lotId.farmId.name.{lang}",
    variety: { path: "lotId.variety", format: (v, _doc, lang) => VARIETY[v]?.[lang] ?? v },
    grade: "lotId.grade",
    sortedAt: { path: "lotId.sortedAt", format: formatDateDMY },
    shippingAt: { path: "lotId.shippingId.arrivedAt", format: formatDateDMY }
  }
];

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

const transformDurian = (doc, lang) => {
  const sections = FIELD_ESSENTIAL;

  const data = {};
  sections.forEach((group) => {
    for (const [key, descriptor] of Object.entries(group)) {
      let value = resolveValue(descriptor, doc, lang);
      if (value === null || value === undefined || value === "") value = "-";
      data[key] = value;
    }
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
export const getDurianByGuest = async (req, res) => {
  try {
    const langQuery = (req.query.lang || "").toLowerCase();
    const lang = ["th", "thai"].includes(langQuery) ? "th" : "en";

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

    return res.status(200).json(transformDurian(durian, lang));
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: "Server error", error: err.message });
  }
};
