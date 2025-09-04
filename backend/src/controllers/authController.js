import jwt from "jsonwebtoken";
import User from "../models/user.js";
import crypto from "crypto";
import { sendOtpEmail } from "../utils/mailer.js"; // helper for sending OTP

function sign(user) {
  return jwt.sign(
    { id: user._id, role: user.role, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

// 📌 Register user and send OTP
export async function register(req, res, next) {
  try {
    const { name, email, password, role = "citizen" } = req.body;
    if (!name || !password || !email) {
      return res.status(400).json({ message: "Name, email and password required" });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already registered" });

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = Date.now() + 10 * 60 * 1000; // 10 min expiry

    const user = await User.create({
      name,
      email,
      password,
      role,
      otp,
      otpExpires,
      isVerified: false
    });

    // Send OTP via email
    await sendOtpEmail(email, otp);

    res.json({ message: "User registered. Please verify OTP sent to your email." });
  } catch (e) {
    next(e);
  }
}

// 📌 Verify OTP and activate account
export async function verifyOtp(req, res, next) {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email }).select("+otp +otpExpires");
    if (!user) return res.status(400).json({ message: "User not found" });

    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    const token = sign(user);
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (e) {
    next(e);
  }
}

// 📌 Login (only after verification)
export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    if (!user.isVerified) {
      return res.status(400).json({ message: "Please verify your OTP before login" });
    }

    const match = await user.comparePassword(password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = sign(user);
    res.json({
      token,
      user: { id: user._id, name: user.name, role: user.role, email: user.email }
    });
  } catch (e) {
    next(e);
  }
}
