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
  Compass,
  Layers,
  HelpCircle
} from 'lucide-react';
import type { TopicItem, Language } from '../../types';

interface ConceptViewerProps {
  topic: TopicItem;
  onOpenVisualizer: () => void;
  onPrevTopic?: () => void;
  onNextTopic?: () => void;
}

type ConceptTab = 'intuition' | 'patterns' | 'examples' | 'framework' | 'code';

export const ConceptViewer: React.FC<ConceptViewerProps> = ({
  topic,
  onOpenVisualizer,
  onPrevTopic,
  onNextTopic,
}) => {
  const [activeTab, setActiveTab] = useState<ConceptTab>('intuition');
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('python');
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
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 px-3 py-1 rounded-md">
            {topic.moduleTitle}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">
            {topic.title}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            This module topic is queued for upcoming milestone releases.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 max-w-md mx-auto text-xs text-slate-500 dark:text-slate-400 space-y-2">
          <div className="font-semibold text-slate-700 dark:text-slate-300">Milestone Roadmap Item</div>
          <p>Concept notes, theoretical breakdowns, and custom visualizer state graphs will unlock once the content will be added.</p>
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
    <article className="max-w-4xl mx-auto px-4 sm:px-8 py-8 space-y-6 text-slate-800 dark:text-slate-200 transition-colors">
      {/* Top Banner: Module context & Title */}
      <header className="space-y-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 px-2.5 py-1 rounded-md">
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-md shadow-emerald-600/10 hover:shadow-emerald-600/20 active:scale-95"
            >
              <PlayCircle className="w-4 h-4" />
              <span>Launch Interactive Visualizer</span>
            </button>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {topic.title}
        </h1>

        {/* Complexity Metadata Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">
                Time Complexity
              </div>
              <div className="text-sm font-mono font-bold text-slate-800 dark:text-slate-100">
                {topic.timeComplexity}
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">
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
        <div className="rounded-2xl p-4 border border-emerald-200 dark:border-emerald-800/60 bg-gradient-to-r from-emerald-50/80 to-teal-50/50 dark:from-emerald-950/30 dark:to-slate-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-300">
              <Sparkles className="w-4 h-4" />
              <span>Interactive Step-by-Step Simulation Available</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xl">
              Inspect pointer movements, test target sums, and step through the algorithm in real-time.
            </p>
          </div>
          <button
            onClick={onOpenVisualizer}
            className="shrink-0 px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-sm"
          >
            Step Through Algorithm &rarr;
          </button>
        </div>
      )}

      {/* Modern Compact Topic Navigation Tabs (Prevents Excessive Scrolling) */}
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 overflow-x-auto">
        <button
          onClick={() => setActiveTab('intuition')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'intuition'
              ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <BookMarked className="w-3.5 h-3.5" />
          <span>1. Intuition & Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('patterns')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'patterns'
              ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>2. Core Patterns</span>
        </button>

        <button
          onClick={() => setActiveTab('examples')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'examples'
              ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>3. Practical Examples</span>
        </button>

        <button
          onClick={() => setActiveTab('framework')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'framework'
              ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>4. How to Recognize</span>
        </button>

        <button
          onClick={() => setActiveTab('code')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'code'
              ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>5. Code Implementations</span>
        </button>
      </div>

      {/* Tab Content 1: Intuition & Overview */}
      {activeTab === 'intuition' && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              <Lightbulb className="w-4 h-4 text-emerald-500" />
              <span>1. What is Two Pointers?</span>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-sm leading-relaxed space-y-3">
              <p>
                Two pointers means maintaining two indexes/pointers that move through an array according to domain conditions.
              </p>
              
              <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs border border-slate-800 space-y-2">
                <div className="text-slate-400">// Visualizing two converging indices:</div>
                <div className="text-emerald-400 font-bold">[1, 2, 3, 4, 6]</div>
                <div className="text-sky-400"> ↑           ↑</div>
                <div className="text-sky-400">left        right</div>
              </div>

              <p className="text-slate-600 dark:text-slate-400">
                Instead of checking every pair (1 with 2, 1 with 3, 1 with 4...), we intelligently move <code className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-xs">left</code> and <code className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-xs">right</code>.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              <Clock className="w-4 h-4 text-emerald-500" />
              <span>2. Why Two Pointers? (O(N²) vs O(N))</span>
            </div>
            
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-sm leading-relaxed space-y-4">
              <p>
                Suppose we have <code className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-xs">arr = [1, 2, 3, 4, 6]</code> and <code className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-xs">target = 6</code>.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-red-200 dark:border-red-900/40 bg-red-50/40 dark:bg-red-950/20 space-y-2">
                  <div className="text-xs font-bold text-red-600 dark:text-red-400 flex items-center justify-between">
                    <span>Brute Force (Nested Loops)</span>
                    <span className="font-mono">O(n²)</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Checks every pair (1+2, 1+3, 1+4, 1+6, 2+3...). Slow and performs redundant comparisons.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-2">
                  <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center justify-between">
                    <span>Two Pointers (Sorted Array)</span>
                    <span className="font-mono">O(n)</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Calculates sum in 1 pass by moving pointers inwards based on whether the sum is too small or too large.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-slate-700 dark:text-slate-300 font-medium">
                💡 <strong>The Golden Mental Model</strong>: Don't memorize blindly. If the current sum is too small, move toward larger values (<code className="font-mono text-emerald-600 dark:text-emerald-400">left += 1</code>). If too large, move toward smaller values (<code className="font-mono text-emerald-600 dark:text-emerald-400">right -= 1</code>).
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Tab Content 2: Core Patterns */}
      {activeTab === 'patterns' && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          {/* Pattern 1 */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Pattern 1 • Converging Opposite Direction
            </div>
            <div className="font-mono text-xs text-slate-500 dark:text-slate-400">
              left → &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ← right
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              One pointer starts at index 0 and the other at index <code className="font-mono">n - 1</code>. Used for sorted pair sums, array reversals, and closest pair problems.
            </p>
          </div>

          {/* Pattern 2 */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Pattern 2 • Opposite Ends for Comparisons (Palindrome)
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Compare elements from both ends moving inward: <code className="font-mono">s[left] == s[right]</code>.
            </p>
            <pre className="p-3.5 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto">
{`def is_palindrome(s):
    left, right = 0, len(s) - 1
    while left < right:
        if s[left] != s[right]:
            return False
        left += 1
        right -= 1
    return True`}
            </pre>
          </div>

          {/* Pattern 3 */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Pattern 3 • Slow & Fast Pointers (Same Direction)
            </div>
            <div className="font-mono text-xs text-slate-500 dark:text-slate-400">
              slow →<br />
              fast →<br />
              [1, 1, 2, 2, 3]
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Both pointers start from the beginning. <code className="font-mono text-emerald-500">slow</code> marks where to write the next valid element, while <code className="font-mono text-sky-400">fast</code> acts as the scout examining array elements.
            </p>
          </div>
        </div>
      )}

      {/* Tab Content 3: Practical Examples */}
      {activeTab === 'examples' && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          {/* Example 1 */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Example 1: Two Sum in Sorted Array
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-bold">
                O(n) Time • O(1) Space
              </span>
            </div>
            <pre className="p-3.5 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto">
{`def two_sum(arr, target):
    left, right = 0, len(arr) - 1
    while left < right:
        total = arr[left] + arr[right]
        if total == target:
            return [left, right]
        elif total < target:
            left += 1  # Need larger sum
        else:
            right -= 1 # Need smaller sum
    return [-1, -1]`}
            </pre>
          </div>

          {/* Example 2 */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Example 2: Remove Duplicates In-Place
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-bold">
                O(n) Time • O(1) Space
              </span>
            </div>
            <pre className="p-3.5 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto">
{`def remove_duplicates(arr):
    if not arr: return 0
    slow = 0
    for fast in range(1, len(arr)):
        if arr[fast] != arr[slow]:
            slow += 1
            arr[slow] = arr[fast]
    return slow + 1`}
            </pre>
          </div>

          {/* Example 3 */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Example 3: Container With Most Water
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-bold">
                O(n) Time • O(1) Space
              </span>
            </div>
            <pre className="p-3.5 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto">
{`def max_area(height):
    left, right = 0, len(height) - 1
    best = 0
    while left < right:
        width = right - left
        h = min(height[left], height[right])
        best = max(best, width * h)
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    return best`}
            </pre>
          </div>
        </div>
      )}

      {/* Tab Content 4: Decision Framework & Recognition */}
      {activeTab === 'framework' && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <section className="space-y-4">
            <div className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              🎯 4 Questions to Recognize Two Pointer Problems
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 space-y-1.5">
                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  Question 1: Is the array sorted?
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  If yes, Two Pointers should immediately come to mind for pair sum, closest pair, and element comparison.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 space-y-1.5">
                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  Question 2: Does it involve opposite ends?
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Palindromes, array reversal, container with most water, and Dutch national flag partitioning.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 space-y-1.5">
                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  Question 3: In-place array modification?
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Think slow → fast. Perfect for removing duplicates, moving zeroes, and filtering arrays with O(1) extra space.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 space-y-1.5">
                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  Question 4: Can I eliminate possibilities?
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  If current pair &gt; target, you eliminate the entire column of possibilities for that right element!
                </p>
              </div>
            </div>
          </section>

          {/* Key Takeaways */}
          <section className="space-y-3 pt-2">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              <Sparkles className="w-4 h-4 text-emerald-500" />
              <span>Interview Checklist & Rules</span>
            </div>
            <ul className="space-y-2">
              {topic.keyTakeaways.map((takeaway, idx) => (
                <li 
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-xs leading-relaxed"
                >
                  <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-mono text-[10px] font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}

      {/* Tab Content 5: Code Implementations */}
      {activeTab === 'code' && (
        <section className="space-y-4 animate-in fade-in-50 duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              <Code2 className="w-4 h-4 text-emerald-500" />
              <span>Multi-Language Solutions</span>
            </div>

            {/* Language Switcher Tabs */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              {(['javascript', 'python', 'cpp', 'java'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    selectedLanguage === lang
                      ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  {languageLabels[lang]}
                </button>
              ))}
            </div>
          </div>

          {/* Code Viewer Box */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-[#0d1117] shadow-xl">
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-b border-slate-800 text-xs font-mono text-slate-400">
              <span>{topic.id}.{selectedLanguage === 'python' ? 'py' : selectedLanguage === 'javascript' ? 'js' : selectedLanguage === 'cpp' ? 'cpp' : 'java'}</span>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <pre className="p-4 text-xs font-mono leading-relaxed text-slate-200 overflow-x-auto selection:bg-emerald-500 selection:text-black">
              <code>{topic.codeSnippets[selectedLanguage]}</code>
            </pre>
          </div>
        </section>
      )}

      {/* Pagination Footer */}
      <footer className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-800">
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
