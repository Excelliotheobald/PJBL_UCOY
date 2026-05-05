import express from "express";
import rateLimit from "express-rate-limit";
import {
  register,
  login,
  forgotPassword,
  verifyResetToken,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();

const forgotLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Terlalu sering request reset password",
});

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotLimiter, forgotPassword);
router.post("/verify-reset-token", verifyResetToken);
router.post("/reset-password", resetPassword);

export default router;