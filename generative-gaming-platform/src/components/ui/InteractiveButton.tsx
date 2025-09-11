import React from 'react';
import { LucideIcon } from 'lucide-react';

type ButtonVariant = 'purple' | 'cyan' | 'green' | 'yellow' | 'orange' | 'blue' | 'neutral';
type ButtonSize = 'sm' | 'md' | 'lg';

interface InteractiveButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isActive?: boolean;
  disabled?: boolean;
  className?: string;
  title?: string;
  icon?: LucideIcon;
  fullWidth?: boolean;
}

const InteractiveButton: React.FC<InteractiveButtonProps> = ({
  children,
  onClick,
  variant = 'neutral',
  size = 'md',
  isActive = false,
  disabled = false,
  className = '',
  title,
  icon: Icon,
  fullWidth = false
}) => {
  // Size classes
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  // Variant classes for active state
  const activeVariantClasses = {
    purple: 'bg-purple-500/20 border-purple-500 text-white shadow-lg shadow-purple-500/25',
    cyan: 'bg-cyan-500/20 border-cyan-500 text-white shadow-lg shadow-cyan-500/25',
    green: 'bg-green-500/20 border-green-500 text-white shadow-lg shadow-green-500/25',
    yellow: 'bg-yellow-500/20 border-yellow-500 text-white shadow-lg shadow-yellow-500/25',
    orange: 'bg-orange-500/20 border-orange-500 text-white shadow-lg shadow-orange-500/25',
    blue: 'bg-blue-500/20 border-blue-500 text-white shadow-lg shadow-blue-500/25',
    neutral: 'bg-slate-600/20 border-slate-500 text-white shadow-lg shadow-slate-500/25'
  };

  // Variant classes for hover state when not active
  const hoverVariantClasses = {
    purple: 'hover:border-purple-400/50',
    cyan: 'hover:border-cyan-400/50',
    green: 'hover:border-green-400/50',
    yellow: 'hover:border-yellow-400/50',
    orange: 'hover:border-orange-400/50',
    blue: 'hover:border-blue-400/50',
    neutral: 'hover:border-slate-400/50'
  };

  // Base neutral classes for inactive state
  const baseClasses = `
    inline-flex items-center justify-center gap-2 
    font-medium rounded-lg border transition-all duration-200 
    focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:ring-offset-2 focus:ring-offset-black
    active:scale-98 select-none
    ${fullWidth ? 'w-full' : ''}
    ${sizeClasses[size]}
  `;

  // Neutral state (default)
  const neutralClasses = `
    bg-slate-800/50 border-slate-700/50 text-slate-300
    hover:bg-slate-700/50 ${hoverVariantClasses[variant]}
  `;

  // Active state
  const activeClasses = activeVariantClasses[variant];

  // Disabled state
  const disabledClasses = `
    bg-slate-900/50 border-slate-800/50 text-slate-500 cursor-not-allowed
    hover:bg-slate-900/50 hover:border-slate-800/50
  `;

  const finalClasses = `
    ${baseClasses}
    ${disabled ? disabledClasses : isActive ? activeClasses : neutralClasses}
    ${className}
  `;

  return (
    <button
      onClick={disabled ? undefined : onClick}
      className={finalClasses}
      disabled={disabled}
      title={title}
    >
      {Icon && <Icon className={`${size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'}`} />}
      {children}
    </button>
  );
};

export default InteractiveButton;