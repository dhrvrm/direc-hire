const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { authorizeRoles } = require('../.././middleware/auth');

const prisma = new PrismaClient();

// Get available jobs
router.get('/jobs', authorizeRoles('STUDENT'), async (req, res) => {
  try {
    const student = await prisma.student.findUnique({
      where: { userId: req.user.id }
    });

    const jobs = await prisma.job.findMany({
      where: {
        recruiter: {
          collegeId: student.collegeId
        }
      },
      include: {
        recruiter: true
      }
    });

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Apply for a job
router.post('/jobs/:jobId/apply', authorizeRoles('STUDENT'), async (req, res) => {
  try {
    const { jobId } = req.params;
    const student = await prisma.student.findUnique({
      where: { userId: req.user.id }
    });

    const existingApplication = await prisma.jobApplication.findFirst({
      where: {
        jobId,
        studentId: student.id
      }
    });

    if (existingApplication) {
      return res.status(400).json({ message: 'Already applied for this job' });
    }

    const application = await prisma.jobApplication.create({
      data: {
        jobId,
        studentId: student.id
      }
    });

    res.json(application);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get student's applications
router.get('/applications', authorizeRoles('STUDENT'), async (req, res) => {
  try {
    const student = await prisma.student.findUnique({
      where: { userId: req.user.id }
    });

    const applications = await prisma.jobApplication.findMany({
      where: { studentId: student.id },
      include: {
        job: {
          include: {
            recruiter: true
          }
        }
      }
    });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});