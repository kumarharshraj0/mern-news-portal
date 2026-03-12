const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { authMiddleware, isAdmin } = require("../middleware/authCookie");
const validate = require("../utils/validate");
const authValidation = require("../validations/auth.validation");

// Public routes
router.post("/signup", validate(authValidation.signup), authController.signup);
router.post("/login", validate(authValidation.login), authController.login);
router.post("/logout", authController.logout);

// User routes (logged-in)
router.get("/me", authMiddleware, authController.getMe);
router.put("/update", authMiddleware, authController.updateProfile);

// Admin routes
router.get("/admin/me", authMiddleware, isAdmin, authController.getMe);

module.exports = router;
