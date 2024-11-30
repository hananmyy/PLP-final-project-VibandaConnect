const express = require('express');
const router = express.Router();
const { Vendor } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/authMiddleware');

// Middleware to generate JWT token
const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });
};

// Middleware to validate input data
const validateUserData = (type, data) => {
  const { email, password, name, contactNumber, location, shopName } = data;
  if (!email || !password || !name || !contactNumber || !location || (type === 'Vendor' && !shopName)) {
    throw new Error('All fields are required');
  }
};

// Vendor registration
router.post('/register', async (req, res) => {
  const { email, password, name, contactNumber, location, shopName } = req.body;
  try {
    validateUserData('Vendor', req.body);
    const hashedPassword = await bcrypt.hash(password, 10);
    const vendor = await Vendor.create({ email, password: hashedPassword, name, contactNumber, location, shopName });
    res.status(201).json({ token: generateToken(vendor) });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Vendor login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const vendor = await Vendor.findOne({ where: { email } });
    if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    res.status(200).json({ token: generateToken(vendor) });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Fetch all vendors
router.get('/', authenticateToken, async (req, res) => {
  try {
    const vendors = await Vendor.findAll();
    res.status(200).json(vendors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve vendors' });
  }
});

// Fetch a single vendor by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const vendor = await Vendor.findByPk(req.params.id);
    if (!vendor) {
      return res.status(404).json({ error: 'Vendor not found' });
    }
    res.status(200).json(vendor);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve vendor' });
  }
});

// Update a vendor
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const vendor = await Vendor.findByPk(req.params.id);
    if (!vendor) {
      return res.status(404).json({ error: 'Vendor not found' });
    }
    await vendor.update(req.body);
    res.status(200).json(vendor);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update vendor' });
  }
});

// Delete a vendor
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const vendor = await Vendor.findByPk(req.params.id);
    if (!vendor) {
      return res.status(404).json({ error: 'Vendor not found' });
    }
    await vendor.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete vendor' });
  }
});

module.exports = router;
