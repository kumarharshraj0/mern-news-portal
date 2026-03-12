const adminService = require("../services/adminService");
const catchAsync = require("../utils/catchAsync");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const mongoose = require("mongoose");

/**
 * @desc    Create new news article
 * @route   POST /api/admin/news
 * @access  Private (Admin)
 */
const createNews = catchAsync(async (req, res) => {
  console.log("AdminController: Received createNews request. Body:", req.body);
  const { title, content, category, author } = req.body;
  if (!title || !content || !category || !author) {
    throw new ApiError(400, "Please fill all required fields");
  }

  const news = await adminService.createNews(req.body, req.file);
  res.status(201).json(new ApiResponse(201, news, "News created successfully"));
});

/**
 * @desc    Update existing news article
 * @route   PUT /api/admin/news/:id
 * @access  Private (Admin)
 */
const updateNews = catchAsync(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid news ID");
  }

  const updatedNews = await adminService.updateNews(id, req.body, req.file);
  res.status(200).json(new ApiResponse(200, updatedNews, "News updated successfully"));
});

/**
 * @desc    Delete news article
 * @route   DELETE /api/admin/news/:id
 * @access  Private (Admin)
 */
const deleteNews = catchAsync(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid news ID");
  }

  await adminService.deleteNews(id);
  res.status(200).json(new ApiResponse(200, null, "News deleted successfully"));
});

/**
 * @desc    Get all news articles (Admin view)
 * @route   GET /api/admin/news
 * @access  Private (Admin)
 */
const getAllNews = catchAsync(async (req, res) => {
  const news = await adminService.getAllNews();
  res.status(200).json(new ApiResponse(200, news, "News feed retrieved"));
});

module.exports = {
  createNews,
  updateNews,
  deleteNews,
  getAllNews
};
