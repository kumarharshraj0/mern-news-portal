import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { NewsContext } from "../context/NewsContext.jsx";
import { Clock, User, Share2, Bookmark, Sparkles, ChevronLeft, Lock } from "lucide-react";
import Skeleton from "../components/common/Skeleton";
import SEO from "../components/common/SEO";

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchNewsById, toggleBookmark, bookmarks } = useContext(NewsContext);

  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isBookmarked = bookmarks?.includes(id);

  const handleBookmark = async () => {
    try {
      await toggleBookmark(id);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    const getNews = async () => {
      setLoading(true);
      try {
        const data = await fetchNewsById(id);
        if (!data) {
          setError("News not found.");
        } else {
          setNews(data);
          setError(null);
        }
      } catch (err) {
        setError("Error fetching news detail.");
      } finally {
        setLoading(false);
      }
    };
    getNews();
  }, [id, fetchNewsById]);

  const getMedia = (newsItem) => {
    if (!newsItem) return { src: "/placeholder.png", type: "image" };
    const src = newsItem.media || newsItem.image || newsItem.img_src || "/placeholder.png";
    const type = src.endsWith(".mp4") || src.endsWith(".mov") || src?.type?.startsWith?.("video") ? "video" : "image";
    return { src, type };
  };

  if (loading) return (
    <div className="min-h-screen bg-white pt-40 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 space-y-8">
          <div className="flex items-center gap-4">
            <Skeleton className="w-24 h-4" />
            <Skeleton className="w-24 h-4" />
          </div>
          <Skeleton className="w-full h-24" />
          <div className="flex items-center gap-6">
            <Skeleton className="w-10 h-10 circle" />
            <div className="space-y-2">
              <Skeleton className="w-32 h-4" />
              <Skeleton className="w-24 h-3" />
            </div>
          </div>
        </div>
        <Skeleton className="aspect-[16/9] rounded-[3rem] mb-16" />
        <div className="space-y-6 max-w-3xl">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-3/4 h-4" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-5/6 h-4" />
        </div>
      </div>
    </div>
  );

  if (error) {
    if (error === "SUBSCRIPTION_REQUIRED") {
      return (
        <div className="min-h-screen bg-white flex items-center justify-center px-6">
          <div className="max-w-xl w-full text-center">
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-brand/5 rounded-full mb-10 border border-brand/10">
              <Lock size={14} className="text-brand" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand">Subscription Required</span>
            </div>
            <h2 className="text-5xl font-bold text-ink tracking-tight mb-8 font-serif leading-tight">Insight Beyond The Headlines</h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-12">
              Our investigative reports and deeper analyses are reserved for ZIVEK Plus members. Upgrade your account to continue this story.
            </p>
            <div className="flex flex-col gap-4 max-w-sm mx-auto">
              <button 
                onClick={() => navigate("/subscriptions")}
                className="btn-primary py-5 rounded-2xl shadow-2xl shadow-brand/20"
              >
                Access Premium Plans
              </button>
              <button 
                onClick={() => navigate("/")}
                className="text-[10px] font-semibold uppercase tracking-widest text-ink/40 hover:text-ink transition-colors mt-4"
              >
                ← Return to Newsroom
              </button>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-ink mb-4 font-serif">Something's not right</h2>
          <p className="text-slate-500 mb-8">{error}</p>
          <button onClick={() => navigate("/")} className="btn-secondary">Back to Dashboard</button>
        </div>
      </div>
    );
  }

  const { src, type } = getMedia(news);

  return (
    <article className="bg-white min-h-screen pb-32">
      <SEO 
        title={news.title}
        description={news.excerpt || news.content?.substring(0, 160)}
        image={news.media || news.image}
        article={true}
      />
      {/* Article Header */}
      <div className="pt-40 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-ink/40 hover:text-brand transition-all mb-12 group"
          >
            <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back
          </button>

          <div className="flex items-center gap-4 mb-10">
            <span className="bg-brand text-white text-[9px] font-semibold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full">
              {news.category}
            </span>
            <div className="h-px w-10 bg-border" />
            <div className="flex items-center gap-2 text-[10px] font-bold text-ink-faint uppercase tracking-widest">
              <Clock size={12} />
              <span>{new Date(news.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-ink leading-[0.95] tracking-tighter mb-12 font-serif">
            {news.title}
          </h1>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 py-10 border-y border-border/50">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-border flex items-center justify-center font-bold text-brand text-xl shadow-sm">
                {news.author?.name?.charAt(0) || "Z"}
              </div>
              <div>
                <p className="text-xs font-semibold text-ink uppercase tracking-[0.1em]">{news.author?.name || "ZIVEK Editorial"}</p>
                <p className="text-[10px] font-bold text-ink-faint uppercase tracking-[0.2em] mt-1">Intelligence Division</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
               <button className="w-12 h-12 rounded-2xl border border-border flex items-center justify-center hover:bg-slate-50 transition-all text-ink/40 hover:text-ink shadow-sm">
                 <Share2 size={18} />
               </button>
               <button 
                  onClick={handleBookmark}
                  className={`w-12 h-12 rounded-2xl border border-border flex items-center justify-center transition-all shadow-sm ${isBookmarked ? 'bg-brand text-white border-brand' : 'hover:bg-slate-50 text-ink/40 hover:text-ink'}`}
               >
                 <Bookmark size={18} fill={isBookmarked ? "currentColor" : "none"} />
               </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Media */}
      <div className="px-6 mb-24">
        <div className="max-w-6xl mx-auto">
          <div className="w-full aspect-[16/9] lg:aspect-[21/9] rounded-[4rem] overflow-hidden shadow-premium border border-border/30">
            {type === "video" ? (
              <video src={src} controls className="w-full h-full object-cover" />
            ) : (
              <img src={src} alt={news.title} className="w-full h-full object-cover transition-transform duration-1000" />
            )}
          </div>
        </div>
      </div>

      {/* Narrative Content */}
      <div className="px-6 relative">
        <div className="max-w-[720px] mx-auto">
          <div className="news-content space-y-8">
            {news.excerpt && (
              <p className="text-2xl md:text-3xl font-serif font-bold leading-snug text-ink/80 mb-16 px-8 border-l-4 border-brand">
                {news.excerpt}
              </p>
            )}

            <div 
              className={`prose prose-slate prose-xl max-w-none prose-p:leading-[1.8] prose-p:text-slate-800 prose-headings:font-serif prose-headings:font-bold prose-strong:text-ink ${news.isMasked ? 'mask-fade pointer-events-none select-none' : ''}`}
              dangerouslySetInnerHTML={{ __html: news.content || news.description }}
            />

            {news.isMasked && (
              <div className="relative z-10 -mt-32 pt-40">
                <div className="bg-ink p-12 md:p-20 rounded-[4rem] text-center shadow-premium relative overflow-hidden group">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] aspect-square bg-brand/10 rounded-full blur-[120px] opacity-20" />
                  
                  <div className="relative z-10 max-w-md mx-auto">
                    <div className="inline-flex items-center gap-3 px-6 py-2 bg-brand/10 rounded-full mb-10 border border-brand/20">
                      <Sparkles size={16} className="text-brand" />
                      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand">Premium Intelligence</span>
                    </div>
                    
                    <h3 className="text-4xl font-serif font-bold text-white tracking-tight mb-8 leading-tight">Want the full picture?</h3>
                    <p className="text-white/50 text-base leading-relaxed mb-12">
                      Unlock full access to this investigative report, plus our entire archive of expert insights and daily global intelligence.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
                      <button
                        onClick={() => navigate("/subscriptions")}
                        className="w-full sm:w-auto px-10 py-5 bg-brand text-white rounded-[2rem] text-[11px] font-semibold uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-brand/20"
                      >
                        Start 7-Day Trial
                      </button>
                      <button
                        onClick={() => navigate("/login")}
                        className="w-full sm:w-auto px-10 py-5 bg-white/5 text-white/60 hover:text-white rounded-[2rem] text-[11px] font-semibold uppercase tracking-widest transition-all"
                      >
                        Sign In
                      </button>
                    </div>
                    
                    <p className="text-[10px] font-semibold text-white/20 uppercase tracking-[0.3em] mt-12">
                      Cancel anytime • No commitment
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Article Footer */}
          {!news.isMasked && (
            <div className="mt-32 pt-16 border-t border-border/50">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 opacity-50">
                <div className="flex items-center gap-6">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-ink">Found a mistake?</p>
                  <button className="text-[10px] font-semibold uppercase tracking-widest text-brand hover:underline">Report Correction</button>
                </div>
                <p className="text-[9px] font-semibold text-ink-faint uppercase tracking-widest">
                  &copy; {new Date().getFullYear()} ZIVEK Inc. Content protected by global copyright laws.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default NewsDetail;


