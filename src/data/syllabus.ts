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
        isLocked: true,
        visualizerType: 'two-pointers',
        overview: 'The Two Pointers pattern utilizes two index variables that traverse a collection in tandem to reduce O(N²) nested loops to O(N).',
        explanation: 'Content will be populated in this milestone step.',
        keyTakeaways: ['Milestone Locked'],
        codeSnippets: { javascript: '', python: '', cpp: '', java: '' }
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
    description: 'Hash functions, collision resolution, O(1) key lookups, and frequency counter patterns.',
    topics: [
      {
        id: 'hashmap-fundamentals',
        title: 'Hash Maps, Sets & Fast Lookups',
        moduleId: 'module-4',
        moduleTitle: 'Hash Maps & Hash Sets',
        difficulty: 'Beginner',
        timeComplexity: 'O(1) Avg',
        spaceComplexity: 'O(N)',
        isLocked: true,
        overview: 'Hash tables map keys to values through a hashing function with O(1) average lookup and insertion.',
        explanation: 'Content will be populated in this milestone step.',
        keyTakeaways: ['Milestone Locked'],
        codeSnippets: { javascript: '', python: '', cpp: '', java: '' }
      },
      {
        id: 'two-sum-hash-pattern',
        title: 'Two Sum & Complement Lookups',
        moduleId: 'module-4',
        moduleTitle: 'Hash Maps & Hash Sets',
        difficulty: 'Beginner',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)',
        isLocked: true,
        overview: 'Storing seen numbers in a Hash Map to resolve pair-sum matching in a single linear pass.',
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
    description: 'Stacks (LIFO), Queues (FIFO), and Linked Lists (Singly, Doubly, Fast & Slow Pointers).',
    topics: [
      {
        id: 'stacks-and-queues',
        title: 'Stacks, Queues & Monotonic Patterns',
        moduleId: 'module-5',
        moduleTitle: 'Linear Data Structures',
        difficulty: 'Intermediate',
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(N)',
        isLocked: true,
        visualizerType: 'stack',
        overview: 'Stacks (LIFO) and Queues (FIFO) for expression parsing, BFS traversal, and monotonic stacks.',
        explanation: 'Content will be populated in this milestone step.',
        keyTakeaways: ['Milestone Locked'],
        codeSnippets: { javascript: '', python: '', cpp: '', java: '' }
      },
      {
        id: 'linked-list-fundamentals',
        title: 'Linked Lists: Singly, Doubly & Reversal',
        moduleId: 'module-5',
        moduleTitle: 'Linear Data Structures',
        difficulty: 'Intermediate',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        isLocked: true,
        overview: 'Node pointer connections, traversal, pointer reversal, and fast/slow runner cycle detection.',
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
    description: 'Call stack dynamics, divide-and-conquer principles, and logarithmic search spaces.',
    topics: [
      {
        id: 'recursion-callstack',
        title: 'Recursion, Base Cases & Call Stack',
        moduleId: 'module-6',
        moduleTitle: 'Recursion & Binary Search',
        difficulty: 'Intermediate',
        timeComplexity: 'Varies',
        spaceComplexity: 'O(Depth)',
        isLocked: true,
        overview: 'Function call frame anatomy, base case invariants, and visualizing recursive trees.',
        explanation: 'Content will be populated in this milestone step.',
        keyTakeaways: ['Milestone Locked'],
        codeSnippets: { javascript: '', python: '', cpp: '', java: '' }
      },
      {
        id: 'binary-search-algorithm',
        title: 'Binary Search & Search Space Reduction',
        moduleId: 'module-6',
        moduleTitle: 'Recursion & Binary Search',
        difficulty: 'Intermediate',
        timeComplexity: 'O(log N)',
        spaceComplexity: 'O(1)',
        isLocked: true,
        visualizerType: 'binary-search',
        overview: 'Repeatedly halving search spaces on sorted arrays to achieve logarithmic O(log N) lookup.',
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
    description: 'Hierarchical node structures, BST invariants, and Tree Traversals (DFS: In/Pre/Post, BFS: Level-Order).',
    topics: [
      {
        id: 'tree-fundamentals-bst',
        title: 'Binary Trees & BST Properties',
        moduleId: 'module-7',
        moduleTitle: 'Trees & Binary Search Trees',
        difficulty: 'Intermediate',
        timeComplexity: 'O(log N) to O(N)',
        spaceComplexity: 'O(H)',
        isLocked: true,
        overview: 'Root, leaf, depth, and BST invariant ordering for efficient search and insertion.',
        explanation: 'Content will be populated in this milestone step.',
        keyTakeaways: ['Milestone Locked'],
        codeSnippets: { javascript: '', python: '', cpp: '', java: '' }
      },
      {
        id: 'tree-traversals-dfs-bfs',
        title: 'Tree Traversals: Inorder, Preorder, Postorder & BFS',
        moduleId: 'module-7',
        moduleTitle: 'Trees & Binary Search Trees',
        difficulty: 'Intermediate',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(H) / O(W)',
        isLocked: true,
        overview: 'DFS recursive orders vs Queue-driven BFS level-order traversal patterns.',
        explanation: 'Content will be populated in this milestone step.',
        keyTakeaways: ['Milestone Locked'],
        codeSnippets: { javascript: '', python: '', cpp: '', java: '' }
      }
    ]
  },
  {
    id: 'module-8',
    number: 8,
    title: 'Graphs, Heaps & Dynamic Programming Basics',
    description: 'Graph vertices & edges, Priority Queues, and DP principles (Overlapping Subproblems & Optimal Substructure).',
    topics: [
      {
        id: 'graphs-bfs-dfs',
        title: 'Graph Representations & BFS / DFS',
        moduleId: 'module-8',
        moduleTitle: 'Graphs, Heaps & Dynamic Programming Basics',
        difficulty: 'Advanced',
        timeComplexity: 'O(V + E)',
        spaceComplexity: 'O(V)',
        isLocked: true,
        overview: 'Adjacency lists, visited tracking sets, and breadth/depth-first graph exploration.',
        explanation: 'Content will be populated in this milestone step.',
        keyTakeaways: ['Milestone Locked'],
        codeSnippets: { javascript: '', python: '', cpp: '', java: '' }
      },
      {
        id: 'heaps-priority-queue',
        title: 'Heaps & Priority Queues',
        moduleId: 'module-8',
        moduleTitle: 'Graphs, Heaps & Dynamic Programming Basics',
        difficulty: 'Advanced',
        timeComplexity: 'O(log N)',
        spaceComplexity: 'O(N)',
        isLocked: true,
        overview: 'Min-Heap / Max-Heap properties and instant O(1) access to minimum/maximum items.',
        explanation: 'Content will be populated in this milestone step.',
        keyTakeaways: ['Milestone Locked'],
        codeSnippets: { javascript: '', python: '', cpp: '', java: '' }
      },
      {
        id: 'dynamic-programming-basics',
        title: 'Dynamic Programming: Memoization & Tabulation',
        moduleId: 'module-8',
        moduleTitle: 'Graphs, Heaps & Dynamic Programming Basics',
        difficulty: 'Advanced',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N) to O(1)',
        isLocked: true,
        overview: 'Overlapping subproblems, optimal substructure, and top-down vs bottom-up memoization.',
        explanation: 'Content will be populated in this milestone step.',
        keyTakeaways: ['Milestone Locked'],
        codeSnippets: { javascript: '', python: '', cpp: '', java: '' }
      }
    ]
  }
];

export const ALL_TOPICS = SYLLABUS_MODULES.flatMap(module => module.topics);
