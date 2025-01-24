const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { authorizeRoles } = require('../.././middleware/auth');

const prisma = new PrismaClient();

// Create job
router.post('/jobs', authorizeRoles('RECRUITER'), async (req, res) => {
  try {
    const { title, description } = req.body;
    const recruiter = await prisma.recruiter.findUnique({
      where: { userId: req.user.id }
    });

    const job = await prisma.job.create({
      data: {
        title,
        description,
        recruiterId: recruiter.id
      }
    });

    res.json(job);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get recruiter's jobs
router.get('/jobs', authorizeRoles('RECRUITER'), async (req, res) => {
  try {
    const recruiter = await prisma.recruiter.findUnique({
      where: { userId: req.user.id }
    });

    const jobs = await prisma.job.findMany({
      where: { recruiterId: recruiter.id },
      include: {
        applications: {
          include: {
            student: true
          }
        }
      }
    });

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update application status
router.patch('/applications/:id/status', authorizeRoles('RECRUITER'), async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const recruiter = await prisma.recruiter.findUnique({
      where: { userId: req.user.id }
    });

    const application = await prisma.jobApplication.findFirst({
      where: {
        id,
        job: {
          recruiterId: recruiter.id
        }
      }
    });

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    const updatedApplication = await prisma.jobApplication.update({
      where: { id },
      data: { status }
    });

    // Send email notification to student
    const student = await prisma.student.findUnique({
      where: { id: application.studentId },
      include: {
        user: true
      }
    });

    // TODO: Implement email notification
    // sendStatusUpdateEmail(student.user.email, status);

    res.json(updatedApplication);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});