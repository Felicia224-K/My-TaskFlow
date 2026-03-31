const express = require('express');
const {connectDB, sequelize}   = require('./config/database');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const app = express();



app.use(express.json());

app.use('/api/auth', authRoutes);

connectDB();

sequelize.sync({ alter: true })
    .then(() => console.log('Database synchronized'))
    .catch((err) => console.error( err));

app.get('/', (req, res) => {
    res.send('This is the API for the project');
});

const port =  4000;
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${port}`);
});