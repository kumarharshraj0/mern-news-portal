import React from "react";

const Skeleton = ({ className, variant = "rect" }) => {
  const baseClasses = "animate-pulse bg-slate-100";
  
  const variants = {
    rect: "rounded-2xl",
    circle: "rounded-full",
    text: "rounded-md h-3 w-full",
  };

  return (
    <div className={`${baseClasses} ${variants[variant]} ${className}`} />
  );
};

export default Skeleton;
