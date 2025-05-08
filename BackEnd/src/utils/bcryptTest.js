const bcrypt = require('bcryptjs');

async function testBcrypt() {
  console.log("=== BCRYPT TEST UTILITY ===");
  
  const password = 'test123';
  console.log('Original password:', password);
  
  // Generate salt
  const salt = await bcrypt.genSalt(10);
  console.log('Generated salt:', salt);
  
  // Hash password
  const hash = await bcrypt.hash(password, salt);
  console.log('Hashed password:', hash);
  
  // Test correct password
  const isMatch1 = await bcrypt.compare(password, hash);
  console.log('Correct password match:', isMatch1); // Should be true
  
  // Test incorrect password
  const isMatch2 = await bcrypt.compare('wrongpassword', hash);
  console.log('Wrong password match:', isMatch2); // Should be false
  
  // Test with another hashing round
  const hash2 = await bcrypt.hash(password, salt);
  console.log('Second hash of same password:', hash2);
  console.log('Hash1 === Hash2:', hash === hash2);
  
  // Verify the second hash
  const isMatch3 = await bcrypt.compare(password, hash2);
  console.log('Verify second hash:', isMatch3); // Should be true
}

testBcrypt().catch(console.error);