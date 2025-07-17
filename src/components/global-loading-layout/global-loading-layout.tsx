'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from 'src/contexts';
import LoadingLineReveal from 'src/components/loading-line-reveal';

interface GlobalLoadingLayoutProps {
  children: React.ReactNode;
}

export default function GlobalLoadingLayout({ children }: GlobalLoadingLayoutProps) {
  const { isDarkMode } = useTheme();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [key, setKey] = useState(0);

  // Trigger loading animation on route change
  useEffect(() => {
    setLoading(true);
    setShowContent(false);
    setKey(prev => prev + 1); // Force re-render of loading component
  }, [pathname]);

  const handleLoadingComplete = () => {
    setLoading(false);
    // Delay showing content to prevent animation restart
    setTimeout(() => {
      setShowContent(true);
    }, 100);
  };

  if (loading) {
    return (
      <LoadingLineReveal
        key={key}
        isDarkMode={isDarkMode}
        duration={1800}
        onComplete={handleLoadingComplete}
      >
        <div style={{ opacity: 0 }}>
          {children}
        </div>
      </LoadingLineReveal>
    );
  }

  return (
    <div 
      style={{ 
        opacity: showContent ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out'
      }}
    >
      {children}
    </div>
  );
}