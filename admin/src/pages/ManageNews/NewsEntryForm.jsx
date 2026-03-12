import React from "react";
import ReactQuill from "react-quill-new";
import { Type, Layers, ChevronDown, Edit3 } from "lucide-react";

const NewsEntryForm = React.memo(({ title, setTitle, content, setContent, category, setCategory, categories, modules, formats }) => {
  return (
    <div className="lg:col-span-8 space-y-10">
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-ink/30 ml-4">
          <Type size={12} /> News Title
        </div>
        <input
          type="text"
          placeholder="Enter news title here..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-slate-50 border-none rounded-[2rem] px-8 py-6 text-2xl font-bold text-ink placeholder:text-ink/10 focus:ring-2 focus:ring-brand/20 transition-all font-serif"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-ink/30 ml-4">
            <Layers size={12} /> Select Category
          </div>
          <div className="relative group">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm font-semibold text-ink appearance-none cursor-pointer focus:ring-2 focus:ring-brand/20"
            >
              <option value="">Choose a Category</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-6 top-1/2 -translate-y-1/2 text-ink/20 pointer-events-none" />
          </div>
        </div>
        <div className="space-y-3 invisible"> {/* Placeholder if needed */} </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-ink/30 ml-4">
          <Edit3 size={12} /> News Content
        </div>
        <div className="rounded-[2.5rem] overflow-hidden border border-border/40 shadow-sm bg-white">
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            modules={modules}
            formats={formats}
            className="min-h-[450px]"
            placeholder="Write your news story here..."
          />
        </div>
      </div>
    </div>
  );
});

export default NewsEntryForm;
