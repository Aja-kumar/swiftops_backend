const express = require('express');
const { registerUser, loginUser, getProfile } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getProfile); // Protected route (Requires JWT)

module.exports = router;
