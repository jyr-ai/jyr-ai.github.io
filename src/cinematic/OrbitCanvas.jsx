import { useEffect, useRef } from 'react';

/**
 * Pseudo-3D Vitruvian orbit: a rotating circle + square frame wrapped by three
 * tilted electron orbits with glowing particle trails. Self-animates on rAF and
 * reads scroll progress (0..1) from progressRef to scrub rotation and pull the
 * rings inward as the hero figure "resolves" — synced to the hero video scrub.
 *
 * @param {{ progressRef: { current: number }, reduced: boolean }} props
 */
export default function OrbitCanvas({ progressRef, reduced }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;
    const start = performance.now();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const orbits = [
      { tilt: 0.30, phase: 0.0, speed: 0.9, color: '23,240,166' },
      { tilt: 0.60, phase: 2.1, speed: -0.7, color: '60,224,210' },
      { tilt: 0.90, phase: 4.0, speed: 1.25, color: '150,255,210' },
    ];

    const draw = (now) => {
      const t = (now - start) / 1000;
      const p = progressRef && typeof progressRef.current === 'number' ? progressRef.current : 0;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const base = Math.min(w, h) * 0.4;
      const conv = 1 - 0.35 * p;               // rings tighten as figure resolves
      const rot = t * 0.12 + p * 1.4;          // scrub accelerates rotation
      const fade = 1 - p * 0.55;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.globalCompositeOperation = 'lighter';

      // Vitruvian frame: circle + rotating square
      ctx.lineWidth = 1.2;
      ctx.shadowColor = 'rgba(23,240,166,0.7)';
      ctx.shadowBlur = 14;
      ctx.strokeStyle = `rgba(23,240,166,${0.5 * fade})`;
      ctx.beginPath();
      ctx.arc(0, 0, base * conv, 0, Math.PI * 2);
      ctx.stroke();

      ctx.save();
      ctx.rotate(rot * 0.5);
      const s = base * conv * 0.92;
      ctx.strokeStyle = `rgba(120,255,205,${0.34 * fade})`;
      ctx.strokeRect(-s, -s, s * 2, s * 2);
      ctx.restore();

      // Orbits + electrons
      orbits.forEach((o, i) => {
        const rx = base * (1.15 + i * 0.28) * conv;
        const ry = rx * o.tilt;
        const oa = rot * o.speed + o.phase;

        ctx.save();
        ctx.rotate(o.phase * 0.3 + t * 0.03 * (i + 1));

        ctx.beginPath();
        ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
        ctx.lineWidth = 1;
        ctx.shadowBlur = 8;
        ctx.strokeStyle = `rgba(${o.color},${0.22 * fade})`;
        ctx.stroke();

        const depth = (Math.sin(oa) + 1) / 2; // 0 behind .. 1 front
        const ex = Math.cos(oa) * rx;
        const ey = Math.sin(oa) * ry;
        const er = 2.5 + depth * 4.5;

        // trail
        for (let k = 6; k >= 1; k--) {
          const ta = oa - k * 0.1 * (o.speed >= 0 ? 1 : -1);
          const tx = Math.cos(ta) * rx;
          const ty = Math.sin(ta) * ry;
          ctx.beginPath();
          ctx.arc(tx, ty, er * (1 - k / 8), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${o.color},${0.28 * (1 - k / 7) * (0.4 + depth)})`;
          ctx.fill();
        }

        // electron head
        ctx.beginPath();
        ctx.arc(ex, ey, er, 0, Math.PI * 2);
        ctx.shadowColor = 'rgba(23,240,166,0.9)';
        ctx.shadowBlur = 18 * depth + 6;
        ctx.fillStyle = `rgba(${o.color},${0.5 + depth * 0.5})`;
        ctx.fill();

        ctx.restore();
      });

      ctx.restore();
      if (!reduced) raf = requestAnimationFrame(draw);
    };

    if (reduced) draw(performance.now());
    else raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [progressRef, reduced]);

  return <canvas ref={canvasRef} className="hero__canvas" aria-hidden="true" />;
}
