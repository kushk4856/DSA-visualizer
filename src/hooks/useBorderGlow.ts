import { useEffect, useRef, useCallback } from 'react';

export function useBorderGlow() {
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const cx = rect.width / 2;
    const cy = rect.height / 2;

    const dx = x - cx;
    const dy = y - cy;

    // Edge proximity calculation
    let kx = Infinity;
    let ky = Infinity;
    if (dx !== 0) kx = cx / Math.abs(dx);
    if (dy !== 0) ky = cy / Math.abs(dy);

    const edge = Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);

    // Cursor angle calculation (+90deg to align standard polar to CSS conic gradient top)
    let degrees = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
    if (degrees < 0) degrees += 360;

    card.style.setProperty('--cursor-angle', `${degrees.toFixed(2)}deg`);
    card.style.setProperty('--edge-proximity', (edge * 100).toFixed(2));
    card.style.setProperty('--mouse-x', `${((x / rect.width) * 100).toFixed(2)}%`);
    card.style.setProperty('--mouse-y', `${((y / rect.height) * 100).toFixed(2)}%`);
  }, []);

  const handlePointerLeave = useCallback(() => {
    const card = cardRef.current;
    if (card) {
      card.style.setProperty('--edge-proximity', '0');
    }
  }, []);

  // Initial 360-degree intro sweep animation
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const duration = 1200;
    const startTime = performance.now();
    let animId: number;

    function animateSweep(time: number) {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);

      if (card && !card.matches(':hover')) {
        card.style.setProperty('--edge-proximity', (Math.sin(progress * Math.PI) * 100).toFixed(2));
        card.style.setProperty('--cursor-angle', `${(progress * 360).toFixed(2)}deg`);
      }

      if (progress < 1) {
        animId = requestAnimationFrame(animateSweep);
      } else if (card && !card.matches(':hover')) {
        card.style.setProperty('--edge-proximity', '0');
      }
    }

    animId = requestAnimationFrame(animateSweep);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  return { cardRef, handlePointerMove, handlePointerLeave };
}
