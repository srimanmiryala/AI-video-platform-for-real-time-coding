
import React from 'react';

interface CodeEditorProps {
  code: string;
  setCode: (code: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, setCode, onSubmit, isLoading }) => {
  return (
    <div className="flex flex-col h-full bg-gray-800 rounded-lg shadow-inner">
      <div className="flex-shrink-0 p-3 bg-gray-900/50 rounded-t-lg">
        <span className="text-sm font-medium text-gray-300">JavaScript Editor</span>
      </div>
      <div className="relative flex-grow">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-full p-4 bg-transparent text-gray-200 font-mono resize-none focus:outline-none leading-relaxed"
          placeholder="Type your code here..."
          spellCheck="false"
        />
      </div>
      <div className="flex-shrink-0 p-3 border-t border-gray-700/50">
        <button
          onClick={onSubmit}
          disabled={isLoading}
          className="w-full px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-indigo-800 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Analyzing...' : 'Submit for AI Feedback'}
        </button>
      </div>
    </div>
  );
};

export default CodeEditor;
