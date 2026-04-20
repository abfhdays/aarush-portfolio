'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext';

interface CharInfo {
  char: string;
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  offsetY: number;
  phase: number;
  width: number;
}

export default function PretextHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const charsRef = useRef<CharInfo[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number>(0);
  const [ready, setReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dimensionsRef = useRef({ width: 0, height: 0 });

  const FONT_SIZE = 72;
  const FONT = `600 ${FONT_SIZE}px -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif`;
  const LINE_HEIGHT = FONT_SIZE * 1.15;
  const TEXT = "Hi, I'm Aarush";

  const layoutText = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const containerWidth = container.offsetWidth;

    canvas.width = containerWidth * dpr;
    canvas.style.width = `${containerWidth}px`;

    ctx.font = FONT;

    const prepared = prepareWithSegments(TEXT, FONT);
    const { lines } = layoutWithLines(prepared, containerWidth, LINE_HEIGHT);

    const totalHeight = lines.length * LINE_HEIGHT;
    canvas.height = (totalHeight + 20) * dpr;
    canvas.style.height = `${totalHeight + 20}px`;
    dimensionsRef.current = { width: containerWidth, height: totalHeight + 20 };

    const chars: CharInfo[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineY = i * LINE_HEIGHT + FONT_SIZE;
      const lineX = (containerWidth - line.width) / 2;

      ctx.font = FONT;
      let cursorX = lineX;

      for (const grapheme of [...line.text]) {
        const charWidth = ctx.measureText(grapheme).width;
        chars.push({
          char: grapheme,
          x: cursorX,
          y: lineY,
          baseX: cursorX,
          baseY: lineY,
          offsetY: 0,
          phase: Math.random() * Math.PI * 2,
          width: charWidth,
        });
        cursorX += charWidth;
      }
    }

    charsRef.current = chars;
    setReady(true);
  }, []);

  useEffect(() => {
    layoutText();
    window.addEventListener('resize', layoutText);
    return () => window.removeEventListener('resize', layoutText);
  }, [layoutText]);

  useEffect(() => {
    if (!ready) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;

    function animate(time: number) {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.font = FONT;
      ctx.fillStyle = '#171717';
      ctx.textBaseline = 'alphabetic';

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const c of charsRef.current) {
        const breathe = Math.sin(time * 0.001 + c.phase) * 1.8;

        let pushX = 0;
        let pushY = 0;
        const dx = c.baseX + c.width / 2 - mx;
        const dy = c.baseY - FONT_SIZE * 0.35 - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 80;

        if (dist < radius && dist > 0) {
          const force = (1 - dist / radius) * 12;
          pushX = (dx / dist) * force;
          pushY = (dy / dist) * force;
        }

        c.x += (c.baseX + pushX - c.x) * 0.15;
        c.y += (c.baseY + breathe + pushY - c.y) * 0.15;

        ctx.fillText(c.char, c.x, c.y);
      }

      ctx.restore();
      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [ready]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -1000, y: -1000 };
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="block mx-auto cursor-default"
        style={{ maxWidth: '100%' }}
        aria-label={TEXT}
        role="img"
      />
      <noscript>
        <h1 className="m-0 mb-2 text-5xl md:text-6xl font-semibold">{TEXT}</h1>
      </noscript>
    </div>
  );
}
