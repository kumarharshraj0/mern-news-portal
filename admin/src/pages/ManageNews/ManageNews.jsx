import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNews } from "../../context/NewsContext";
import { Save } from "lucide-react";

// Modular Sub-components
import NewsEntryForm from "./NewsEntryForm";
import MediaInquisition from "./MediaInquisition";
import ArchiveRegistry from "./ArchiveRegistry";

export default function ManageNews() {
  const { user } = useAuth();
  const { newsList, createNews, updateNews, deleteNews, fetchNews } = useNews();
  const navigate = useNavigate();

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [media, setMedia] = useState(null);
  const [mediaUrl, setMediaUrl] = useState("");
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const modules = useMemo(() => ({
    toolbar: [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "clean"],
    ],
  }), []);

  const formats = useMemo(() => [
    "bold", "italic", "underline",
    "list", "bullet",
    "link",
  ], []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!title || !content || !category) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("author", user._id);

    if (media) formData.append("media", media);
    else if (mediaUrl) formData.append("media_src", mediaUrl);

    try {
      if (editingId) await updateNews(editingId, formData);
      else await createNews(formData);
      resetForm();
    } catch (err) {
      console.error(err);
    }
  }, [title, content, category, user._id, media, mediaUrl, editingId, updateNews, createNews]);

  const resetForm = useCallback(() => {
    setEditingId(null);
    setTitle("");
    setContent("");
    setCategory("");
    setMedia(null);
    setMediaUrl("");
  }, []);

  const handleEdit = useCallback((news) => {
    setEditingId(news._id);
    setTitle(news.title);
    setContent(news.content);
    setCategory(news.category);
    setMediaUrl(news.media || news.image || "");
    setMedia(null);
  }, []);

  const categories = useMemo(() => {
    const defaultCats = ["Technology", "Politics", "Culture", "Business", "Sports", "Entertainment"];
    const existingCats = [...new Set(newsList.map((n) => n.category))];
    return [...new Set([...defaultCats, ...existingCats])].sort();
  }, [newsList]);

  const filteredNews = useMemo(() => {
    return newsList.filter((n) => {
      const matchesCategory = filterCategory ? n.category === filterCategory : true;
      const matchesSearch = search
        ? n.title.toLowerCase().includes(search.toLowerCase()) ||
          n.content.toLowerCase().includes(search.toLowerCase())
        : true;
      return matchesCategory && matchesSearch;
    });
  }, [newsList, filterCategory, search]);

  const preview = useMemo(() => {
    const src = media ? URL.createObjectURL(media) : mediaUrl;
    const type = media
      ? media.type.startsWith("video/") ? "video" : "image"
      : mediaUrl.includes(".mp4") || mediaUrl.includes(".mov") ? "video" : "image";
    return { src, type };
  }, [media, mediaUrl]);

  return (
    <div className="p-12 space-y-16 max-w-[1600px] mx-auto">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-border/40 pb-12">
        <div className="max-w-xl">
          <div className="flex items-center gap-3 mb-6">
             <div className="w-1.5 h-1.5 bg-brand rounded-full" />
             <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-ink/30">News Editor</span>
          </div>
          <h1 className="text-5xl font-bold text-ink tracking-tight mb-4 font-serif">Create News</h1>
          <p className="text-ink/40 text-lg font-medium">Write and publish your news stories here.</p>
        </div>
        <div className="flex items-center gap-4">
           {editingId && (
             <button onClick={resetForm} className="btn-secondary h-14 px-8 border-none bg-slate-100">Cancel Edit</button>
           )}
           <button onClick={handleSubmit} className="btn-primary h-14 px-10 flex items-center gap-3 group">
             <Save size={18} />
             <span>{editingId ? "Save News" : "Publish News"}</span>
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <NewsEntryForm 
          title={title} setTitle={setTitle}
          content={content} setContent={setContent}
          category={category} setCategory={setCategory}
          categories={categories}
          modules={modules}
          formats={formats}
        />

        <MediaInquisition 
          media={media} setMedia={setMedia}
          mediaUrl={mediaUrl} setMediaUrl={setMediaUrl}
          preview={preview}
        />
      </div>

      <ArchiveRegistry 
        filteredNews={filteredNews}
        categories={categories}
        search={search} setSearch={setSearch}
        filterCategory={filterCategory} setFilterCategory={setFilterCategory}
        handleEdit={handleEdit}
        deleteNews={deleteNews}
        navigate={navigate}
      />
    </div>
  );
}
