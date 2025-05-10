const express = require('express');
const router = express.Router();
const { register, login, getUsers } = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, getUsers); 
router.post('/register', register);
router.post('/login', login);

module.exports = router;