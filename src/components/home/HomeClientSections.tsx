import React, { Suspense, lazy } from 'react';

const SectionSkeleton = ({ height = '500px' }: { height?: string }) => (
  <div className="w-full animate-pulse bg-slate-900/20 rounded-3xl" style={{ minHeight: height }} />
);

// Lazy load components in React
const AboutSection = lazy(() => import('@/components/AboutSection'));
const ServicesSection = lazy(() => import('@/components/ServicesSection'));
const WhyUsSection = lazy(() => import('@/components/WhyUsSection'));
const FeaturedProductsCarousel = lazy(() => import('@/components/FeaturedProductsCarousel'));
const TestimonialsSection = lazy(() => import('@/components/TestimonialsSection'));
const FaqSection = lazy(() => import('@/components/FaqSection'));
const TrainingSection = lazy(() => import('@/components/TrainingSection'));
const ContactSection = lazy(() => import('@/components/ContactSection'));

export default function HomeClientSections() {
  return (
    <>
      <Suspense fallback={<SectionSkeleton height="600px" />}>
        <AboutSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height="700px" />}>
        <ServicesSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height="600px" />}>
        <WhyUsSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height="800px" />}>
        <FeaturedProductsCarousel />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height="500px" />}>
        <TestimonialsSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height="400px" />}>
        <FaqSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height="500px" />}>
        <TrainingSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height="600px" />}>
        <ContactSection />
      </Suspense>
    </>
  );
}
