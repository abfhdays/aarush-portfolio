"use client";

import { useEffect, useRef } from "react";

// Adapted from Magic UI's Flickering Grid; see FlickeringGrid.LICENSE.
export default function FlickeringGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const squareSize = 3;
    const gridGap = 9;
    const maxOpacity = 0.14;
    const flickerChance = 0.08;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let columns = 0;
    let rows = 0;
    let squares = new Float32Array(0);
    let frameId = 0;
    let lastTime = 0;

    const draw = () => {
      context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      context.fillStyle = "#6b7280";
      for (let column = 0; column < columns; column++) {
        for (let row = 0; row < rows; row++) {
          context.globalAlpha = squares[column * rows + row];
          context.fillRect(
            column * (squareSize + gridGap),
            row * (squareSize + gridGap),
            squareSize,
            squareSize,
          );
        }
      }
      context.globalAlpha = 1;
    };

    const resize = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      columns = Math.ceil(width / (squareSize + gridGap));
      rows = Math.ceil(height / (squareSize + gridGap));
      squares = new Float32Array(columns * rows);
      for (let index = 0; index < squares.length; index++) {
        squares[index] = Math.random() * maxOpacity;
      }
      draw();
    };

    const animate = (time: number) => {
      const deltaTime = (time - lastTime) / 1000;
      if (deltaTime >= 1 / 12) {
        for (let index = 0; index < squares.length; index++) {
          if (Math.random() < flickerChance * deltaTime) {
            squares[index] = Math.random() * maxOpacity;
          }
        }
        draw();
        lastTime = time;
      }
      frameId = requestAnimationFrame(animate);
    };

    const syncAnimation = () => {
      cancelAnimationFrame(frameId);
      if (!motion.matches && !document.hidden) {
        lastTime = performance.now();
        frameId = requestAnimationFrame(animate);
      }
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    motion.addEventListener("change", syncAnimation);
    document.addEventListener("visibilitychange", syncAnimation);
    syncAnimation();

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      motion.removeEventListener("change", syncAnimation);
      document.removeEventListener("visibilitychange", syncAnimation);
    };
  }, []);

  return <canvas ref={canvasRef} className="site-grid" aria-hidden="true" />;
}
