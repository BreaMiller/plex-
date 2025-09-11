import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'white';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'primary',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const colorClasses = {
    primary: 'border-cyan-400/20 border-t-cyan-400',
    secondary: 'border-purple-400/20 border-t-purple-400',
    white: 'border-white/20 border-t-white'
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="flex flex-col items-center gap-4">
        <div
          className={`border-2 rounded-full animate-spin ${
            sizeClasses[size]
          } ${colorClasses[color]} ${className}`}
        />
        <p className="text-slate-400 text-sm font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;