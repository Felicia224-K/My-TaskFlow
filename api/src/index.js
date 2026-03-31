require('dotenv').config();
const express = require('express');


const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('This is the API for the project');
});

const port =  3000;
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${port}`);
});