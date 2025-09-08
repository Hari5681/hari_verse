
'use client';

import { useState, useEffect } from 'react';
import { HomeView } from '@/components/views/HomeView';
import { NamePromptView } from '@/components/views/NamePromptView';
import { supabase } from '@/lib/supabase';

export default function Page() {
  const [name, setName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkVisitor = async () => {
      const visitorId = localStorage.getItem('visitorId');
      if (visitorId) {
        try {
          const { data, error } = await supabase
            .from('visitors')
            .select('name')
            .eq('id', visitorId)
            .single();

          if (error) throw error;
          
          if (data) {
            setName(data.name);
          } else {
            // ID in local storage is invalid, clear it
            localStorage.removeItem('visitorId');
          }
        } catch (error) {
          console.error("Error fetching visitor:", error);
          localStorage.removeItem('visitorId');
        }
      }
      setIsLoading(false);
    };

    checkVisitor();
  }, []);

  const handleNameSubmit = async (newName: string) => {
    try {
        const { data, error } = await supabase
            .from('visitors')
            .insert({ name: newName })
            .select()
            .single();
        
        if (error) throw error;

        if (data) {
            localStorage.setItem('visitorId', data.id);
            setName(data.name);
        }

    } catch(error) {
        console.error("Error saving visitor:", error);
        // Fallback to localStorage if Supabase fails
        localStorage.setItem('userName', newName);
        setName(newName);
    }
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
