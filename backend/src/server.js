import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import connectDB from "./config/db.js";
import errorHandler from "./middleware/errorHandler.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import contractorRoutes from "./routes/contractorRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

const app = express();

// ✅ Connect to DB
connectDB();

// ✅ Middleware
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "*", credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// ✅ Static file serving (uploads folder)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "../../uploads")));

// ✅ Health check
app.get("/", (_req, res) => res.send("Civic Issue Platform API running ✅"));

// ✅ Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/reports", reportRoutes);
app.use("/api/v1/contractor", contractorRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/messages", messageRoutes);

// ✅ Error handler
app.use(errorHandler);

// ✅ Nodemailer transporter (FIXED: removed double `auth`)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: process.env.SMTP_PORT || 465,
  secure: process.env.SMTP_PORT == 465, // true for 465, false for 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 API listening on port ${PORT}`);
  console.log("📧 Email User:", process.env.EMAIL_USER || "❌ Not found");
  console.log("🔑 Email Pass:", process.env.EMAIL_PASS ? "✅ Loaded" : "❌ Missing");

  // ✅ Verify email server
  transporter.verify((err) => {
    if (err) {
      console.error("❌ Email server connection error:", err);
    } else {
      console.log("✅ Email server is ready to send messages");
    }
  });
});
