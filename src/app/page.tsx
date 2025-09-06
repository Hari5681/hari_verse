
'use client';

import { useEffect, useState } from 'react';
import NamePromptView from '@/components/views/NamePromptView';
import HomeView from '@/components/views/HomeView';
import { AnimatePresence } from 'framer-motion';

export default function Home() {
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for a saved name when the component mounts on the client
    const savedName = localStorage.getItem('userName');
    if (savedName) {
      setUserName(savedName);
    }
    setIsLoading(false);
  }, []);

  const handleNameSubmit = (name: string) => {
    localStorage.setItem('userName', name);
    setUserName(name);
  };

  const handleReset = () => {
    localStorage.removeItem('userName');
    setUserName(null);
  }

  // Prevents flicker during hydration
  if (isLoading) {
    return null; 
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
            {!userName ? (
                 <NamePromptView key="name-prompt" onSubmit={handleNameSubmit} />
            ) : (
                <HomeView key="home-view" name={userName} onReset={handleReset} />
            )}
        </AnimatePresence>
    </div>
  );
}
