import { Router } from "express";
import { register, login, verifyOtp } from "../controllers/authController.js";

const router = Router();

// Register user (send OTP)
router.post("/register", register);

// Verify OTP after registration
router.post("/verify-otp", verifyOtp);

// Login with password (only if verified)
router.post("/login", login);

export default router;
