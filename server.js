import express from "express";
import complaintRoutes from './routes/complaintRoutes.js';


const app = express();

//middleware to parse JSON bodies
app.use(express.json());

app.use('/api', complaintRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
