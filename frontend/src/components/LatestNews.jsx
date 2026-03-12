import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NewsContext } from "../context/NewsContext";
import Sparkles from "lucide-react/dist/esm/icons/sparkles";
import Bookmark from "lucide-react/dist/esm/icons/bookmark";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";
import Skeleton from "./common/Skeleton";
import PremiumImage from "./common/PremiumImage";

const LatestNews = () => {
  const navigate = useNavigate();
  const { news, fetchAllNews, loading, toggleBookmark, bookmarks } = useContext(NewsContext);

  React.useEffect(() => {
    fetchAllNews({ limit: 9 }); // Fetch more than 5 to have enough for grid + featured
  }, [fetchAllNews]);

  const latestNews = news.slice(0, 5);

  const featured = latestNews[0];
  const sideNews = latestNews.slice(1);

  if (loading) {
    return (
      <section className="bg-white py-24 px-6 md:px-16 max-w-7xl mx-auto border-t border-border/50">
        <div className="flex items-end justify-between mb-16 px-2">
          <div className="space-y-4">
            <Skeleton className="w-32 h-4" />
            <Skeleton className="w-64 h-12" />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-16">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-6">
                <Skeleton className="aspect-[16/10] rounded-[2rem]" />
                <div className="space-y-3">
                  <Skeleton className="w-20 h-3" />
                  <Skeleton className="w-full h-6" />
                  <Skeleton className="w-3/4 h-3" />
                </div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-4">
            <Skeleton className="w-full h-[500px] rounded-[3rem]" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-24 px-6 md:px-16 max-w-7xl mx-auto border-t border-border/50">
      {/* Editorial Header */}
      <div className="flex items-end justify-between mb-16 px-2">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Sparkles size={16} className="text-brand" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-brand">The Front Page</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-ink leading-tight font-serif">
            The Latest Stories
          </h2>
          <p className="text-ink-faint text-sm font-medium mt-4">Curated intelligence from our global network.</p>
        </div>
        <button
          onClick={() => navigate("/news")}
          className="group flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink hover:text-brand transition-all pb-2 border-b-2 border-border hover:border-brand"
        >
          View Archive <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* News Grid (8 Columns) */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-16">
          {sideNews.map((item) => (
            <div
              key={item._id}
              onClick={() => navigate(`/news/${item._id}`)}
              className="group cursor-pointer flex flex-col"
            >
              <div className="rounded-[2rem] overflow-hidden mb-8 border border-border/50 shadow-premium">
                <PremiumImage
                  src={item.media || item.image}
                  alt={item.title}
                  aspect="aspect-[16/10]"
                />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-brand">
                  {item.category}
                </span>
                <div className="h-px w-8 bg-border" />
                <span className="text-[9px] font-semibold text-ink-faint uppercase tracking-widest">
                  {new Date(item.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
              </div>
              <h3 className="font-serif font-bold text-2xl leading-tight text-ink mb-4 group-hover:text-brand transition-colors line-clamp-2">
                {item.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-6">
                {item.description || item.excerpt}
              </p>
              <div className="mt-auto flex items-center justify-between">
                <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-ink group-hover:text-brand transition-colors">
                  Read Analysis <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmark(item._id);
                  }}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${bookmarks?.includes(item._id) ? 'bg-brand text-white border-brand' : 'bg-slate-50 text-ink/20 hover:text-brand hover:bg-brand/5'}`}
                >
                  <Bookmark size={14} fill={bookmarks?.includes(item._id) ? "currentColor" : "none"} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Spotlight (4 Columns) */}
        <div className="lg:col-span-4">
          <div className="sticky top-32">
            {featured && (
              <div
                className="bg-slate-50 rounded-[3rem] p-10 border border-border/50 group cursor-pointer transition-all hover:shadow-premium"
                onClick={() => navigate(`/news/${featured._id}`)}
              >
                <div className="rounded-[2rem] overflow-hidden mb-10 border border-border/30">
                  <PremiumImage
                    src={featured.media || featured.image}
                    alt={featured.title}
                    aspect="aspect-square"
                    className="grayscale group-hover:grayscale-0"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
                      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink">Editor's Pick</span>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(featured._id);
                      }}
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${bookmarks?.includes(featured._id) ? 'bg-brand text-white border-brand' : 'bg-white border border-border text-ink/20 hover:text-brand'}`}
                    >
                      <Bookmark size={18} fill={bookmarks?.includes(featured._id) ? "currentColor" : "none"} />
                    </button>
                  </div>
                  <h2 className="text-3xl font-serif font-bold leading-[1.1] text-ink mb-6 group-hover:text-brand transition-colors tracking-tighter">
                    {featured.title}
                  </h2>
                  <p className="text-slate-600 text-sm leading-relaxed mb-8 line-clamp-4">
                    {featured.description || featured.excerpt}
                  </p>
                  <button className="w-full py-5 bg-ink text-white rounded-2xl text-[10px] font-semibold uppercase tracking-[0.2em] group-hover:bg-brand transition-all flex items-center justify-center gap-3">
                    Unlock Full Story <Sparkles size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(LatestNews);


