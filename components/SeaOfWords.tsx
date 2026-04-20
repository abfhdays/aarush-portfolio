'use client';

import { useEffect, useRef } from 'react';

const KEYWORDS = [
  'Go', 'Python', 'TypeScript', 'Kubernetes', 'GraphRAG', 'Spark',
  'PostgreSQL', 'Docker', 'Dgraph', 'PySpark', 'Databricks', 'PyTorch',
  'TensorFlow', 'Redis', 'gRPC', 'Helm', 'CI/CD', 'SQL', 'REST',
  'goroutines', 'channels', 'S3', 'ETL', 'transformers', 'RAG',
  'DuckDB', 'Polars', 'SQLGlot', 'Next.js', 'React', 'Tailwind',
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  text: string;
  font: string;
  width: number;
  phase: number;
  speed: number;
}

export default function SeaOfWords() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    }

    resize();
    window.addEventListener('resize', resize);

    const sizes = [12, 13, 14, 15, 16, 18];

    function initParticles() {
      if (!ctx) return;
      const count = Math.min(KEYWORDS.length * 2, 50);
      const particles: Particle[] = [];

      for (let i = 0; i < count; i++) {
        const text = KEYWORDS[i % KEYWORDS.length];
        const size = sizes[Math.floor(Math.random() * sizes.length)];
        const font = `${size}px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`;
        ctx.font = font;
        const width = ctx.measureText(text).width;

        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.2,
          text,
          font,
          width,
          phase: Math.random() * Math.PI * 2,
          speed: 0.3 + Math.random() * 0.4,
        });
      }
      particlesRef.current = particles;
    }

    initParticles();

    let lastTime = 0;

    function animate(time: number) {
      if (!ctx || !canvas) return;
      const dt = lastTime ? Math.min((time - lastTime) / 16.67, 3) : 1;
      lastTime = time;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      const w = window.innerWidth;
      const h = window.innerHeight;

      for (const p of particlesRef.current) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        const sineOffset = Math.sin(time * 0.0005 * p.speed + p.phase) * 1.5;

        if (p.x > w + p.width) p.x = -p.width;
        if (p.x < -p.width) p.x = w + p.width;
        if (p.y > h + 20) p.y = -20;
        if (p.y < -20) p.y = h + 20;

        ctx.font = p.font;
        ctx.fillStyle = 'rgba(23, 23, 23, 0.05)';
        ctx.fillText(p.text, p.x, p.y + sineOffset);
      }

      ctx.restore();
      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
