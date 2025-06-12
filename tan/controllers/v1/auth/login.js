import User from "../../../models/cold/userModel.js";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if(!username || !password) return res.status(400).json({ success: false , message: "Some field is missing" });

    const user = await User.findOne({ username }).populate("farmId");
    if (!user) return res.status(404).json({ success: false , message: "User not found" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ success: false , message: "Invalid credentials" });

    // 🔐 Generate tokens
    const accessToken = user.getAccessToken();

    // 🍪 Set tokens as HTTP-only cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 1000 * 60 * 60 * 24 * 360,
    });

    return res.status(200).json({ success: true, user, accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false , message: "Server error", error: error.message });
  }
};
