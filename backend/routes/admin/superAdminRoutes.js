const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const { authenticateToken,authorizeRoles } = require('../.././middleware/auth');

const prisma = new PrismaClient();

// College CRUD
router.post('/college', authenticateToken,authorizeRoles('SUPER_ADMIN'), async (req, res) => {
  try {
    const { name, location,email, logo, brandingColors, placementPolicy  } = req.body;
    console.log(req.body);
    const admin = await prisma.user.create({
      data: {
        email: email,
        password: await bcrypt.hash('password123', 10), // Should be changed on first login
        role: 'COLLEGE',
        college: {
          create: {
            name,
            location,
            email: email,
            logo,
            brandingColors,
            placementPolicy
          }
        }
      }
    });

    res.json({ message: 'College created successfully' });
  } catch (error) {
    res.status(500).json({ message: `Server error: ${error}` });
  }
});

// Get all colleges
router.get('/colleges',authenticateToken, authorizeRoles('SUPER_ADMIN'), async (req, res) => {
  try {
    const colleges = await prisma.college.findMany({
          select: {
            email: true
          }
    });
    res.json(colleges);
  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error}` });
  }
});

// Update college
router.put('/colleges/:id', authenticateToken, authorizeRoles('SUPER_ADMIN'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location,email, logo, brandingColors, placementPolicy } = req.body;
    // Convert id to integer
    const collegeId = parseInt(id);
    const college = await prisma.college.update({
      where: { id: collegeId },
      data: { name, location, email, logo, brandingColors, placementPolicy }
    });

    res.json(college);
  } catch (error) {
    res.status(500).json({ message: `Server Error : ${error}` });
  }
});

// Delete college
router.delete('/colleges/:id', authorizeRoles('SUPER_ADMIN'), async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.college.delete({
      where: { id }
    });
    res.json({ message: 'College deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;