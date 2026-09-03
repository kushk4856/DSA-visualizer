import React from 'react';
import { 
  ChevronRight,
  Sun,
  Moon
} from 'lucide-react';
import { TiltedBackgroundGrid } from './TiltedBackgroundGrid';

interface LandingHeroProps {
  onStartLearning: () => void;
  onExploreVisualizer: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ 
  onStartLearning, 
  onExploreVisualizer,
  theme,
  onToggleTheme
}) => {
  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#020408] text-slate-100">
      {/* 100% Full-Viewport Tilted Background Grid */}
      <TiltedBackgroundGrid onBadgeClick={onStartLearning} />

      {/* Subtle Center Radial Dark Splash for Crystal-Clear Text Legibility */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[780px] h-[520px] pointer-events-none z-10 [background:radial-gradient(circle_at_center,rgba(2,4,8,0.94)_0%,rgba(2,4,8,0.78)_45%,rgba(2,4,8,0.25)_70%,transparent_100%)]"
      />

      {/* Subtle Ambient Emerald Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[320px] bg-emerald-500/10 blur-[140px] rounded-full pointer-events-none z-10" />

      {/* Top Navbar */}
      <header className="relative z-20 max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="w-8 h-8 rounded-full bg-emerald-500 text-black flex items-center justify-center font-extrabold text-sm shadow-[0_0_18px_#10b981]">
            DSA
          </div>
          <div>
            <h1 className="font-bold text-base tracking-tight text-white flex items-center gap-2">
              <span>DSA Studio</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/90 text-emerald-400 border border-emerald-500/30">
                v1.0
              </span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 pointer-events-auto">
          <button
            onClick={onStartLearning}
            className="text-xs font-semibold px-4 py-2 rounded-full border border-white/10 bg-black/60 backdrop-blur-md hover:bg-white/10 text-slate-300 transition-colors"
          >
            Syllabus (8 Modules)
          </button>
          
          <button
            onClick={onExploreVisualizer}
            className="text-xs font-bold px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black transition-all shadow-[0_0_15px_rgba(16,185,129,0.45)]"
          >
            Open Active Topics
          </button>

          {/* Landing Page Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme mode"
            className="p-2 rounded-full border border-white/10 bg-black/60 text-slate-300 hover:text-white hover:bg-white/10 transition-colors backdrop-blur-md"
            title="Toggle Light / Dark mode"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-300" />}
          </button>
        </div>
      </header>

      {/* Center Hero Section */}
      <main className="relative z-20 max-w-4xl mx-auto px-6 text-center my-auto py-12 space-y-7 pointer-events-none">
        {/* Main Hero Headline */}
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] drop-shadow-[0_4px_28px_rgba(0,0,0,1)] select-none">
            Craft your code with our{' '}
            <span className="text-emerald-400 font-black drop-shadow-[0_0_25px_rgba(16,185,129,0.7)]">
              DSA visualizers
            </span>
            , turning <br className="hidden sm:inline" />
            complexity into simplicity!
          </h2>

          {/* Triple Checkpoint Features */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-2 text-xs sm:text-sm font-medium text-slate-200 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] select-none">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full border border-emerald-400 flex items-center justify-center bg-black/70">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </span>
              <span>Read the concept</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full border border-emerald-400 flex items-center justify-center bg-black/70">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </span>
              <span>Step in visualizer</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full border border-emerald-400 flex items-center justify-center bg-black/70">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </span>
              <span>Download notes</span>
            </div>
          </div>
        </div>

        {/* Primary Action Button */}
        <div className="pt-2">
          <button
            onClick={onStartLearning}
            className="pointer-events-auto inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/20 bg-black/90 hover:bg-black backdrop-blur-md text-white font-semibold text-sm hover:border-emerald-400/80 hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all group"
          >
            <span>Browse DSA Topics</span>
            <ChevronRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </main>

      {/* Spacer to maintain vertical balance */}
      <div className="py-2" />
    </div>
  );
};
