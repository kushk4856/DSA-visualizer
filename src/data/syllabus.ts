import type { ModuleItem } from '../types';

export const SYLLABUS_MODULES: ModuleItem[] = [
  {
    id: 'module-1',
    number: 1,
    title: 'Big-O & Complexity Analysis',
    description: 'Foundations of computational efficiency, asymptotic notation, and runtime behavior.',
    topics: [
      {
        id: 'what-is-algorithm',
        title: 'What is an Algorithm & Complexity',
        moduleId: 'module-1',
        moduleTitle: 'Big-O & Complexity Analysis',
        difficulty: 'Beginner',
        timeComplexity: 'Theoretical',
        spaceComplexity: 'Theoretical',
        isLocked: false,
        overview: 'An algorithm is a finite sequence of well-defined instructions to solve a specific problem. Complexity analysis lets us evaluate how runtime and memory scale as input size (N) grows.',
        explanation: `### Core Concepts

1. **Algorithm Definition**: A step-by-step procedure that takes an input and produces an output in finite time.
2. **Why Analyze Complexity?** Machine hardware varies widely. We need an objective, machine-independent metric to compare algorithmic efficiency.
3. **Asymptotic Analysis**: We evaluate performance for large values of *N* (as *N* approaches infinity), focusing on the dominant growth term.

#### Key Growth Rates
- **O(1) - Constant**: Execution time stays constant regardless of dataset size (e.g., array index lookup).
- **O(log N) - Logarithmic**: Search space cuts in half each step (e.g., Binary Search).
- **O(N) - Linear**: Steps grow proportionally with input (e.g., Single loop traversal).
- **O(N log N) - Linearithmic**: Efficient divide-and-conquer sorting (e.g., Merge Sort, Quick Sort).
- **O(N²) - Quadratic**: Nested loops comparing every pair (e.g., Bubble Sort, Matrix operations).`,
        keyTakeaways: [
          'Ignore constants and non-dominant terms (e.g., O(3N² + 5N + 12) reduces to O(N²)).',
          'Space complexity counts auxiliary memory allocated during execution, excluding the input itself.',
          'Always evaluate worst-case (Big-O), average-case (Big-Theta), and best-case (Big-Omega).'
        ],
        codeSnippets: {
          javascript: `// O(1) Constant Time
function getFirstElement(arr) {
  return arr.length > 0 ? arr[0] : null;
}

// O(n) Linear Time
function findMax(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
  }
  return max;
}`,
          python: `# O(1) Constant Time
def get_first_element(arr):
    return arr[0] if arr else None

# O(n) Linear Time
def find_max(arr):
    max_val = arr[0]
    for val in arr[1:]:
        if val > max_val:
            max_val = val
    return max_val`,
          cpp: `// O(1) Constant Time
int getFirstElement(const vector<int>& arr) {
    return arr.empty() ? -1 : arr[0];
}

// O(n) Linear Time
int findMax(const vector<int>& arr) {
    int maxVal = arr[0];
    for (size_t i = 1; i < arr.size(); ++i) {
        if (arr[i] > maxVal) maxVal = arr[i];
    }
    return maxVal;
}`,
          java: `// O(1) Constant Time
public static int getFirstElement(int[] arr) {
    return arr.length == 0 ? -1 : arr[0];
}

// O(n) Linear Time
public static int findMax(int[] arr) {
    int maxVal = arr[0];
    for (int i = 1; i < arr.length; i++) {
        if (arr[i] > maxVal) maxVal = arr[i];
    }
    return maxVal;
}`
        }
      },
      {
        id: 'time-space-complexity',
        title: 'Time & Space Complexity Deep Dive',
        moduleId: 'module-1',
        moduleTitle: 'Big-O & Complexity Analysis',
        difficulty: 'Beginner',
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(1)',
        isLocked: true,
        overview: 'Detailed exploration of auxiliary space vs in-place memory, recursion call stack overhead, and loop complexity.',
        explanation: 'Content will be populated in this milestone step.',
        keyTakeaways: ['Milestone Locked'],
        codeSnippets: { javascript: '', python: '', cpp: '', java: '' }
      },
      {
        id: 'big-o-notation-cases',
        title: 'Big-O Notation: Best, Average & Worst Case',
        moduleId: 'module-1',
        moduleTitle: 'Big-O & Complexity Analysis',
        difficulty: 'Beginner',
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(1)',
        isLocked: true,
        overview: 'Formal asymptotic bounds: Big-O (upper bound), Big-Omega (lower bound), and Big-Theta (tight bound).',
        explanation: 'Content will be populated in this milestone step.',
        keyTakeaways: ['Milestone Locked'],
        codeSnippets: { javascript: '', python: '', cpp: '', java: '' }
      }
    ]
  },
  {
    id: 'module-2',
    number: 2,
    title: 'Arrays & Basic Traversal',
    description: 'Contiguous memory storage, index-based access, and fundamental array manipulation patterns.',
    topics: [
      {
        id: 'what-is-array-indexing',
        title: 'Array Fundamentals & Memory Indexing',
        moduleId: 'module-2',
        moduleTitle: 'Arrays & Basic Traversal',
        difficulty: 'Beginner',
        timeComplexity: 'O(1) Access',
        spaceComplexity: 'O(N)',
        isLocked: true,
        overview: 'Contiguous memory addressing, O(1) index formula, and fixed vs dynamic array allocations.',
        explanation: 'Content will be populated in this milestone step.',
        keyTakeaways: ['Milestone Locked'],
        codeSnippets: { javascript: '', python: '', cpp: '', java: '' }
      },
      {
        id: 'array-traversal-search',
        title: 'Traversing, Max/Min & Searching',
        moduleId: 'module-2',
        moduleTitle: 'Arrays & Basic Traversal',
        difficulty: 'Beginner',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        isLocked: true,
        overview: 'Sequential scanning, finding extrema, calculating prefix sums, and linear search mechanics.',
        explanation: 'Content will be populated in this milestone step.',
        keyTakeaways: ['Milestone Locked'],
        codeSnippets: { javascript: '', python: '', cpp: '', java: '' }
      },
      {
        id: 'array-reversal-manipulation',
        title: 'In-Place Reversal & Rotation',
        moduleId: 'module-2',
        moduleTitle: 'Arrays & Basic Traversal',
        difficulty: 'Beginner',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        isLocked: true,
        visualizerType: 'bubble-sort',
        overview: 'Swapping elements in-place with converging pointers to achieve O(1) auxiliary memory.',
        explanation: 'Content will be populated in this milestone step.',
        keyTakeaways: ['Milestone Locked'],
        codeSnippets: { javascript: '', python: '', cpp: '', java: '' }
      }
    ]
  },
  {
    id: 'module-3',
    number: 3,
    title: 'Array Patterns',
    description: 'Advanced problem-solving paradigms: Two Pointers, Sliding Window, and Prefix Sum.',
    topics: [
      {
        id: 'two-pointers',
        title: 'Two Pointers Technique',
        moduleId: 'module-3',
        moduleTitle: 'Array Patterns',
        difficulty: 'Intermediate',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        isLocked: false,
        visualizerType: 'two-pointers',
        overview: 'Two pointers means maintaining two indexes/pointers that move through an array according to domain conditions. Instead of checking every pair in O(N²), we move pointers intelligently to achieve O(N) linear time and O(1) auxiliary space.',
        explanation: `### 1. What is Two Pointers?
Two pointers means maintaining two indexes that move through an array according to specific conditions.

\`\`\`text
[1, 2, 3, 4, 6]
 ↑           ↑
left        right
\`\`\`

Instead of checking every pair (1 with 2, 1 with 3, 1 with 4...), we intelligently move \`left\` and \`right\`.

#### Basic Template
\`\`\`python
left = 0
right = len(arr) - 1

while left < right:
    # process arr[left] and arr[right]
    if condition:
        left += 1
    else:
        right -= 1
\`\`\`

> **The Key Mental Model**: Don't move pointers randomly. Move them based on what the current values tell you.

---

### 2. Why Two Pointers? (Eliminating Quadratic Complexity)
Suppose we have \`arr = [1, 2, 3, 4, 6]\` and \`target = 6\`. We want to find whether two numbers add up to 6.

* **Brute Force**: Check every pair → O(n²).
* **Two Pointers**: Because the array is sorted:
  1. \`1 + 6 = 7\` (Too large) → decrease \`right\`.
  2. \`1 + 4 = 5\` (Too small) → increase \`left\`.
  3. \`2 + 4 = 6\` → **Found it in O(n) time & O(1) space!**

---

### 3. Core Patterns

#### Pattern 1: Opposite Direction (Converging)
\`\`\`text
left →          ← right
\`\`\`
One pointer starts from the beginning and the other from the end. Essential for sorted pair sum, closest pair, and palindromes.

#### Pattern 2: Opposite Ends for Comparisons (Palindrome)
Compare elements inward from both ends:
\`\`\`python
def is_palindrome(s):
    left = 0
    right = len(s) - 1
    while left < right:
        if s[left] != s[right]:
            return False
        left += 1
        right -= 1
    return True
\`\`\`

#### Pattern 3: Slow and Fast Pointers (Same Direction)
\`\`\`text
slow →
fast →
[1, 1, 2, 2, 3]
\`\`\`
* \`slow\`: "Where should I write next valid element?"
* \`fast\`: "What am I currently examining?"
Essential for in-place array modification like removing duplicates and moving zeroes.

#### Pattern 4: Move Zeroes
\`\`\`python
def move_zeroes(arr):
    slow = 0
    for fast in range(len(arr)):
        if arr[fast] != 0:
            arr[slow], arr[fast] = arr[fast], arr[slow]
            slow += 1
\`\`\`

#### Pattern 5: Container With Most Water
\`\`\`python
def max_area(height):
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
    return best
\`\`\`
> **Limiting Factor**: We always move the shorter line because the shorter side is the bottleneck on container height.

---

### 4. How to Recognize Two Pointer Problems

When analyzing any array/string problem, ask these 4 questions:
1. **Is the array sorted?** → Immediately consider Two Pointers (Pair Sum, Closest Pair, Comparing Elements).
2. **Does the problem involve two opposite ends?** → Palindrome, Reverse Array, Container With Most Water, Partitioning.
3. **Do I need to modify an array in-place?** → Slow & Fast Pointers (Remove duplicates, Move zeroes, Filter elements).
4. **Can I eliminate many possibilities after looking at one pair?** → If current sum > target in sorted array, you immediately eliminate the current right element for all remaining lefts!`,
        keyTakeaways: [
          'If the current sum is too small, move toward larger values (left++). If too large, move toward smaller values (right--).',
          'Slow/Fast pointer mental model: fast is the scout exploring values, slow is the writer placing valid entries in-place.',
          'Two pointers reduces O(N²) nested loops down to O(N) by eliminating redundant pair comparisons at each step.',
          'Always verify loop bounds: `while (left < right)` for converging pairs vs `while (fast < n)` for scout arrays.'
        ],
        codeSnippets: {
          javascript: `// 1. Two Sum in Sorted Array - O(n) Time, O(1) Space
function twoSumSorted(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    const total = arr[left] + arr[right];
    if (total === target) {
      return [left, right];
    } else if (total < target) {
      left++; // Need a larger sum
    } else {
      right--; // Need a smaller sum
    }
  }
  return [-1, -1];
}

// 2. Remove Duplicates In-Place (Slow/Fast) - O(n) Time, O(1) Space
function removeDuplicates(arr) {
  if (arr.length === 0) return 0;
  let slow = 0;

  for (let fast = 1; fast < arr.length; fast++) {
    if (arr[fast] !== arr[slow]) {
      slow++;
      arr[slow] = arr[fast];
    }
  }
  return slow + 1; // Length of unique subarray
}

// 3. Move Zeroes - O(n) Time, O(1) Space
function moveZeroes(arr) {
  let slow = 0;
  for (let fast = 0; fast < arr.length; fast++) {
    if (arr[fast] !== 0) {
      [arr[slow], arr[fast]] = [arr[fast], arr[slow]];
      slow++;
    }
  }
}`,
          python: `# 1. Two Sum in Sorted Array - O(n) Time, O(1) Space
def two_sum_sorted(arr, target):
    left = 0
    right = len(arr) - 1

    while left < right:
        total = arr[left] + arr[right]
        if total == target:
            return [left, right]
        elif total < target:
            left += 1  # Need larger sum
        else:
            right -= 1 # Need smaller sum

    return [-1, -1]

# 2. Remove Duplicates In-Place (Slow/Fast) - O(n) Time, O(1) Space
def remove_duplicates(arr):
    if not arr:
        return 0
    slow = 0
    for fast in range(1, len(arr)):
        if arr[fast] != arr[slow]:
            slow += 1
            arr[slow] = arr[fast]
    return slow + 1

# 3. Container With Most Water - O(n) Time, O(1) Space
def max_area(height):
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
    return best`,
          cpp: `// 1. Two Sum in Sorted Array - O(n) Time, O(1) Space
vector<int> twoSumSorted(const vector<int>& arr, int target) {
    int left = 0;
    int right = arr.size() - 1;

    while (left < right) {
        int total = arr[left] + arr[right];
        if (total == target) {
            return {left, right};
        } else if (total < target) {
            left++;
        } else {
            right--;
        }
    }
    return {-1, -1};
}

// 2. Remove Duplicates In-Place (Slow/Fast) - O(n) Time, O(1) Space
int removeDuplicates(vector<int>& arr) {
    if (arr.empty()) return 0;
    int slow = 0;
    for (size_t fast = 1; fast < arr.size(); ++fast) {
        if (arr[fast] != arr[slow]) {
            slow++;
            arr[slow] = arr[fast];
        }
    }
    return slow + 1;
}`,
          java: `// 1. Two Sum in Sorted Array - O(n) Time, O(1) Space
public static int[] twoSumSorted(int[] arr, int target) {
    int left = 0;
    int right = arr.length - 1;

    while (left < right) {
        int total = arr[left] + arr[right];
        if (total == target) {
            return new int[]{left, right};
        } else if (total < target) {
            left++;
        } else {
            right--;
        }
    }
    return new int[]{-1, -1};
}

// 2. Remove Duplicates In-Place (Slow/Fast) - O(n) Time, O(1) Space
public static int removeDuplicates(int[] arr) {
    if (arr.length == 0) return 0;
    int slow = 0;
    for (int fast = 1; fast < arr.length; fast++) {
        if (arr[fast] != arr[slow]) {
            slow++;
            arr[slow] = arr[fast];
        }
    }
    return slow + 1;
}`
        }
      },
      {
        id: 'sliding-window',
        title: 'Sliding Window Pattern',
        moduleId: 'module-3',
        moduleTitle: 'Array Patterns',
        difficulty: 'Intermediate',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        isLocked: true,
        visualizerType: 'sliding-window',
        overview: 'Maintains a running subarray or substring window (fixed or dynamic) to compute optimal contiguous segments.',
        explanation: 'Content will be populated in this milestone step.',
        keyTakeaways: ['Milestone Locked'],
        codeSnippets: { javascript: '', python: '', cpp: '', java: '' }
      },
      {
        id: 'prefix-sum',
        title: 'Prefix Sum & Range Queries',
        moduleId: 'module-3',
        moduleTitle: 'Array Patterns',
        difficulty: 'Intermediate',
        timeComplexity: 'O(1) Query',
        spaceComplexity: 'O(N)',
        isLocked: true,
        overview: 'Precomputing cumulative sums to answer subarray range sum queries in constant O(1) time.',
        explanation: 'Content will be populated in this milestone step.',
        keyTakeaways: ['Milestone Locked'],
        codeSnippets: { javascript: '', python: '', cpp: '', java: '' }
      }
    ]
  },
  {
    id: 'module-4',
    number: 4,
    title: 'Hash Maps & Hash Sets',
    description: 'Direct addressing, bucket collisions, and O(1) lookup strategies.',
    topics: [
      {
        id: 'hashmap-fundamentals',
        title: 'Hash Tables, Collisions & Bucketing',
        moduleId: 'module-4',
        moduleTitle: 'Hash Maps & Hash Sets',
        difficulty: 'Beginner',
        timeComplexity: 'O(1) Avg',
        spaceComplexity: 'O(N)',
        isLocked: true,
        overview: 'Hashing functions, load factors, chaining vs open addressing, and average O(1) lookups.',
        explanation: 'Content will be populated in this milestone step.',
        keyTakeaways: ['Milestone Locked'],
        codeSnippets: { javascript: '', python: '', cpp: '', java: '' }
      },
      {
        id: 'two-sum-hashmap',
        title: 'Two Sum & Complement Lookup Pattern',
        moduleId: 'module-4',
        moduleTitle: 'Hash Maps & Hash Sets',
        difficulty: 'Beginner',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)',
        isLocked: true,
        overview: 'Trading space for time: Storing seen values in a hash map to resolve pair sums in a single pass.',
        explanation: 'Content will be populated in this milestone step.',
        keyTakeaways: ['Milestone Locked'],
        codeSnippets: { javascript: '', python: '', cpp: '', java: '' }
      },
      {
        id: 'anagram-frequency-maps',
        title: 'Frequency Counters & Anagram Checking',
        moduleId: 'module-4',
        moduleTitle: 'Hash Maps & Hash Sets',
        difficulty: 'Beginner',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(K)',
        isLocked: true,
        overview: 'Counting occurrences of character and element distributions to compare sets in linear time.',
        explanation: 'Content will be populated in this milestone step.',
        keyTakeaways: ['Milestone Locked'],
        codeSnippets: { javascript: '', python: '', cpp: '', java: '' }
      }
    ]
  },
  {
    id: 'module-5',
    number: 5,
    title: 'Linear Data Structures',
    description: 'Pointers, contiguous chains, LIFO stacks, and FIFO queues.',
    topics: [
      {
        id: 'singly-linked-list',
        title: 'Singly Linked List & Pointer Operations',
        moduleId: 'module-5',
        moduleTitle: 'Linear Data Structures',
        difficulty: 'Intermediate',
        timeComplexity: 'O(1) Head',
        spaceComplexity: 'O(N)',
        isLocked: true,
        overview: 'Dynamic node linking, pointer redirection, list reversal, and head/tail management.',
        explanation: 'Content will be populated in this milestone step.',
        keyTakeaways: ['Milestone Locked'],
        codeSnippets: { javascript: '', python: '', cpp: '', java: '' }
      },
      {
        id: 'fast-slow-pointer',
        title: 'Floyd Cycle Detection & Middle Node',
        moduleId: 'module-5',
        moduleTitle: 'Linear Data Structures',
        difficulty: 'Intermediate',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        isLocked: true,
        overview: 'The tortoise and hare algorithm for detecting cycles and locating list midpoints without extra memory.',
        explanation: 'Content will be populated in this milestone step.',
        keyTakeaways: ['Milestone Locked'],
        codeSnippets: { javascript: '', python: '', cpp: '', java: '' }
      },
      {
        id: 'stack-monotonic-stack',
        title: 'Stack Mechanics & Monotonic Stack',
        moduleId: 'module-5',
        moduleTitle: 'Linear Data Structures',
        difficulty: 'Intermediate',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)',
        isLocked: true,
        overview: 'LIFO execution, balanced parentheses evaluation, and finding Next Greater Element in linear time.',
        explanation: 'Content will be populated in this milestone step.',
        keyTakeaways: ['Milestone Locked'],
        codeSnippets: { javascript: '', python: '', cpp: '', java: '' }
      }
    ]
  },
  {
    id: 'module-6',
    number: 6,
    title: 'Recursion & Binary Search',
    description: 'Call stack frames, divide-and-conquer, and logarithmic search space elimination.',
    topics: [
      {
        id: 'recursion-call-stack',
        title: 'Recursion Mechanics & Call Stack Frames',
        moduleId: 'module-6',
        moduleTitle: 'Recursion & Binary Search',
        difficulty: 'Beginner',
        timeComplexity: 'O(2^N) / O(N)',
        spaceComplexity: 'O(N) Stack',
        isLocked: true,
        overview: 'Base cases, recursive step execution, call stack frame allocation, and stack overflow conditions.',
        explanation: 'Content will be populated in this milestone step.',
        keyTakeaways: ['Milestone Locked'],
        codeSnippets: { javascript: '', python: '', cpp: '', java: '' }
      },
      {
        id: 'binary-search',
        title: 'Binary Search Algorithm & Search Space',
        moduleId: 'module-6',
        moduleTitle: 'Recursion & Binary Search',
        difficulty: 'Intermediate',
        timeComplexity: 'O(log N)',
        spaceComplexity: 'O(1)',
        isLocked: true,
        visualizerType: 'binary-search',
        overview: 'Logarithmic search space halving on monotonic functions and sorted arrays with integer overflow protection.',
        explanation: 'Content will be populated in this milestone step.',
        keyTakeaways: ['Milestone Locked'],
        codeSnippets: { javascript: '', python: '', cpp: '', java: '' }
      }
    ]
  },
  {
    id: 'module-7',
    number: 7,
    title: 'Trees & Binary Search Trees',
    description: 'Hierarchical node graphs, recursive traversals, and logarithmic search properties.',
    topics: [
      {
        id: 'binary-tree-traversals',
        title: 'Binary Tree Traversal (DFS & BFS)',
        moduleId: 'module-7',
        moduleTitle: 'Trees & Binary Search Trees',
        difficulty: 'Intermediate',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(H)',
        isLocked: true,
        overview: 'Preorder, Inorder, Postorder recursive traversals and Level-Order queue-based BFS explorations.',
        explanation: 'Content will be populated in this milestone step.',
        keyTakeaways: ['Milestone Locked'],
        codeSnippets: { javascript: '', python: '', cpp: '', java: '' }
      },
      {
        id: 'binary-search-tree-operations',
        title: 'BST Properties, Search & Invalidation',
        moduleId: 'module-7',
        moduleTitle: 'Trees & Binary Search Trees',
        difficulty: 'Intermediate',
        timeComplexity: 'O(log N) avg',
        spaceComplexity: 'O(H)',
        isLocked: true,
        overview: 'Left < Root < Right invariants, binary search tree validation, and balanced vs degenerate trees.',
        explanation: 'Content will be populated in this milestone step.',
        keyTakeaways: ['Milestone Locked'],
        codeSnippets: { javascript: '', python: '', cpp: '', java: '' }
      }
    ]
  },
  {
    id: 'module-8',
    number: 8,
    title: 'Graphs, Heaps & Dynamic Programming',
    description: 'Non-linear vertex adjacency, priority queues, and memoized subproblem optimization.',
    topics: [
      {
        id: 'graph-dfs-bfs',
        title: 'Graph Adjacency, DFS & BFS Explorations',
        moduleId: 'module-8',
        moduleTitle: 'Graphs, Heaps & Dynamic Programming',
        difficulty: 'Advanced',
        timeComplexity: 'O(V + E)',
        spaceComplexity: 'O(V)',
        isLocked: true,
        overview: 'Adjacency lists/matrices, cycle detection with visited sets, and shortest paths in unweighted graphs.',
        explanation: 'Content will be populated in this milestone step.',
        keyTakeaways: ['Milestone Locked'],
        codeSnippets: { javascript: '', python: '', cpp: '', java: '' }
      },
      {
        id: 'dynamic-programming-memo-tab',
        title: 'Dynamic Programming: Memoization vs Tabulation',
        moduleId: 'module-8',
        moduleTitle: 'Graphs, Heaps & Dynamic Programming',
        difficulty: 'Advanced',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)',
        isLocked: true,
        overview: 'Overlapping subproblems, optimal substructure, top-down recursion with memoization vs bottom-up table tabulation.',
        explanation: 'Content will be populated in this milestone step.',
        keyTakeaways: ['Milestone Locked'],
        codeSnippets: { javascript: '', python: '', cpp: '', java: '' }
      }
    ]
  }
];

export const ALL_TOPICS = SYLLABUS_MODULES.flatMap(m => m.topics);
