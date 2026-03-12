import axios from "../utils/axiosInstance";

const AdminNewsService = {
  getAllNews: () => axios.get("/admin/news"),
  getNewsById: (id) => axios.get(`/admin/news/${id}`),
  createNews: (formData) => axios.post("/admin/news", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  }),
  updateNews: (id, formData) => axios.put(`/admin/news/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  }),
  deleteNews: (id) => axios.delete(`/admin/news/${id}`),
};

export default AdminNewsService;
