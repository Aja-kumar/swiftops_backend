const userService = require('../services/userService');

// Register a new user
const register = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    const user = await userService.registerUser(email, password, role);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    next(error);
  }
};

// Login user
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await userService.loginUser(email, password);
    res.status(200).json({ message: 'Login successful', user, token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};