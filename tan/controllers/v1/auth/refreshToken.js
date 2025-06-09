export const refreshToken = async (req, res) => {
  try {

    return res
      .status(200)
      .json({ success: true, message: "Refresh token successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
