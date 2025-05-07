const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    console.log('Password change request received');
    console.log('User ID from token:', req.user.userId);
    
    // Get user from database
    const user = await User.findById(req.user.userId);
    if (!user) {
      console.log('User not found with ID:', req.user.userId);
      return res.status(404).json({ msg: 'User not found' });
    }
    
    console.log('User found:', user.email);
    console.log('Stored hashed password:', user.password);
    console.log('Current password provided:', currentPassword);
    
    // Check if current password matches using the comparePassword method
    const isMatch = await user.comparePassword(currentPassword);
    console.log('Password match result:', isMatch);
    
    if (!isMatch) {
      return res.status(400).json({ msg: 'Current password is incorrect' });
    }
    
    // Set new password - the pre-save hook will hash it
    console.log('Setting new password');
    user.password = newPassword;
    
    // Save to database
    await user.save();
    console.log('Password updated successfully');
    
    res.json({ msg: 'Password updated successfully' });
  } catch (err) {
    console.error('Password change error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};