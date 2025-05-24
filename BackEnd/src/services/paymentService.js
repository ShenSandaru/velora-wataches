/**
 * Payment Service for Velora Watches
 * Handles payment processing functionality
 */

class PaymentService {
  /**
   * Process payment for an order
   * @param {Object} paymentDetails - Payment information
   * @returns {Promise<Object>} - Payment result
   */
  async processPayment(paymentDetails) {
    try {
      // In a real application, this would integrate with a payment processor like Stripe
      // For demo purposes, we'll simulate a payment process with validation
      
      const { 
        amount, 
        cardType,
        cardNumber,
        cardholderName,
        expiryDate,
        cvv 
      } = paymentDetails;
      
      // Basic validation
      if (!amount || amount <= 0) {
        throw new Error('Invalid payment amount');
      }
      
      if (!cardType || !['visa', 'mastercard', 'amex', 'discover'].includes(cardType)) {
        throw new Error('Invalid or unsupported card type');
      }

      // For demo purposes, simulate a payment process
      // In production, you would use a secure payment gateway API
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate a transaction ID (in a real app, this would come from payment provider)
      const transactionId = 'tr_' + Math.random().toString(36).substring(2, 15);
      
      // Return successfully processed payment
      return {
        success: true,
        transactionId,
        amount,
        currency: 'USD',
        timestamp: new Date().toISOString(),
        paymentMethod: cardType,
        last4: cardNumber.slice(-4)
      };
    } catch (error) {
      console.error('Payment processing error:', error);
      return {
        success: false,
        error: error.message || 'Payment processing failed'
      };
    }
  }

  /**
   * Validate credit card information
   * @param {Object} cardDetails - Card details to validate
   * @returns {Object} - Validation result
   */
  validateCard(cardDetails) {
    const { cardNumber, expiryDate, cvv } = cardDetails;
    const errors = {};
    
    // Validate card number
    if (!cardNumber || cardNumber.replace(/\s/g, '').length < 13) {
      errors.cardNumber = 'Invalid card number';
    }
    
    // Validate expiry date (MM/YY format)
    if (!expiryDate || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
      errors.expiryDate = 'Invalid expiry date';
    } else {
      // Check if card is expired
      const [month, year] = expiryDate.split('/');
      const expiryDateObj = new Date(2000 + parseInt(year), parseInt(month) - 1, 1);
      if (expiryDateObj < new Date()) {
        errors.expiryDate = 'Card has expired';
      }
    }
    
    // Validate CVV
    if (!cvv || !/^\d{3,4}$/.test(cvv)) {
      errors.cvv = 'Invalid CVV';
    }
    
    return {
      valid: Object.keys(errors).length === 0,
      errors
    };
  }

  /**
   * Detect credit card type based on card number
   * @param {string} cardNumber - Credit card number
   * @returns {string|null} - Card type or null if not detected
   */
  detectCardType(cardNumber) {
    const numberOnly = cardNumber.replace(/\D/g, '');
    
    // Visa: Starts with 4
    if (/^4/.test(numberOnly)) return 'visa';
    
    // Mastercard: Starts with 51-55 or 2221-2720
    if (/^5[1-5]/.test(numberOnly) || /^(222[1-9]|22[3-9]\d|2[3-6]\d{2}|27[0-1]\d|2720)/.test(numberOnly)) {
      return 'mastercard';
    }
    
    // American Express: Starts with 34 or 37
    if (/^3[47]/.test(numberOnly)) return 'amex';
    
    // Discover: Starts with 6011, 622126-622925, 644-649, 65
    if (/^(6011|65|64[4-9]|622(12[6-9]|1[3-9]\d|[2-8]\d{2}|9[01]\d|92[0-5]))/.test(numberOnly)) {
      return 'discover';
    }
    
    return null;
  }
}

module.exports = new PaymentService();