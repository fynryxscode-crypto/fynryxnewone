import React, { Suspense } from 'react';
import HeroSection from '@/components/HeroSection';
import HomeClientSections from '@/components/home/HomeClientSections';

const SectionSkeleton = () => (
  <div className="w-full animate-pulse bg-slate-100 rounded-3xl" style={{ minHeight: '500px' }} />
);

export default function Home() {
  return (
    <main className="min-h-screen bg-white w-full overflow-x-hidden selection:bg-blue-100 selection:text-blue-900 font-sans">
      <HeroSection />

      <Suspense fallback={<SectionSkeleton />}>
        <HomeClientSections />
      </Suspense>
    </main>
  );
}
