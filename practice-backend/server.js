import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello world');
})

const PORT = process.env.port || 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


export default app;
