'use client';

import React, { useRef, useState, useEffect } from 'react';

interface LazySectionProps {
  children: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  className?: string;
  placeholderHeight?: string;
}

export default function LazySection({ 
  children, 
  threshold = 0.1, 
  rootMargin = "200px", 
  className = "",
  placeholderHeight = "400px" 
}: LazySectionProps) {
  const ref = useRef(null);
  const [hasRendered, setHasRendered] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setHasRendered(true);
        observer.disconnect();
      }
    }, { threshold, rootMargin });

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return (
    <div ref={ref} className={className}>
      {hasRendered ? (
        children
      ) : (
        <div style={{ minHeight: placeholderHeight }} className="w-full bg-slate-50 dark:bg-slate-950/10 animate-pulse rounded-3xl" />
      )}
    </div>
  );
}
