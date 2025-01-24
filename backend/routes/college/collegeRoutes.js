const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { authorizeRoles } = require('../.././middleware/auth');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

// Create recruiter
router.post('/recruiters', authorizeRoles('COLLEGE'), async (req, res) => {
  try {
    const { name, company, email } = req.body;
    const collegeAdmin = await prisma.college.findUnique({
      where: { adminId: req.user.id }
    });

    const recruiter = await prisma.user.create({
      data: {
        email,
        password: await bcrypt.hash('tempPassword123', 10),
        role: 'RECRUITER',
        recruiter: {
          create: {
            name,
            company,
            college: {
              connect: { id: collegeAdmin.id }
            }
          }
        }
      }
    });

    res.json({ message: 'Recruiter created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get college recruiters
router.get('/recruiters', authorizeRoles('COLLEGE'), async (req, res) => {
  try {
    const collegeAdmin = await prisma.college.findUnique({
      where: { adminId: req.user.id }
    });

    const recruiters = await prisma.recruiter.findMany({
      where: { collegeId: collegeAdmin.id },
      include: {
        user: {
          select: {
            email: true
          }
        }
      }
    });

    res.json(recruiters);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create student
router.post('/students', authorizeRoles('COLLEGE'), async (req, res) => {
  try {
    const { name, course, email } = req.body;
    const collegeAdmin = await prisma.college.findUnique({
      where: { adminId: req.user.id }
    });

    const student = await prisma.user.create({
      data: {
        email,
        password: await bcrypt.hash('tempPassword123', 10),
        role: 'STUDENT',
        student: {
          create: {
            name,
            course,
            college: {
              connect: { id: collegeAdmin.id }
            }
          }
        }
      }
    });

    res.json({ message: 'Student created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get college students
router.get('/students', authorizeRoles('COLLEGE'), async (req, res) => {
  try {
    const collegeAdmin = await prisma.college.findUnique({
      where: { adminId: req.user.id }
    });

    const students = await prisma.student.findMany({
      where: { collegeId: collegeAdmin.id },
      include: {
        user: {
          select: {
            email: true
          }
        }
      }
    });

    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});