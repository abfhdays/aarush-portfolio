'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { prepareWithSegments, layoutNextLineRange, materializeLineRange, type LayoutCursor } from '@chenglou/pretext';

interface DragReflowBioProps {
  text: string;
}

export default function DragReflowBio({ text }: DragReflowBioProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  const circleRef = useRef({ x: 0, y: 0, radius: 55, visible: false });
  const targetCircleRef = useRef({ x: 0, y: 0 });
  const draggingRef = useRef(false);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const [hintVisible, setHintVisible] = useState(true);

  const FONT_SIZE = 15;
  const FONT = `400 ${FONT_SIZE}px -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif`;
  const LINE_HEIGHT = FONT_SIZE * 1.6;
  const CIRCLE_RADIUS = 55;
  const PADDING = 8;

  const resetCircle = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const w = container.offsetWidth;
    const defaultX = w - CIRCLE_RADIUS - PADDING;
    const defaultY = CIRCLE_RADIUS + PADDING;
    circleRef.current = { x: defaultX, y: defaultY, radius: CIRCLE_RADIUS, visible: true };
    targetCircleRef.current = { x: defaultX, y: defaultY };
  }, []);

  const renderFrame = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = container.offsetWidth;

    const circle = circleRef.current;
    const target = targetCircleRef.current;

    circle.x += (target.x - circle.x) * 0.18;
    circle.y += (target.y - circle.y) * 0.18;

    const prepared = prepareWithSegments(text, FONT);

    let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 };
    let y = 0;

    interface RenderedLine {
      text: string;
      x: number;
      y: number;
      width: number;
    }
    const renderedLines: RenderedLine[] = [];

    while (true) {
      const lineCenterY = y + LINE_HEIGHT / 2;
      const dy = lineCenterY - circle.y;
      let lineMaxWidth = w;

      if (circle.visible && Math.abs(dy) < circle.radius + LINE_HEIGHT / 2) {
        const overlap = Math.sqrt(Math.max(0, circle.radius * circle.radius - dy * dy));
        if (overlap > 0) {
          const circleLeft = circle.x - overlap;
          const circleRight = circle.x + overlap;

          if (circleLeft < w / 2) {
            const indent = circleRight + PADDING;
            lineMaxWidth = w - indent;
            const range = layoutNextLineRange(prepared, cursor, lineMaxWidth);
            if (range === null) break;
            const line = materializeLineRange(prepared, range);
            renderedLines.push({ text: line.text, x: indent, y: y + FONT_SIZE, width: line.width });
            cursor = range.end;
            y += LINE_HEIGHT;
            continue;
          } else {
            lineMaxWidth = circleLeft - PADDING;
          }
        }
      }

      const range = layoutNextLineRange(prepared, cursor, Math.max(lineMaxWidth, 50));
      if (range === null) break;
      const line = materializeLineRange(prepared, range);
      renderedLines.push({ text: line.text, x: 0, y: y + FONT_SIZE, width: line.width });
      cursor = range.end;
      y += LINE_HEIGHT;
    }

    const totalHeight = y + LINE_HEIGHT;
    canvas.width = w * dpr;
    canvas.height = totalHeight * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${totalHeight}px`;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(dpr, dpr);

    if (circle.visible) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(23, 23, 23, 0.04)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(23, 23, 23, 0.1)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.font = `500 10px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`;
      ctx.fillStyle = 'rgba(82, 82, 82, 0.5)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      if (hintVisible && !draggingRef.current) {
        ctx.fillText('drag me', circle.x, circle.y);
      }
      ctx.restore();
    }

    ctx.font = FONT;
    ctx.fillStyle = '#525252';
    ctx.textBaseline = 'alphabetic';

    for (const line of renderedLines) {
      ctx.fillText(line.text, line.x, line.y);
    }

    ctx.restore();
  }, [text, hintVisible]);

  useEffect(() => {
    resetCircle();

    let running = true;
    function loop() {
      if (!running) return;
      renderFrame();
      rafRef.current = requestAnimationFrame(loop);
    }
    loop();

    const handleResize = () => {
      resetCircle();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [renderFrame, resetCircle]);

  const getEventPos = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, []);

  const isInCircle = useCallback((pos: { x: number; y: number }) => {
    const c = circleRef.current;
    const dx = pos.x - c.x;
    const dy = pos.y - c.y;
    return dx * dx + dy * dy <= c.radius * c.radius;
  }, []);

  const handlePointerDown = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const pos = getEventPos(e);
    if (isInCircle(pos)) {
      draggingRef.current = true;
      dragOffsetRef.current = { x: pos.x - circleRef.current.x, y: pos.y - circleRef.current.y };
      setHintVisible(false);
    }
  }, [getEventPos, isInCircle]);

  const handlePointerMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!draggingRef.current) return;
    const pos = getEventPos(e);
    targetCircleRef.current = {
      x: pos.x - dragOffsetRef.current.x,
      y: pos.y - dragOffsetRef.current.y,
    };
  }, [getEventPos]);

  const handlePointerUp = useCallback(() => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    const container = containerRef.current;
    if (!container) return;
    const w = container.offsetWidth;
    targetCircleRef.current = { x: w - CIRCLE_RADIUS - PADDING, y: CIRCLE_RADIUS + PADDING };
  }, []);

  return (
    <div ref={containerRef} className="w-full relative">
      <canvas
        ref={canvasRef}
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
        className="block w-full cursor-grab active:cursor-grabbing"
        style={{ touchAction: 'none' }}
      />
    </div>
  );
}
