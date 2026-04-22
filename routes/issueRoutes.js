import express from "express";

import {
  login,
  createIssue,
  getIssues,
  getIssueById,
  deleteIssue,
  resolveIssue,
} from "../controllers/issueController.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/issues", authMiddleware("user"), createIssue);
router.get("/issues", authMiddleware("official"), getIssues);
router.get("/issues/:id", authMiddleware("official"), getIssueById);
router.delete("/issues/:id", authMiddleware("official"), deleteIssue);
router.patch(
  "/issues/:id/resolve",
  authMiddleware("official"),
  resolveIssue,
);

export default router;
