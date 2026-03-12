const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ApiError = require("../utils/ApiError");

const createToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

const signup = async (userData) => {
  const { name, email, password, role } = userData;

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new ApiError(400, "User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword, role });
  await user.save();

  const token = createToken(user);
  const { password: pw, ...userWithoutPassword } = user.toObject();

  return { user: userWithoutPassword, token };
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(401, "Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new ApiError(401, "Invalid credentials");

  const token = createToken(user);
  const { password: pw, ...userWithoutPassword } = user.toObject();

  return { user: userWithoutPassword, token };
};

const updateProfile = async (userId, updateData) => {
  const { name, password } = updateData;
  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found");

  if (name) user.name = name;
  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }

  await user.save();
  const { password: pw, ...userWithoutPassword } = user.toObject();
  return userWithoutPassword;
};

const getSubscriptionStatus = (user) => {
  const now = new Date();
  const trialPeriod = 7 * 24 * 60 * 60 * 1000;
  const createdAt = new Date(user.createdAt);
  const trialExpiresAt = new Date(createdAt.getTime() + trialPeriod);

  let hasAccess = false;
  let daysRemaining = 0;
  let statusMessage = "";

  if (user.isPremium && user.subscriptionExpiresAt && new Date(user.subscriptionExpiresAt) > now) {
    hasAccess = true;
    const diff = new Date(user.subscriptionExpiresAt) - now;
    daysRemaining = Math.ceil(diff / (1000 * 60 * 60 * 24));
    statusMessage = `${user.subscriptionPlan.charAt(0).toUpperCase() + user.subscriptionPlan.slice(1)} Plan - ${daysRemaining} days left`;
  } else if (now < trialExpiresAt) {
    hasAccess = true;
    const diff = trialExpiresAt - now;
    daysRemaining = Math.ceil(diff / (1000 * 60 * 60 * 24));
    statusMessage = `Free Trial - ${daysRemaining} days remaining`;
  } else {
    hasAccess = false;
    statusMessage = "Subscription Expired";
  }

  return { hasAccess, daysRemaining, statusMessage, trialExpiresAt };
};

module.exports = {
  signup,
  login,
  updateProfile,
  getSubscriptionStatus
};
