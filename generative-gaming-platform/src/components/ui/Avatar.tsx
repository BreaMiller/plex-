import React, { useState } from 'react';
import { User } from 'lucide-react';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt = 'Avatar', size = 'md', className = '' }) => {
  const [imageError, setImageError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10', 
    lg: 'w-16 h-16'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-8 h-8'
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const fallbackSrc = '/images/neon_gaming_controller_dark_theme_icon.jpg';

  return (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden bg-gradient-to-br from-slate-700 to-slate-800 border border-white/20 flex items-center justify-center ${className}`}>
      {!imageError && src ? (
        <>
          <img 
            src={src} 
            alt={alt}
            className={`w-full h-full object-cover transition-opacity duration-200 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <User className={`${iconSizes[size]} text-slate-400`} />
            </div>
          )}
        </>
      ) : (
        <>
          {/* Try fallback image first */}
          {!imageError && (
            <img 
              src={fallbackSrc} 
              alt={alt}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
          )}
          {/* Final fallback to icon */}
          {imageError && (
            <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20">
              <User className={`${iconSizes[size]} text-cyan-400`} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Avatar;