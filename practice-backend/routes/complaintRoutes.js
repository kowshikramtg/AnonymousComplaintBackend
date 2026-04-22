import express from "express";

import {
  login,
  createComplaint,
  getIssues,
  getComplaintById,
  deleteComplaint,
  resolveComplaint,
} from "../controllers/complaintControllers.js";

import { authMiddleware } from "../middlewares/auth.js";
const router = express.Router();

router.post("/login", login);
router.post("/issues", authMiddleware("user"), createComplaint);
router.get("/issues", authMiddleware("official"), getIssues);
router.get("/issues/:id", authMiddleware("official"), getComplaintById);
router.delete("/issues/:id", authMiddleware("official"), deleteComplaint);
router.patch(
  "/issues/:id/resolve",
  authMiddleware("official"),
  resolveComplaint,
);

export default router;
