import React, { useState, useEffect } from "react";

/**
 * PremiumImage - Performance optimized image component
 * @param {string} src - Image source URL
 * @param {string} alt - Accessibility text
 * @param {string} className - Additional CSS classes
 * @param {string} aspect - Tailwind aspect ratio class (e.g., 'aspect-video')
 * @param {string} loading - Native loading strategy ('lazy' | 'eager')
 */
const PremiumImage = ({ 
  src, 
  alt, 
  className = "", 
  aspect = "aspect-[16/10]",
  loading = "lazy",
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Fallback image if source fails
  const fallbackSrc = "/placeholder.png";

  return (
    <div className={`relative overflow-hidden ${aspect} bg-slate-100 ${className}`}>
      {/* Background Pulse while loading */}
      {!isLoaded && !error && (
        <div className="absolute inset-0 animate-pulse bg-slate-200" />
      )}

      <img
        src={error ? fallbackSrc : src}
        alt={alt}
        loading={loading}
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
        className={`w-full h-full object-cover transition-all duration-700 ease-out ${
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
        }`}
        {...props}
      />
    </div>
  );
};

export default PremiumImage;
