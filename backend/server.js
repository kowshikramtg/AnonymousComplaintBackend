import express from "express";
import issueRoutes from './routes/issueRoutes.js';
import { connectDB } from './config/db.js';


const app = express();

//middleware to parse JSON bodies
app.use(express.json());

app.use('/api', issueRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

let db;
connectDB().then((database) => {
  db = database;
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { db };
export default app;