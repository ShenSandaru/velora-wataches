/**
 * Order Controller for Velora Watches
 * Handles order-related operations
 */

const Order = require('../models/Order');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const paymentService = require('../services/paymentService');

/**
 * Create a new order
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.createOrder = async (req, res) => {
  try {
    const { 
      items, 
      shipping, 
      payment 
    } = req.body;
    
    const userId = req.user ? req.user.id : null;
    
    // Validate required fields
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Order must contain items' });
    }
    
    if (!shipping || !payment) {
      return res.status(400).json({ success: false, message: 'Shipping and payment information are required' });
    }
    
    // Calculate order total
    let subtotal = 0;
    
    // Verify product details and calculate total
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ 
          success: false, 
          message: `Product with ID ${item.productId} not found` 
        });
      }
      
      // Use the actual price from the database for security
      subtotal += product.price * item.quantity;
      
      // Check if there's enough stock (if implementing inventory management)
      // if (product.stock < item.quantity) {
      //   return res.status(400).json({
      //     success: false,
      //     message: `Not enough stock for product ${product.name}`
      //   });
      // }
    }
    
    const shippingCost = 15; // Fixed shipping cost for now
    const total = subtotal + shippingCost;
    
    // Process payment
    const paymentResult = await paymentService.processPayment({
      amount: total,
      cardType: payment.cardType,
      cardNumber: payment.cardNumber || payment.lastFour, // Use lastFour if full number not provided
      cardholderName: payment.cardholderName,
      expiryDate: payment.expiryDate,
      cvv: payment.cvv
    });
    
    if (!paymentResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Payment processing failed',
        error: paymentResult.error
      });
    }
    
    // Create the order
    const order = new Order({
      userId,
      items: items.map(item => ({
        product: item.productId,
        quantity: item.quantity,
        price: item.price
      })),
      shipping: {
        name: `${shipping.firstName} ${shipping.lastName}`,
        email: shipping.email,
        address: shipping.address,
        city: shipping.city,
        postalCode: shipping.postalCode,
        country: shipping.country
      },
      payment: {
        method: payment.cardType,
        transactionId: paymentResult.transactionId,
        amount: total,
        last4: paymentResult.last4
      },
      subtotal,
      shippingCost,
      total,
      status: 'processing'
    });
    
    await order.save();
    
    // Clear the user's cart if they are logged in
    if (userId) {
      await Cart.findOneAndUpdate(
        { userId },
        { items: [] },
        { new: true }
      );
    }
    
    // Return the order details
    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order: {
        id: order._id,
        items: order.items,
        total: order.total,
        status: order.status,
        createdAt: order.createdAt
      }
    });
    
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message
    });
  }
};

/**
 * Get all orders for a user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const orders = await Order.find({ userId })
      .sort({ createdAt: -1 })
      .populate('items.product', 'name image price');
    
    res.status(200).json({
      success: true,
      orders: orders.map(order => ({
        id: order._id,
        items: order.items,
        total: order.total,
        status: order.status,
        createdAt: order.createdAt
      }))
    });
    
  } catch (error) {
    console.error('Get user orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: error.message
    });
  }
};

/**
 * Get a single order by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const userId = req.user.id;
    
    const order = await Order.findById(orderId)
      .populate('items.product', 'name image price');
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    // Ensure the user owns this order or is an admin
    if (order.userId.toString() !== userId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this order'
      });
    }
    
    res.status(200).json({
      success: true,
      order: {
        id: order._id,
        items: order.items,
        shipping: order.shipping,
        payment: order.payment,
        subtotal: order.subtotal,
        shippingCost: order.shippingCost,
        total: order.total,
        status: order.status,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt
      }
    });
    
  } catch (error) {
    console.error('Get order by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order',
      error: error.message
    });
  }
};