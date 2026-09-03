import React from 'react';
import { useBorderGlow } from '../../hooks/useBorderGlow';

interface GlowCardProps {
  name: string;
  category?: string;
  complexity?: string;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export const GlowCard: React.FC<GlowCardProps> = ({
  name,
  category,
  complexity,
  onClick,
  className = '',
  children
}) => {
  const { cardRef, handlePointerMove, handlePointerLeave } = useBorderGlow();

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={onClick}
      className={`border-glow-card cursor-pointer select-none ${className}`}
    >
      {children || (
        <div className="px-4 py-2.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 dark:bg-sky-400 shadow-[0_0_8px_#38bdf8] shrink-0 animate-pulse" />
            <span className="text-xs font-bold font-mono truncate text-slate-800 dark:text-slate-100 tracking-tight">
              {name}
            </span>
          </div>
          {complexity && (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-200/80 dark:bg-slate-800 text-sky-700 dark:text-sky-300 shrink-0 font-bold border border-slate-300 dark:border-slate-700">
              {complexity}
            </span>
          )}
          {category && !complexity && (
            <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 shrink-0">
              {category}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
