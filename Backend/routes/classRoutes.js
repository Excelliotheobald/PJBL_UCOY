import express from "express";
import Class from "../models/classModel.js";

const router = express.Router();

const generateKode = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  let result = "";

  for (let i = 0; i < 6; i++) {
    result += chars.charAt(
      Math.floor(Math.random() * chars.length)
    );
  }

  return result.slice(0, 3) + "-" + result.slice(3);
};

// ========================
// CREATE CLASS
// ========================
router.post("/create-class", async (req, res) => {
  try {
    const { mapel, namaKelas, guruId } = req.body;

    const kelas = await Class.create({
      mapel,
      namaKelas,
      guruId,
      kode: generateKode(),
      siswa: [],
    });

    res.json(kelas);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// ========================
// GET CLASS BY GURU
// ========================
router.get("/classes/:guruId", async (req, res) => {
  try {
    const kelas = await Class.find({
      guruId: req.params.guruId,
    });

    res.json(kelas);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

router.delete("/delete-class/:id", async (req, res) => {
  try {
    await Class.findByIdAndDelete(req.params.id);

    res.json({
      message: "Kelas berhasil dihapus",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

export default router;