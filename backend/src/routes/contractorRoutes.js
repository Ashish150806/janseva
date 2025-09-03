import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/authMiddleware.js";
import { upload, handleUpload } from "../middleware/uploadMiddleware.js";
import { myTasks, uploadProof } from "../controllers/contractorController.js";

const router = Router();

router.get("/tasks", requireAuth, requireRole("contractor"), myTasks);
router.post("/tasks/:id/complete", requireAuth, requireRole("contractor"), upload.single("proof"), handleUpload, uploadProof);

export default router;
