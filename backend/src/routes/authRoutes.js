import { Router } from "express";
import * as authController from "../controllers/authController.js";

const router = Router();

// 📝 Register user (sends OTP)
router.post("/register", authController.register);

// 🔑 Verify OTP after registration
router.post("/verify-otp", authController.verifyOtp);

// 🔓 Login (only after verification)
router.post("/login", authController.login);

export default router;
