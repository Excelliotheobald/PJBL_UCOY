// ===== PALING ATAS =====
import dns from 'node:dns';
dns.setServers(['1.1.1.1', '8.8.8.8']);
// =======================

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Terhubung ke MongoDB Atlas"))
  .catch(err => console.error("❌ Gagal konek MongoDB:", err));

// Run Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server berjalan di port ${PORT}`));