import mongoose from "mongoose";
import Durian from "../../../models/hot/durianModel.js";

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

/* ---------- Key Translations ---------- */
const KEY_MAP = {
  displayId:      { th: "รหัสติดตาม",            en: "Tracking No." },
  status:         { th: "สถานะ",               en: "Status" },
  farmName:       { th: "ชื่อสวน",              en: "Origin" },
  harvestAt:      { th: "วันที่เก็บเกี่ยว",         en: "Harvested Date" },
  variety:        { th: "พันธุ์ทุเรียน",           en: "Variety" },
  houseName:      { th: "ชื่อล้ง",               en: "Processor" },
  sortedAt:       { th: "วันที่คัดแยก",           en: "Sorted and Packed Date" },
  weight:         { th: "น้ำหนักสุทธิ",           en: "Weight" },
  grade:          { th: "เกรดคุณภาพ",          en: "Grade" },
  pallet:         { th: "หมายเลขพาเลท",        en: "Pallet No." },
  import:         { th: "ผู้นำเข้า",              en: "Importer" },
  export:         { th: "ผู้ส่งออก",              en: "Exporter" },
  inspectedAt:    { th: "วันที่ตรวจสอบ",           en: "Inspected From Thailand Date" },
  shippedAt:      { th: "วันที่ขนส่ง",             en: "Shipped Date" },
  inspectStatus:  { th: "สถานะการตรวจสอบ",     en: "Inspect Status" },
  inspectAt:      { th: "วันที่ขนส่ง",            en: "Inspect Date" },
  reason:         { th: "เหตุผล",               en: "Reason" },
};

const tKey = (key, lang) => KEY_MAP[key]?.[lang] ?? key;

/* ---------- Field Configurations ---------- */
const COMMON_GROUP = [
  { displayId: "displayId", status: "lotId.status" },
  {
    farmName: "lotId.farmId.name.{lang}",
    harvestAt: { path: "harvestAt", format: formatDateDMY },
    variety: "variety",
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
    import: "lotId.importBy",
    export: "lotId.exportBy",
  }
];

const INSPECT_GROUP = [
  {
    inspectStatus: "lotId.inspect.status",
    inspectAt: "lotId.inspect.inspectAt",
    reason: "lotId.inspect.note",
  }
];

const FIELD_MAP = {
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
  const sections = FIELD_MAP[role] || FIELD_MAP.default;

  const data = sections.map((group) => {
    const result = {};
    for (const [key, descriptor] of Object.entries(group)) {
      let value = resolveValue(descriptor, doc, lang);
      if (value === null || value === undefined || value === "") value = "-";
      result[tKey(key, lang)] = value;
    }
    return result;
  });

  return { status: true, data };
};

/* ---------- Controller ---------- */
export const getDurianById = async (req, res) => {
  try {
    const langQuery = (req.query.lang || "").toLowerCase();
    const lang = ["th", "thai"].includes(langQuery) ? "th" : "en";
    const role = req.user?.role || "default";

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
