import express from "express";

let complaints = [];

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
  };
  complaints.push(newComplaint);

  res.send(`Complaint received: ${title} - ${description} - ${pincode}`);
};

// Read all complaints
export const getComplaints = (req, res) => {
  res.send(complaints);
};
export const getComplaintById = (req, res) => {
  const id = parseInt(req.params.id);

  const complaint = complaints.find((c) => c.id === id);

  if(!complaint){
    return res.status(404).json({ message : "not found" });
  }
  res.json(complaint);
};

// Delete complaint by id
export const deleteComplaint = (req, res) => {
  const id = parseInt(req.params.id);

  const initialLength = complaints.length;

  complaints = complaints.filter((c) => c.id !== id);

  if(complaints.length === initialLength.length){
    return res.status(404).json({ message : "not found" });
  }

  res.json({ message: `Complaint with id ${id} deleted` });
};

// Update complaint by id
export const updateComplaint = (req, res) => {
  const id = parseInt(req.params.id);

  const { title, description, pincode } = req.body;

  const complaint = complaints.find((c) => c.id === id);

  if (!complaint) {
    return res.status(404).json({ message: "Not found" });
  }

  complaint.title = title || complaint.title;
  complaint.description = description || complaint.description;
  complaint.pincode = pincode || complaint.pincode;

  res.json(complaint);
};
