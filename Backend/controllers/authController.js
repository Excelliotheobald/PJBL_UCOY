import User from "../models/userModel.js";
import crypto from "crypto";

// KIRIM KODE RESET (FORGOT PASSWORD)
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "Email tidak ditemukan" });

    const resetToken = crypto.randomBytes(20).toString("hex");

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 menit
    await user.save();

    return res.json({
      msg: "Kode reset berhasil dibuat",
      resetToken,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
