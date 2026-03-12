const express = require("express");
const router = express.Router();
const newsController = require("../controllers/newsController");
const { authMiddleware, isAdmin, optionalAuth } = require("../middleware/authCookie");
const checkSubscription = require("../middleware/checkSubscription");


// Public
router.get("/", newsController.getAllNews);
router.get("/categories", newsController.getCategories);
router.get("/bookmarks", authMiddleware, newsController.getBookmarks);
router.get("/:id", optionalAuth, checkSubscription, newsController.getNewsById);
router.post("/:id/bookmark", authMiddleware, newsController.toggleBookmark);

module.exports = router;


