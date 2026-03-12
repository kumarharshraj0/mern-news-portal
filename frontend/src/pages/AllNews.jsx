import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { NewsContext } from "../context/NewsContext";
import { Clock, User, ArrowRight, Layers, ChevronLeft, ChevronRight, Bookmark } from "lucide-react";
import Skeleton from "../components/common/Skeleton";
import SEO from "../components/common/SEO";

const AllNews = () => {
  const { news, fetchAllNews, loading, toggleBookmark, bookmarks, pagination } = useContext(NewsContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const searchQuery = searchParams.get("q");

  const [page, setPage] = useState(1);
  const itemsPerPage = 9; // Match backend default limit

  useEffect(() => {
    window.scrollTo(0, 0);
    const params = { page, limit: itemsPerPage };
    if (category) params.category = category;
    if (searchQuery) params.q = searchQuery;
    fetchAllNews(params);
  }, [category, searchQuery, page, fetchAllNews]);

  // Reset to page 1 on search/category change
  useEffect(() => {
    setPage(1);
  }, [category, searchQuery]);

  if (loading) {
    return (
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-40 pb-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 border-b border-border/40 pb-12">
          <div className="max-w-2xl space-y-6">
            <Skeleton className="w-32 h-4" />
            <Skeleton className="w-96 h-16" />
            <Skeleton className="w-full h-4" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="space-y-8">
              <Skeleton className="aspect-[16/10] rounded-[2rem]" />
              <div className="p-4 space-y-4">
                <div className="flex justify-between">
                  <Skeleton className="w-20 h-3" />
                  <Skeleton className="w-20 h-3" />
                </div>
                <Skeleton className="w-full h-10" />
                <Skeleton className="w-full h-20" />
                <div className="pt-8 border-t border-border/40 flex justify-between items-center">
                  <Skeleton className="w-24 h-4 circle" />
                  <Skeleton className="w-8 h-8 circle" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <>
      <SEO 
        title={category ? `${category} | News Archive` : searchQuery ? `Search: ${searchQuery}` : "Global News Archive"}
        description={`Explore the latest ${category || ''} news and investigative reports from around the world.`}
      />
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-40 pb-32">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 border-b border-border/40 pb-12">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
             <div className="w-1.5 h-1.5 bg-brand rounded-full" />
             <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-ink/30">
               {category ? `${category} Archive` : searchQuery ? "Search Results" : "Complete Archive"}
             </span>
          </div>
          <h1 className="text-6xl font-bold text-ink tracking-tight mb-4 font-serif capitalize">
            {category || (searchQuery ? `"${searchQuery}"` : "The Global Narrative")}
          </h1>
          <p className="text-ink/40 text-lg font-medium">
            {category 
              ? `Curated intelligence and investigative reports within the ${category} sector.` 
              : searchQuery 
                ? `Archival records matching your query within the ZIVEK intelligence network.`
                : "An exhaustive record of every major development documented across the ZIVEK network."}
          </p>
        </div>
        <div className="hidden md:block">
           <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/20">Total Records: {pagination.totalItems}</div>
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-24">
        {news.map((item) => (
          <div
            key={item._id}
            className="news-card flex flex-col h-full fade-in"
            onClick={() => navigate(`/news/${item._id}`)}
          >
             <div className="aspect-[16/10] overflow-hidden bg-slate-100 relative group">
                {item.media || item.image ? (
                  <img 
                    src={item.media || item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-ink/5"><Layers size={48} /></div>
                )}
                <div className="absolute inset-0 bg-ink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              <div className="p-10 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-brand">{item.category}</span>
                  <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-widest text-ink/20">
                    <Clock size={10} />
                    <span>{new Date(item.createdAt).toLocaleDateString("en-US", { month: 'short', day: 'numeric' })}</span>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-ink leading-tight mb-6 font-serif group-hover:text-brand transition-colors line-clamp-3">
                  {item.title}
                </h3>
                
                <p className="text-ink/50 text-[15px] leading-relaxed mb-8 line-clamp-3">
                  {item.content?.replace(/<[^>]*>/g, "").substring(0, 120)}...
                </p>

                <div className="mt-auto pt-8 border-t border-border/40 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-ink/30">
                      {item.author?.name?.charAt(0) || "U"}
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-ink/40">{item.author?.name || "Anonymous"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(item._id);
                      }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        bookmarks.includes(item._id) 
                        ? "bg-brand/10 text-brand" 
                        : "bg-slate-50 text-ink/20 hover:text-brand"
                      }`}
                    >
                      <Bookmark size={14} fill={bookmarks.includes(item._id) ? "currentColor" : "none"} />
                    </button>
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-ink group-hover:bg-brand group-hover:text-white transition-all">
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </div>
          </div>
        ))}
      </div>

      {/* Premium Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-ink hover:bg-ink hover:text-white disabled:opacity-20 transition-all active:scale-[0.95]"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: pagination.totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setPage(i + 1)}
                className={`w-12 h-12 rounded-full font-bold text-[10px] tracking-widest transition-all active:scale-[0.95] ${
                  page === i + 1
                    ? "bg-ink text-white shadow-xl shadow-ink/20"
                    : "bg-slate-50 text-ink/40 hover:bg-slate-100"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, pagination.totalPages))}
            disabled={page === pagination.totalPages}
            className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-ink hover:bg-ink hover:text-white disabled:opacity-20 transition-all active:scale-[0.95]"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </section>
    </>
  );
};

export default AllNews;



