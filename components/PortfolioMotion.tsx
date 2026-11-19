'use client';

import { useEffect, type ReactNode } from 'react';
import { inView, stagger, useAnimate } from 'motion/react';

import useMotionPreference from './useMotionPreference';

const ease = [0.22, 1, 0.36, 1] as const;

/** Adds motion to server-rendered content without hiding it before hydration. */
export default function PortfolioMotion({ children }: { children: ReactNode }) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const reducedMotion = useMotionPreference();

  useEffect(() => {
    if (reducedMotion !== false || !scope.current) return;
    const root = scope.current;
    const cleanups: (() => void)[] = [];
    const animations: { complete: () => void; stop: () => void }[] = [];

    // Preserve deep-link and browser-restored scroll positions on arrival.
    if (!window.location.hash && window.scrollY < 100) {
      const intro = root.querySelectorAll('.hero-copy > *');
      animations.push(animate(intro, { opacity: [0.5, 1], y: [16, 0] }, {
        duration: 0.55, delay: stagger(0.065), ease,
      }));
      animations.push(animate('.featured-work', { opacity: [0.5, 1], y: [22, 0], scale: [0.985, 1] }, {
        duration: 0.7, delay: 0.12, ease,
      }));
    }

    const reveals = root.querySelectorAll<HTMLElement>([
      '.section-heading', '.project-copy', '.project > .project-preview',
      '.notes-grid > article', '.skill-card', '.job', '#about > div',
      '.contact-heading', '.contact-layout',
    ].join(', '));
    reveals.forEach(element => {
      cleanups.push(inView(element, () => {
        // Start only on entry. Offscreen content stays readable and focusable.
        animations.push(animate(element, { opacity: [0.55, 1], y: [18, 0] }, {
          duration: 0.55, ease,
        }));
      }, { amount: 0.12 }));
    });

    const revealCaseStudy = (event: Event) => {
      const details = event.target;
      if (!(details instanceof HTMLDetailsElement) || !details.open || !details.matches('.case-study')) return;
      const body = details.querySelector('.case-study-body');
      if (body) animations.push(animate(body, { opacity: [0.6, 1], y: [8, 0] }, { duration: 0.28, ease }));
    };
    root.addEventListener('toggle', revealCaseStudy, true);

    return () => {
      cleanups.forEach(cleanup => cleanup());
      animations.forEach(animation => { animation.complete(); animation.stop(); });
      root.removeEventListener('toggle', revealCaseStudy, true);
      // Stop active animations and remove their styles if motion is switched off.
      const animated = root.querySelectorAll<HTMLElement>('[style]');
      animated.forEach(element => {
        if (element.matches('.hero-copy > *, .featured-work, .case-study-body') || Array.from(reveals).includes(element)) {
          element.getAnimations().forEach(animation => animation.cancel());
          element.style.removeProperty('opacity');
          element.style.removeProperty('transform');
        }
      });
    };
  }, [animate, reducedMotion, scope]);

  return <div ref={scope} className="portfolio-motion" data-motion={reducedMotion === false ? 'on' : 'off'}>{children}</div>;
}
