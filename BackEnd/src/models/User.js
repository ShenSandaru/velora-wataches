const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Pre-save hook to hash password before saving
UserSchema.pre('save', async function(next) {
  const user = this;
  
  // Only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    console.log('Password not modified, skipping hash');
    return next();
  }
  
  console.log('Hashing password before save...');
  console.log('Password before hash:', user.password);
  
  try {
    // Generate salt
    const salt = await bcrypt.genSalt(10);
    console.log('Generated salt');
    
    // Hash password with the salt
    user.password = await bcrypt.hash(user.password, salt);
    console.log('Password after hash:', user.password);
    next();
  } catch (error) {
    console.error('Error in password hashing:', error);
    next(error);
  }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    console.log('Compare password method called');
    console.log('Candidate password:', candidatePassword);
    console.log('Stored hashed password:', this.password);
    
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    console.log('bcrypt.compare result:', isMatch);
    return isMatch;
  } catch (error) {
    console.error('Error in compare password:', error);
    throw error;
  }
};

module.exports = mongoose.model('User', UserSchema);