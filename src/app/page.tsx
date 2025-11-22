
'use client';

import { useState, useEffect } from 'react';
import { HomeView } from '@/components/views/home/HomeView';
import { NamePromptView } from '@/components/views/NamePromptView';

export default function Page() {
  const [name, setName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkVisitor = () => {
      const localName = localStorage.getItem('visitorName');
      if (localName) {
        setName(localName);
      }
      setIsLoading(false);
    };

    checkVisitor();
  }, []);

  const handleNameSubmit = (newName: string) => {
    setName(newName);
    localStorage.setItem('visitorName', newName);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return name ? (
    <HomeView name={name} />
  ) : (
    <NamePromptView onSubmit={handleNameSubmit} />
  );
}
