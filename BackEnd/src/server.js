const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// Configure dotenv to look for .env in the BackEnd directory
dotenv.config({ path: path.resolve(__dirname, '../.env') });
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routers/authRoutes'));
app.use('/api/user', require('./routers/userRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));