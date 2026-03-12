import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, User } from "lucide-react";

export default function ActionButtons({ user, navigate, logout }) {
  return (
    <div className="flex items-center gap-5">
      {!user ? (
        <div className="hidden md:flex items-center gap-5">
          <button
            className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/40 hover:text-brand transition-colors"
            onClick={() => navigate("/login")}
          >
            Gateway
          </button>
          <button
            className="btn-primary flex items-center gap-2 group h-12 px-8"
            onClick={() => navigate("/subscriptions")}
          >
            <Sparkles size={14} className="group-hover:rotate-12 transition-transform" />
            <span>Access Premium</span>
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Link 
            to="/subscriptions"
            className="hidden md:flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.2em] px-5 py-2.5 bg-brand text-white rounded-full hover:shadow-xl hover:shadow-brand/20 transition-all active:scale-[0.98]"
          >
            <Sparkles size={12} />
            <span>Elevate</span>
          </Link>
          <div className="h-6 w-px bg-border/60 mx-1" />
          <button
            className="w-11 h-11 rounded-[1rem] bg-slate-50 border border-border/60 flex items-center justify-center group overflow-hidden hover:border-brand/30 transition-all hover:bg-white"
            onClick={() => navigate("/profile")}
          >
            <User size={18} className="text-ink group-hover:text-brand transition-colors" />
          </button>
        </div>
      )}
    </div>
  );
}
