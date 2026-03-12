import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AuthContext } from "../../../context/AuthContext";
import { useNews } from "../../../context/NewsContext";

// Modular Sub-components
import DesktopNav from "./DesktopNav";
import SearchTool from "./SearchTool";
import ActionButtons from "./ActionButtons";
import MobileSidebar from "./MobileSidebar";
import Backdrop from "./Backdrop";

export default function Header() {
  const { categories, fetchCategories, fetchBookmarks } = useNews();

  const { user, logout } = useContext(AuthContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); 
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
    if (user) {
      fetchBookmarks();
    }
  }, [categories.length, fetchCategories, fetchBookmarks, user]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 15);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim() === "") return;
    navigate(`/news?q=${encodeURIComponent(searchQuery)}`);
    setIsMenuOpen(false);
  };

  const handleNavClick = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          isScrolled || isMenuOpen ? "glass py-4 shadow-premium" : "bg-transparent py-8"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-8 flex items-center justify-between">
          <div className="flex items-center gap-16">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-ink text-white rounded-[0.8rem] flex items-center justify-center font-serif text-xl font-bold transition-all duration-500 group-hover:bg-brand group-hover:rotate-[10deg] shadow-lg shadow-ink/10">
                  Z
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-brand rounded-full border-2 border-white scale-0 group-hover:scale-100 transition-transform duration-500 delay-100" />
              </div>
              <span className="text-2xl font-bold tracking-tighter text-ink font-serif group-hover:text-brand transition-colors duration-300">ZIVEK</span>
            </Link>

            <DesktopNav 
              categories={categories} 
              location={location} 
              handleNavClick={handleNavClick} 
            />
          </div>

          <div className="flex items-center gap-8">
            <SearchTool 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery} 
              handleSearch={handleSearch} 
            />

            <div className="flex items-center gap-5">
              <ActionButtons 
                user={user} 
                navigate={navigate} 
                logout={logout} 
              />

              {/* Mobile Menu Toggle */}
              <button
                className="lg:hidden w-12 h-12 rounded-[1rem] bg-ink text-white flex items-center justify-center hover:bg-brand transition-all shadow-lg shadow-ink/10 relative overflow-hidden group"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <div className="relative z-10">
                  {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
                </div>
                <div className="absolute inset-0 bg-brand translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <Backdrop isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      
      <MobileSidebar 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen}
        categories={categories}
        location={location}
        handleNavClick={handleNavClick}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        user={user}
        logout={logout}
        navigate={navigate}
      />
    </>
  );
}
