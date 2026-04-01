const express = require('express');
const {connectDB, sequelize}   = require('./config/database');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();



app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

connectDB();

sequelize.sync({ alter: true })
    .then(() => console.log('Database synchronized'))
    .catch((err) => console.error( err));



app.get('/', (req, res) => {
    res.send('This is the API for the project');
});


app.get('/test', (req, res) => {
    res.json({ message: 'OK' });
});


app.get('/api/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK',
        message: 'API is healthy',
        uptime: process.uptime(),
        timestamp: Date.now()
     });
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


// Catch erreurs async non gérées
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});