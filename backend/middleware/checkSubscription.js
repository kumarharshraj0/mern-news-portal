const User = require("../models/User");

const checkSubscription = async (req, res, next) => {
  req.hasFullAccess = false; // Default

  if (!req.user) {
    return next();
  }

  try {
    const user = await User.findById(req.user.id).lean();
    if (!user) return next();

    const now = new Date();
    const trialPeriod = 7 * 24 * 60 * 60 * 1000;
    const createdAt = new Date(user.createdAt);
    const trialExpiresAt = new Date(createdAt.getTime() + trialPeriod);

    if ((user.isPremium && user.subscriptionExpiresAt && new Date(user.subscriptionExpiresAt) > now) || (now < trialExpiresAt)) {
      req.hasFullAccess = true;
    }

    next();
  } catch (err) {
    next(); 
  }
};

module.exports = checkSubscription;
