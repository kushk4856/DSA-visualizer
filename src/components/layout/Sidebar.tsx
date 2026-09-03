import React, { useState, useMemo } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  Search, 
  BookOpen, 
  PlayCircle, 
  Lock, 
  X, 
  Layers 
} from 'lucide-react';
import type { ModuleItem, TopicItem } from '../../types';

interface SidebarProps {
  modules: ModuleItem[];
  activeTopic: TopicItem;
  onSelectTopic: (topic: TopicItem) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  modules,
  activeTopic,
  onSelectTopic,
  isOpenMobile,
  onCloseMobile,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Track open module accordions
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(() => {
    const initialState: Record<string, boolean> = {};
    modules.forEach(m => {
      initialState[m.id] = m.id === activeTopic.moduleId || m.number <= 2;
    });
    return initialState;
  });

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  // Filter modules and topics based on search
  const filteredModules = useMemo(() => {
    if (!searchQuery.trim()) return modules;

    const query = searchQuery.toLowerCase();
    return modules
      .map(mod => {
        const matchesModule = mod.title.toLowerCase().includes(query);
        const matchingTopics = mod.topics.filter(
          t => t.title.toLowerCase().includes(query) || t.overview.toLowerCase().includes(query)
        );

        if (matchesModule || matchingTopics.length > 0) {
          return {
            ...mod,
            topics: matchingTopics.length > 0 ? matchingTopics : mod.topics
          };
        }
        return null;
      })
      .filter((m): m is ModuleItem => m !== null);
  }, [modules, searchQuery]);

  const difficultyColors = {
    Beginner: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    Intermediate: 'bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800',
    Advanced: 'bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800',
  };

  const sidebarContent = (
    <aside className="w-80 h-full flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-colors">
      {/* Header & Search */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-sky-500" />
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Syllabus Modules
            </h3>
          </div>
          <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
            8 Modules
          </span>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search concepts or patterns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-transparent focus:border-sky-500 dark:focus:border-sky-500 focus:bg-white dark:focus:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Module & Topic Accordion List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {filteredModules.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-500 dark:text-slate-400">
            No matching topics found for "{searchQuery}"
          </div>
        ) : (
          filteredModules.map((mod) => {
            const isExpanded = searchQuery ? true : expandedModules[mod.id] ?? false;
            const hasActiveTopic = mod.topics.some(t => t.id === activeTopic.id);

            return (
              <div
                key={mod.id}
                className="rounded-xl border border-slate-200/80 dark:border-slate-800/80 overflow-hidden bg-slate-50/50 dark:bg-slate-900/40"
              >
                {/* Module Accordion Header */}
                <button
                  onClick={() => toggleModule(mod.id)}
                  className={`w-full flex items-center justify-between p-3 text-left transition-colors ${
                    hasActiveTopic
                      ? 'bg-slate-100 dark:bg-slate-800/60 font-semibold'
                      : 'hover:bg-slate-100/70 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-bold flex items-center justify-center font-mono">
                      {mod.number}
                    </span>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">
                      {mod.title}
                    </span>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {/* Topics inside Module */}
                {isExpanded && (
                  <div className="p-1 space-y-1 bg-white/60 dark:bg-slate-900/60 border-t border-slate-200/50 dark:border-slate-800/50">
                    {mod.topics.map((topic) => {
                      const isActive = topic.id === activeTopic.id;
                      const isLocked = topic.isLocked;

                      return (
                        <button
                          key={topic.id}
                          onClick={() => {
                            onSelectTopic(topic);
                            onCloseMobile();
                          }}
                          className={`w-full flex items-center justify-between p-2 rounded-lg text-left text-xs transition-all ${
                            isActive
                              ? 'bg-sky-50 dark:bg-sky-950/40 text-sky-900 dark:text-sky-200 font-semibold border border-sky-200 dark:border-sky-800/60 shadow-sm'
                              : isLocked
                              ? 'text-slate-400 dark:text-slate-500 hover:bg-slate-100/50 dark:hover:bg-slate-800/30'
                              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0 pr-2">
                            {isLocked ? (
                              <Lock className="w-3.5 h-3.5 shrink-0 text-slate-400/80" />
                            ) : topic.visualizerType ? (
                              <PlayCircle className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-sky-500' : 'text-slate-400'}`} />
                            ) : (
                              <BookOpen className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-sky-500' : 'text-slate-400'}`} />
                            )}
                            <span className="truncate">{topic.title}</span>
                          </div>

                          {isLocked ? (
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-400 shrink-0">
                              Locked
                            </span>
                          ) : (
                            <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded border shrink-0 ${difficultyColors[topic.difficulty]}`}>
                              {topic.difficulty}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop Sidebar (Fixed Stationary Left Panel) */}
      <div className="hidden lg:block h-full w-80 shrink-0 no-print">
        {sidebarContent}
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpenMobile && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative z-10 w-80 max-w-full h-full shadow-2xl">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
