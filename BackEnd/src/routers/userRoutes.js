const express = require('express');
const router = express.Router();
const { changePassword } = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/change-password', auth, changePassword);

module.exports = router;