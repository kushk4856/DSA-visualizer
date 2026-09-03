import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  Sliders, 
  Sparkles, 
  ArrowLeft, 
  Info, 
  CheckCircle 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { TopicItem, VisualizerStep } from '../../types';

interface VisualizerContainerProps {
  topic: TopicItem;
  onBackToConcept: () => void;
}

export const VisualizerContainer: React.FC<VisualizerContainerProps> = ({
  topic,
  onBackToConcept,
}) => {
  // Configurable input state
  const [arrayInput, setArrayInput] = useState<string>('2, 7, 11, 15, 18, 22');
  const [targetInput, setTargetInput] = useState<number>(18);
  const [windowK, setWindowK] = useState<number>(3);

  // Execution state
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Parse numerical array safely
  const parsedArray = useMemo(() => {
    return arrayInput
      .split(',')
      .map(item => Number(item.trim()))
      .filter(item => !isNaN(item));
  }, [arrayInput]);

  // Generate step frames dynamically based on visualizer type
  const steps = useMemo<VisualizerStep[]>(() => {
    const arr = parsedArray.length > 0 ? [...parsedArray] : [2, 7, 11, 15, 18, 22];
    const target = targetInput;
    const frames: VisualizerStep[] = [];

    if (topic.visualizerType === 'two-pointers') {
      // Ensure sorted for standard two pointers
      const sortedArr = [...arr].sort((a, b) => a - b);
      let left = 0;
      let right = sortedArr.length - 1;

      frames.push({
        stepIndex: 0,
        array: sortedArr,
        pointers: { left, right },
        activeIndices: [left, right],
        description: `Initialize two pointers: left = 0 (value ${sortedArr[left]}), right = ${right} (value ${sortedArr[right]}). Looking for target sum: ${target}.`,
        status: 'idle'
      });

      while (left < right) {
        const sum = sortedArr[left] + sortedArr[right];
        
        frames.push({
          stepIndex: frames.length,
          array: sortedArr,
          pointers: { left, right },
          activeIndices: [left, right],
          description: `Checking sum: arr[${left}] (${sortedArr[left]}) + arr[${right}] (${sortedArr[right]}) = ${sum}. Target is ${target}.`,
          status: 'comparing'
        });

        if (sum === target) {
          frames.push({
            stepIndex: frames.length,
            array: sortedArr,
            pointers: { left, right },
            activeIndices: [left, right],
            foundIndex: left,
            description: `Target sum found! Elements ${sortedArr[left]} and ${sortedArr[right]} at indices ${left} and ${right} sum to ${target}.`,
            status: 'found'
          });
          break;
        } else if (sum < target) {
          left++;
          frames.push({
            stepIndex: frames.length,
            array: sortedArr,
            pointers: { left, right },
            activeIndices: [left, right],
            description: `Sum ${sum} is less than target ${target}. Increment left pointer to index ${left} to increase total sum.`,
            status: 'comparing'
          });
        } else {
          right--;
          frames.push({
            stepIndex: frames.length,
            array: sortedArr,
            pointers: { left, right },
            activeIndices: [left, right],
            description: `Sum ${sum} is greater than target ${target}. Decrement right pointer to index ${right} to decrease total sum.`,
            status: 'comparing'
          });
        }
      }

      if (left >= right && frames[frames.length - 1]?.status !== 'found') {
        frames.push({
          stepIndex: frames.length,
          array: sortedArr,
          pointers: {},
          activeIndices: [],
          description: `Pointers met with no matching pair found for target sum ${target}.`,
          status: 'completed'
        });
      }
    } else if (topic.visualizerType === 'binary-search') {
      const sortedArr = [...arr].sort((a, b) => a - b);
      let low = 0;
      let high = sortedArr.length - 1;

      frames.push({
        stepIndex: 0,
        array: sortedArr,
        pointers: { low, high },
        activeIndices: [],
        description: `Start Binary Search on sorted array. Search boundary: [0 .. ${high}]. Searching for target ${target}.`,
        status: 'idle'
      });

      while (low <= high) {
        const mid = Math.floor(low + (high - low) / 2);
        
        frames.push({
          stepIndex: frames.length,
          array: sortedArr,
          pointers: { low, mid, high },
          activeIndices: [mid],
          description: `Calculate mid = ${low} + (${high} - ${low})/2 = ${mid}. Checking arr[${mid}] = ${sortedArr[mid]} against target ${target}.`,
          status: 'comparing'
        });

        if (sortedArr[mid] === target) {
          frames.push({
            stepIndex: frames.length,
            array: sortedArr,
            pointers: { mid },
            activeIndices: [mid],
            foundIndex: mid,
            description: `Target element ${target} found at index ${mid}!`,
            status: 'found'
          });
          break;
        } else if (sortedArr[mid] < target) {
          low = mid + 1;
          frames.push({
            stepIndex: frames.length,
            array: sortedArr,
            pointers: { low, high },
            activeIndices: [],
            description: `arr[${mid}] (${sortedArr[mid]}) < ${target}. Target must be in right half. Adjust low = ${low}.`,
            status: 'comparing'
          });
        } else {
          high = mid - 1;
          frames.push({
            stepIndex: frames.length,
            array: sortedArr,
            pointers: { low, high },
            activeIndices: [],
            description: `arr[${mid}] (${sortedArr[mid]}) > ${target}. Target must be in left half. Adjust high = ${high}.`,
            status: 'comparing'
          });
        }
      }

      if (low > high && frames[frames.length - 1]?.status !== 'found') {
        frames.push({
          stepIndex: frames.length,
          array: sortedArr,
          pointers: {},
          activeIndices: [],
          description: `Target ${target} does not exist in the array. Search space exhausted.`,
          status: 'completed'
        });
      }
    } else if (topic.visualizerType === 'sliding-window') {
      const k = Math.min(windowK, arr.length);
      let windowSum = 0;
      
      for (let i = 0; i < k; i++) windowSum += arr[i];

      frames.push({
        stepIndex: 0,
        array: arr,
        pointers: { start: 0, end: k - 1 },
        activeIndices: Array.from({ length: k }, (_, i) => i),
        description: `Initialize sliding window of size K = ${k}. Initial sum: ${windowSum}.`,
        status: 'idle'
      });

      let maxSum = windowSum;
      let bestStart = 0;

      for (let i = k; i < arr.length; i++) {
        const outgoing = arr[i - k];
        const incoming = arr[i];
        windowSum += incoming - outgoing;

        const currentWindowIndices = Array.from({ length: k }, (_, idx) => i - k + 1 + idx);
        
        frames.push({
          stepIndex: frames.length,
          array: arr,
          pointers: { start: i - k + 1, end: i },
          activeIndices: currentWindowIndices,
          description: `Slide window: Subtract arr[${i - k}] (${outgoing}), add arr[${i}] (${incoming}). New Window Sum = ${windowSum}.`,
          status: 'comparing'
        });

        if (windowSum > maxSum) {
          maxSum = windowSum;
          bestStart = i - k + 1;
        }
      }

      frames.push({
        stepIndex: frames.length,
        array: arr,
        pointers: { start: bestStart, end: bestStart + k - 1 },
        activeIndices: Array.from({ length: k }, (_, idx) => bestStart + idx),
        description: `Sliding Window traversal complete! Maximum subarray sum of size ${k} is ${maxSum}.`,
        status: 'completed'
      });
    } else {
      // Default: Bubble Sort step engine
      const workArr = [...arr];
      const n = workArr.length;
      
      frames.push({
        stepIndex: 0,
        array: [...workArr],
        pointers: {},
        activeIndices: [],
        description: `Initial unsorted array with ${n} elements. Starting sorting simulation.`,
        status: 'idle'
      });

      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          frames.push({
            stepIndex: frames.length,
            array: [...workArr],
            pointers: { j: j, next: j + 1 },
            activeIndices: [j, j + 1],
            description: `Comparing elements arr[${j}] (${workArr[j]}) and arr[${j + 1}] (${workArr[j + 1]}).`,
            status: 'comparing'
          });

          if (workArr[j] > workArr[j + 1]) {
            const temp = workArr[j];
            workArr[j] = workArr[j + 1];
            workArr[j + 1] = temp;

            frames.push({
              stepIndex: frames.length,
              array: [...workArr],
              pointers: { j: j, next: j + 1 },
              activeIndices: [j, j + 1],
              swappingIndices: [j, j + 1],
              description: `Swapped arr[${j}] and arr[${j + 1}] because ${temp} > ${workArr[j]}.`,
              status: 'swapping'
            });
          }
        }
      }

      frames.push({
        stepIndex: frames.length,
        array: [...workArr],
        pointers: {},
        activeIndices: [],
        description: `Sorting complete! All elements are in ascending order.`,
        status: 'completed'
      });
    }

    return frames;
  }, [parsedArray, targetInput, windowK, topic.visualizerType]);

  const currentStep = steps[currentStepIndex] || steps[0];

  // Auto-play timer loop
  useEffect(() => {
    if (isPlaying) {
      const delay = Math.max(250, 1000 / speedMultiplier);
      timerRef.current = setTimeout(() => {
        if (currentStepIndex < steps.length - 1) {
          setCurrentStepIndex(prev => prev + 1);
        } else {
          setIsPlaying(false);
          // Trigger confetti if successful
          if (currentStep?.status === 'found' || currentStep?.status === 'completed') {
            confetti({
              particleCount: 50,
              spread: 60,
              origin: { y: 0.6 }
            });
          }
        }
      }, delay);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, currentStepIndex, steps.length, speedMultiplier, currentStep?.status]);

  const handlePlayPause = () => {
    if (currentStepIndex >= steps.length - 1) {
      setCurrentStepIndex(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleStepForward = () => {
    setIsPlaying(false);
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handleStepBackward = () => {
    setIsPlaying(false);
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  // Compute maximum value for scaling heights
  const maxVal = Math.max(...(currentStep?.array || [10]), 10);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Header & Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <button
          onClick={onBackToConcept}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to {topic.title} Notes</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300">
            Interactive Visualizer
          </span>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Step {currentStepIndex + 1} of {steps.length}
          </span>
        </div>
      </div>

      {/* Inputs Bar */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[220px]">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
            Input Array (comma-separated)
          </label>
          <input
            type="text"
            value={arrayInput}
            onChange={(e) => {
              setArrayInput(e.target.value);
              setCurrentStepIndex(0);
              setIsPlaying(false);
            }}
            className="w-full px-3 py-1.5 text-xs font-mono rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 outline-none focus:border-sky-500"
          />
        </div>

        {topic.visualizerType !== 'sliding-window' ? (
          <div className="w-32">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Target Value
            </label>
            <input
              type="number"
              value={targetInput}
              onChange={(e) => {
                setTargetInput(Number(e.target.value));
                setCurrentStepIndex(0);
                setIsPlaying(false);
              }}
              className="w-full px-3 py-1.5 text-xs font-mono rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 outline-none focus:border-sky-500"
            />
          </div>
        ) : (
          <div className="w-32">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Window Size (K)
            </label>
            <input
              type="number"
              min={1}
              max={parsedArray.length || 5}
              value={windowK}
              onChange={(e) => {
                setWindowK(Number(e.target.value));
                setCurrentStepIndex(0);
                setIsPlaying(false);
              }}
              className="w-full px-3 py-1.5 text-xs font-mono rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 outline-none focus:border-sky-500"
            />
          </div>
        )}
      </div>

      {/* Main Visualizer Stage */}
      <div className="rounded-2xl p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-6">
        {/* Dynamic Visual Array Canvas */}
        <div className="min-h-[220px] flex items-end justify-center gap-2 sm:gap-4 p-4 rounded-xl bg-slate-50/70 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60 overflow-x-auto">
          {currentStep?.array.map((value, idx) => {
            const isActive = currentStep.activeIndices.includes(idx);
            const isFound = currentStep.foundIndex === idx;
            const isSwapping = currentStep.swappingIndices?.includes(idx);

            // Pointer label tag
            const pointerTags = Object.entries(currentStep.pointers)
              .filter(([_, pIdx]) => pIdx === idx)
              .map(([name]) => name);

            // Color coding
            let barColor = 'bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700';
            if (isFound) {
              barColor = 'bg-emerald-500 text-white border-emerald-600 shadow-lg shadow-emerald-500/20';
            } else if (isSwapping) {
              barColor = 'bg-amber-500 text-white border-amber-600 shadow-lg shadow-amber-500/20';
            } else if (isActive) {
              barColor = 'bg-sky-500 text-white border-sky-600 shadow-lg shadow-sky-500/20';
            }

            const barHeight = Math.max(50, Math.round((Math.abs(value) / maxVal) * 140));

            return (
              <div key={idx} className="flex flex-col items-center gap-2">
                {/* Pointer Badge indicator */}
                <div className="h-6 flex items-center justify-center">
                  {pointerTags.length > 0 && (
                    <div className="flex gap-1">
                      {pointerTags.map((tag) => (
                        <span
                          key={tag}
                          className="px-1.5 py-0.5 rounded text-[10px] font-mono font-extrabold uppercase bg-sky-600 text-white shadow-sm animate-bounce"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Animated Value Box / Bar */}
                <div
                  style={{ height: `${barHeight}px` }}
                  className={`w-12 sm:w-16 rounded-xl flex flex-col justify-between items-center p-2 border transition-all duration-300 ${barColor}`}
                >
                  <span className="text-[10px] font-mono opacity-70">
                    #{idx}
                  </span>
                  <span className="text-sm font-bold font-mono">
                    {value}
                  </span>
                </div>

                {/* Index label below */}
                <span className="text-[10px] font-mono text-slate-400">
                  [{idx}]
                </span>
              </div>
            );
          })}
        </div>

        {/* Step Explanation Callout */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 flex items-start gap-3">
          {currentStep?.status === 'found' ? (
            <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
          ) : currentStep?.status === 'swapping' ? (
            <Sparkles className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          ) : (
            <Info className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
          )}
          <div className="space-y-0.5">
            <div className="text-[11px] uppercase font-bold text-slate-500 dark:text-slate-400">
              Current Step Logic
            </div>
            <p className="text-xs sm:text-sm font-mono text-slate-800 dark:text-slate-200 leading-relaxed">
              {currentStep?.description}
            </p>
          </div>
        </div>

        {/* Playback Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          {/* Main Controls: Reset, Prev, Play/Pause, Next */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              title="Reset Visualizer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={handleStepBackward}
              disabled={currentStepIndex === 0}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 transition-colors"
              title="Previous Step"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={handlePlayPause}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-md"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>{currentStepIndex >= steps.length - 1 ? 'Replay' : 'Play'}</span>
                </>
              )}
            </button>

            <button
              onClick={handleStepForward}
              disabled={currentStepIndex >= steps.length - 1}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 transition-colors"
              title="Next Step"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Speed Multiplier Controller */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Sliders className="w-3.5 h-3.5" />
              Speed:
            </span>
            <div className="flex items-center p-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              {[0.5, 1, 1.5, 2].map((speed) => (
                <button
                  key={speed}
                  onClick={() => setSpeedMultiplier(speed)}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                    speedMultiplier === speed
                      ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 font-bold shadow-xs'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
