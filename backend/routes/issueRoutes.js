import express from "express";

import {
  login,
  createIssue,
  getIssues,
  getIssueById,
  deleteIssue,
  resolveIssue,
  assignIssue,
  getAssignedIssues,
  getDashboard,
} from "../controllers/issueController.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/issues", authMiddleware("user"), createIssue);
router.get("/issues", authMiddleware("official"), getIssues);
router.get('/issues/assigned', authMiddleware('official'), getAssignedIssues);
router.get("/issues/:id", authMiddleware("official"), getIssueById);
router.delete("/issues/:id", authMiddleware("official"), deleteIssue);
router.patch("/issues/:id/resolve", authMiddleware("official"), resolveIssue);
router.patch("/issues/:id/assign", authMiddleware("official"), assignIssue);
router.get("/dashboard", authMiddleware(), getDashboard);
export default router;
