const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { createEmailTransporter } = require('../config/emailConfig');

// Memoize the transporter so we don't create a new instance on each request
let transporter = null;

// Subscribe to newsletter and send discount code
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ msg: 'Valid email is required' });
    }
    
    // Create the transporter if it doesn't exist yet
    if (!transporter) {
      // Use NODE_ENV to determine if we're in production
      const environment = process.env.NODE_ENV || 'development';
      transporter = await createEmailTransporter(environment);
    }
    
    // Generate a unique discount code
    const discountCode = crypto.randomBytes(3).toString('hex').toUpperCase();
    
    // Send the welcome email with discount code
    const mailOptions = {
      from: process.env.EMAIL_FROM || '"Velora Watches" <noreply@velorawatches.com>',
      to: email,
      subject: 'Welcome to Velora Watches - Your Exclusive 10% Discount Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee;">
          <h2 style="color: #333; text-align: center; margin-top: 20px;">Welcome to Velora Watches!</h2>
          <p style="color: #666; line-height: 1.6;">Thank you for subscribing to our newsletter. We're excited to have you join the Velora family!</p>
          <p style="color: #666; line-height: 1.6;">As a token of our appreciation, here's your exclusive discount code for 10% off your first purchase:</p>
          <div style="background-color: #f8f8f8; padding: 15px; text-align: center; margin: 20px 0; border-radius: 4px;">
            <h3 style="color: #333; margin: 0; letter-spacing: 2px;">${discountCode}</h3>
          </div>
          <p style="color: #666; line-height: 1.6;">This code is valid for 30 days and can be applied at checkout.</p>
          <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/products" style="display: block; text-align: center; background-color: #ffd700; color: #333; text-decoration: none; padding: 12px 20px; margin: 30px auto; border-radius: 4px; font-weight: bold; width: 200px;">Shop Now</a>
          <p style="color: #666; font-size: 14px; text-align: center; margin-top: 30px;">If you have any questions, feel free to contact our customer support team.</p>
        </div>
      `
    };
    
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    
    // Handle different responses based on environment
    const environment = process.env.NODE_ENV || 'development';
    if (environment === 'development') {
      console.log('Email sent (DEV): %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      
      res.json({ 
        success: true, 
        message: 'Thank you for subscribing! Check your email for your discount code.',
        previewUrl: nodemailer.getTestMessageUrl(info)
      });
    } else {
      console.log('Email sent (PROD): %s', info.messageId);
      
      res.json({ 
        success: true, 
        message: 'Thank you for subscribing! Check your email for your discount code.'
      });
    }
    
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});

module.exports = router;