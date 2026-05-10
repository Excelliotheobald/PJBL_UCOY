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
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Class", classSchema);