import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";

/* ======================
        REGISTER
====================== */
export const register = async (req, res) => {
  const { nama, email, password, role } = req.body;

  try {
    if (!nama || !email || !password || !role) {
      return res.status(400).json({ message: "Semua field wajib diisi" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password minimal 6 karakter" });
    }

    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) {
      return res.status(400).json({ message: "Email sudah digunakan" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      nama,
      email: email.toLowerCase(),
      password: hashed,
      role,
    });

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

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: "Email tidak ditemukan" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Password salah" });
    }

    const { password: _, ...userData } = user.toObject();

    res.json({ message: "Login sukses", user: userData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ======================
      FORGOT PASSWORD (OTP)
====================== */
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email wajib diisi" });
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.json({
        message: "Jika email terdaftar, kode akan dikirim",
      });
    }

    // 🔥 GENERATE OTP
    const resetToken = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("🔥 OTP:", resetToken); // <-- LIAT DI TERMINAL

    // 🔥 HASH TOKEN
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    await user.save();

    // EMAIL
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"UcoyApp" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Kode OTP Reset Password",
      html: `<h1>${resetToken}</h1><p>Berlaku 15 menit</p>`,
    });

    res.json({ message: "Kode dikirim ke email" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ======================
      VERIFY TOKEN
====================== */
export const verifyResetToken = async (req, res) => {
  try {
    const { email, token } = req.body;

    console.log("EMAIL:", email);
    console.log("TOKEN INPUT:", token);

    if (!email || !token) {
      return res.status(400).json({ message: "Email & kode wajib diisi" });
    }

    const cleanToken = String(token).trim();

    const hashedToken = crypto
      .createHash("sha256")
      .update(cleanToken)
      .digest("hex");

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    console.log("DB TOKEN:", user.resetPasswordToken);
    console.log("HASHED TOKEN:", hashedToken);

    // 🔥 VALIDASI MANUAL (LEBIH AMAN)
    if (user.resetPasswordToken !== hashedToken) {
      return res.status(400).json({ message: "Kode salah" });
    }

    if (user.resetPasswordExpire < Date.now()) {
      return res.status(400).json({ message: "Kode expired" });
    }

    res.json({ message: "Kode valid" });

  } catch (err) {
    console.error("VERIFY ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

/* ======================
      RESET PASSWORD
====================== */
export const resetPassword = async (req, res) => {
  try {
    const { email, token, password } = req.body;

    console.log("EMAIL:", email);
    console.log("TOKEN:", token);
    console.log("PASSWORD:", password);

    // 🔥 FIX DI SINI
    if (!email || !token || !password) {
      return res.status(400).json({ message: "Semua field wajib diisi" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password minimal 6 karakter" });
    }

    const cleanToken = String(token).trim();

    const hashedToken = crypto
      .createHash("sha256")
      .update(cleanToken)
      .digest("hex");

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    if (user.resetPasswordToken !== hashedToken) {
      return res.status(400).json({ message: "Kode tidak valid" });
    }

    if (user.resetPasswordExpire < Date.now()) {
      return res.status(400).json({ message: "Kode expired" });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({ message: "Password berhasil direset" });

  } catch (err) {
    console.error("RESET ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};