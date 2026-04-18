import express from "express";

import {
  login,
  createComplaint,
  getComplaints,
  getComplaintById,
  deleteComplaint,
  resolveComplaint,
} from "../controllers/complaintController.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/complaints",authMiddleware("user"), createComplaint);
router.get("/complaints", authMiddleware("official"), getComplaints);
router.get("/complaints/:id", authMiddleware("official"), getComplaintById);
router.delete("/complaints/:id", authMiddleware("official"), deleteComplaint);
router.patch("/complaints/:id/resolve", authMiddleware("official"), resolveComplaint);

export default router;