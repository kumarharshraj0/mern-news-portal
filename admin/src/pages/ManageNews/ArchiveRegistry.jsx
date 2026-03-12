import React from "react";
import { Search, ChevronDown, Layers, ExternalLink, Trash2, ArrowRight } from "lucide-react";

export default React.memo(ArchiveRegistry);

function ArchiveRegistry({ filteredNews, categories, search, setSearch, filterCategory, setFilterCategory, handleEdit, deleteNews, navigate }) {
  return (
    <div className="space-y-12 pt-20 border-t border-border/40">
      <div className="flex flex-col md:flex-row items-end justify-between gap-8">
        <div>
          <h2 className="text-3xl font-bold text-ink tracking-tight mb-2 font-serif">Archive Registry</h2>
          <p className="text-ink/40 text-sm font-medium">Monitoring {filteredNews.length} active nodes across the network.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-ink/20 group-focus-within:text-brand transition-colors" size={16} />
            <input
              type="text"
              placeholder="Query archive..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-slate-50 border-none rounded-2xl pl-14 pr-6 py-4 text-xs font-semibold text-ink placeholder:text-ink/20 w-80 focus:ring-2 focus:ring-brand/20 transition-all"
            />
          </div>
          <div className="relative">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-slate-50 border-none rounded-2xl px-6 py-4 text-xs font-semibold text-ink appearance-none pr-12 focus:ring-2 focus:ring-brand/20 cursor-pointer"
            >
              <option value="">All Verticals</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-5 top-1/2 -translate-y-1/2 text-ink/20 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-32">
        {filteredNews.map((news) => (
          <div
            key={news._id}
            className="group bg-white border border-border/30 rounded-[2.5rem] overflow-hidden hover:shadow-premium transition-all duration-500 flex flex-col"
          >
            <div className="aspect-[16/10] overflow-hidden bg-slate-50 relative">
              {news.media || news.image ? (
                <img src={news.media || news.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-ink/5"><Layers size={48} /></div>
              )}
              <div className="absolute top-4 right-4 flex gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                 <button 
                   onClick={(e) => { e.stopPropagation(); navigate(`/news/${news._id}`); }}
                   className="w-8 h-8 rounded-full bg-white shadow-xl flex items-center justify-center text-ink hover:text-brand"
                 >
                   <ExternalLink size={14} />
                 </button>
                 <button 
                   onClick={(e) => { e.stopPropagation(); deleteNews(news._id); }}
                   className="w-8 h-8 rounded-full bg-white shadow-xl flex items-center justify-center text-red-400 hover:text-red-500"
                 >
                   <Trash2 size={14} />
                 </button>
              </div>
            </div>
            <div className="p-8 flex-1 flex flex-col">
               <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-brand mb-4 block">{news.category}</span>
               <h3 className="text-lg font-bold text-ink leading-tight mb-6 font-serif group-hover:text-brand transition-colors line-clamp-2">{news.title}</h3>
               <div className="mt-auto pt-6 border-t border-border/40 flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-ink/20">
                    {new Date(news.createdAt).toLocaleDateString("en-US", { month: 'short', day: 'numeric' })}
                  </span>
                  <button
                    onClick={() => { handleEdit(news); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className="text-[10px] font-semibold uppercase tracking-widest text-ink hover:text-brand transition-colors flex items-center gap-2"
                  >
                    Refactor Draft <ArrowRight size={12} />
                  </button>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
