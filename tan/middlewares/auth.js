import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/cold/userModel.js";

dotenv.config();

export const authenticate = async (req, res, next) => {
  try {
    // Try to get token from cookies first
    let token = req.cookies?.accessToken;

    // Fallback to Authorization header
    if (!token) {
      const authHeader = req.header("Authorization");
      if (authHeader?.startsWith("Bearer "))
        token = authHeader.replace("Bearer ", "");
    }

    // console.log(token ? "Have Token" : "No Token");

    if (!token)
      return res
        .status(401)
        .json({ success: false, message: "Access Denied: No token provided." });

    const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
    if (decoded.purpose !== "access")
      return res
        .status(403)
        .json({ success: false, message: "Invalid token purpose" });

    const user = await User.findById(decoded.id);

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "Access Denied: User not found." });

    req.user = user;
    next();
  } catch (error) {
    console.log("Token authentication error :", error);
    res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user?.role)) {
      return res
        .status(403)
        .json({
          success: false,
          message: `Access Denied: Not authorized to access this route.`,
        });
    }
    next();
  };
};
