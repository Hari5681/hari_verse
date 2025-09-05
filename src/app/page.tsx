
'use client';

import { useState, useTransition } from 'react';
import { AnimatePresence } from 'framer-motion';
import type { PersonalizedProposalOutput } from '@/ai/flows/personalized-proposal-reveal';
import { getPersonalizedContent } from '@/app/actions';
import { saveResponse } from './firestore-test/actions'; // Re-using the action
import { useToast } from '@/hooks/use-toast';

import AudioPlayer from '@/components/common/AudioPlayer';
import Footer from '@/components/common/Footer';
import IntroView from '@/components/views/IntroView';
import QuestionView from '@/components/views/QuestionView';
import GeneratingView from '@/components/views/GeneratingView';
import ProposalView from '@/components/views/ProposalView';
import ResponseView from '@/components/views/ResponseView';
import StorybookView from '@/components/views/StorybookView';

type Step = 'intro' | 'q1' | 'q2' | 'q3' | 'storybook' | 'generating' | 'proposal' | 'response';

const questions = [
  {
    text: "Do you like little surprises in life?",
    options: ["Yes 🌸", "Sometimes 🤔", "Not really 😅"]
  },
  {
    text: "What makes you feel special the most?",
    options: ["Sweet words 💕", "Time together ⏳", "Unexpected gestures ✨"]
  },
  {
    text: "Do you believe in love stories that start small and grow big?",
    options: ["Of course 💖", "Maybe 🌼", "Not sure yet 🌙"]
  }
];

const fallbackContent: PersonalizedProposalOutput = {
  proposalText: "The truth is… you mean a lot to me. Will you be my special one? ❤️",
  responseAffirmative: "This is the happiest moment for me! Thank you 💖",
  responseNegative: "That’s alright 🌼, you’ll always be special to me.",
};

export default function Home() {
  const [step, setStep] = useState<Step>('intro');
  const [answers, setAnswers] = useState<string[]>([]);
  const [personalizedContent, setPersonalizedContent] = useState<PersonalizedProposalOutput | null>(null);
  const [proposalResponse, setProposalResponse] = useState<boolean | null>(null);
  const [playMusic, setPlayMusic] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleStart = () => {
    setPlayMusic(true);
    setStep('q1');
  };

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    // Save answer to Firestore
    startTransition(async () => {
      await saveResponse({ name: 'User', answer: `Q${newAnswers.length}: ${answer}` });
    });

    if (step === 'q1') setStep('q2');
    else if (step === 'q2') setStep('q3');
    else if (step === 'q3') {
      setStep('storybook');
    }
  };
  
  const handleStorybookContinue = () => {
    setStep('generating');
    startTransition(async () => {
      const result = await getPersonalizedContent({
        // The AI flow expects booleans, but we have more nuanced answers.
        // We'll simplify for the AI, but the real answers are saved in Firestore.
        likesSurprises: answers[0].includes("Yes"),
        enjoysStories: answers[1].includes("words") || answers[1].includes("gestures"),
        believesInMagic: answers[2].includes("Of course"),
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

  const handleProposalResponse = (response: boolean) => {
    setProposalResponse(response);
    setStep('response');
    // Save final decision to Firestore
    startTransition(async () => {
      await saveResponse({ name: 'User', answer: response ? 'Yes' : 'No' });
    });
  };

  const renderStep = () => {
    switch (step) {
      case 'intro':
        return <IntroView onStart={handleStart} />;
      case 'q1':
        return <QuestionView question={questions[0].text} options={questions[0].options} onAnswer={handleAnswer} />;
      case 'q2':
        return <QuestionView question={questions[1].text} options={questions[1].options} onAnswer={handleAnswer} />;
      case 'q3':
        return <QuestionView question={questions[2].text} options={questions[2].options} onAnswer={handleAnswer} />;
      case 'storybook':
        return <StorybookView onContinue={handleStorybookContinue} />;
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
                  onContinue={() => {}} // No action needed after this
                />;
      default:
        return <IntroView onStart={handleStart} />;
    }
  };

  return (
    <>
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
            <div key={step} className="w-full max-w-md">
                {renderStep()}
            </div>
        </AnimatePresence>
      </div>
      <Footer />
      <AudioPlayer src="https://cdn.pixabay.com/audio/2022/02/07/audio_33b68d5b59.mp3" play={playMusic} />
    </>
  );
}
