'use client';

import { lazy, Suspense } from 'react';
 
 const SectionSkeleton = ({ height = '400px' }: { height?: string }) => (
   <div className="w-full animate-pulse bg-slate-900/20 rounded-3xl mx-6" style={{ minHeight: height }} />
 );
 
 const TeamHierarchy = lazy(() => import('@/components/about/TeamHierarchy'));
 const RoadmapTimeline = lazy(() => import('@/components/about/RoadmapTimeline'));
 const AboutContact = lazy(() => import('@/components/about/AboutContact'));

export default function AboutClientSections() {
  return (
    <>
      <Suspense fallback={<SectionSkeleton height="500px" />}>
        <TeamHierarchy />
      </Suspense>
      <Suspense fallback={<SectionSkeleton height="400px" />}>
        <RoadmapTimeline />
      </Suspense>
      <Suspense fallback={<SectionSkeleton height="500px" />}>
        <AboutContact />
      </Suspense>
    </>
  );
}
