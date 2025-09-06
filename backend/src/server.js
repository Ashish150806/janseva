// backend/src/server.js
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import errorHandler from "./middleware/errorHandler.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import contractorRoutes from "./routes/contractorRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

// Resolve project root
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env (fallbacks to environment variables in deployment)
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();

// ✅ Connect to MongoDB
connectDB();

// ✅ Allowed origins (can also come from .env as comma-separated list)
const allowedOrigins = (
  process.env.CLIENT_ORIGINS ||
  "http://localhost:5173,https://janseva-gold.vercel.app,https://jansevatest.vercel.app"
).split(",");

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like Postman, curl, mobile apps)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// ✅ Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// ✅ Static uploads
app.use("/uploads", express.static(path.join(__dirname, "../../uploads")));

// ✅ Health check
app.get("/", (_req, res) => res.send("Civic Issue Platform API running ✅"));

// ✅ API Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/reports", reportRoutes);
app.use("/api/v1/contractor", contractorRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/messages", messageRoutes);

// ✅ Error handler (catch-all)
app.use(errorHandler);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 API listening on port ${PORT}`);
  console.log(`📧 Email User: ${process.env.EMAIL_USER || "❌ Not found"}`);
  console.log(
    `🔑 Email Pass: ${process.env.EMAIL_PASS ? "✅ Loaded" : "❌ Missing"}`
  );
  console.log(`🌐 Allowed origins: ${allowedOrigins.join(", ")}`);
});
