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

{
    "title": "Air ",
    "description": "Air pollution",
    "pincode": "559999",
    "category": "air",
    "priority": "Mild"
}