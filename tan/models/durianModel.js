import mongoose from "mongoose";

const durianSchema = new mongoose.Schema(
  {
    farmId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Farm",
      required: true,
    },
    displayId: {
      type: String,
      unique: true,
    },
    variety: {
      type: String,
      enum: ["MONTHONG", "KANYAO", "CHANEE", "PUANGMANEE"],
      required: true,
    },
    status: {
      type: String,
      enum: ["harvest", "sorted", "inspected", "shipped"],
      default: "harvest"
    },
    grade: { type: String, default: null },
    date: {
      harvestedAt: { type: Date, default: null },
      sortedAt: { type: Date, default: null },
      inspectedAt: { type: Date, default: null },
      shippedAt: { type: Date, default: null },
    },
    weight: {
      approximate: { type: Number, default: null },
      absolute: { type: Number, default: null },
    },
    inspect: {
      status: {
        type: String,
        enum: ["PENDING", "VERIFIED", "REJECT"],
        default: "PENDING",
      },
      note: { type: String, default: null },
    },
    trackId: {
      type: String,
      default: null,
    },
    palletId: { type: String, default: null },
    shippingId: { type: String, default: null },
    importBy: { type: String, default: null },
    exportBy: { type: String, default: null },
    image_url: { type: String, default: null },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

function generateDisplayId() {
  const chars = "0123456789";
  let id = "";
  for (let i = 0; i < 8; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id.slice(0, 6) + "-" + id.slice(6);
};

durianSchema.methods.generateTrackId = function () {
  const chars = "ABCDEFGHIJKLMONPQRSTUVWXYZ0123456789";
  let id = "";
  for (let i = 0; i < 10; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id.slice(0, 5) + "-" + id.slice(5);
};

durianSchema.pre("save", async function (next) {
  if (!this.displayId) {
    let newId;
    let exists = true;

    // Loop until we get a unique ID
    while (exists) {
      newId = generateDisplayId();
      const existing = await mongoose.models.Durian.findOne({ displayId: newId });
      if (!existing) exists = false;
    }

    this.displayId = newId;
  }

  next();
});


const Durian = mongoose.model("Durian", durianSchema);
export default Durian;
