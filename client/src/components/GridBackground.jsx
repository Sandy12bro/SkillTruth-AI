import React, { useEffect, useRef } from 'react';

const GridBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    
    let width, height, dpr;
    let grid = [];
    const squareSize = 80;
    const influenceRadius = 250; // Increased radius for better visibility
    const mouse = { x: -9999, y: -9999 };

    const setupCanvas = () => {
      dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      initGrid();
    };

    const initGrid = () => {
      grid = [];
      const cols = Math.ceil(width / squareSize) + 1;
      const rows = Math.ceil(height / squareSize) + 1;

      for (let x = 0; x < cols * squareSize; x += squareSize) {
        for (let y = 0; y < rows * squareSize; y += squareSize) {
          grid.push({
            x,
            y,
            baseX: x,
            baseY: y,
            vx: 0,
            vy: 0,
            alpha: 0
          });
        }
      }
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const drawGrid = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains('dark');
      // "Coding Vibes" Emerald Green Palette
      const accentColor = isDark ? "34, 197, 94" : "99, 102, 241"; 
      
      // Increased Base Visibility
      const baseOpacity = isDark ? 0.08 : 0.04;

      for (let i = 0; i < grid.length; i++) {
        const cell = grid[i];

        const centerX = cell.x + squareSize / 2;
        const centerY = cell.y + squareSize / 2;

        const dx = mouse.x - centerX;
        const dy = mouse.y - centerY;
        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq);

        // Anti-gravity Force (Strengthened)
        if (dist < influenceRadius) {
          const force = (1 - dist / influenceRadius);
          const angle = Math.atan2(dy, dx);
          
          cell.vx += Math.cos(angle) * force * -5.0; // Pushed force from 3.5 to 5.0
          cell.vy += Math.sin(angle) * force * -5.0;

          // Faster alpha increment (from 0.15 to 0.4)
          cell.alpha = Math.min(1, cell.alpha + force * 0.4);
        }

        // Spring Physics Return
        const springX = (cell.baseX - cell.x) * 0.06;
        const springY = (cell.baseY - cell.y) * 0.06;
        
        cell.vx += springX;
        cell.vy += springY;

        // Friction
        cell.vx *= 0.90; // Slightly more friction for "snappier" feel
        cell.vy *= 0.90;

        cell.x += cell.vx;
        cell.y += cell.vy;

        // Fade Alpha
        cell.alpha *= 0.94; // Slower fade for persistent trail

        // Interaction Opacity + Base Opacity (always visible)
        const interactionOpacity = cell.alpha * (isDark ? 0.6 : 0.4);
        const finalOpacity = Math.max(baseOpacity, interactionOpacity);

        if (finalOpacity > 0.01) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${accentColor}, ${finalOpacity})`;
          // Dynamic line width based on interaction
          ctx.lineWidth = 1 + cell.alpha * 2;
          ctx.strokeRect(cell.x, cell.y, squareSize, squareSize);
          
          // Enhanced Corner Dots
          if (cell.alpha > 0.1) {
             ctx.fillStyle = `rgba(${accentColor}, ${finalOpacity * 1.5})`;
             ctx.fillRect(cell.x - 1, cell.y - 1, 3, 3);
          }
        }
      }

      requestAnimationFrame(drawGrid);
    };

    window.addEventListener("resize", setupCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    
    setupCanvas();
    drawGrid();

    return () => {
      window.removeEventListener("resize", setupCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};

export default GridBackground;
