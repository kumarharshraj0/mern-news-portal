const News = require("../models/News");
const User = require("../models/User");
const ApiError = require("../utils/ApiError");

const getAllNews = async (filter, options) => {
  const { category, q } = filter;
  const { page = 1, limit = 9 } = options;
  const skip = (parseInt(page) - 1) * parseInt(limit);

  let query = {};
  if (category) query.category = category;
  if (q) {
    query.$or = [
      { title: { $regex: q, $options: "i" } },
      { content: { $regex: q, $options: "i" } }
    ];
  }

  const totalItems = await News.countDocuments(query);
  const news = await News.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit))
    .lean();

  return {
    news,
    currentPage: parseInt(page),
    totalPages: Math.ceil(totalItems / limit),
    totalItems
  };
};

const getNewsById = async (id, hasFullAccess) => {
  const news = await News.findById(id).lean();
  if (!news) throw new ApiError(404, "News not found");

  if (!hasFullAccess) {
    const plainContent = news.content.replace(/<[^>]*>/g, "");
    news.content = plainContent.substring(0, 200) + "... [Subscription required]";
    news.isMasked = true;
  }
  news.hasFullAccess = !!hasFullAccess;
  return news;
};

const toggleBookmark = async (userId, newsId) => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found");

  const isBookmarked = user.bookmarks.includes(newsId);
  if (isBookmarked) {
    user.bookmarks = user.bookmarks.filter((id) => id.toString() !== newsId);
  } else {
    user.bookmarks.push(newsId);
  }

  await user.save();
  return {
    bookmarks: user.bookmarks,
    message: isBookmarked ? "Removed from archive" : "Added to archive"
  };
};

const getBookmarkedNews = async (userId) => {
  const user = await User.findById(userId).populate({
    path: "bookmarks",
    populate: { path: "author", select: "name" }
  }).lean();
  if (!user) throw new ApiError(404, "User not found");
  return user.bookmarks;
};

module.exports = {
  getAllNews,
  getNewsById,
  toggleBookmark,
  getBookmarkedNews
};
