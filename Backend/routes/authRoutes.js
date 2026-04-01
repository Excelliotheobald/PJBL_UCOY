import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const router = express.Router();

/* ======================
        REGISTER
====================== */
router.post("/register", async (req, res) => {
  const { nama, email, password, role } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email sudah digunakan" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      nama,
      email,
      password: hashed,
      role,
    });

    res.json({ message: "Register sukses", user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ======================
          LOGIN
====================== */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Email tidak ditemukan" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Password salah" });

    res.json({ message: "Login sukses", user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ======================
      FORGOT PASSWORD
====================== */
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  if (!email)
    return res.status(400).json({ message: "Email wajib diisi" });

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "Email tidak terdaftar" });

    // Buat token reset
    const resetToken = crypto.randomBytes(20).toString("hex");

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 menit
    await user.save();

    res.json({
      message: "Token reset dibuat",
      resetToken,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
