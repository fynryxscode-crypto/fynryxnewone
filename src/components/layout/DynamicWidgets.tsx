import React, { lazy, Suspense } from 'react';

// Use React.lazy for client-side widgets in Vite
const Chatbot = lazy(() => import('@/components/Chatbot'));
const AIWelcomeBot = lazy(() => import('@/components/AIWelcomeBot'));
const WhatsAppButton = lazy(() => import('@/components/WhatsAppButton'));
const FloatingBackButton = lazy(() => import('@/components/layout/FloatingBackButton'));

export default function DynamicWidgets() {
  return (
    <Suspense fallback={null}>
      <FloatingBackButton />
      <AIWelcomeBot />
      <Chatbot />
      <WhatsAppButton />
    </Suspense>
  );
}
