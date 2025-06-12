import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../../../models/userModel.js";

export const register = async (req, res) => {
  try {
    const { username , password } = req.body;
    if(!username || !password) return res.status(400).json({ success: false , message: "Some field is missing" });

    // Check if user exists
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(409).json({ success: false , message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(password , salt);

    await User.create(req.body);

    return res
      .status(201)
      .json({ success: true, message: "Register successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
