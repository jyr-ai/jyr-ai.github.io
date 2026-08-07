import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';

const REDUCE_QUERY = '(prefers-reduced-motion: reduce)';

/** Track the user's reduced-motion preference. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(REDUCE_QUERY).matches
  );
  useEffect(() => {
    const mq = window.matchMedia(REDUCE_QUERY);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

/** Global buttery smooth scrolling via Lenis. Skipped for reduced-motion. */
export function useLenis(enabled = true) {
  useEffect(() => {
    if (!enabled) return undefined;
    if (window.matchMedia(REDUCE_QUERY).matches) return undefined;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.2,
    });
    window.__lenis = lenis;

    let raf = 0;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.__lenis = null;
    };
  }, [enabled]);
}

/** Toggle a boolean true once the element scrolls into view (fires once). */
export function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const { threshold = 0.18, rootMargin = '0px 0px -10% 0px' } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);

  return [ref, inView];
}
