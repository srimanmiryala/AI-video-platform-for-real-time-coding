
import React, { useState, useCallback } from 'react';
import LandingPage from './components/LandingPage';
import MatchingScreen from './components/MatchingScreen';
import CodingSession from './components/CodingSession';

type AppState = 'landing' | 'matching' | 'session';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('landing');
  const [username, setUsername] = useState<string>('');

  const handleStartMatching = useCallback((name: string) => {
    setUsername(name);
    setAppState('matching');
  }, []);

  const handleMatchFound = useCallback(() => {
    setAppState('session');
  }, []);
  
  const handleEndSession = useCallback(() => {
    setUsername('');
    setAppState('landing');
  }, []);

  const renderContent = () => {
    switch (appState) {
      case 'landing':
        return <LandingPage onStart={handleStartMatching} />;
      case 'matching':
        return <MatchingScreen username={username} onMatchFound={handleMatchFound} />;
      case 'session':
        return <CodingSession username={username} onEndSession={handleEndSession} />;
      default:
        return <LandingPage onStart={handleStartMatching} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      {renderContent()}
    </div>
  );
};

export default App;
