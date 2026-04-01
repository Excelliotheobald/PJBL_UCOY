import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["guru", "siswa"], default: "siswa" },

  // Tambahan untuk Forgot Password
  resetPasswordToken: { type: String },
  resetPasswordExpire: { type: Date },
});

export default mongoose.model("User", userSchema);
