import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Newspaper, 
  Users, 
  Settings, 
  LogOut, 
  Command,
  ChevronRight,
  ArrowUpRight,
  X
} from "lucide-react";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();

  const menuItems = [
    { name: "Overview", icon: LayoutDashboard, path: "/" },
    { name: "Content Studio", icon: Newspaper, path: "/manage-news" },
    { name: "Intelligence", icon: Users, path: "/subscribers" },
    { name: "System Config", icon: Settings, path: "/settings" },
  ];

  return (
    <aside className={`h-screen w-72 fixed left-0 top-0 z-[100] bg-white border-r border-border/50 flex flex-col shadow-premium transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
      {/* Premium Admin Branding */}
      <div className="h-24 flex items-center justify-between px-10">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-ink text-white rounded-2xl flex items-center justify-center font-serif transition-colors group-hover:bg-brand shadow-lg shadow-ink/10">
            <Command size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-ink tracking-tighter leading-none font-serif">ZIVEK</span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand mt-1">Command</span>
          </div>
        </Link>
        
        {/* Mobile Close Button */}
        <button 
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden p-2 text-ink/30 hover:text-brand transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Structured Navigation */}
      <nav className="flex-1 px-6 py-6 space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-ink/20 px-4 mb-6">Main Operations</p>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`sidebar-link group ${isActive ? "sidebar-link-active" : ""}`}
            >
              <item.icon size={18} className={isActive ? "text-brand" : "text-ink/30 group-hover:text-brand transition-colors"} />
              <span className="flex-1">{item.name}</span>
              {isActive && <div className="w-1.5 h-1.5 bg-brand rounded-full shadow-lg shadow-brand/40" />}
              {!isActive && <ChevronRight size={14} className="text-ink/10 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />}
            </Link>
          );
        })}
      </nav>

      {/* Account Control Center */}
      <div className="p-6 border-t border-border/40">
        <div className="bg-slate-50 border border-border/40 rounded-3xl p-6 mb-6">
           <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-ink text-white flex items-center justify-center font-semibold text-xs">AD</div>
              <div className="flex flex-col">
                <p className="text-xs font-semibold text-ink">Admin Root</p>
                <p className="text-[9px] font-semibold text-ink/30 uppercase tracking-widest">Global Access</p>
              </div>
           </div>
           <button className="w-full flex items-center justify-between text-[10px] font-semibold uppercase tracking-widest text-brand hover:text-ink transition-colors">
              Public Site <ArrowUpRight size={14} />
           </button>
        </div>
        
        <button className="sidebar-link w-full text-red-500 hover:bg-red-50 hover:text-red-600">
          <LogOut size={18} />
          <span>Terminate Session</span>
        </button>
      </div>
    </aside>
  );
}
