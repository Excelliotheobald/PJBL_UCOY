import express from "express";
import {
  register,
  login,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();

/* ======================
        DEBUG ROUTE
====================== */
router.get("/cek", (req, res) => {
  res.send("ROUTE HIDUP");
});

/* ======================
        ROUTES
====================== */
router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;