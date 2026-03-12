const News = require("../models/News");
const cloudinary = require("cloudinary").v2;
const ApiError = require("../utils/ApiError");

const uploadMedia = async (file, media_src) => {
  let mediaUrl = "";
  let mediaType = "";

  if (file) {
    mediaType = file.mimetype.startsWith("video/") ? "video" : "image";
    console.log("AdminService: Starting Cloudinary upload. Resource type:", mediaType);
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "newsMedia", resource_type: mediaType },
        (error, result) => {
          if (error) {
            console.error("AdminService: Cloudinary Error:", error);
            reject(error);
          }
          else {
            console.log("AdminService: Cloudinary Upload Success.");
            resolve(result);
          }
        }
      );
      uploadStream.end(file.buffer);
    });
    mediaUrl = result.secure_url;
  } else if (media_src) {
    mediaUrl = media_src;
    mediaType = media_src.includes(".mp4") || media_src.includes(".mov") ? "video" : "image";
  }

  return { mediaUrl, mediaType };
};

const createNews = async (newsData, file) => {
  const { title, content, category, author, media_src } = newsData;
  const { mediaUrl, mediaType } = await uploadMedia(file, media_src);

  return await News.create({
    title,
    content,
    category,
    author,
    media: mediaUrl,
    media_type: mediaType,
  });
};

const updateNews = async (id, newsData, file) => {
  const { title, content, category, author, media_src } = newsData;
  const { mediaUrl, mediaType } = await uploadMedia(file, media_src);

  const updateData = { title, content, category, author };
  if (mediaUrl) {
    updateData.media = mediaUrl;
    updateData.media_type = mediaType;
  }

  const updatedNews = await News.findByIdAndUpdate(id, updateData, { new: true });
  if (!updatedNews) throw new ApiError(404, "News not found");
  return updatedNews;
};

const deleteNews = async (id) => {
  const deleted = await News.findByIdAndDelete(id);
  if (!deleted) throw new ApiError(404, "News not found");
  return deleted;
};

const getAllNews = async () => {
  return await News.find().sort({ createdAt: -1 }).lean();
};

module.exports = {
  createNews,
  updateNews,
  deleteNews,
  getAllNews
};
