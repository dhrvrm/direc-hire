// backend/server.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Import routes
const authRoutes = require('./routes/auth/authRoutes');
// const collegeRoutes = require('./routes/college');
// const studentRoutes = require('./routes/student');
// const recruiterRoutes = require('./routes/recruiter');
// const jobRoutes = require('./routes/job');

// Use routes
app.use('/api/auth', authRoutes);
// app.use('/api/colleges', collegeRoutes);
// app.use('/api/students', studentRoutes);
// app.use('/api/recruiters', recruiterRoutes);
// app.use('/api/jobs', jobRoutes);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
