import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    nama: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["guru", "siswa"],
      default: "siswa",
    },

    // 🔥 PROFILE
    gender: {
      type: String,
      default: "Laki-Laki",
    },

    avatar: {
      type: String,
      default: "",
    },

    mapel: {
      type: String,
      default: "",
    },

    nip: {
      type: String,
      default: "",
    },

    tanggal: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    resetPasswordToken: {
      type: String,
    },

    resetPasswordExpire: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);