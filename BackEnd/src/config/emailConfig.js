const nodemailer = require('nodemailer');

// Create and export email configuration
const createEmailTransporter = async (environment) => {
  if (environment === 'production') {
    // Production email configuration
    return nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail', // e.g., 'gmail', 'SendGrid', etc.
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD, // App password if using Gmail
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  } else {
    // Development/test email configuration using Ethereal
    const testAccount = await nodemailer.createTestAccount();
    console.log('Created test email account:', testAccount.user);
    
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  }
};

module.exports = { createEmailTransporter };