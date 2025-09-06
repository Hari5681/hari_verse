
'use client';

import GenderPromptView from '@/components/views/GenderPromptView';
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();

    const handleGenderSelect = () => {
        // In this new structure, after selecting gender, we might want to navigate them
        // to a different part of the app, like the quiz page.
        router.push('/quiz');
    };

    return (
        <div className="flex flex-1 flex-col items-center justify-center text-center">
             <GenderPromptView onSelect={handleGenderSelect} />
        </div>
    );
}
