/**
 * Validator middleware for Velora Watches API requests
 */

// Helper function to validate email format
const isValidEmail = (email) => {
  return /^\S+@\S+\.\S+$/.test(email);
};

// Validates a product creation/update request
exports.validateProduct = (req, res, next) => {
  const { name, price, description, category } = req.body;
  const errors = [];

  if (!name || name.trim().length < 3) {
    errors.push('Product name must be at least 3 characters long');
  }
  
  if (!price || isNaN(price) || price <= 0) {
    errors.push('Product price must be a positive number');
  }

  if (!description || description.trim().length < 10) {
    errors.push('Product description must be at least 10 characters long');
  }

  if (!category) {
    errors.push('Product category is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }
  
  next();
};

// Validates user registration data
exports.validateRegistration = (req, res, next) => {
  const { name, email, password } = req.body;
  const errors = [];

  if (!name || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }
  
  if (!email || !isValidEmail(email)) {
    errors.push('Valid email is required');
  }

  if (!password || password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }
  
  next();
};

// Validates login data
exports.validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email || !isValidEmail(email)) {
    errors.push('Valid email is required');
  }

  if (!password) {
    errors.push('Password is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }
  
  next();
};

// Validates an order creation request
exports.validateOrder = (req, res, next) => {
  const { items, shipping, payment } = req.body;
  const errors = [];

  // Validate items
  if (!items || !Array.isArray(items) || items.length === 0) {
    errors.push('Order must contain at least one item');
  } else {
    for (const item of items) {
      if (!item.productId) {
        errors.push('Each item must have a product ID');
      }
      if (!item.quantity || item.quantity < 1) {
        errors.push('Each item must have a quantity of at least 1');
      }
    }
  }

  // Validate shipping information
  if (!shipping) {
    errors.push('Shipping information is required');
  } else {
    const { firstName, lastName, email, address, city, postalCode, country } = shipping;
    
    if (!firstName || firstName.trim() === '') {
      errors.push('First name is required');
    }
    
    if (!lastName || lastName.trim() === '') {
      errors.push('Last name is required');
    }
    
    if (!email || !isValidEmail(email)) {
      errors.push('Valid email is required');
    }
    
    if (!address || address.trim() === '') {
      errors.push('Shipping address is required');
    }
    
    if (!city || city.trim() === '') {
      errors.push('City is required');
    }
    
    if (!postalCode || postalCode.trim() === '') {
      errors.push('Postal code is required');
    }
    
    if (!country || country.trim() === '') {
      errors.push('Country is required');
    }
  }

  // Validate payment information
  if (!payment) {
    errors.push('Payment information is required');
  } else {
    const { cardType, lastFour } = payment;
    
    if (!cardType || !['visa', 'mastercard', 'amex', 'discover'].includes(cardType)) {
      errors.push('Valid payment method is required');
    }
    
    if (!lastFour || lastFour.length !== 4 || !/^\d{4}$/.test(lastFour)) {
      errors.push('Valid card information is required');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }
  
  next();
};