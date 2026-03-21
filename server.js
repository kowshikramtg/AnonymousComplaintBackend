import express from "express";

const app = express();

//middleware to parse JSON bodies
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});


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

app.get('/complaints', (req, res) => {
    res.send(complaints);
    
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
