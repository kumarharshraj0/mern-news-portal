import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import NewsService from "../services/newsService";
import { toast } from "react-toastify";

// 🔹 Create Context
export const NewsContext = createContext();

// 🔹 Provider Component
export function NewsProvider({ children }) {
  const [news, setNews] = useState([]);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1, totalItems: 0 });
  const [categories, setCategories] = useState([]); // Dynamic category list
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch unique categories
  const fetchCategories = useCallback(async () => {
    try {
      const res = await NewsService.getCategories();
      const formatted = (res.data.data || []).map(cat => ({
        name: cat.charAt(0).toUpperCase() + cat.slice(1),
        path: `/news?category=${cat}`
      }));
      setCategories(formatted);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  }, []);

  // Fetch all news
  const fetchAllNews = useCallback(async (params) => {
    setLoading(true);
    try {
      const res = await NewsService.getAllNews(params);
      // Backend now returns { news, currentPage, totalPages, totalItems } wrapped in ApiResponse.data
      const result = res.data.data;
      setNews(result.news || []);
      setPagination({
        currentPage: result.currentPage,
        totalPages: result.totalPages,
        totalItems: result.totalItems
      });
      setError(null);
    } catch (err) {
      console.error("Error fetching all news:", err);
      setError("Failed to fetch news.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch saved bookmarks
  const fetchBookmarks = useCallback(async () => {
    try {
      const res = await NewsService.getBookmarks();
      setBookmarks(res.data.data || []);
    } catch (err) {
        // Silently fail if not logged in
    }
  }, []);

  // Toggle bookmark
  const toggleBookmark = useCallback(async (id) => {
    try {
      const res = await NewsService.toggleBookmark(id);
      setBookmarks(res.data.data.bookmarks);
      toast.success(res.data.message);
      return res.data.data.bookmarks;
    } catch (err) {
      toast.error(err.response?.data?.msg || "Archive operation failed");
      throw err;
    }
  }, []);

  // Fetch by category
  const fetchNewsByCategory = useCallback(async (params) => {
    setLoading(true);
    try {
      // If params is a string (legacy), convert to object
      const queryParams = typeof params === "string" ? { category: params } : params;
      const res = await NewsService.getAllNews(queryParams);
      const result = res.data.data;
      setNews(result.news || []);
      setPagination({
        currentPage: result.currentPage,
        totalPages: result.totalPages,
        totalItems: result.totalItems
      });
      setError(null);
    } catch (err) {
      console.error("Error fetching category news:", err);
      setError("Failed to fetch category news.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch by ID
  const fetchNewsById = useCallback(async (id) => {
    setLoading(true);
    try {
      const res = await NewsService.getNewsById(id);
      setError(null);
      return res.data.data;
    } catch (err) {
      console.error("Error fetching news by ID:", err);
      setError("Failed to fetch news item (maybe unauthorized).");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // No global auto-fetching on mount.
  // Components should call fetch functions as needed.

  const value = useMemo(() => ({
    news,
    pagination,
    categories,
    bookmarks,
    loading,
    error,
    fetchAllNews,
    fetchNewsByCategory,
    fetchNewsById,
    fetchCategories,
    fetchBookmarks,
    toggleBookmark,
  }), [
    news,
    pagination,
    categories,
    bookmarks,
    loading,
    error,
    fetchAllNews,
    fetchNewsByCategory,
    fetchNewsById,
    fetchCategories,
    fetchBookmarks,
    toggleBookmark,
  ]);

  return (
    <NewsContext.Provider value={value}>
      {children}
    </NewsContext.Provider>
  );
}

// 🔹 Custom Hook for consuming context
export const useNews = () => useContext(NewsContext);

// (Optional) default export for provider
export default NewsProvider;


