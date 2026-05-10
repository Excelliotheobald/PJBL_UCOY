import dns from "node:dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import userRoutes from "./routes/authRoutes.js";
import classRoutes from "./routes/classRoutes.js";
dotenv.config();

const app = express();

// 🔐 limiter global
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Terlalu banyak request, coba lagi nanti",
});

// 🔥 MIDDLEWARE (URUTAN PENTING)
app.use(helmet()); // ✅ security header
app.use(cors());
app.use(express.json({ limit: "10kb" })); // ✅ batasi body
app.use(limiter); // ✅ rate limit

// 🔥 ROUTES
app.use("/api/users", userRoutes);
app.use("/api/class", classRoutes);

// DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Terhubung ke MongoDB Atlas"))
  .catch((err) => {
    console.error("❌ Gagal konek MongoDB:", err);
    process.exit(1);
  });

// server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`🚀 Server berjalan di port ${PORT}`)
);