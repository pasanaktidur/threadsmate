
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="text-center py-10">
      <div className="inline-block w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-lg text-slate-400">AI sedang berpikir keras...</p>
    </div>
  );
};

export default LoadingSpinner;
