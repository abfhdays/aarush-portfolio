'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { prepareWithSegments, layoutNextLineRange, materializeLineRange, type LayoutCursor } from '@chenglou/pretext';

interface EditorialFlowProps {
  text: string;
  imageUrl: string;
  imageWidth?: number;
  imageHeight?: number;
}

export default function EditorialFlow({
  text,
  imageUrl,
  imageWidth = 140,
  imageHeight = 120,
}: EditorialFlowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  const FONT_SIZE = 15;
  const FONT = `400 ${FONT_SIZE}px -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif`;
  const LINE_HEIGHT = FONT_SIZE * 1.65;
  const IMG_PADDING = 14;
  const IMG_TOP_OFFSET = 4;

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      setImgLoaded(true);
    };
    img.src = imageUrl;
  }, [imageUrl]);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const containerWidth = container.offsetWidth;

    const imgW = Math.min(imageWidth, containerWidth * 0.35);
    const imgH = (imgW / imageWidth) * imageHeight;
    const imgX = containerWidth - imgW;
    const imgY = IMG_TOP_OFFSET;
    const imgBottom = imgY + imgH + IMG_PADDING;

    const prepared = prepareWithSegments(text, FONT);

    let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 };
    let y = 0;

    interface RenderedLine {
      text: string;
      x: number;
      y: number;
    }
    const lines: RenderedLine[] = [];

    while (true) {
      let maxWidth = containerWidth;

      if (y + LINE_HEIGHT > imgY && y < imgBottom) {
        maxWidth = imgX - IMG_PADDING;
      }

      maxWidth = Math.max(maxWidth, 60);
      const range = layoutNextLineRange(prepared, cursor, maxWidth);
      if (range === null) break;

      const line = materializeLineRange(prepared, range);
      lines.push({ text: line.text, x: 0, y: y + FONT_SIZE });
      cursor = range.end;
      y += LINE_HEIGHT;
    }

    const totalHeight = Math.max(y + 8, imgBottom + 8);
    canvas.width = containerWidth * dpr;
    canvas.height = totalHeight * dpr;
    canvas.style.width = `${containerWidth}px`;
    canvas.style.height = `${totalHeight}px`;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(dpr, dpr);

    if (imgRef.current && imgLoaded) {
      ctx.save();
      ctx.globalAlpha = 0.75;
      const borderRadius = 6;
      ctx.beginPath();
      ctx.moveTo(imgX + borderRadius, imgY);
      ctx.lineTo(imgX + imgW - borderRadius, imgY);
      ctx.quadraticCurveTo(imgX + imgW, imgY, imgX + imgW, imgY + borderRadius);
      ctx.lineTo(imgX + imgW, imgY + imgH - borderRadius);
      ctx.quadraticCurveTo(imgX + imgW, imgY + imgH, imgX + imgW - borderRadius, imgY + imgH);
      ctx.lineTo(imgX + borderRadius, imgY + imgH);
      ctx.quadraticCurveTo(imgX, imgY + imgH, imgX, imgY + imgH - borderRadius);
      ctx.lineTo(imgX, imgY + borderRadius);
      ctx.quadraticCurveTo(imgX, imgY, imgX + borderRadius, imgY);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(imgRef.current, imgX, imgY, imgW, imgH);
      ctx.restore();
    }

    ctx.font = FONT;
    ctx.fillStyle = '#525252';
    ctx.textBaseline = 'alphabetic';

    for (const line of lines) {
      ctx.fillText(line.text, line.x, line.y);
    }

    ctx.restore();
  }, [text, imageUrl, imageWidth, imageHeight, imgLoaded]);

  useEffect(() => {
    render();
    window.addEventListener('resize', render);
    return () => window.removeEventListener('resize', render);
  }, [render]);

  return (
    <div ref={containerRef} className="w-full">
      <canvas ref={canvasRef} className="block w-full" aria-label={text} role="img" />
    </div>
  );
}
