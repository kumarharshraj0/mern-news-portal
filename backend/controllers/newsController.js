const newsService = require("../services/newsService");
const catchAsync = require("../utils/catchAsync");
const ApiResponse = require("../utils/ApiResponse");
const News = require("../models/News");

/**
 * @desc    Get all news with filtering & pagination
 * @route   GET /api/news
 * @access  Public
 */
const getAllNews = catchAsync(async (req, res) => {
  const { category, q, page, limit } = req.query;
  const result = await newsService.getAllNews({ category, q }, { page, limit });
  res.status(200).json(new ApiResponse(200, result, "News retrieved successfully"));
});

/**
 * @desc    Get news by ID with access control
 * @route   GET /api/news/:id
 * @access  Public/Private
 */
const getNewsById = catchAsync(async (req, res) => {
  const result = await newsService.getNewsById(req.params.id, req.hasFullAccess);
  res.status(200).json(new ApiResponse(200, result, "News details retrieved"));
});

/**
 * @desc    Get unique news categories
 * @route   GET /api/news/categories
 * @access  Public
 */
const getCategories = catchAsync(async (req, res) => {
  const categories = await News.distinct("category");
  res.status(200).json(new ApiResponse(200, categories, "Categories retrieved"));
});

/**
 * @desc    Toggle bookmark status
 * @route   POST /api/news/:id/bookmark
 * @access  Private
 */
const toggleBookmark = catchAsync(async (req, res) => {
  const result = await newsService.toggleBookmark(req.user.id, req.params.id);
  res.status(200).json(new ApiResponse(200, result, result.message));
});

/**
 * @desc    Get all bookmarked news for current user
 * @route   GET /api/news/bookmarks
 * @access  Private
 */
const getBookmarks = catchAsync(async (req, res) => {
  const result = await newsService.getBookmarkedNews(req.user.id);
  res.status(200).json(new ApiResponse(200, result, "Archive retrieved successfully"));
});

module.exports = {
  getAllNews,
  getNewsById,
  getCategories,
  toggleBookmark,
  getBookmarks
};
