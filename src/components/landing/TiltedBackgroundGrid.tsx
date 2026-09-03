import React from 'react';

// Exact user-provided DSA vocabulary list
const USER_TOPIC_WORDS = [
  'Binary Search',
  'Hash Map',
  'Array Traversal',
  'Stack',
  'Big O',
  'Linked List',
  'Two Pointers',
  'Binary Tree',
  'Queue',
  'Recursion',
  'Sliding Window',
  'Heap',
  'Graph',
  'Prefix Sum',
  'DFS',
  'BFS',
  'Anagram',
  'Palindrome',
  'Hash Set',
  'Sorting',
  'Merge Sort',
  'Quick Sort',
  'Bubble Sort',
  'Insertion Sort',
  'Selection Sort',
  'Frequency Count',
  'Linear Search',
  'Array Rotation',
  'Subarray',
  'Subsequence',
  'Node',
  'Tree Height',
  'Tree Depth',
  'BST',
  'Tree Traversal',
  'Preorder',
  'Inorder',
  'Postorder',
  'Level Order',
  'Tree Diameter',
  'Priority Queue',
  'Min Heap',
  'Max Heap',
  'Deque',
  'Circular Queue',
  'Monotonic Stack',
  'Min Stack',
  'Fast Pointer',
  'Slow Pointer',
  'Cycle Detection',
  'Graph Traversal',
  'Adjacency List',
  'Adjacency Matrix',
  'Shortest Path',
  'Dijkstra',
  'Topological Sort',
  'Union Find',
  'Disjoint Set',
  'Greedy Algorithm',
  'Backtracking',
  'Dynamic Programming',
  'Memoization',
  'Tabulation',
  'Divide Conquer',
  'Kadane Algorithm',
  'Prefix Function',
  'String Matching',
  'String Hashing',
  'Trie',
  'Character Count',
  'Pair Sum',
  'Two Sum',
  'Duplicate Detection',
  'Maximum Element',
  'Minimum Element',
  'Array Reversal',
  'In-place',
  'Space Complexity',
  'Time Complexity',
  'Logarithmic Time',
  'Linear Time',
  'Constant Time',
  'Worst Case',
  'Best Case',
  'Recursion Tree',
  'Stack Overflow',
  'Heap Sort',
  'Merge Intervals',
  'Majority Element',
  'Missing Number'
];

// Partition into 28 dense staggered rows
const TOTAL_ROWS = 28;
const ITEMS_PER_ROW = 8;
const ROWS: string[][] = [];

for (let r = 0; r < TOTAL_ROWS; r++) {
  const rowItems: string[] = [];
  const startOffset = (r * 5) % USER_TOPIC_WORDS.length;
  for (let c = 0; c < ITEMS_PER_ROW; c++) {
    const item = USER_TOPIC_WORDS[(startOffset + c) % USER_TOPIC_WORDS.length];
    rowItems.push(item);
  }
  ROWS.push(rowItems);
}

interface TiltedBackgroundGridProps {
  onBadgeClick?: () => void;
}

export const TiltedBackgroundGrid: React.FC<TiltedBackgroundGridProps> = ({ onBadgeClick }) => {
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const dx = x - rect.width / 2;
    const dy = y - rect.height / 2;
    let deg = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
    if (deg < 0) deg += 360;
    card.style.setProperty('--cursor-angle', `${deg.toFixed(2)}deg`);
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 select-none bg-[#020408]">
      {/* Super-wide 280% container spanning across all 4 corners */}
      <div className="absolute inset-[-90%] w-[280%] h-[280%] flex flex-col justify-center items-center gap-4 sm:gap-5 transform -rotate-[15deg] origin-center">
        {ROWS.map((row, rowIdx) => {
          const staggerClass = rowIdx % 4 === 0 
            ? 'translate-x-16' 
            : rowIdx % 4 === 1 
            ? '-translate-x-28' 
            : rowIdx % 4 === 2 
            ? 'translate-x-36' 
            : '-translate-x-16';

          // Repeated horizontal ribbon
          const fullRow = [...row, ...row, ...row, ...row];

          return (
            <div
              key={rowIdx}
              className={`flex items-center gap-3.5 sm:gap-4.5 ${staggerClass} whitespace-nowrap`}
            >
              {fullRow.map((name, itemIdx) => (
                <div
                  key={`${rowIdx}-${itemIdx}`}
                  onPointerMove={handlePointerMove}
                  onClick={onBadgeClick}
                  className="border-glow-capsule pointer-events-auto group relative shrink-0 cursor-pointer select-none rounded-full px-4.5 py-1.5 sm:px-5 sm:py-2 border border-white/20 hover:border-emerald-400 bg-[#060a14] backdrop-blur-xs transition-all duration-200 hover:scale-105 hover:bg-[#0e1628] hover:shadow-[0_0_22px_rgba(16,185,129,0.6)]"
                >
                  <span className="font-outfit text-xs sm:text-[13px] font-semibold tracking-wide text-white/95 group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.95)] transition-all duration-200">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Smooth Progressive Top-to-Bottom Fade Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-b from-[#020408] via-[#020408]/50 via-25% to-transparent" 
      />
    </div>
  );
};
