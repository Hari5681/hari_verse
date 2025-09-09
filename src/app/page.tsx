
'use client';

import { useState, useEffect } from 'react';
import { HomeView } from '@/components/views/home/HomeView';
import { NamePromptView } from '@/components/views/NamePromptView';
import { supabase } from '@/lib/supabase';

export default function Page() {
  const [name, setName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkVisitor = async () => {
      // First, check for a name stored locally as a fallback
      const localName = localStorage.getItem('visitorName');
      if (localName) {
        setName(localName);
        setIsLoading(false);
        return;
      }

      const visitorId = localStorage.getItem('visitorId');
      if (visitorId) {
        try {
          const { data, error } = await supabase
            .from('visitor_name')
            .select('name_of_visitor')
            .eq('id', visitorId)
            .single();

          if (error) throw error;
          
          if (data) {
            setName(data.name_of_visitor);
            localStorage.setItem('visitorName', data.name_of_visitor); // Sync to local fallback
          } else {
            // Visitor ID is invalid, remove it
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
    // Optimistically set the name for a faster UI response
    setName(newName);
    localStorage.setItem('visitorName', newName);

    try {
        const { data, error } = await supabase
            .from('visitor_name')
            .insert({ name_of_visitor: newName })
            .select()
            .single();
        
        if (error) throw error;

        if (data) {
            localStorage.setItem('visitorId', data.id);
        }

    } catch(error) {
        console.error("Error saving visitor:", error);
        // The name is already saved in localStorage as a fallback.
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
