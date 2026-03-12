import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { NewsContext } from "../context/NewsContext";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance.jsx";
import { Bookmark } from "lucide-react";
import Skeleton from "../components/common/Skeleton";
import SEO from "../components/common/SEO";

export default function ProfilePage() {
  const { user, logout, loading } = useContext(AuthContext);
  const { bookmarks, fetchBookmarks, toggleBookmark } = useContext(NewsContext);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [bookmarkedNews, setBookmarkedNews] = useState([]);
  const [loadingBookmarks, setLoadingBookmarks] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      const getBookmarksData = async () => {
        setLoadingBookmarks(true);
        try {
          const res = await axios.get("/news/bookmarks");
          setBookmarkedNews(res.data);
        } catch (err) {
          console.error(err);
        } finally {
          setLoadingBookmarks(false);
        }
      };
      getBookmarksData();
    }
  }, [user, bookmarks]);

  if (loading) {
    return (
      <section className="bg-slate-50 min-h-screen pt-40 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12 space-y-4">
            <Skeleton className="w-48 h-10" />
            <Skeleton className="w-64 h-4" />
          </div>
          <div className="bg-white rounded-[2.5rem] p-10 md:p-14 border border-border space-y-10">
            <div className="flex items-center gap-6">
              <Skeleton className="w-20 h-20 circle" />
              <div className="space-y-3">
                <Skeleton className="w-48 h-8" />
                <Skeleton className="w-32 h-4" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-12 pt-10 border-t border-slate-100">
              <div className="space-y-4">
                <Skeleton className="w-24 h-3" />
                <Skeleton className="w-32 h-4" />
              </div>
              <div className="space-y-4">
                <Skeleton className="w-24 h-3" />
                <Skeleton className="w-32 h-4" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h2 className="text-2xl font-bold mb-4">You are not logged in</h2>
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Go to Login
        </button>
      </div>
    );
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        "/auth/update",
        { name, password },
        { withCredentials: true }
      );
      setMessage("✅ Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to update profile");
    }
  };

  return (
    <>
      <SEO title="Account Settings" description="Manage your ZIVEK profile, security, and news archive." />
      <section className="bg-slate-50 min-h-screen pt-40 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold text-ink tracking-tight mb-2">Account Settings</h1>
            <p className="text-ink-faint text-sm font-medium">Manage your profile, subscription, and preferences.</p>
          </div>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="text-xs font-bold tracking-widest uppercase text-brand hover:text-ink transition-colors pb-1 border-b-2 border-brand/20"
            >
              Update Profile
            </button>
          )}
        </div>

        <div className="bg-white rounded-[2.5rem] p-10 md:p-14 shadow-xl shadow-slate-200/50 border border-border">
          {!isEditing ? (
            <div className="space-y-10">
              {/* Profile Meta */}
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-brand/10 text-brand flex items-center justify-center text-3xl font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-ink">{user.name}</h3>
                  <p className="text-slate-500 font-medium">{user.email}</p>
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 pt-10 border-t border-slate-100">
                <div className="space-y-1">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-ink-faint">Account Role</p>
                  <p className="text-sm font-bold text-ink uppercase tracking-wider">{user.role || "Standard Member"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-ink-faint">Member Since</p>
                  <p className="text-sm font-bold text-ink uppercase tracking-wider">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : "N/A"}
                  </p>
                </div>
                <div className="space-y-1 lg:col-span-2">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-ink-faint mb-2">Subscription Status</p>
                  <div className="flex items-center gap-4">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-widest ${user.hasAccess ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>
                      {user.statusMessage || (user.isPremium ? "Active Plus" : "Trial")}
                    </span>
                    {user.subscriptionExpiresAt && (
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Renews on {new Date(user.subscriptionExpiresAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {message && (
                <div className="p-4 bg-emerald-50 text-emerald-600 text-xs font-bold uppercase tracking-widest rounded-xl text-center">
                  {message}
                </div>
              )}

              {/* Saved Intelligence Section */}
              <div className="pt-16 border-t border-slate-100">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-brand rounded-full" />
                    <h3 className="text-[10px] font-semibold uppercase tracking-[0.4em] text-ink/30">Intelligence Archive</h3>
                  </div>
                  <span className="text-[9px] font-bold text-ink-faint uppercase tracking-widest">{bookmarkedNews.length} Records</span>
                </div>

                {loadingBookmarks ? (
                  <div className="space-y-6">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-6 p-4">
                        <Skeleton className="w-24 h-24 rounded-2xl flex-shrink-0" />
                        <div className="flex-1 space-y-3">
                          <Skeleton className="w-20 h-3" />
                          <Skeleton className="w-full h-5" />
                          <Skeleton className="w-32 h-3" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : bookmarkedNews.length > 0 ? (
                  <div className="space-y-6">
                    {bookmarkedNews.map((item) => (
                      <div 
                        key={item._id}
                        className="group flex items-center gap-6 p-4 rounded-3xl hover:bg-slate-50 transition-all cursor-pointer border border-transparent hover:border-slate-100"
                        onClick={() => navigate(`/news/${item._id}`)}
                      >
                        <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-sm flex-shrink-0">
                          <img 
                            src={item.media || item.image || "/placeholder.png"} 
                            alt={item.title} 
                            className="w-full h-full object-cover transition-transform group-hover:scale-110"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[9px] font-bold text-brand uppercase tracking-widest mb-1.5">{item.category}</p>
                          <h4 className="text-sm font-bold text-ink leading-tight line-clamp-2 group-hover:text-brand transition-colors mb-2">{item.title}</h4>
                          <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">{new Date(item.createdAt).toLocaleDateString()}</p>
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleBookmark(item._id);
                          }}
                          className="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center text-red-400 hover:bg-red-50 hover:border-red-100 transition-all opacity-0 group-hover:opacity-100"
                        >
                          <Bookmark size={14} fill="currentColor" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-16 text-center border-2 border-dashed border-slate-100 rounded-[2.5rem]">
                    <p className="text-xs font-bold text-slate-300 uppercase tracking-widest mt-4">No records archived yet</p>
                    <button 
                      onClick={() => navigate("/")}
                      className="text-[10px] font-semibold text-brand hover:underline mt-4 uppercase tracking-widest"
                    >
                      Browse Newsroom
                    </button>
                  </div>
                )}
              </div>

              <div className="pt-10 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => navigate("/")}
                  className="btn-secondary text-[11px] font-semibold uppercase tracking-widest"
                >
                  Back to feed
                </button>
                <button
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                  className="text-[11px] font-semibold uppercase tracking-widest text-red-500 hover:text-red-600 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleUpdate} className="space-y-8">
              <div className="grid grid-cols-1 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-semibold uppercase tracking-widest text-ink-faint">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-border px-6 py-4 rounded-2xl outline-none focus:border-brand focus:ring-4 focus:ring-brand/5 transition-all text-sm font-bold text-ink"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-semibold uppercase tracking-widest text-ink-faint">Update Password <span className="text-slate-300 font-normal normal-case">(Optional)</span></label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-border px-6 py-4 rounded-2xl outline-none focus:border-brand focus:ring-4 focus:ring-brand/5 transition-all text-sm font-bold text-ink"
                    placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                  />
                </div>
              </div>

              {message && (
                <div className={`p-4 rounded-xl text-xs font-bold uppercase tracking-widest text-center ${message.includes("✅") ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>
                  {message}
                </div>
              )}

              <div className="pt-8 border-t border-slate-100 flex items-center gap-4">
                <button
                  type="submit"
                  className="btn-primary flex-1 text-[11px] font-semibold uppercase tracking-widest py-4"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="btn-secondary flex-1 text-[11px] font-semibold uppercase tracking-widest py-4"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
    </>
  );
}

