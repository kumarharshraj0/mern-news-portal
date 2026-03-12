import React from "react";

export default function DesktopNav({ categories, location, handleNavClick }) {
  return (
    <nav className="hidden lg:flex items-center gap-2">
      {categories.map((item, idx) => (
        <button
          key={idx}
          onClick={() => handleNavClick(item.path)}
          className={`px-5 py-2.5 rounded-full text-[10px] font-semibold uppercase tracking-[0.2em] transition-all duration-500 relative ${
            location.pathname + location.search === item.path 
            ? "bg-brand/5 text-brand shadow-sm shadow-brand/5" 
            : "text-ink/40 hover:text-ink hover:bg-ink/5"
          }`}
        >
          {item.name}
          {location.pathname + location.search === item.path && (
             <span className="absolute -top-1 -right-1 flex h-2 w-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-40"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
             </span>
          )}
        </button>
      ))}
    </nav>
  );
}
