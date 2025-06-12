import mongoose from "mongoose";

const shippingSchema = new mongoose.Schema(
  {
    displayId: {
      type: String,
      unique: true,
    },
    importBy: { type: String, default: null },
    exportBy: { type: String, default: null },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

const Shipping = mongoose.model("Shipping", shippingSchema);
export default Shipping;
