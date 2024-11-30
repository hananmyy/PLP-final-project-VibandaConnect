const express = require('express');
const router = express.Router();
const { Rider } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/authMiddleware');

// Middleware to generate JWT token
const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });
};

// Middleware to validate input data
const validateUserData = (type, data) => {
  const { email, password, name, contactNumber, location, vehicleType } = data;
  if (!email || !password || !name || !contactNumber || !location || (type === 'Rider' && !vehicleType)) {
    throw new Error('All fields are required');
  }
};

// Rider registration
router.post('/register', async (req, res) => {
  const { email, password, name, contactNumber, vehicleType, location } = req.body;
  try {
    validateUserData('Rider', req.body);
    const hashedPassword = await bcrypt.hash(password, 10);
    const rider = await Rider.create({ email, password: hashedPassword, name, contactNumber, vehicleType, location });
    res.status(201).json({ token: generateToken(rider) });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Rider login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const rider = await Rider.findOne({ where: { email } });
    if (!rider || !(await bcrypt.compare(password, rider.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    res.status(200).json({ token: generateToken(rider) });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Fetch all riders
router.get('/', authenticateToken, async (req, res) => {
  try {
    const riders = await Rider.findAll();
    res.status(200).json(riders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve riders' });
  }
});

// Fetch available riders
router.get('/available', authenticateToken, async (req, res) => {
  try {
    const riders = await Rider.findAll({ where: { available: true } });
    res.status(200).json(riders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve available riders' });
  }
});

// Fetch a single rider by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const rider = await Rider.findByPk(req.params.id);
    if (!rider) {
      return res.status(404).json({ error: 'Rider not found' });
    }
    res.status(200).json(rider);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve rider' });
  }
});

// Update a rider
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const rider = await Rider.findByPk(req.params.id);
    if (!rider) {
      return res.status(404).json({ error: 'Rider not found' });
    }
    await rider.update(req.body);
    res.status(200).json(rider);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update rider' });
  }
});

// Delete a rider
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const rider = await Rider.findByPk(req.params.id);
    if (!rider) {
      return res.status(404).json({ error: 'Rider not found' });
    }
    await rider.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete rider' });
  }
});

module.exports = router;
