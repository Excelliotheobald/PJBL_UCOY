import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";

/* ======================
        REGISTER
====================== */
export const register = async (req, res) => {
  const { nama, email, password, role } = req.body;

  try {
    // validasi
    if (!nama || !email || !password) {
      return res.status(400).json({ message: "Semua field wajib diisi" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email sudah digunakan" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      nama,
      email,
      password: hashed,
      role,
    });

    // ❌ jangan kirim password
    const { password: _, ...userData } = user.toObject();

    res.json({ message: "Register sukses", user: userData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ======================
          LOGIN
====================== */
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email & password wajib diisi" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email tidak ditemukan" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Password salah" });
    }

    // ❌ jangan kirim password
    const { password: _, ...userData } = user.toObject();

    res.json({ message: "Login sukses", user: userData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ======================
      FORGOT PASSWORD
====================== */
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email wajib diisi" });
  }

  try {
    const user = await User.findOne({ email });

    // 🔐 biar tidak bocorin email
    if (!user) {
      return res.json({
        message: "Jika email terdaftar, link reset akan dikirim",
      });
    }

    // ✅ token di-hash (lebih aman)
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    await user.save();

    console.log(
      `RESET LINK: http://localhost:3000/reset-password/${resetToken}`
    );

    res.json({
      message: "Link reset password telah dikirim",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ======================
      RESET PASSWORD
====================== */
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    if (!password) {
      return res.status(400).json({ message: "Password wajib diisi" });
    }

    // hash token dari URL
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
    });

    if (!user) {
      return res.status(400).json({ message: "Token tidak valid" });
    }

    if (user.resetPasswordExpire < Date.now()) {
      return res.status(400).json({ message: "Token expired" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({ message: "Password berhasil direset" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};