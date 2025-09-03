import { Router } from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import { upload, handleUpload } from "../middleware/uploadMiddleware.js";
import { createReport, listReports, getReport, updateStatus } from "../controllers/reportController.js";

const router = Router();

router.get("/", listReports);
router.get("/:id", getReport);

// create report (with optional image)
router.post("/", requireAuth, upload.single("image"), handleUpload, createReport);

// officials can update status
router.patch("/:id/status", requireAuth, updateStatus);

export default router;
