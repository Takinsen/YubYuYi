import mongoose from "mongoose";

function generateDisplayId() {
  const chars = "0123456789";
  let id = "";
  for (let i = 0; i < 5; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
};

const shippingSchema = new mongoose.Schema(
  {
    displayId: { type: String, unique: true },
    status: {
      type: String,
      enum: ["pending", "waiting", "exporting"],
      default: "pending",
    },
    inspect: {
      status: {
        type: String,
        enum: ["PENDING", "VERIFIED", "REJECT"],
        default: "PENDING",
      },
      note: { type: String, default: null },
      inspectAt: { type: Date, default: null },
    },
    arrivedAt: { type: Date, default: null },
    licensePlate: { type: String, required: true },
    importBy: { type: String, required: true },
    exportBy: { type: String, required: true },   
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
);


shippingSchema.pre("validate", async function (next) {
  if (!this.isNew || this.displayId) return next();

  let unique = false;
  while (!unique) {
    const candidate = generateDisplayId();
    const exists = await mongoose.models.Shipping.exists({ displayId: candidate });
    if (!exists) {
      this.displayId = candidate;
      unique = true;
    }
  }
  next();
});

const Shipping = mongoose.model("Shipping", shippingSchema);
export default Shipping;
