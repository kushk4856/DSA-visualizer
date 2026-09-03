import { useState } from 'react';
import { SYLLABUS_MODULES, ALL_TOPICS } from './data/syllabus';
import type { TopicItem } from './types';
import { useTheme } from './hooks/useTheme';
import { LandingHero } from './components/landing/LandingHero';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { ConceptViewer } from './components/concept/ConceptViewer';
import { VisualizerContainer } from './components/visualizer/VisualizerContainer';

export function App() {
  const { theme, toggleTheme } = useTheme();

  const [page, setPage] = useState<'landing' | 'studio'>('landing');
  const [currentView, setCurrentView] = useState<'concept' | 'visualizer'>('concept');
  const [activeTopic, setActiveTopic] = useState<TopicItem>(ALL_TOPICS[0]); // Default to first topic (What is an Algorithm)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  // Active topic index in the global list for pagination
  const activeTopicIndex = ALL_TOPICS.findIndex(t => t.id === activeTopic.id);
  const prevTopic = activeTopicIndex > 0 ? ALL_TOPICS[activeTopicIndex - 1] : undefined;
  const nextTopic = activeTopicIndex < ALL_TOPICS.length - 1 ? ALL_TOPICS[activeTopicIndex + 1] : undefined;

  const handleStartLearning = () => {
    setPage('studio');
    setCurrentView('concept');
  };

  const handleExploreVisualizer = () => {
    // Find first visualizer-enabled unlocked topic
    const visualizerTopic = ALL_TOPICS.find(t => !t.isLocked && t.visualizerType) || ALL_TOPICS[0];
    setActiveTopic(visualizerTopic);
    setPage('studio');
    if (!visualizerTopic.isLocked && visualizerTopic.visualizerType) {
      setCurrentView('visualizer');
    } else {
      setCurrentView('concept');
    }
  };

  if (page === 'landing') {
    return (
      <LandingHero
        onStartLearning={handleStartLearning}
        onExploreVisualizer={handleExploreVisualizer}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-slate-50 dark:bg-[#070b13] text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Fixed App Bar (Always stationary) */}
      <Navbar
        activeTopic={activeTopic}
        currentView={currentView}
        onViewChange={(view) => {
          if (!activeTopic.isLocked) {
            setCurrentView(view);
          }
        }}
        onGoHome={() => setPage('landing')}
        onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Studio Body: Fixed Stationary Sidebar + Independent Scroll Main Content */}
      <div className="flex-1 flex min-h-0 w-full overflow-hidden">
        <Sidebar
          modules={SYLLABUS_MODULES}
          activeTopic={activeTopic}
          onSelectTopic={(topic) => {
            setActiveTopic(topic);
            setCurrentView('concept');
          }}
          isOpenMobile={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        {/* Dedicated Independent Scrollable Pane */}
        <main className="flex-1 h-full min-w-0 overflow-y-auto overflow-x-hidden p-0">
          {currentView === 'concept' || activeTopic.isLocked ? (
            <ConceptViewer
              topic={activeTopic}
              onOpenVisualizer={() => {
                if (!activeTopic.isLocked && activeTopic.visualizerType) {
                  setCurrentView('visualizer');
                }
              }}
              onPrevTopic={prevTopic ? () => setActiveTopic(prevTopic) : undefined}
              onNextTopic={nextTopic ? () => setActiveTopic(nextTopic) : undefined}
            />
          ) : (
            <VisualizerContainer
              topic={activeTopic}
              onBackToConcept={() => setCurrentView('concept')}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
