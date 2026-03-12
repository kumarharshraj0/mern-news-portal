import { useState, useEffect } from "react";
import NewsTable from "../components/News/NewsTable";
import { useNews } from "../context/NewsContext";
import { 
  Plus, 
  Search, 
  Filter, 
  TrendingUp, 
  Users, 
  Newspaper, 
  Zap, 
  ArrowRight,
  Calendar
} from "lucide-react";

export default function Dashboard() {
  const { newsList, loading, fetchNews } = useNews();
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const filteredNews = (newsList || []).filter((news) =>
    news.title.toLowerCase().includes(search.toLowerCase())
  );

  const stats = [
    { 
      name: "Intelligence Feed", 
      label: "Total Stories",
      value: "1,284", 
      change: "+24 today",
      icon: Newspaper, 
      color: "text-blue-600", 
      bg: "bg-blue-50/50" 
    },
    { 
      name: "Audience Reach", 
      label: "Active Readers",
      value: "48.2k", 
      change: "+12% MoM",
      icon: Users, 
      color: "text-brand", 
      bg: "bg-brand/5" 
    },
    { 
      name: "Engagement Meta", 
      label: "Avg. Read Time",
      value: "4m 12s", 
      change: "Optimized",
      icon: Zap, 
      color: "text-amber-600", 
      bg: "bg-amber-50/50" 
    },
  ];

  return (
    <div className="p-12 space-y-12 max-w-[1600px] mx-auto">
      {/* Top Utility Bar */}
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-ink/30">
            <Calendar size={12} />
            <span>{new Date().toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric' })}</span>
         </div>
         <div className="flex items-center gap-6">
            <div className="flex -space-x-2">
               {[1,2,3].map(i => (
                 <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-ink/40">
                   {String.fromCharCode(64 + i)}
                 </div>
               ))}
            </div>
            <div className="h-4 w-px bg-border/60" />
            <button className="text-[10px] font-semibold uppercase tracking-widest text-brand hover:text-ink transition-colors">System Status: Nominal</button>
         </div>
      </div>

      {/* Hero Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h1 className="text-5xl font-bold text-ink tracking-tight mb-4 font-serif leading-none">Command Overview</h1>
          <p className="text-ink/40 text-lg font-medium">Welcome back, Editor. Your network is currently reaching 4.2k concurrent nodes.</p>
        </div>
        <button className="btn-primary flex items-center gap-3 px-8 py-4 group">
          <Plus size={18} />
          <span>Initialize New Story</span>
          <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </button>
      </div>

      {/* Advanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat) => (
          <div key={stat.name} className="admin-card group hover:border-brand/20 transition-all duration-500 bg-white shadow-premium relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-32 h-32 ${stat.bg} rounded-full blur-3xl opacity-50 -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700`} />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center shadow-sm`}>
                  <stat.icon size={20} />
                </div>
                <span className={`text-[10px] font-semibold uppercase tracking-widest ${stat.color}`}>{stat.change}</span>
              </div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/30 mb-2">{stat.label}</p>
              <h3 className="text-4xl font-bold text-ink leading-none font-serif">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 pt-6">
          <div className="space-y-6 w-full md:w-auto">
            <div className="flex items-center gap-3">
               <div className="w-1.5 h-1.5 bg-brand rounded-full animate-pulse" />
               <h2 className="text-[10px] font-semibold uppercase tracking-[0.4em] text-ink/30">Live Content Stream</h2>
            </div>
            <div className="relative w-full md:w-96 group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/20 group-focus-within:text-brand transition-colors" />
              <input
                type="text"
                placeholder="Search repository..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-field pl-14 py-4 bg-slate-50/50"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="btn-secondary flex items-center gap-3 px-6 py-4">
              <Filter size={16} className="text-brand" />
              <span>Advanced Filter</span>
            </button>
            <div className="h-10 w-px bg-border/60 mx-2" />
            <button className="text-[10px] font-semibold uppercase tracking-widest text-ink/40 hover:text-brand transition-colors">Export Ledger</button>
          </div>
        </div>

        {/* Global News Registry */}
        <div className="admin-card !p-0 overflow-hidden border-none shadow-premium rounded-[2.5rem] bg-white">
          <NewsTable news={filteredNews} />
        </div>
      </div>
    </div>
  );
}

