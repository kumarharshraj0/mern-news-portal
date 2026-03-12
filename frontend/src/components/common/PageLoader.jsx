import React from 'react';

const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center">
      {/* Premium Pulse Animation */}
      <div className="relative flex items-center justify-center">
        <div className="absolute w-24 h-24 bg-brand/5 rounded-full animate-ping" />
        <div className="relative w-16 h-16 bg-white border-2 border-brand/20 rounded-2xl shadow-xl flex items-center justify-center overflow-hidden group">
          <div className="absolute inset-0 bg-brand/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          <span className="text-2xl font-serif font-black text-brand relative z-10">Z</span>
        </div>
      </div>
      
      <div className="mt-8 flex flex-col items-center gap-2">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-ink/30 animate-pulse">
          Synchronizing Intelligence
        </p>
        <div className="w-12 h-[1px] bg-border overflow-hidden relative">
          <div className="absolute inset-0 bg-brand w-full -translate-x-full animate-[loading_1.5s_infinite_ease-in-out]" />
        </div>
      </div>

      <style jsx>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default PageLoader;
