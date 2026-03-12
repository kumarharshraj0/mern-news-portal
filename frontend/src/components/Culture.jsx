import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NewsContext } from "../context/NewsContext";
import { ArrowUpRight, BookOpen, Clock, Heart, Bookmark } from "lucide-react";
import Skeleton from "./common/Skeleton";
import PremiumImage from "./common/PremiumImage";

const Culture = () => {
  const navigate = useNavigate();
  const { news, fetchNewsByCategory, loading, toggleBookmark, bookmarks } = useContext(NewsContext);
  const [latestCultureNews, setLatestCultureNews] = useState([]);

  const updateLatestNews = () => {
    const sorted = news.slice(0, 5);
    setLatestCultureNews(sorted);
  };

  useEffect(() => {
    fetchNewsByCategory("culture");
    const interval = setInterval(() => {
      fetchNewsByCategory("culture");
    }, 30000); // 30s is enough for culture
    return () => clearInterval(interval);
  }, [fetchNewsByCategory]);

  useEffect(() => {
    if (news.length > 0) updateLatestNews();
  }, [news]);

  const featured = latestCultureNews[0];
  const sideNews = latestCultureNews.slice(1);

  if (loading) {
    return (
      <section className="bg-slate-50 py-32 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 space-y-6">
            <Skeleton className="w-32 h-4" />
            <Skeleton className="w-96 h-16" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7">
              <Skeleton className="aspect-[16/10] rounded-[3.5rem] mb-10" />
              <div className="space-y-4 px-4">
                <Skeleton className="w-full h-12" />
                <Skeleton className="w-2/3 h-4" />
              </div>
            </div>
            <div className="lg:col-span-5 grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-square rounded-[2.5rem]" />
                  <Skeleton className="w-full h-6" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-slate-50 py-32 px-6 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-1.5 bg-brand rounded-full" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-ink/40">Editorial Vertical</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif font-bold tracking-tighter text-ink leading-[0.95] mb-8">
              Culture <span className="text-brand">&</span> Soul
            </h2>
            <p className="text-ink/60 text-lg font-medium leading-relaxed">
              Exploring the intersections of art, society, and the human experience through an analytical lens.
            </p>
          </div>
          <button
            onClick={() => navigate("/news?category=culture")}
            className="btn-secondary group flex items-center gap-4 py-4"
          >
            Explore the Collection <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Culture Highlight */}
          {featured && (
            <div
              className="lg:col-span-7 group cursor-pointer"
              onClick={() => navigate(`/news/${featured._id}`)}
            >
              <div className="relative rounded-[3.5rem] overflow-hidden border border-border/50 shadow-premium mb-10">
                <PremiumImage
                  src={featured.media || featured.image}
                  alt={featured.title}
                  aspect="aspect-[16/10]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-8 left-8">
                  <span className="bg-white/10 backdrop-blur-xl border border-white/20 text-white text-[10px] font-semibold uppercase tracking-widest px-6 py-2.5 rounded-full">
                    Featured Long-form
                  </span>
                </div>
                <div className="absolute top-8 right-8">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark(featured._id);
                    }}
                    className={`w-12 h-12 rounded-2xl backdrop-blur-xl border flex items-center justify-center transition-all ${bookmarks?.includes(featured._id) ? 'bg-brand text-white border-brand shadow-lg shadow-brand/20' : 'bg-white/10 border-white/20 text-white hover:bg-white hover:text-brand'}`}
                  >
                    <Bookmark size={20} fill={bookmarks?.includes(featured._id) ? "currentColor" : "none"} />
                  </button>
                </div>
              </div>
              <div className="px-4">
                <div className="flex items-center gap-6 mb-6 text-[10px] font-semibold uppercase tracking-widest text-ink-faint">
                  <div className="flex items-center gap-2">
                    <BookOpen size={12} className="text-brand" />
                    <span>8 Min Read</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart size={12} className="text-red-400" />
                    <span>Editors Choice</span>
                  </div>
                </div>
                <h3 className="text-4xl md:text-5xl font-serif font-bold leading-[1.1] text-ink mb-6 group-hover:text-brand transition-colors tracking-tight">
                  {featured.title}
                </h3>
                <p className="text-slate-600 text-lg leading-relaxed line-clamp-2 max-w-2xl">
                  {featured.description || featured.excerpt}
                </p>
              </div>
            </div>
          )}

          {/* Secondary Culture Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 md:grid-cols-2 gap-8">
            {sideNews.map((item) => (
              <div
                key={item._id}
                onClick={() => navigate(`/news/${item._id}`)}
                className="group cursor-pointer flex flex-col"
              >
                <div className="rounded-[2.5rem] overflow-hidden mb-6 border border-border/30 bg-white">
                  <PremiumImage
                    src={item.media || item.image}
                    alt={item.title}
                    aspect="aspect-square"
                    className="grayscale group-hover:grayscale-0"
                  />
                </div>
                <div className="px-2">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-serif font-bold text-xl leading-snug text-ink group-hover:text-brand transition-colors line-clamp-2 m-0">
                      {item.title}
                    </h4>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(item._id);
                      }}
                      className={`w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center transition-all ${bookmarks?.includes(item._id) ? 'bg-brand text-white border-brand' : 'bg-slate-100 text-ink/20 hover:text-brand hover:bg-brand/5'}`}
                    >
                      <Bookmark size={14} fill={bookmarks?.includes(item._id) ? "currentColor" : "none"} />
                    </button>
                  </div>
                  <div className="flex items-center gap-3 text-[9px] font-semibold uppercase tracking-widest text-ink/30">
                    <Clock size={10} />
                    <span>{new Date(item.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Newsletter Mini-Card */}
            <div className="md:col-span-2 bg-ink rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center relative overflow-hidden mt-4">
               <div className="absolute top-0 right-0 w-32 h-32 bg-brand/10 rounded-full blur-3xl" />
                <h5 className="text-white text-lg font-bold mb-2 font-serif">Culture Weekly</h5>
                <p className="text-white/40 text-[10px] uppercase font-semibold tracking-widest mb-6">Deep dives into the arts</p>
                <button className="text-[10px] font-semibold uppercase tracking-widest text-brand hover:text-white transition-colors">
                  Subscribe →
                </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Culture);



