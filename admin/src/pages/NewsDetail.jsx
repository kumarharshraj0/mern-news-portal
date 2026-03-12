import { useParams, useNavigate } from "react-router-dom";
import { useNews } from "../context/NewsContext";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

export default function NewsDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const { fetchNewsById, deleteNews } = useNews();
  const navigate = useNavigate();

  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      const data = await fetchNewsById(id);
      setNews(data);
      setLoading(false);
    };
    loadNews();
  }, [id, fetchNewsById]);

  if (loading) return <p className="p-6">Loading...</p>;

  if (!news)
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">News not found</h2>
        <button
          onClick={() => navigate("/admin/manage-news")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );

  const handleDelete = async () => {
    await deleteNews(news._id);
    navigate("/admin/manage-news");
  };

  const handleEdit = () => {
    navigate("/admin/manage-news", { state: { editId: news._id } });
  };

  // Determine media type (image/video) for detail view
  const getMediaType = (newsObj) => {
    const fileOrUrl = newsObj.media || newsObj.image || newsObj.img_src;
    if (!fileOrUrl) return "image";
    if (typeof fileOrUrl === "string") {
      return fileOrUrl.includes(".mp4") || fileOrUrl.includes(".mov") ? "video" : "image";
    }
    return fileOrUrl.type?.startsWith("video/") ? "video" : "image";
  };

  const mediaType = getMediaType(news);
  const mediaSrc = news.media || news.image || news.img_src;

  return (
    <div className="p-10 lg:p-20 bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Navigation / Actions */}
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigate("/manage-news")}
            className="text-[10px] font-semibold uppercase tracking-widest text-ink-faint hover:text-brand transition-colors flex items-center gap-2"
          >
            &larr; Back to Inventory
          </button>

          {user?.role === "admin" && (
            <div className="flex items-center gap-4">
              <button
                onClick={handleEdit}
                className="btn-secondary py-3 text-[10px] font-semibold uppercase tracking-widest"
              >
               Edit Content
              </button>
              <button
                onClick={handleDelete}
                className="px-6 py-3 bg-red-50 text-red-500 rounded-xl text-[10px] font-semibold uppercase tracking-widest hover:bg-red-100 transition-all"
              >
                Delete Story
              </button>
            </div>
          )}
        </div>

        {/* Article Card */}
        <div className="admin-card overflow-hidden !p-0">
          <div className="aspect-video w-full bg-slate-200">
            {mediaType === "video" ? (
              <video
                src={mediaSrc}
                className="w-full h-full object-cover"
                controls
              />
            ) : (
              <img
                src={mediaSrc || "/placeholder.png"}
                alt={news.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          
          <div className="p-12 lg:p-16 space-y-8">
            <div className="space-y-4 text-center">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand">{news.category}</span>
              <h1 className="text-4xl font-bold text-ink tracking-tight leading-tight">{news.title}</h1>
              <div className="flex items-center justify-center gap-3 pt-2">
                <div className="w-8 h-8 rounded-full bg-slate-100 border border-border flex items-center justify-center">
                  <span className="text-[10px] font-semibold text-ink-faint">A</span>
                </div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-ink">Published by {news.author?.name || "Administrator"}</p>
              </div>
            </div>

            <div className="h-px bg-border w-24 mx-auto"></div>

            <div 
              className="news-content prose prose-slate max-w-none prose-p:text-slate-600 prose-headings:text-ink prose-a:text-brand"
              dangerouslySetInnerHTML={{ __html: news.content }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
