import React, { createContext, useContext, useState, useEffect } from "react";
import AdminNewsService from "../services/adminNewsService";

export const NewsContext = createContext();

export function NewsProvider({ children }) {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all news
  const fetchNews = React.useCallback(async () => {
    try {
      setLoading(true);
      const res = await AdminNewsService.getAllNews();
      setNewsList(res.data.data || []);
    } catch (err) {
      console.error("Error fetching news:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch single news by ID
  const fetchNewsById = React.useCallback(async (id) => {
    try {
      setLoading(true);
      const res = await AdminNewsService.getNewsById(id);
      return res.data.data;
    } catch (err) {
      console.error("Error fetching news by ID:", err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Create news
  const createNews = React.useCallback(async (formData) => {
    try {
      const res = await AdminNewsService.createNews(formData);
      const newArticle = res.data.data;
      setNewsList((prev) => [newArticle, ...prev]); 
      return newArticle;
    } catch (err) {
      console.error("Error creating news:", err);
      throw err;
    }
  }, []);

  // Update news
  const updateNews = React.useCallback(async (id, formData) => {
    try {
      const res = await AdminNewsService.updateNews(id, formData);
      const updatedArticle = res.data.data;
      setNewsList((prev) =>
        prev.map((n) => (n._id === id ? updatedArticle : n))
      );
      return updatedArticle;
    } catch (err) {
      console.error("Error updating news:", err);
      throw err;
    }
  }, []);

  // Delete news
  const deleteNews = React.useCallback(async (id) => {
    try {
      await AdminNewsService.deleteNews(id);
      setNewsList((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error("Error deleting news:", err);
    }
  }, []);

  // Automatic fetching removed for performance optimization
  // fetchNews() should be called by individual pages when needed

  return (
    <NewsContext.Provider
      value={{
        newsList,
        loading,
        fetchNews,
        fetchNewsById,
        createNews,
        updateNews,
        deleteNews,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
}

export const useNews = () => useContext(NewsContext);



