const authService = require("../services/authService");
const catchAsync = require("../utils/catchAsync");
const ApiResponse = require("../utils/ApiResponse");
const User = require("../models/User");

/**
 * @desc    Signup user
 * @route   POST /api/auth/signup
 * @access  Public
 */
const signup = catchAsync(async (req, res) => {
  const result = await authService.signup(req.body);
  res.status(201).json(new ApiResponse(201, result, "Signup successful"));
});

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.login(email, password);
  res.status(200).json(new ApiResponse(200, result, "Login successful"));
});

/**
 * @desc    Logout user
 * @route   GET /api/auth/logout
 * @access  Private
 */
const logout = catchAsync(async (req, res) => {
  res.clearCookie("token");
  res.status(200).json(new ApiResponse(200, null, "Logged out successfully"));
});

/**
 * @desc    Get current user profile
 * @route   GET /api/auth/me
 * @access  Private
 */
const getMe = catchAsync(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password").lean();
  const subscriptionStatus = authService.getSubscriptionStatus(user);

  res.status(200).json(new ApiResponse(200, {
    ...user,
    ...subscriptionStatus
  }, "Profile retrieved"));
});

/**
 * @desc    Update user profile
 * @route   PUT /api/auth/update
 * @access  Private
 */
const updateProfile = catchAsync(async (req, res) => {
  const result = await authService.updateProfile(req.user.id, req.body);
  res.status(200).json(new ApiResponse(200, result, "Profile updated successfully"));
});

module.exports = {
  signup,
  login,
  logout,
  getMe,
  updateProfile
};
