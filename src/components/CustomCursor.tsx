'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let rafId: number;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const animateRing = () => {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      setRingPos({ x: currentX, y: currentY });
      rafId = requestAnimationFrame(animateRing);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('a, button, [data-cursor="pointer"], input, textarea')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    rafId = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <motion.div
        className="cursor-dot"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          width: isHovering ? '10px' : '6px',
          height: isHovering ? '10px' : '6px',
          background: isHovering ? '#8b5cf6' : '#22d3ee',
          borderRadius: '50%',
          transition: 'width 0.2s, height 0.2s, background 0.2s',
        }}
      />
      {/* Ring */}
      <div
        className="cursor-ring"
        style={{
          left: ringPos.x,
          top: ringPos.y,
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(-50%, -50%)',
          width: isHovering ? '48px' : '32px',
          height: isHovering ? '48px' : '32px',
          border: `1px solid ${isHovering ? 'rgba(139,92,246,0.5)' : 'rgba(34,211,238,0.4)'}`,
          borderRadius: '50%',
          transition: 'width 0.3s, height 0.3s, border-color 0.3s',
        }}
      />
    </>
  );
}
