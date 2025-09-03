import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/authMiddleware.js";
import { allReports, assignReport, approveCompletion, analytics } from "../controllers/adminController.js";

const router = Router();

router.use(requireAuth, requireRole("official"));

router.get("/reports", allReports);
router.post("/assign", assignReport);
router.post("/reports/:id/approve", approveCompletion);
router.get("/analytics", analytics);

export default router;
