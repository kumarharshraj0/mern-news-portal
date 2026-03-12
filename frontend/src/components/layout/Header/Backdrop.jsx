import React from "react";

export default function Backdrop({ isMenuOpen, setIsMenuOpen }) {
  if (!isMenuOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 bg-ink/70 backdrop-blur-md z-[200] lg:hidden transition-opacity cursor-pointer duration-500"
      onClick={() => setIsMenuOpen(false)}
    />
  );
}
