import React from 'react';
import { useBorderGlow } from '../../hooks/useBorderGlow';

interface CapsuleBadgeProps {
  name: string;
  onClick?: () => void;
}

export const CapsuleBadge: React.FC<CapsuleBadgeProps> = ({ name, onClick }) => {
  const { cardRef, handlePointerMove, handlePointerLeave } = useBorderGlow();

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={onClick}
      className="border-glow-capsule group relative shrink-0 cursor-pointer select-none rounded-full px-4 py-1.5 sm:px-5 sm:py-2 border border-white/[0.08] bg-[#0c121e]/85 backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-[#141d2e] hover:border-emerald-400 hover:shadow-[0_0_18px_rgba(16,185,129,0.4)]"
    >
      <span className="font-mono text-xs sm:text-[13px] font-medium text-slate-400 group-hover:text-white group-hover:font-semibold transition-colors duration-200">
        {name}
      </span>
    </div>
  );
};
