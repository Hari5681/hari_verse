
'use client';

import { useState, useTransition } from 'react';
import type { PersonalizedProposalOutput } from '@/ai/flows/personalized-proposal-reveal';
import { getPersonalizedContent } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

import AudioPlayer from '@/components/common/AudioPlayer';
import Footer from '@/components/common/Footer';
import IntroView from '@/components/views/IntroView';
import QuestionView from '@/components/views/QuestionView';
import GeneratingView from '@/components/views/GeneratingView';
import ProposalView from '@/components/views/ProposalView';
import ResponseView from '@/components/views/ResponseView';
import StorybookView from '@/components/views/StorybookView';

type Step = 'intro' | 'q1' | 'q2' | 'q3' | 'generating' | 'proposal' | 'response' | 'storybook';

const questions = [
  "Do you like surprises?",
  "Do you enjoy little stories?",
  "Do you believe in magic moments?"
];

const fallbackContent: PersonalizedProposalOutput = {
  proposalText: "The truth is… you mean a lot to me. Will you be my special one? ❤️",
  responseAffirmative: "Yay! You said YES 💖",
  responseNegative: "It’s okay 🌼 you’ll always be special.",
};

export default function Home() {
  const [step, setStep] = useState<Step>('intro');
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [personalizedContent, setPersonalizedContent] = useState<PersonalizedProposalOutput | null>(null);
  const [proposalResponse, setProposalResponse] = useState<boolean | null>(null);
  const [playMusic, setPlayMusic] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleStart = () => {
    setPlayMusic(true);
    setStep('q1');
  };

  const handleAnswer = (answer: boolean) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (step === 'q1') setStep('q2');
    else if (step === 'q2') setStep('q3');
    else if (step === 'q3') {
      setStep('generating');
      startTransition(async () => {
        const result = await getPersonalizedContent({
          likesSurprises: newAnswers[0],
          enjoysStories: newAnswers[1],
          believesInMagic: newAnswers[2],
        });
        if (result.success) {
          setPersonalizedContent(result.data);
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: result.error,
          });
          setPersonalizedContent(fallbackContent);
        }
        setStep('proposal');
      });
    }
  };

  const handleProposalResponse = (response: boolean) => {
    setProposalResponse(response);
    setStep('response');
  };

  const handleContinueToStorybook = () => {
    setStep('storybook');
  }

  const renderStep = () => {
    switch (step) {
      case 'intro':
        return <IntroView onStart={handleStart} />;
      case 'q1':
        return <QuestionView question={questions[0]} onAnswer={handleAnswer} />;
      case 'q2':
        return <QuestionView question={questions[1]} onAnswer={handleAnswer} />;
      case 'q3':
        return <QuestionView question={questions[2]} onAnswer={handleAnswer} />;
      case 'generating':
        return <GeneratingView />;
      case 'proposal':
        return <ProposalView 
                  proposalText={personalizedContent?.proposalText || fallbackContent.proposalText}
                  onResponse={handleProposalResponse} 
                />;
      case 'response':
        return <ResponseView 
                  isYes={proposalResponse!} 
                  affirmativeText={personalizedContent?.responseAffirmative || fallbackContent.responseAffirmative}
                  negativeText={personalizedContent?.responseNegative || fallbackContent.responseNegative}
                  onContinue={handleContinueToStorybook}
                />;
      case 'storybook':
        return <StorybookView />;
      default:
        return <IntroView onStart={handleStart} />;
    }
  };

  return (
    <>
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <div className="w-full max-w-md transition-opacity duration-500 ease-in-out">
          {renderStep()}
        </div>
      </div>
      <Footer />
      <AudioPlayer src="https://cdn.pixabay.com/audio/2022/02/07/audio_33b68d5b59.mp3" play={playMusic} />
    </>
  );
}
