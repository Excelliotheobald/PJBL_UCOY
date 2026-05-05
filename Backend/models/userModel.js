import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    nama: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["guru", "siswa"], default: "siswa" },

    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);