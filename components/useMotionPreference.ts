'use client';
import { useSyncExternalStore } from 'react';

const query = '(prefers-reduced-motion: reduce)';
function subscribe(onChange: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
}
const snapshot = () => window.matchMedia(query).matches;
const serverSnapshot = () => true;

/** Safe during hydration and responsive to live OS preference changes. */
export default function useMotionPreference() {
  return useSyncExternalStore(subscribe, snapshot, serverSnapshot);
}
