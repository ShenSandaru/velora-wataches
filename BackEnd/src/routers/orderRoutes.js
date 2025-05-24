/**
 * Order Routes for Velora Watches
 */

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { isAuthenticated } = require('../middleware/auth');

// Simplified routes for demo purposes
// Create a new order (allows guest checkout)
router.post('/create', (req, res) => {
  try {
    // Simulate a successful order creation
    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order: {
        id: 'order_' + Math.random().toString(36).substring(2, 10),
        total: req.body.payment.amount,
        status: 'processing',
        createdAt: new Date()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message
    });
  }
});

// Get orders for the logged in user
router.get('/my-orders', isAuthenticated, (req, res) => {
  // Return empty array for demo
  res.status(200).json({
    success: true,
    orders: []
  });
});

// Get specific order by ID (must be authenticated)
router.get('/:id', isAuthenticated, (req, res) => {
  res.status(200).json({
    success: true,
    order: {
      id: req.params.id,
      items: [],
      shipping: {},
      payment: {},
      subtotal: 0,
      shippingCost: 0,
      total: 0,
      status: 'processing',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  });
});

module.exports = router;