import React, { useState } from 'react';
import { 
  Clock, 
  Database, 
  Sparkles, 
  Check, 
  Copy, 
  PlayCircle, 
  ArrowLeft, 
  ArrowRight, 
  BookMarked, 
  Code2, 
  Lightbulb, 
  Lock, 
  FileText 
} from 'lucide-react';
import type { TopicItem, Language } from '../../types';

interface ConceptViewerProps {
  topic: TopicItem;
  onOpenVisualizer: () => void;
  onPrevTopic?: () => void;
  onNextTopic?: () => void;
}

export const ConceptViewer: React.FC<ConceptViewerProps> = ({
  topic,
  onOpenVisualizer,
  onPrevTopic,
  onNextTopic,
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('javascript');
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    const code = topic.codeSnippets[selectedLanguage];
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const languageLabels: Record<Language, string> = {
    javascript: 'JavaScript',
    python: 'Python 3',
    cpp: 'C++',
    java: 'Java',
  };

  // If topic is locked for future milestone
  if (topic.isLocked) {
    return (
      <article className="max-w-4xl mx-auto px-4 sm:px-8 py-16 text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-500 shadow-sm">
          <Lock className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800/80 px-3 py-1 rounded-md">
            {topic.moduleTitle}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {topic.title}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            {topic.overview}
          </p>
        </div>

        <div className="p-6 max-w-lg mx-auto rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-left space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            <FileText className="w-4 h-4 text-sky-500" />
            <span>Milestone Queue</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            This topic is locked in this milestone. Drop the text or notes whenever you are ready to unlock and populate it step-by-step!
          </p>
        </div>

        {/* Pagination */}
        <footer className="flex items-center justify-between pt-8 border-t border-slate-200 dark:border-slate-800 max-w-lg mx-auto">
          {onPrevTopic ? (
            <button
              onClick={onPrevTopic}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous Topic</span>
            </button>
          ) : <div />}

          {onNextTopic && (
            <button
              onClick={onNextTopic}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-sm"
            >
              <span>Next Topic</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </footer>
      </article>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-8 py-8 space-y-8 text-slate-800 dark:text-slate-200 transition-colors">
      {/* Top Banner: Module context & Title */}
      <header className="space-y-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800/80 px-2.5 py-1 rounded-md">
              {topic.moduleTitle}
            </span>
            <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              {topic.difficulty}
            </span>
          </div>

          {/* Quick Visualizer Trigger Button (Top Right Requirement) */}
          {topic.visualizerType && (
            <button
              onClick={onOpenVisualizer}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs transition-all shadow-md shadow-sky-600/10 hover:shadow-sky-600/20 active:scale-95"
            >
              <PlayCircle className="w-4 h-4" />
              <span>Launch Interactive Visualizer</span>
            </button>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {topic.title}
        </h1>

        {/* Complexity Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] uppercase font-bold text-slate-500 dark:text-slate-400">
                Time Complexity
              </div>
              <div className="text-sm font-mono font-bold text-slate-800 dark:text-slate-100">
                {topic.timeComplexity}
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] uppercase font-bold text-slate-500 dark:text-slate-400">
                Space Complexity
              </div>
              <div className="text-sm font-mono font-bold text-slate-800 dark:text-slate-100">
                {topic.spaceComplexity}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Visualizer Hero Highlight Card */}
      {topic.visualizerType && (
        <div className="rounded-2xl p-5 border border-sky-200 dark:border-sky-800/60 bg-gradient-to-r from-sky-50 to-blue-50/50 dark:from-sky-950/30 dark:to-slate-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-sky-700 dark:text-sky-300">
              <Sparkles className="w-4 h-4" />
              <span>Interactive Step-by-Step Simulation Available</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xl">
              Inspect pointer movements, compare indices in real-time, and run your custom test cases with playback timeline controls.
            </p>
          </div>
          <button
            onClick={onOpenVisualizer}
            className="shrink-0 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-sm"
          >
            Step Through Algorithm &rarr;
          </button>
        </div>
      )}

      {/* Overview Section */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
          <BookMarked className="w-4 h-4 text-sky-500" />
          <span>Core Intuition</span>
        </div>
        <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800/80 text-sm leading-relaxed">
          {topic.overview}
        </div>
      </section>

      {/* Deep-Dive Explanation */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
          <Lightbulb className="w-4 h-4 text-amber-500" />
          <span>Detailed Breakdown</span>
        </div>
        <div className="prose dark:prose-invert max-w-none text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
          {topic.explanation}
        </div>
      </section>

      {/* Key Takeaways & Rules */}
      <section className="space-y-3">
        <div className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
          Key Takeaways & Interview Rules
        </div>
        <ul className="space-y-2">
          {topic.keyTakeaways.map((point, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/70 dark:border-slate-800/70 text-xs text-slate-700 dark:text-slate-300"
            >
              <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center shrink-0 text-[10px]">
                {idx + 1}
              </span>
              <span className="leading-normal">{point}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Multi-Language Code Snippets */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
            <Code2 className="w-4 h-4 text-sky-500" />
            <span>Implementation</span>
          </div>

          {/* Copy Code Button */}
          <button
            onClick={handleCopyCode}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>

        {/* Code Tabs */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-900 text-slate-100 shadow-md">
          <div className="flex items-center gap-1 p-2 bg-slate-950 border-b border-slate-800 overflow-x-auto">
            {(['javascript', 'python', 'cpp', 'java'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors ${
                  selectedLanguage === lang
                    ? 'bg-slate-800 text-sky-400 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                {languageLabels[lang]}
              </button>
            ))}
          </div>

          <pre className="p-4 text-xs font-mono overflow-x-auto leading-relaxed bg-[#0b0f19]">
            <code>{topic.codeSnippets[selectedLanguage]}</code>
          </pre>
        </div>
      </section>

      {/* Bottom Pagination */}
      <footer className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-800 no-print">
        {onPrevTopic ? (
          <button
            onClick={onPrevTopic}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous Topic</span>
          </button>
        ) : <div />}

        {onNextTopic && (
          <button
            onClick={onNextTopic}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-sm"
          >
            <span>Next Topic</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </footer>
    </article>
  );
};
