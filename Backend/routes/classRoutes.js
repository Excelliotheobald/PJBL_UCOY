import express from "express";
import Class from "../models/classModel.js";

const router = express.Router();

const generateKode = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";

  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
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
// JOIN CLASS (🔥 INI YANG KAMU BUTUH)
// ========================
router.post("/join-class", async (req, res) => {
  try {
    console.log("BODY MASUK:", req.body);

    const { kode, userId, nama } = req.body;

    if (!kode || !userId) {
      return res.status(400).json({
        message: "Kode dan user wajib diisi",
      });
    }

    const kelas = await Class.findOne({
      kode: kode.toUpperCase(),
    });

    if (!kelas) {
      return res.status(404).json({
        message: "Kode kelas tidak ditemukan",
      });
    }

    const sudahMasuk = kelas.siswa.find(
      (s) => s.id.toString() === userId
    );

    if (sudahMasuk) {
      return res.status(400).json({
        message: "Sudah join kelas",
      });
    }

    kelas.siswa.push({
      id: userId,
      nama,
    });

    await kelas.save();

    res.json({
      message: "Berhasil join",
      kelas,
    });

  } catch (err) {
    console.log("ERROR SERVER:", err);

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

// ========================
// DELETE CLASS
// ========================
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