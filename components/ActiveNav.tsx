'use client';
import { useEffect, useState } from 'react';
const sections = ['work', 'skills', 'experience', 'about', 'contact'];
export default function ActiveNav() {
  const [active, setActive] = useState('');
  useEffect(() => {
    const update = () => {
      let current = '';
      for (const id of sections) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= 180) current = id;
      }
      setActive(current);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return <nav className="desktop-nav" aria-label="Main navigation">{sections.map(id => <a href={`#${id}`} key={id} aria-current={active === id ? 'location' : undefined}>{id[0].toUpperCase() + id.slice(1)}</a>)}</nav>;
}
