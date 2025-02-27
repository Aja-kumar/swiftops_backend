const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./config/db');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/users', userRoutes);

// Database Connection & Server Start
const PORT = process.env.PORT || 5000;

sequelize.sync() // Sync Sequelize models
    .then(() => {
        console.log('Database connected and synced.');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(error => console.error('Database connection error:', error));
