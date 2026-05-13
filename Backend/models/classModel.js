import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
  {
    mapel: {
      type: String,
      required: true,
    },

    namaKelas: {
      type: String,
      required: true,
    },

    kode: {
      type: String,
      required: true,
      unique: true,
    },

    guruId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

 siswa: [
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    nama: {
      type: String,
    },
  },
],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Class", classSchema);