import User from "../../../models/userModel.js";

export const register = async (req, res) => {
  try {

    return res
      .status(200)
      .json({ success: true, message: "Register successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
