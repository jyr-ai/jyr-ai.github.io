import { useEffect, useRef } from 'react';
import OrbitCanvas from './OrbitCanvas';
import KineticName from './KineticName';
import { useReducedMotion } from './hooks';

const HERO_VIDEO = 'videos/hero-vitruvian.mp4';
const COPY_FADE_END = 0.42; // portion of hero scroll over which the title fades out

/**
 * Sticky hero stage. Scroll position (0..1 across the tall hero) scrubs the
 * Seedance Vitruvian→JYR video frame-by-frame and drives the live orbit canvas,
 * while the kinetic title lifts and fades away.
 */
export default function Hero() {
  const reduced = useReducedMotion();
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const wrapRef = useRef(null);
  const copyRef = useRef(null);
  const progressRef = useRef(0);
  const targetTime = useRef(0);
  const curTime = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (video) video.pause();

    if (reduced) {
      const setFinal = () => {
        try {
          video.currentTime = (video.duration || 8) * 0.96;
        } catch (e) {
          /* seek not ready */
        }
      };
      if (video) {
        if (video.readyState >= 1) setFinal();
        else video.addEventListener('loadedmetadata', setFinal, { once: true });
      }
      return undefined;
    }

    let raf = 0;
    const loop = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      progressRef.current = p;

      if (video && video.duration) {
        targetTime.current = p * (video.duration - 0.05);
        curTime.current += (targetTime.current - curTime.current) * 0.18;
        if (Math.abs(targetTime.current - curTime.current) > 0.008) {
          try {
            video.currentTime = curTime.current;
          } catch (e) {
            /* ignore transient seek errors */
          }
        }
      }

      if (copyRef.current) {
        const c = Math.min(1, p / COPY_FADE_END);
        copyRef.current.style.opacity = String(1 - c);
        copyRef.current.style.transform = `translateY(${-c * 60}px)`;
      }
      if (wrapRef.current) {
        const scale = 0.86 + Math.min(1, p / 0.6) * 0.14;
        wrapRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`;
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  return (
    <section className="hero" ref={sectionRef} id="home">
      <div className="hero__stage">
        <div className="hero__videowrap" ref={wrapRef}>
          <video
            ref={videoRef}
            className="hero__video"
            src={HERO_VIDEO}
            poster="images/vitruvian3.png"
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
          />
        </div>

        <OrbitCanvas progressRef={progressRef} reduced={reduced} />

        <div className="hero__copy" ref={copyRef}>
          <p className="hero__eyebrow">Human-centered AI · for creatives</p>
          <KineticName />
          <p className="hero__tag">
            The measure of the machine is the <em>human</em> at its center.
          </p>
        </div>

        <div className="hero__cue">
          <span>Scroll</span>
        </div>
      </div>
    </section>
  );
}
