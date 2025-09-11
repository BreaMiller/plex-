import React, { useState } from 'react';
import InteractiveButton from './InteractiveButton';

type ButtonVariant = 'purple' | 'cyan' | 'green' | 'yellow' | 'orange' | 'blue' | 'neutral';

interface ButtonOption {
  id: string;
  label: string;
  value?: string;
  description?: string;
}

interface ButtonGroupProps {
  options: ButtonOption[];
  variant?: ButtonVariant;
  onSelect?: (option: ButtonOption) => void;
  selectedId?: string;
  className?: string;
  allowDeselect?: boolean;
  size?: 'sm' | 'md' | 'lg';
  layout?: 'wrap' | 'grid' | 'scroll';
  gridCols?: number;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  options,
  variant = 'neutral',
  onSelect,
  selectedId,
  className = '',
  allowDeselect = false,
  size = 'md',
  layout = 'wrap',
  gridCols = 2
}) => {
  const [internalSelectedId, setInternalSelectedId] = useState<string | null>(selectedId || null);
  
  const activeSelectedId = selectedId !== undefined ? selectedId : internalSelectedId;

  const handleSelect = (option: ButtonOption) => {
    const newSelectedId = activeSelectedId === option.id && allowDeselect ? null : option.id;
    
    if (selectedId === undefined) {
      setInternalSelectedId(newSelectedId);
    }
    
    if (onSelect) {
      onSelect(newSelectedId === option.id ? option : { id: '', label: '', value: '' });
    }
  };

  const getLayoutClasses = () => {
    switch (layout) {
      case 'grid':
        return `grid gap-2 ${gridCols === 1 ? 'grid-cols-1' : gridCols === 3 ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'}`;
      case 'scroll':
        return 'flex gap-2 overflow-x-auto scrollbar-hide pb-2';
      default:
        return 'flex flex-wrap gap-2';
    }
  };

  return (
    <div className={`${getLayoutClasses()} ${className}`}>
      {options.map((option) => (
        <InteractiveButton
          key={option.id}
          onClick={() => handleSelect(option)}
          variant={variant}
          size={size}
          isActive={activeSelectedId === option.id}
          title={option.description}
          className={layout === 'scroll' ? 'flex-shrink-0' : ''}
          fullWidth={layout === 'grid'}
        >
          {option.label}
        </InteractiveButton>
      ))}
    </div>
  );
};

export default ButtonGroup;