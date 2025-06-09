import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["standalone", "base", "general"], default: "user" },
    password: { type: String, required: true},
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
