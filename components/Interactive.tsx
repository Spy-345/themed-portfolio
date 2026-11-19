'use client';
import { useRef, useState } from 'react';
export function CopyEmail() {
  const [status, setStatus] = useState('Copy email');
  return <button className="copy-email" onClick={async () => { try { await navigator.clipboard.writeText('yewleshivam.p@gmail.com'); setStatus('Email copied ✓'); } catch { setStatus('yewleshivam.p@gmail.com'); } }} aria-live="polite">{status}</button>;
}
export function MobileNav() {
  const menu = useRef<HTMLDetailsElement>(null);
  return <details ref={menu} className="mobile-nav"><summary>Menu <span aria-hidden="true">+</span></summary><nav aria-label="Mobile navigation" onClick={event => { if ((event.target as Element).closest('a')) menu.current?.removeAttribute('open'); }}>{['work', 'skills', 'experience', 'about', 'contact'].map(section => <a key={section} href={`#${section}`}>{section[0].toUpperCase() + section.slice(1)}</a>)}</nav></details>;
}
