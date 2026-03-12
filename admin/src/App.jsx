import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Sidebar from "./components/Layout/Sidebar";
import Navbar from "./components/Layout/Navbar";
import Dashboard from "./pages/Dashboard";
import ManageNews from "./pages/ManageNews/ManageNews";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NewsDetail from "./pages/NewsDetail";

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <p>Loading...</p>;
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const auth = useAuth();

  if (!auth) return <p>Loading...</p>;

  const { user, loading } = auth;

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <div className="flex min-h-screen bg-page relative">
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-[90] lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="flex-1 lg:pl-72 flex flex-col min-h-screen">
        <Navbar setSidebarOpen={setSidebarOpen} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/manage-news" element={<PrivateRoute><ManageNews /></PrivateRoute>} />
            <Route path="/news/:id" element={<PrivateRoute><NewsDetail /></PrivateRoute>} />
            <Route path="/settings" element={<PrivateRoute><div className="p-10"><h1>⚙️ Settings Page</h1></div></PrivateRoute>} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

