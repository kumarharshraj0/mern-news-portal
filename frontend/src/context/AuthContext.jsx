import React, { createContext, useState, useEffect, useCallback, useMemo } from "react";
import axios from "../utils/axiosInstance.jsx";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check current logged-in user on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get("/auth/me");
        setUser(res.data.data || null);
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  // Signup function
  const signup = useCallback(async ({ name, email, password, role }) => {
    try {
      const res = await axios.post("/auth/signup", { name, email, password, role });
      const { user: userData, token } = res.data.data;
      localStorage.setItem("token", token);
      setUser(userData); 
      return res;
    } catch (err) {
      console.error("Signup error:", err.response?.data?.msg || err.message);
      throw err;
    }
  }, []);

  // Login function
  const login = useCallback(async (email, password) => {
    try {
      const res = await axios.post("/auth/login", { email, password });
      const { user: userData, token } = res.data.data;
      localStorage.setItem("token", token);
      setUser(userData);
      return res;
    } catch (err) {
      console.error("Login error:", err.response?.data?.msg || err.message);
      throw err;
    }
  }, []);

  // Logout function
  const logout = useCallback(async () => {
    try {
      localStorage.removeItem("token");
    } catch (err) {
      console.error(err);
    }
    setUser(null);
  }, []);

  const value = useMemo(() => ({
    user,
    loading,
    signup,
    login,
    logout,
    isAdmin: user?.role === "admin"
  }), [user, loading, signup, login, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
