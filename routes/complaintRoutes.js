import express from "express";

import {
  createComplaint,
  getComplaints,
  getComplaintById,
  deleteComplaint,
  updateComplaint,
} from "../controllers/complaintController.js";

const router = express.Router();

router.post("/complaint", createComplaint);
router.get("/complaints", getComplaints);
router.get("/complaints/:id", getComplaintById);
router.delete("/complaint/:id", deleteComplaint);
router.put("/complaint/:id", updateComplaint);

export default router;