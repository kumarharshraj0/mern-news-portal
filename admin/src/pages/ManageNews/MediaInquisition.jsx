import React from "react";
import { ImageIcon, X, UploadCloud } from "lucide-react";

const MediaInquisition = React.memo(({ media, setMedia, mediaUrl, setMediaUrl, preview }) => {
  return (
    <div className="lg:col-span-4 space-y-8">
      <div className="admin-card bg-slate-900 border-none p-10 rounded-[3rem] sticky top-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-brand rounded-full blur-[100px] opacity-20 -mr-24 -mt-24" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-white text-xs font-semibold uppercase tracking-[0.3em]">Upload Image/Video</h3>
            <X size={16} className="text-white/20 cursor-pointer hover:text-white" onClick={() => { setMedia(null); setMediaUrl(""); }} />
          </div>
          
          <div className="aspect-video w-full rounded-[2rem] overflow-hidden bg-white/5 border border-white/10 group relative mb-8">
            <input
              type="file"
              accept="image/*,video/*"
              onChange={(e) => setMedia(e.target.files[0])}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            {preview.src ? (
              preview.type === "video" ? (
                <video src={preview.src} className="w-full h-full object-cover" controls />
              ) : (
                <img src={preview.src} alt="Preview" className="w-full h-full object-cover" />
              )
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-white/20 group-hover:text-brand transition-colors">
                <UploadCloud size={32} className="mb-4" />
                <p className="text-[10px] font-semibold uppercase tracking-widest">Upload from Computer</p>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-white/20 ml-2">Image/Video Link (Web)</p>
              <input
                type="text"
                placeholder="https://..."
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                className="w-full bg-white/5 border-none rounded-2xl px-6 py-4 text-xs font-semibold text-white placeholder:text-white/10 focus:ring-2 focus:ring-brand/20"
              />
            </div>
            
            <div className="flex items-center justify-between px-2 pt-4">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-white/30">QC Status</span>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-brand">Pass</span>
            </div>
            <div className="h-px bg-white/5 w-full" />
            <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest leading-relaxed text-center px-4 italic">
              Delivery Optimization Enabled
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default MediaInquisition;
