const express = require('express');
const router = express.Router();
const { Customer } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/authMiddleware');

// Middleware to generate JWT token
const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });
};

// Middleware to validate input data
const validateUserData = (type, data) => {
    const { email, password, name, contactNumber, location } = data;
    if (!email || !password || !name || !contactNumber || !location) {
        throw new Error('All fields are required');
    }
};

// Customer registration
router.post('/register', async (req, res) => {
    const { email, password, name, contactNumber, location } = req.body;
    try {
        validateUserData('Customer', req.body);
        const hashedPassword = await bcrypt.hash(password, 10);
        const customer = await Customer.create({ email, password: hashedPassword, name, contactNumber, location });
        res.status(201).json({ token: generateToken(customer) });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Customer login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const customer = await Customer.findOne({ where: { email } });
        if (!customer || !(await bcrypt.compare(password, customer.password))) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        res.status(200).json({ token: generateToken(customer) });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Fetch all customers
router.get('/', authenticateToken, async (req, res) => {
    try {
        const customers = await Customer.findAll();
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve customers' });
    }
});

// Fetch a single customer by ID
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const customer = await Customer.findByPk(req.params.id);
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve customer' });
    }
});

// Update a customer
router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const customer = await Customer.findByPk(req.params.id);
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        await customer.update(req.body);
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update customer' });
    }
});

// Delete a customer
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const customer = await Customer.findByPk(req.params.id);
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        await customer.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete customer' });
    }
});

module.exports = router;
