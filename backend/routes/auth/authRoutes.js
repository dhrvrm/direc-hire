const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
require("dotenv").config();
const http = require("http");
const { neon } = require("@neondatabase/serverless");

const router = express.Router();
const prisma = new PrismaClient({
    datasources: {
        db: {
          url: process.env.DATABASE_URL
        },
      },
});

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Access denied' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
};

router.get('/', (req, res) => {
    res.json({ message: 'Server is Running' });
});

// Sign up route
router.post('/signup', async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Validate role
        if (!['ADMIN', 'STUDENT', 'RECRUITER'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role' });
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                role,
            },
        });

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
});

// Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Check password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ token, role: user.role });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
});

// Logout route
router.post('/logout', authenticateToken, (req, res) => {
    // Since JWT is stateless, we can't invalidate the token on the server side
    // Client should remove the token from their storage
    res.json({ message: 'Logged out successfully' });
});

// Protected route example
router.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Protected route accessed', user: req.user });
});

// Role-based route example
router.get('/admin-only', authenticateToken, (req, res) => {
    if (req.user.role !== 'ADMIN') {
        return res.status(403).json({ message: 'Access denied. Admin only.' });
    }
    res.json({ message: 'Admin route accessed' });
});

module.exports = router;