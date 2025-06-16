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

    // ➊ Async validator checks the user’s role before the doc is saved
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      validate: {
        validator: async function (value) {
          const user = await mongoose
            .model("User")  
            .findById(value)
            .select("role")
            .lean();

          return !!user && user.role === "transport";
        },
        message: "User role must be 'house' to create a Shipping record.",
      },
    },
    status: {
      type: String,
      enum: ["assigned", "delivered", "cancelled", "failed"],
      default: "assigned"
    },
    pickedAt: { type: Date,   required: true },
    licensePlate: { type: String, required: true },
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
