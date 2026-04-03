import React from 'react';

const Loader = ({ fullPage = false, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4'
  };

  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className={`
        ${sizeClasses[size]} 
        border-indigo-100 border-t-indigo-600 rounded-full animate-spin
      `} />
      <span className="text-slate-400 text-sm font-medium animate-pulse">Loading CollabSphere...</span>
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-[100] bg-white flex items-center justify-center">
        {content}
      </div>
    );
  }

  return <div className="p-8 flex justify-center">{content}</div>;
};

export default Loader;
