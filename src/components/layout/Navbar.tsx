import React, { useState, useRef, useEffect } from 'react';
import { 
  Sun, 
  Moon, 
  Menu, 
  Download, 
  FileText, 
  Printer, 
  PlayCircle, 
  BookOpen, 
  ChevronRight, 
  Lock 
} from 'lucide-react';
import type { TopicItem } from '../../types';
import { exportTopicToMarkdown, printCurrentTopic } from '../../utils/exportNotes';

interface NavbarProps {
  activeTopic: TopicItem;
  currentView: 'concept' | 'visualizer';
  onViewChange: (view: 'concept' | 'visualizer') => void;
  onGoHome: () => void;
  onToggleMobileSidebar: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTopic,
  currentView,
  onViewChange,
  onGoHome,
  onToggleMobileSidebar,
  theme,
  onToggleTheme,
}) => {
  const [isDownloadMenuOpen, setIsDownloadMenuOpen] = useState(false);
  const downloadMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (downloadMenuRef.current && !downloadMenuRef.current.contains(event.target as Node)) {
        setIsDownloadMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isTopicLocked = activeTopic.isLocked;

  return (
    <header className="h-16 shrink-0 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0c121e]/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between no-print transition-colors z-30">
      {/* Left Section: Mobile Trigger & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileSidebar}
          aria-label="Toggle navigation menu"
          className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        <button
          onClick={onGoHome}
          className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          title="Return to Home"
        >
          <div className="w-7 h-7 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bold text-xs shadow-sm">
            DSA
          </div>
          <span className="hidden sm:inline font-semibold text-xs tracking-tight text-slate-800 dark:text-slate-200">
            Studio
          </span>
        </button>

        <ChevronRight className="w-4 h-4 text-slate-400 hidden sm:inline" />

        <div className="hidden md:flex flex-col">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">
            {activeTopic.moduleTitle}
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate max-w-xs">
              {activeTopic.title}
            </span>
            {isTopicLocked && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700">
                <Lock className="w-2.5 h-2.5" />
                Locked
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Right Section: View Switcher, Notes Downloader, Theme Toggle */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Concept vs Visualizer Mode Switcher */}
        {!isTopicLocked ? (
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60">
            <button
              onClick={() => onViewChange('concept')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentView === 'concept'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Concept Notes</span>
            </button>

            {activeTopic.visualizerType && (
              <button
                onClick={() => onViewChange('visualizer')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  currentView === 'visualizer'
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <PlayCircle className="w-3.5 h-3.5" />
                <span>Visualizer</span>
              </button>
            )}
          </div>
        ) : (
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-400 font-mono">
            <Lock className="w-3.5 h-3.5" />
            <span>Milestone Locked</span>
          </div>
        )}

        {/* Download Notes Dropdown (Only for unlocked topics) */}
        {!isTopicLocked && (
          <div className="relative" ref={downloadMenuRef}>
            <button
              onClick={() => setIsDownloadMenuOpen(!isDownloadMenuOpen)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium transition-colors"
              title="Download Notes for this topic"
            >
              <Download className="w-3.5 h-3.5 text-sky-500" />
              <span className="hidden sm:inline">Download Notes</span>
            </button>

            {isDownloadMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl p-1.5 z-50 animate-in fade-in zoom-in-95">
                <button
                  onClick={() => {
                    exportTopicToMarkdown(activeTopic);
                    setIsDownloadMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <FileText className="w-4 h-4 text-emerald-500" />
                  <div>
                    <div className="font-semibold">Markdown (.md)</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">Offline portable format</div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    printCurrentTopic();
                    setIsDownloadMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <Printer className="w-4 h-4 text-sky-500" />
                  <div>
                    <div className="font-semibold">Print / Save PDF</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">Formatted study sheet</div>
                  </div>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Theme Toggle Button */}
        <button
          onClick={onToggleTheme}
          aria-label="Toggle theme mode"
          className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
        </button>
      </div>
    </header>
  );
};
