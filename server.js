import express from "express";
import complaintRoutes from './routes/complaintRoutes.js';


const app = express();

//middleware to parse JSON bodies
app.use(express.json());

app.use('/api', complaintRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Create complaint 
let complaints = [];
app.post("/complaint", (req, res) => {
  const { title, description, pincode } = req.body;
  
  if(!title || !description || !pincode){
    return res.status(400).send("All fields are required: title, description, pincode");
  }
  const newComplaint = {id : complaints.length + 1, title, description, pincode};
  complaints.push(newComplaint);

  res.send(`Complaint received: ${title} - ${description} - ${pincode}`);
});

// Read compalint 
app.get('/complaints', (req, res) => {
    res.send(complaints);
})

// Delete complaint 
app.delete('/complaint/:id', (req, res) => {
  const id = parseInt(req.params.id);

  complaints = complaints.filter(c => c.id !== id);
  res.json({message: `Complaint with id ${id} deleted`});
})

// Update complaint 
app.put('/complaint/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description, pincode } = req.body;

  const complaint = complaints.find(c => c.id === id);

  if(!complaint){
    return res.status(404).json({ message : "Not found" });
  }

  complaint.title = title || complaint.title;
  complaint.description = description || complaint.description;
  complaint.pincode = pincode || complaint.pincode;

  res.json(complaint);
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
