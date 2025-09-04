// backend/src/models/user.js
import mongoose from "mongoose";
import bcrypt from "bcrypt.js";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, sparse: true },
    password: { type: String, select: false },
    role: {
      type: String,
      enum: ["citizen", "official", "contractor"],
      default: "citizen",
    },
    phone: String,
    department: String, // for officials
    company: String,    // for contractors
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
