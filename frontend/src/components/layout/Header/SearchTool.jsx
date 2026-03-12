import React from "react";
import { Search, Command } from "lucide-react";

export default function SearchTool({ searchQuery, setSearchQuery, handleSearch }) {
  return (
    <div className="hidden lg:flex items-center relative group">
      <div className="absolute left-5 text-ink/20 group-focus-within:text-brand transition-colors pointer-events-none">
        <Command size={14} />
      </div>
      <input
        type="text"
        placeholder="Query narratives..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        className="bg-ink/5 border-none pl-12 pr-6 py-3 rounded-full text-xs font-semibold outline-none w-48 focus:w-72 focus:bg-white focus:ring-4 focus:ring-brand/5 transition-all duration-700 placeholder:text-ink/20 shadow-inner"
      />
      <Search 
        size={14} 
        className="absolute right-5 text-ink/20 cursor-pointer hover:text-brand transition-colors"
        onClick={handleSearch}
      />
    </div>
  );
}
