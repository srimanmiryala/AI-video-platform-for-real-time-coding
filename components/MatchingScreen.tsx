import React, { useEffect, useState } from 'react';

interface MatchingScreenProps {
  username: string;
  onMatchFound: () => void;
}

const messages = [
  "Establishing secure connection...",
  "Analyzing your skill profile...",
  "Searching for available partners...",
  "Evaluating best matches...",
  "Connecting you with a peer...",
  "Match found! Preparing your session...",
];

const MatchingScreen: React.FC<MatchingScreenProps> = ({ username, onMatchFound }) => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => {
        if (prevIndex < messages.length - 1) {
          return prevIndex + 1;
        }
        clearInterval(interval);
        return prevIndex;
      });
    }, 1500);

    const matchTimeout = setTimeout(() => {
      onMatchFound();
    }, 1500 * messages.length + 500);

    return () => {
      clearInterval(interval);
      clearTimeout(matchTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onMatchFound]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div className="text-center">
        <div className="relative w-24 h-24">
            <div className="absolute inset-0 rounded-full border-4 border-indigo-500 opacity-50 animate-ping"></div>
            <div className="absolute inset-0 rounded-full border-4 border-indigo-600 flex items-center justify-center">
                <p className="text-2xl font-bold">{username.charAt(0).toUpperCase()}</p>
            </div>
        </div>
        <h2 className="mt-8 text-2xl font-semibold text-white">Matching you, {username}...</h2>
        <p className="mt-4 text-gray-400 transition-opacity duration-500 ease-in-out">
          {messages[messageIndex]}
        </p>
      </div>
    </div>
  );
};

export default MatchingScreen;