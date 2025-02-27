const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

// Generate JWT Token
const generateToken = (user_id, role) => {
    return jwt.sign({ user_id, role }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// @desc   Register a new user
// @route  POST /api/users/register
// @access Public
const registerUser = async (req, res) => {
    const { email, password, role, business_id, profile_image } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = await User.create({
            email,
            password: hashedPassword,
            role,
            business_id,
            profile_image
        });

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                user_id: newUser.user_id,
                email: newUser.email,
                role: newUser.role
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

// @desc   Login user & get token
// @route  POST /api/users/login
// @access Public
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ message: 'Invalid email or password' });

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

        // Generate token
        const token = generateToken(user.user_id, user.role);

        res.json({
            message: 'Login successful',
            user: {
                user_id: user.user_id,
                email: user.email,
                role: user.role,
                token
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

// @desc   Get user profile
// @route  GET /api/users/profile
// @access Private
const getProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.user_id, {
            attributes: ['user_id', 'email', 'role', 'business_id', 'profile_image']
        });

        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json(user);

    } catch (error) {
        res.status(500).json({ message: 'Error fetching profile', error: error.message });
    }
};

module.exports = { registerUser, loginUser, getProfile };
