import express from "express";
import { generateToken } from "../utils/jwt.js";
import { db } from "../server.js";


// Create issue
export const createIssue = async (req, res) => {
  const { title, description, pincode, category, priority } = req.body;

  if (!title || !description || !pincode || !category || !priority) {
    return res
      .status(400)
      .send("All fields are required: title, description, pincode");
  }
  if (!title) {
    return res.status(400).send("Title is required");
  }
  if (!description) {
    return res.status(400).send("Description is required");
  }
  if (!pincode) {
    return res.status(400).send("Pincode is required");
  }

  const result = await db.run(
    `INSERT INTO issues (title, description, pincode, category, priority, status, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      title,
      description,
      pincode,
      category,
      priority,
      "pending",
      new Date().toLocaleString(),
    ],
  );

  res.json({ id: result.lastID });
};

// Read all issues and using filtering
export const getIssues = async (req, res) => {
  const { pincode, status, category, priority } = req.query;

  let query = "SELECT * FROM issues WHERE 1=1";
  const params = [];

  if (pincode) {
    query += " AND pincode = ?";
    params.push(pincode);
  }
  if (status) {
    query += " AND status = ?";
    params.push(status);
  }
  if (category) {
    query += " AND category = ?";
    params.push(category);
  }
  if (priority) {
    query += " AND priority = ?";
    params.push(priority);
  }

  const issues = await db.all(query, params);

  res.json(issues);
};

// Read only specific Issue by id
export const getIssueById = async (req, res) => {
  const id = req.params.id;

  const issue = await db.get("SELECT * FROM issues WHERE id = ?", [id]);

  if (!issue) {
    return res.status(404).json({ message: "not found" });
  }
  res.json(issue);
};

// Delete issue by id
export const deleteIssue = async (req, res) => {
  const id = parseInt(req.params.id);

  const issue = await db.get("SELECT * FROM issues WHERE ID = ?", [id]);
  // issues = issues.filter((c) => c.id !== id); // filter -- to retrive all the elements that matches the condition and return a new array

  if (!issue) {
    return res.status(404).json({ message: "not found" });
  }

  const result = await db.run("DELETE FROM issues WHERE ID = ?", [id]);

  res.json({ message: `Issue with name- ${issue.title} deleted` });
};

// Update Issue by id
export const resolveIssue = async (req, res) => {
  const id = parseInt(req.params.id);
  const { note } = req.body;

  if (!note) {
    return res.status(400).json({ message: "Resolution note required" });
  }

  // const issue = issues.find((c) => c.id === id); // find - to retirve only single or first element that matches the condition
  
  const issue = await db.get("SELECT * FROM issues WHERE id = ?", [id]);

  if (!issue) {
    return res.status(404).json({ message: "Not found" });
  }

  if (issue.status === "resolved") {
    return res.status(400).json({
      message: "Already Resolved",
    });
  }

  await db.run(
    "UPDATE issues SET status = ?, resolutionNote = ?, resolvedAt = ? WHERE id = ?",
    ["resolved", note, new Date().toISOString(), id]
  );

  res.json({ message: "Issue resolved" });
};



// JWT user assigning token
export const login = (req, res) => {
  const { username } = req.body;

  // TEMP logic
  let user;

  if (username === "admin") {
    user = { id: 1, role: "official" };
  } else {
    user = { id: 2, role: "user" };
  }

  const token = generateToken(user);

  res.json({ token });
};
