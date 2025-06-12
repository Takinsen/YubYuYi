import User from "../../../models/cold/userModel.js";

export const getMe = async (req, res) => {
  try {

    const user = await User.findById(req.user.id).populate("farmId");

    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
