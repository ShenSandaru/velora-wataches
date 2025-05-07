const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log('Signup request received for email:', email);

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      console.log('User already exists with email:', email);
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create new user - the pre-save hook will hash the password
    console.log('Creating new user with plaintext password (will be hashed by hook)');
    user = new User({
      name,
      email,
      password // No need to hash here, the pre-save hook will do it
    });

    await user.save();
    console.log('User saved successfully with hashed password');
    console.log('Stored hashed password:', user.password);

    // Create JWT token
    const payload = {
      userId: user.id,
      role: user.role
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
    console.log('JWT token generated');

    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error('Signup error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for email:', email);

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found with email:', email);
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    
    console.log('User found:', user.email);
    console.log('Stored hashed password:', user.password);
    console.log('Login attempt with plaintext password:', password);

    // Use the comparePassword method from the User model
    const isMatch = await user.comparePassword(password);
    console.log('Password match result:', isMatch);
    
    if (!isMatch) {
      console.log('Password does not match');
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    console.log('Password match successful, generating token');
    
    // Create JWT token
    const payload = {
      userId: user.id,
      role: user.role
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};