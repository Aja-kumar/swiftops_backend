const express = require('express');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const router = express.Router();
const { Op } = require('sequelize'); // ✅ Import Op for comparison

// Configure Nodemailer (Use a real email service in production)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS  // Your Gmail password
    }
});

// 📌 Step 1: Forgot Password Route
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    
    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate a secure random reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = new Date(Date.now() + 3600000); // Token valid for 1 hour

        // Save token & expiry to user
        user.reset_token = resetToken;
        user.reset_token_expiry = resetTokenExpiry;
        await user.save();

        // Send reset email
        const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Password Reset Request",
            html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link expires in 1 hour.</p>`
        });

        res.json({ message: "Password reset link sent to your email" });
    } catch (error) {
        res.status(500).json({ message: "Error processing request", error });
    }
});

// 📌 Step 2: Reset Password Route
router.post('/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        const user = await User.findOne({ 
            where: { 
                reset_token: token,
                reset_token_expiry: { [Op.gt]: new Date() } // ✅ Correct Sequelize syntax
            } 
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.reset_token = null;
        user.reset_token_expiry = null;
        await user.save();

        res.json({ message: "Password reset successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error resetting password", error });
    }
});

module.exports = router;
