const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");

// Auth middleware
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : req.cookies?.token;

  console.log("AuthMiddleware: Token present?", !!token);

  if (!token) throw new ApiError(401, "Unauthorized");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    throw new ApiError(401, "Invalid token");
  }
};

// Optional Auth (Doesn't block if no token)
const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : req.cookies?.token;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
    } catch (err) {
      // Ignore invalid token in optional auth
    }
  }
  next();
};

// Admin check middleware
const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    console.log("IsAdmin: Denied. User role:", req.user?.role);
    return res.status(403).json({ msg: "Access denied. Admins only." });
  }
  console.log("IsAdmin: Access granted for user:", req.user?.email || req.user?.id);
  next();
};

module.exports = { authMiddleware, isAdmin, optionalAuth };


