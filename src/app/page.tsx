
'use client';

import { useState, useEffect } from 'react';
import { HomeView } from '@/components/views/HomeView';
import { NamePromptView } from '@/components/views/NamePromptView';

export default function Page() {
  const [name, setName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setName(storedName);
    }
    setIsLoading(false);
  }, []);

  const handleNameSubmit = (newName: string) => {
    localStorage.setItem('userName', newName);
    setName(newName);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background">
        {/* You can add a spinner or loading indicator here */}
      </div>
    );
  }

  return name ? (
    <HomeView name={name} />
  ) : (
    <NamePromptView onSubmit={handleNameSubmit} />
  );
}
