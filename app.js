const express = require('express');
const dotenv = require("dotenv").config();
const sequelize = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const workflowRoutes = require('./routes/workFlowRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());

// Routes
app.use('/api/auth', userRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

sequelize.sync().then(() => {
    console.log('Database connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }).catch((err) => console.log("DB Connection Error:", err));