import express from "express";

import {
  createComplaint,
  getComplaints,
  getComplaintById,
  deleteComplaint,
  resolveComplaint,
} from "../controllers/complaintController.js";
import { checkRole } from "../middlewares/auth.js";

const router = express.Router();

router.post("/complaints",checkRole("user"), createComplaint);
router.get("/complaints", checkRole("official"), getComplaints);
router.get("/complaints/:id", checkRole("official"), getComplaintById);
router.delete("/complaints/:id", checkRole("official"), deleteComplaint);
router.patch("/complaints/:id/resolve", checkRole("official"), resolveComplaint);

export default router;