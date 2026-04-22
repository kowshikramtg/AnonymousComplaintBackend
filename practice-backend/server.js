import express from 'express';
import complaintRoutes from '../routes/complaintRoutes.js';

const app = express();

app.use(express.json());
app.use('/api', complaintRoutes);


app.get('/', (req, res) => {
    res.send('Hello world');
})

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})

export default app;





{
    "title": "Water leakage",
    "description": "Pipe broken near 1st colney of main road",
    "pincode": "560001",
    "category": "water",
    "priority": "high"
}

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NzY4NjUzNjQsImV4cCI6MTc3Njg2ODk2NH0.uv5fqhycfosR6py11Xf47sLqMmu47hL7_qNswKRgN_g