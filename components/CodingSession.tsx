import React, { useState, useEffect, useRef } from 'react';
import type { CodingProblem } from '../types';
import { generateCodingProblem, getAIFeedback } from '../services/geminiService';
import VideoFeed from './VideoFeed';
import CodeEditor from './CodeEditor';
import { EndCallIcon } from './Icons';

interface CodingSessionProps {
  username: string;
  onEndSession: () => void;
}

const mockPeer = {
    name: 'Alex',
};

// Simple markdown to HTML renderer
const renderMarkdown = (text: string): string => {
    if (!text) return '';

    let html = '';
    // Split by code blocks to handle them separately
    const parts = text.split('```');

    parts.forEach((part, index) => {
        if (index % 2 === 0) { // This is a markdown part
            const markdownPart = part
                .replace(/^\s*#\s(.+)/gm, '<h3>$1</h3>')
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/`([^`]+)`/g, '<code class="bg-gray-700 text-indigo-300 rounded px-1 py-0.5 text-sm">$1</code>')
                .replace(/\n/g, '<br />');
            html += markdownPart;
        } else { // This is a code part
            let codeContent = part;
            let language = '';
            // Check for language definition, e.g., javascript
            const langMatch = part.match(/^(.*?)\n/);
            if (langMatch && langMatch[1].trim()) {
                language = langMatch[1].trim();
                codeContent = part.substring(langMatch[0].length);
            }
            html += `<pre class="bg-gray-900 p-3 rounded-md overflow-x-auto text-sm my-2"><code class="language-${language}">${codeContent.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>`;
        }
    });

    return html;
};


const CodingSession: React.FC<CodingSessionProps> = ({ username, onEndSession }) => {
    const [problem, setProblem] = useState<CodingProblem | null>(null);
    const [code, setCode] = useState<string>('');
    const [feedback, setFeedback] = useState<string>('');
    const [isLoadingProblem, setIsLoadingProblem] = useState<boolean>(true);
    const [isLoadingFeedback, setIsLoadingFeedback] = useState<boolean>(false);
    const [userStream, setUserStream] = useState<MediaStream | null>(null);

    useEffect(() => {
        const fetchProblem = async () => {
            setIsLoadingProblem(true);
            const prob = await generateCodingProblem();
            setProblem(prob);
            setIsLoadingProblem(false);
        };
        fetchProblem();
    }, []);

    useEffect(() => {
        const getMedia = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                setUserStream(stream);
            } catch (err) {
                console.error("Error accessing media devices.", err);
            }
        };

        getMedia();

        return () => {
            userStream?.getTracks().forEach(track => track.stop());
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = async () => {
        if (!problem || !code) return;
        setIsLoadingFeedback(true);
        setFeedback('');
        const aiFeedback = await getAIFeedback(problem, code);
        setFeedback(aiFeedback);
        setIsLoadingFeedback(false);
    };

    const handleEnd = () => {
      userStream?.getTracks().forEach(track => track.stop());
      onEndSession();
    }

    return (
        <div className="flex flex-col h-screen bg-gray-900 text-gray-200 p-4 gap-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 flex-grow min-h-0">
                {/* Left Panel: Problem & Feedback */}
                <div className="lg:col-span-1 flex flex-col gap-4 overflow-y-auto pr-2">
                    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold text-indigo-400 mb-2">Coding Problem</h2>
                        {isLoadingProblem ? (
                            <div className="space-y-2 animate-pulse">
                                <div className="h-6 bg-gray-700 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-700 rounded"></div>
                                <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                            </div>
                        ) : (
                            problem && (
                                <>
                                    <h3 className="text-lg font-semibold">{problem.title}</h3>
                                    <p className="text-sm text-gray-400 mt-2">{problem.description}</p>
                                    <div className="mt-4">
                                        <h4 className="font-semibold text-gray-300">Examples:</h4>
                                        <ul className="list-disc list-inside text-sm text-gray-400 space-y-1 mt-1">
                                            {problem.examples.map((ex, i) => <li key={i}><code className="bg-gray-700 p-1 rounded text-xs">{ex}</code></li>)}
                                        </ul>
                                    </div>
                                    <div className="mt-4">
                                        <h4 className="font-semibold text-gray-300">Constraints:</h4>
                                        <ul className="list-disc list-inside text-sm text-gray-400 space-y-1 mt-1">
                                            {problem.constraints.map((c, i) => <li key={i}>{c}</li>)}
                                        </ul>
                                    </div>
                                </>
                            )
                        )}
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex-grow">
                        <h2 className="text-xl font-bold text-indigo-400 mb-2">Feedback</h2>
                        {isLoadingFeedback && <p className="text-sm text-gray-400 animate-pulse">Generating feedback...</p>}
                        {feedback && <div className="prose prose-sm prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: renderMarkdown(feedback) }} />}
                    </div>
                </div>

                {/* Center Panel: Code Editor */}
                <div className="lg:col-span-2 min-h-[400px] lg:min-h-0">
                    <CodeEditor code={code} setCode={setCode} onSubmit={handleSubmit} isLoading={isLoadingFeedback} />
                </div>
                
                {/* Right Panel: Videos & Controls */}
                <div className="lg:col-span-1 flex flex-col gap-4">
                    <VideoFeed stream={userStream} username={`${username} (You)`} isMuted />
                    <VideoFeed stream={null} username={mockPeer.name} isPlaceholder />
                    <div className="mt-auto bg-gray-800 p-2 rounded-lg flex items-center justify-center">
                        <button onClick={handleEnd} className="bg-red-600 hover:bg-red-700 p-3 rounded-full transition-colors">
                            <EndCallIcon className="w-6 h-6 text-white"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CodingSession;