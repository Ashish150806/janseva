import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/authMiddleware.js";
import { postComment, approveComment, listComments } from "../controllers/messageController.js";

const router = Router();

router.get("/", listComments);
router.post("/", requireAuth, postComment);
router.post("/:id/approve", requireAuth, requireRole("official"), approveComment);

export default router;
