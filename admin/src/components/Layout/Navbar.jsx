import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { Bell, Search, User, Menu } from "lucide-react";

export default function Navbar({ setSidebarOpen }) {
  const { user, logout } = useAuth();

  return (
    <header className="h-20 bg-white border-b border-border/50 flex items-center justify-between px-6 md:px-10 sticky top-0 z-40 transition-all">
      <div className="flex items-center gap-4 flex-1">
        {/* Mobile Hamburger Toggle */}
        <button 
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 text-ink/40 hover:text-brand transition-colors"
        >
          <Menu size={24} />
        </button>

        <div className="relative w-64 group hidden md:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/20 group-focus-within:text-brand transition-colors" />
          <input 
            type="text" 
            placeholder="Search archive..." 
            className="w-full bg-slate-50 border border-transparent pl-12 pr-6 py-3 rounded-2xl text-xs font-semibold outline-none focus:bg-white focus:border-brand/20 focus:ring-4 focus:ring-brand/5 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-ink-faint hover:text-ink transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-brand rounded-full border-2 border-white"></span>
        </button>

        <div className="h-8 w-px bg-border"></div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden md:block">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-ink leading-tight">{user?.name}</p>
            <p className="text-[9px] font-semibold uppercase tracking-widest text-ink-faint leading-tight">Administrator</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center border border-border overflow-hidden">
            <User className="w-5 h-5 text-ink-faint" />
          </div>
        </div>
      </div>
    </header>
  );
}
