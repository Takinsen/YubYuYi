import mongoose from "mongoose";

function generateDisplayId() {
  const chars = "0123456789";
  let id = "";
  for (let i = 0; i < 8; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id.slice(0, 6) + "-" + id.slice(6);
};

const durianSchema = new mongoose.Schema(
  {
    displayId: { type: String, unique: true, required:true },
    lotId: { type: mongoose.Schema.Types.ObjectId, ref: "Lot", required: true },
    harvestAt: { type: Date, default: null },
    image_url: { type: String, default: null },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

// durianSchema.pre("validate", async function (next) {
//   if (!this.isNew || this.displayId) return next();

//   let unique = false;
//   while (!unique) {
//     const candidate = generateDisplayId();
//     const exists = await mongoose.models.Durian.exists({ displayId: candidate });
//     if (!exists) {
//       this.displayId = candidate;
//       unique = true;
//     }
//   }
//   next();
// });


const Durian = mongoose.model("Durian", durianSchema);
export default Durian;

// data[ { key:value , key:value , ... } , { ... } , { ... } ]