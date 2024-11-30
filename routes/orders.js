const express = require('express');
const router = express.Router();
const { Order, Vendor, Rider, Customer } = require('../models');
const authenticateToken = require('../middleware/authMiddleware');

// Middleware to validate input data (if needed)
const validateOrderData = (data) => {
  const { vendorId, customerId, items, status, deliveryDate } = data;
  if (!vendorId || !customerId || !items || !status || !deliveryDate) {
    throw new Error('All fields are required');
  }
};

// Create a new order
router.post('/create', authenticateToken, async (req, res) => {
  try {
    validateOrderData(req.body);
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch all orders
router.get('/', authenticateToken, async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [Vendor, Rider, Customer],
    });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch orders for a specific vendor
router.get('/vendor/:vendorId', authenticateToken, async (req, res) => {
  try {
    const { vendorId } = req.params;
    const orders = await Order.findAll({
      where: { vendorId },
      include: [Customer, Rider],
    });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch a single order by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [Vendor, Rider, Customer],
    });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an order
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    await order.update(req.body);
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an order
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    await order.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
