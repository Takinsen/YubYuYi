import mongoose from "mongoose";

function generateDisplayId() {
  const chars = "0123456789";
  let id = "";
  for (let i = 0; i < 5; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

const shippingSchema = new mongoose.Schema(
  {
    displayId: { type: String, required: true }, 
    containerId: { type: String, required: true }, 
    status: {
      type: String,
      enum: ["exported", "verified", "rejected"],
      default: "exported",
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

// Compound unique index for the pair
shippingSchema.index({ displayId: 1, containerId: 1 }, { unique: true });

shippingSchema.pre("validate", async function (next) {
  if (!this.isNew || this.displayId) return next();

  let unique = false;
  while (!unique) {
    const candidate = generateDisplayId();
    const exists = await mongoose.models.Shipping.exists({ displayId: candidate, containerId: this.containerId });
    if (!exists) {
      this.displayId = candidate;
      unique = true;
    }
  }
  next();
});

const Shipping = mongoose.model("Shipping", shippingSchema);
export default Shipping;
