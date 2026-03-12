import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layout & Common Components
import MainLayout from "./components/layout/MainLayout";
import ErrorBoundary from "./components/common/ErrorBoundary";
import PageLoader from "./components/common/PageLoader";

// Lazy Loaded Pages
const Home = lazy(() => import("./pages/Home"));
const NewsDetail = lazy(() => import("./pages/NewsDetail"));
const AllNews = lazy(() => import("./pages/AllNews"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const Contact = lazy(() => import("./pages/Contact"));
const SubscriptionPlans = lazy(() => import("./pages/SubscriptionPlans"));
const Signup = lazy(() => import("./pages/Signup"));
const Login = lazy(() => import("./pages/Login"));

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <MainLayout>
          <ToastContainer 
            position="top-right" 
            autoClose={3000} 
            theme="light"
            toastClassName="!rounded-2xl !font-sans !text-xs !font-bold"
          />
          
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Core Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/news/:id" element={<NewsDetail />} />
              <Route path="/news" element={<AllNews />} />
              <Route path="/profile" element={<ProfilePage />} />
              
              <Route path="/contact-us" element={<Contact />} />
              <Route path="/subscriptions" element={<SubscriptionPlans />} />
              
              {/* 404 handled by the layout/routes or custom 404 page */}
            </Routes>
          </Suspense>
        </MainLayout>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
