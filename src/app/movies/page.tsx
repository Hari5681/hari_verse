
'use client';

import AnimatedText from '@/components/common/AnimatedText';
import ComingSoonView from '@/components/views/ComingSoonView';
import { motion } from 'framer-motion';
import { Clapperboard } from 'lucide-react';
import { useRouter } from 'next/navigation';

const MoviesPage = () => {
    const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center text-center">
       <ComingSoonView onBack={() => router.push('/')} />
    </div>
  );
};

export default MoviesPage;
