import React from 'react';

// This component is now simplified to remove page transitions
// and focus on immediate page rendering with section-based animations

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  // No page transitions - just render children immediately
  // Section-based fade-in animations will handle the visual experience
  return (
    <div className="page-content">
      {children}
    </div>
  );
};

export default PageTransition;