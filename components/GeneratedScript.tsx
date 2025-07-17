import React, { useState } from 'react';
import { type Thread } from '../types';
import CopyIcon from './icons/CopyIcon';
import CheckIcon from './icons/CheckIcon';
import LoadingSpinner from './LoadingSpinner';

interface GeneratedScriptProps {
  threads: Thread[] | null;
  isLoading: boolean;
}

const ThreadCard: React.FC<{ thread: Thread; index: number; total: number }> = ({ thread, index, total }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(thread.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-800/70 border border-slate-700 rounded-xl p-5 shadow-md transition-all duration-300 hover:border-purple-500 hover:shadow-purple-900/30">
      <div className="flex justify-between items-start mb-3">
        <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
          Konten {index + 1}/{total}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors duration-200"
        >
          {copied ? (
            <>
              <CheckIcon className="w-4 h-4 text-green-400" />
              <span>Tersalin!</span>
            </>
          ) : (
            <>
              <CopyIcon className="w-4 h-4" />
              <span>Salin</span>
            </>
          )}
        </button>
      </div>
      <p className="text-slate-200 whitespace-pre-wrap leading-relaxed">
        {thread.content}
      </p>
    </div>
  );
};

const GeneratedScript: React.FC<GeneratedScriptProps> = ({ threads, isLoading }) => {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!threads) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-center text-slate-200 mb-6">
        ✨ Skrip Anda Telah Siap! ✨
      </h2>
      {threads.map((thread, index) => (
        <ThreadCard key={index} thread={thread} index={index} total={threads.length} />
      ))}
    </div>
  );
};

export default GeneratedScript;