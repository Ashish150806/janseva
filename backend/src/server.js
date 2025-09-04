import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import errorHandler from "./middleware/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import contractorRoutes from "./routes/contractorRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

dotenv.config();
const app = express();

connectDB();

app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// static serving of uploaded images (when CLOUD_PROVIDER=local)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "../../uploads")));

app.get("/", (_req, res) => res.send("Civic Issue Platform API running"));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/reports", reportRoutes);
app.use("/api/v1/contractor", contractorRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/messages", messageRoutes);

// central error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API listening on :${PORT}`));
