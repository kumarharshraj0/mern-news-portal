const express = require("express");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middleware/authCookie");
const adminController = require("../controllers/adminController");
const newsController = require("../controllers/newsController");
const validate = require("../utils/validate");
const newsValidation = require("../validations/news.validation");
const multer = require("multer");

// ✅ Apply auth middleware
router.use(authMiddleware, isAdmin);

// ✅ Multer config to accept images or videos
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "video/mp4",
    "video/mov",
    "video/avi",
  ];
  if (allowedTypes.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Only images and videos are allowed"), false);
};

const limits = { fileSize: 50 * 1024 * 1024 }; // 50MB max per file

const upload = multer({ storage, fileFilter, limits });

// ✅ Routes
// 'media' field can be image or video
router.post("/news", upload.single("media"), validate(newsValidation.createNews), adminController.createNews);
router.put("/news/:id", upload.single("media"), validate(newsValidation.updateNews), adminController.updateNews);
router.delete("/news/:id", adminController.deleteNews);
router.get("/news", adminController.getAllNews);
router.get("/news/:id", newsController.getNewsById);

module.exports = router;


