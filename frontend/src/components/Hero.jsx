import React, { useContext, useEffect, useState } from "react";
import { NewsContext } from "../context/NewsContext";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, Clock, User as UserIcon } from "lucide-react";
import PremiumImage from "./common/PremiumImage";

const Hero = () => {
  const { news, fetchAllNews, loading } = useContext(NewsContext);
  const [featured, setFeatured] = useState(null);
  const [sideNews, setSideNews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllNews();
  }, [fetchAllNews]);

  useEffect(() => {
    if (news.length > 0) {
      const recentNews = [...news]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 4);

      setFeatured(recentNews[0]);
      setSideNews(recentNews.slice(1, 4));
    }
  }, [news]);

  if (loading) {
    return (
      <div className="pt-40 px-6 pb-20">
        <div className="max-w-7xl mx-auto animate-pulse">
          <div className="w-full h-[70vh] bg-slate-100 rounded-[3rem] mb-12" />
          <div className="grid grid-cols-3 gap-8">
            <div className="h-40 bg-slate-100 rounded-3xl" />
            <div className="h-40 bg-slate-100 rounded-3xl" />
            <div className="h-40 bg-slate-100 rounded-3xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!featured) return null;

  return (
    <section className="pt-40 pb-20 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Featured Content (8 Columns) */}
          <div className="lg:col-span-8 group relative" onClick={() => navigate(`/news/${featured._id}`)}>
            <div className="relative rounded-[3rem] overflow-hidden cursor-pointer shadow-premium">
              <PremiumImage
                src={featured.media || featured.image}
                alt={featured.title}
                loading="eager"
                aspect="aspect-[16/10] lg:aspect-square xl:aspect-[16/10]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent opacity-80" />
              
              <div className="absolute bottom-0 left-0 right-0 p-10 md:p-16">
                <div className="flex items-center gap-4 mb-8">
                  <span className="bg-brand text-white text-[10px] font-semibold uppercase tracking-[0.2em] px-5 py-2 rounded-full">
                    Story of the Day
                  </span>
                  <div className="h-px w-12 bg-white/20" />
                  <span className="text-white/80 text-[10px] font-semibold uppercase tracking-[0.2em]">
                    {featured.category}
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tighter mb-8 font-serif">
                  {featured.title}
                </h1>

                <div className="flex items-center gap-6 text-white/60 text-[10px] font-semibold uppercase tracking-[0.2em]">
                  <div className="flex items-center gap-2">
                    <UserIcon size={12} className="text-brand" />
                    <span>{featured.author?.name || "ZIVEK Edit"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={12} />
                    <span>{new Date(featured.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <button className="absolute -top-4 -right-4 w-20 h-20 bg-brand text-white rounded-full flex items-center justify-center scale-0 group-hover:scale-100 transition-all duration-500 shadow-2xl shadow-brand/40 z-10">
              <ArrowUpRight size={32} />
            </button>
          </div>

          {/* Side Stories (4 Columns) */}
          <div className="lg:col-span-4 space-y-12">
            <div className="flex items-center justify-between border-b border-border pb-6">
              <h3 className="text-xl font-bold text-ink uppercase tracking-widest">Trending</h3>
              <button 
                onClick={() => navigate("/news")}
                className="text-[10px] font-semibold uppercase tracking-widest text-brand hover:text-ink transition-colors"
              >
                View Archive
              </button>
            </div>
            
            <div className="space-y-10">
              {sideNews.map((item, idx) => (
                <div 
                  key={item._id}
                  className="group cursor-pointer flex gap-6"
                  onClick={() => navigate(`/news/${item._id}`)}
                >
                  <div className="flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden bg-slate-50 border border-border/50">
                    <PremiumImage
                      src={item.media || item.image}
                      alt={item.title}
                      aspect="aspect-square"
                      className="grayscale group-hover:grayscale-0"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-brand mb-2">
                      {item.category}
                    </span>
                    <h4 className="text-lg font-bold leading-tight text-ink group-hover:text-brand transition-colors line-clamp-2 mb-2 font-serif">
                      {item.title}
                    </h4>
                    <span className="text-[9px] font-bold text-ink-faint uppercase tracking-widest">
                      {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • Editorial Staff
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Premium Newsletter Teaser */}
            <div className="bg-ink p-8 rounded-[2.5rem] mt-12 text-center shadow-2xl shadow-ink/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <h5 className="text-white text-xl font-bold mb-4 relative z-10 font-serif">Deep Dive Insights</h5>
              <p className="text-white/50 text-xs leading-relaxed mb-6 relative z-10">
                Get the morning's most critical stories delivered straight to your inbox.
              </p>
              <div className="relative z-10">
                <input 
                  type="email" 
                  placeholder="Your Email"
                  className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl text-xs text-white outline-none focus:bg-white/10 transition-all mb-4"
                />
                <button className="w-full py-4 bg-brand text-white rounded-2xl text-[10px] font-semibold uppercase tracking-widest hover:bg-white hover:text-ink transition-all">
                  Join The Intelligence
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default React.memo(Hero);









