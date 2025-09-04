import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/user.js";
import { sendOtpEmail } from "../utils/mailer.js";

// 🔑 Helper: Sign JWT
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
      return res.status(400).json({ message: "Name, email and password are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Generate OTP and hash
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpHash = crypto.createHash("sha256").update(otp).digest("hex");
    const otpExpires = Date.now() + 10 * 60 * 1000; // 10 min

    const user = await User.create({
      name,
      email,
      password,
      role,
      otp: otpHash,
      otpExpires,
      isVerified: false,
    });

    // Send OTP email
    await sendOtpEmail(email, otp);

    return res.status(201).json({
      message: "User registered. Please verify OTP sent to your email.",
    });
  } catch (err) {
    next(err);
  }
}

// 📌 Verify OTP
export async function verifyOtp(req, res, next) {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const user = await User.findOne({ email }).select("+otp +otpExpires");
    if (!user) return res.status(404).json({ message: "User not found" });

    const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

    if (user.otp !== otpHash || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    const token = sign(user);
    return res.json({
      message: "OTP verified successfully",
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    next(err);
  }
}

// 📌 Login
export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    if (!user.isVerified) {
      return res.status(403).json({ message: "Please verify your OTP before login" });
    }

    const match = await user.comparePassword(password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = sign(user);
    return res.json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    next(err);
  }
}
