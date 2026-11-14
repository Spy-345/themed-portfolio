'use client';

import { useEffect, useRef } from 'react';

export default function CursorLight() {
  const light = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = light.current;
    if (!element) return;
    const enabled = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    let frame = 0;
    let x = 0, y = 0;
    const hide = () => { element.style.opacity = '0'; };
    const move = (event: PointerEvent) => {
      if (!enabled.matches || event.pointerType !== 'mouse') { hide(); return; }
      x = event.clientX; y = event.clientY;
      if (!frame) frame = requestAnimationFrame(() => {
        element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        element.style.opacity = '1';
        frame = 0;
      });
    };
    const reset = () => { cancelAnimationFrame(frame); frame = 0; hide(); };
    window.addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', reset);
    window.addEventListener('blur', reset);
    document.addEventListener('visibilitychange', reset);
    enabled.addEventListener('change', reset);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', reset);
      window.removeEventListener('blur', reset);
      document.removeEventListener('visibilitychange', reset);
      enabled.removeEventListener('change', reset);
    };
  }, []);
  return <div ref={light} className="cursor-light" aria-hidden="true"><div/></div>;
}
