import React from "react";
import { Link } from "react-router-dom";
import { X, ChevronRight, Command, User } from "lucide-react";

export default function MobileSidebar({ isMenuOpen, setIsMenuOpen, categories, location, handleNavClick, searchQuery, setSearchQuery, handleSearch, user, logout, navigate }) {
  return (
    <div 
      className={`fixed inset-y-0 left-0 w-[300px] z-[210] lg:hidden transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] shadow-[0_0_50px_rgba(0,0,0,0.15)] flex flex-col ${
        isMenuOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full bg-white">
        {/* Mobile Sidebar Branding */}
        <div className="h-24 flex items-center justify-between px-8 border-b border-border/40">
          <Link to="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
            <div className="w-8 h-8 bg-ink text-white rounded-[0.5rem] flex items-center justify-center font-serif text-lg font-bold">Z</div>
            <span className="text-xl font-bold tracking-tighter text-ink font-serif">ZIVEK</span>
          </Link>
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="p-2 text-ink/30 hover:text-brand transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pt-8 px-6 pb-12">
          <div className="space-y-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-ink/20 px-4 mb-6">Narrative Hub</p>
            {categories.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleNavClick(item.path)}
                className={`w-full flex items-center justify-between px-4 py-4 rounded-2xl text-sm font-semibold transition-all group ${
                  location.pathname + location.search === item.path 
                  ? "bg-brand/5 text-brand shadow-sm shadow-brand/5" 
                  : "text-ink/60 hover:text-ink hover:bg-ink/5"
                }`}
              >
                <span className="group-hover:translate-x-1 transition-transform">{item.name}</span>
                <ChevronRight size={14} className={`transition-all ${location.pathname + location.search === item.path ? "opacity-100" : "opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0"}`} />
              </button>
            ))}
          </div>

          {/* Mobile Search Tool */}
          <div className="mt-12 space-y-4 px-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-ink/20 mb-4 ml-2">Intelligence Query</p>
            <div className="relative group">
              <Command className="absolute left-5 top-1/2 -translate-y-1/2 text-ink/20 group-focus-within:text-brand transition-colors" size={16} />
              <input
                type="text"
                placeholder="Archive query..."
                className="w-full bg-ink/5 border-none pl-12 pr-6 py-4 rounded-2xl text-xs font-semibold outline-none focus:bg-white focus:ring-4 focus:ring-brand/5 transition-all transition-all duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
          </div>
        </div>

        {/* Mobile Sidebar Footer */}
        <div className="p-6 border-t border-border/40 space-y-4">
          {!user ? (
             <div className="grid grid-cols-2 gap-4">
                <button
                  className="py-4 bg-ink text-white rounded-2xl font-semibold uppercase tracking-widest text-[9px] hover:bg-brand transition-all active:scale-[0.98] shadow-lg shadow-ink/10"
                  onClick={() => { navigate("/subscriptions"); setIsMenuOpen(false); }}
                >
                  Premium
                </button>
                <button
                  className="py-4 bg-slate-100 text-ink rounded-2xl font-semibold uppercase tracking-widest text-[9px] hover:bg-slate-200 transition-all active:scale-[0.98]"
                  onClick={() => { navigate("/login"); setIsMenuOpen(false); }}
                >
                  Login
                </button>
             </div>
          ) : (
             <div className="space-y-3">
                <button
                  className="w-full py-4 bg-brand/5 text-brand rounded-2xl font-semibold uppercase tracking-widest text-[9px] flex items-center justify-center gap-3 hover:bg-brand/10 transition-all"
                  onClick={() => { navigate("/profile"); setIsMenuOpen(false); }}
                >
                  <User size={14} /> Intelligence Hub
                </button>
                <button
                  className="w-full py-4 text-red-500 rounded-2xl font-semibold uppercase tracking-widest text-[9px] hover:bg-red-50 transition-all"
                  onClick={() => { logout(); setIsMenuOpen(false); navigate("/login"); }}
                >
                  Terminate Session
                </button>
             </div>
          )}
          <p className="text-center text-[8px] font-bold text-ink/20 uppercase tracking-[0.4em] mt-2 italic">&copy; ZIVEK INTEL ARCHIVE</p>
        </div>
      </div>
    </div>
  );
}
