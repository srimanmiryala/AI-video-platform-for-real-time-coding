import React, { useState } from 'react';
import { RocketIcon } from './Icons';

interface LandingPageProps {
  onStart: (username: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onStart(username.trim());
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-slate-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
        <div className="text-center">
            <RocketIcon className="w-16 h-16 mx-auto text-indigo-400"/>
            <h1 className="text-4xl font-bold text-white mt-4">CodePair AI</h1>
            <p className="mt-2 text-gray-400">Practice coding live with a partner and get instant feedback.</p>
        </div>
        <div className="mt-8 text-sm text-gray-300 space-y-3">
            <p><span className="font-semibold text-indigo-400">Live Video Sessions:</span> Connect and code with peers in real-time.</p>
            <p><span className="font-semibold text-indigo-400">Smart Matching:</span> Our algorithm pairs you with the right partner to tackle challenges together.</p>
            <p><span className="font-semibold text-indigo-400">Instant Feedback:</span> Submit your code and get helpful feedback from our AI assistant.</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="sr-only">
              Enter your name
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-900 transition-colors"
          >
            Find a Partner & Start Coding
          </button>
        </form>
      </div>
    </div>
  );
};

export default LandingPage;