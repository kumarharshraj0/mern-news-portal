import React from "react";

export default function Button({ children, onClick, className = "", variant = "primary", icon: Icon, ...props }) {
  const baseStyles = "h-12 px-8 rounded-2xl font-bold uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 active:scale-[0.98] transition-all duration-300";
  
  const variants = {
    primary: "bg-ink text-white hover:bg-brand hover:shadow-2xl hover:shadow-brand/20",
    secondary: "bg-white border border-border text-ink hover:bg-slate-50 hover:border-ink/10",
    danger: "bg-red-50 text-red-500 hover:bg-red-500 hover:text-white"
  };

  return (
    <button 
      onClick={onClick} 
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      {...props}
    >
      {Icon && <Icon size={16} />}
      {children}
    </button>
  );
}
