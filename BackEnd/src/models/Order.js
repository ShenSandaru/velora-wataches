/**
 * Order Model for Velora Watches
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false // Allow guest checkout
  },
  items: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true
    }
  }],
  shipping: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    postalCode: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    }
  },
  payment: {
    method: {
      type: String,
      required: true,
      enum: ['visa', 'mastercard', 'amex', 'discover', 'paypal']
    },
    transactionId: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    last4: {
      type: String,
      required: function() {
        return ['visa', 'mastercard', 'amex', 'discover'].includes(this.payment.method);
      }
    }
  },
  subtotal: {
    type: Number,
    required: true
  },
  shippingCost: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  trackingNumber: {
    type: String
  },
  estimatedDelivery: {
    type: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', OrderSchema);