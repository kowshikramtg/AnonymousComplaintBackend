import express from "express";

let complaints = [];

// headers: {
//   role: "user"
// }

// Create Complaint
export const createComplaint = (req, res) => {
  const { title, description, pincode } = req.body;

  if (!title && !description && !pincode) {
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

  const newComplaint = {
    id: complaints.length + 1,
    title,
    description,
    pincode,
    status: "pending",
    createdAt: new Date().toLocaleString(),
  };
  complaints.push(newComplaint);

  res.send(
    `Complaint received: ${title} - ${description} - ${pincode} - ${newComplaint.createdAt.toLocaleString()}`,
  );
};

// Read all complaints
export const getComplaints = (req, res) => {
  res.send(complaints);
};

// Read only specific complaint by id
export const getComplaintById = (req, res) => {
  const id = parseInt(req.params.id);

  const complaint = complaints.find((c) => c.id === id);

  if (!complaint) {
    return res.status(404).json({ message: "not found" });
  }
  res.json(complaint);
};

// Delete complaint by id
export const deleteComplaint = (req, res) => {
  const id = parseInt(req.params.id);

  const initialLength = complaints.length;

  complaints = complaints.filter((c) => c.id !== id); // filter -- to retrive all the elements that matches the condition and return a new array

  if (complaints.length === initialLength) {
    return res.status(404).json({ message: "not found" });
  }

  res.json({ message: `Complaint with id ${id} deleted` });
};

// Update complaint by id
export const resolveComplaint = (req, res) => {
  const id = parseInt(req.params.id);

  const complaint = complaints.find((c) => c.id === id); // find - to retirve only single or first element that matches the condition

  if (!complaint) {
    return res.status(404).json({ message: "Not found" });
  }

  if (complaint.status === "reolved") {
    return res.status(400).json({
      message: "Cannot resolve a resolved complaint",
    });
  }

  complaint.status = "resolved";

  res.json(complaint);
};
