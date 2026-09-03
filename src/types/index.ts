export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export type Language = 'javascript' | 'python' | 'cpp' | 'java';

export type TopicStatus = 'unlocked' | 'locked' | 'in-progress';

export interface CodeSnippet {
  language: Language;
  code: string;
}

export interface TopicItem {
  id: string;
  title: string;
  moduleId: string;
  moduleTitle: string;
  difficulty: Difficulty;
  timeComplexity: string;
  spaceComplexity: string;
  overview: string;
  explanation: string;
  keyTakeaways: string[];
  codeSnippets: Record<Language, string>;
  isLocked?: boolean;
  visualizerType?: 'two-pointers' | 'binary-search' | 'bubble-sort' | 'stack' | 'queue' | 'sliding-window' | 'generic';
  practiceProblems?: { title: string; difficulty: Difficulty; leetcodeUrl?: string }[];
}

export interface ModuleItem {
  id: string;
  number: number;
  title: string;
  description: string;
  topics: TopicItem[];
}

export interface VisualizerStep {
  stepIndex: number;
  array: number[];
  pointers: Record<string, number>;
  activeIndices: number[];
  swappingIndices?: [number, number];
  foundIndex?: number;
  description: string;
  status: 'idle' | 'comparing' | 'swapping' | 'found' | 'completed';
}
