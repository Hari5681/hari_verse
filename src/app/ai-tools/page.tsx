
'use client';

import ComingSoonView from '@/components/views/ComingSoonView';
import { useRouter } from 'next/navigation';

const AIToolsPage = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center text-center">
        <ComingSoonView onBack={() => router.push('/')} />
    </div>
  );
};

export default AIToolsPage;
