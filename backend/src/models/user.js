// backend/src/models/User.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, sparse: true, required: true },
    password: { type: String, select: false, required: true },
    role: {
      type: String,
      enum: ["citizen", "official", "contractor"],
      default: "citizen",
    },
    phone: String,
    department: String, // for officials
    company: String,    // for contractors

    // 🔐 OTP verification fields
    otp: { type: String, select: false },
    otpExpires: { type: Date, select: false },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// 🔐 Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// 🔑 Compare given password with hashed one
UserSchema.methods.comparePassword = async function (candidate) {
  return this.password ? bcrypt.compare(candidate, this.password) : false;
};

export default mongoose.model("User", UserSchema);
