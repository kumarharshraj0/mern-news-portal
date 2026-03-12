import { createContext, useContext, useState, useEffect } from "react";
import axios from "../utils/axiosInstance";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    try {
      const res = await axios.post("/auth/login", { email, password });
      const { user: userData, token } = res.data.data;
      localStorage.setItem("token", token);
      setUser(userData);
      return { success: true };
    } catch (err) {
      return { success: false, msg: err.response?.data?.msg || "Login failed" };
    }
  };

  const signup = async (name, email, password, role = "admin") => {
    try {
      const res = await axios.post("/auth/signup", { name, email, password, role });
      const { user: userData, token } = res.data.data;
      localStorage.setItem("token", token);
      setUser(userData);
      return { success: true, msg: res.data.message };
    } catch (err) {
      return { success: false, msg: err.response?.data?.msg || "Signup failed" };
    }
  };

  const logout = async () => {
    try {
      // await axios.post("/auth/logout");
      localStorage.removeItem("token");
      setUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const res = await axios.get("/auth/me");
      setUser(res.data.data);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}



