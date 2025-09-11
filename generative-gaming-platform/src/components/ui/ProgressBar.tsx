import React, { useEffect, useState } from 'react';

interface ProgressBarProps {
  value: number; // 0-100
  max?: number;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'legendary' | 'epic' | 'rare' | 'uncommon' | 'common';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  showLabel?: boolean;
  label?: string;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  variant = 'default',
  size = 'md',
  animated = true,
  showLabel = false,
  label,
  className = ''
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setDisplayValue(percentage);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setDisplayValue(percentage);
    }
  }, [percentage, animated]);

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3'
  };

  const variantClasses = {
    default: 'from-cyan-500 to-blue-500',
    success: 'from-green-500 to-emerald-500',
    warning: 'from-yellow-500 to-orange-500',
    danger: 'from-red-500 to-pink-500',
    legendary: 'from-purple-400 via-pink-400 to-yellow-400',
    epic: 'from-orange-500 to-red-500',
    rare: 'from-blue-500 to-purple-500',
    uncommon: 'from-green-500 to-cyan-500',
    common: 'from-slate-500 to-slate-400'
  };

  const glowClasses = {
    default: 'shadow-cyan-500/50',
    success: 'shadow-green-500/50',
    warning: 'shadow-yellow-500/50',
    danger: 'shadow-red-500/50',
    legendary: 'shadow-purple-500/50',
    epic: 'shadow-orange-500/50',
    rare: 'shadow-blue-500/50',
    uncommon: 'shadow-green-500/50',
    common: 'shadow-slate-500/50'
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-slate-300">{label}</span>
          <span className="text-sm text-slate-400">
            {Math.round(percentage)}% ({value}/{max})
          </span>
        </div>
      )}
      
      <div className={`w-full bg-slate-800/50 rounded-full overflow-hidden border border-white/10 ${sizeClasses[size]}`}>
        <div
          className={`${sizeClasses[size]} bg-gradient-to-r ${variantClasses[variant]} rounded-full transition-all duration-1000 ease-out shadow-lg ${glowClasses[variant]} relative overflow-hidden`}
          style={{ width: `${displayValue}%` }}
        >
          {animated && displayValue > 0 && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;