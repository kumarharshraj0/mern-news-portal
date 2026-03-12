import React, { Suspense, lazy } from "react";
import SEO from "../components/common/SEO";
import Skeleton from "../components/common/Skeleton";

// Lazy Load Sectional Components
const Hero = lazy(() => import("../components/Hero"));
const LatestNews = lazy(() => import("../components/LatestNews"));
const Culture = lazy(() => import("../components/Culture"));

const SectionSkeleton = () => (
  <div className="max-w-7xl mx-auto px-6 py-20 animate-pulse">
    <div className="w-full h-[50vh] bg-slate-50 rounded-[3rem]" />
  </div>
);

const Home = () => {
  return (
    <>
      <SEO 
        title="Global Intelligence & Live Updates" 
        description="The frontline of investigative journalism. Stay ahead with ZIVEK's real-time global news feed and expert analysis."
      />
      <main className="min-h-screen bg-white">
        <Suspense fallback={<SectionSkeleton />}>
          <Hero />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton />}>
          <LatestNews />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton />}>
          <Culture />
        </Suspense>
      </main>
    </>
  );
};

export default Home;
