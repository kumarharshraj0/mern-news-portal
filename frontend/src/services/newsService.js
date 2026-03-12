import axios from "../utils/axiosInstance";

const NewsService = {
  getAllNews: (params) => axios.get("/news", { params }),
  getCategories: () => axios.get("/news/categories"),
  getNewsById: (id) => axios.get(`/news/${id}`),
  toggleBookmark: (id) => axios.post(`/news/${id}/bookmark`),
  getBookmarks: () => axios.get("/news/bookmarks"),
};

export default NewsService;
