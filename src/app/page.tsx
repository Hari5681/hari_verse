'use client';

import { useState, useTransition } from 'react';
import { AnimatePresence } from 'framer-motion';
import type { PersonalizedProposalOutput } from '@/ai/flows/personalized-proposal-reveal';
import { getPersonalizedContent } from '@/app/actions';
import { saveResponse } from './firestore-test/actions'; // Re-using the action
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';


import AudioPlayer from '@/components/common/AudioPlayer';
import Footer from '@/components/common/Footer';
import IntroView from '@/components/views/IntroView';
import QuestionView from '@/components/views/QuestionView';
import GeneratingView from '@/components/views/GeneratingView';
import ProposalView from '@/components/views/ProposalView';
import ResponseView from '@/components/views/ResponseView';
import StorybookView from '@/components/views/StorybookView';
import ReplyView from '@/components/views/ReplyView';
import PreStorybookView from '@/components/views/PreStorybookView';

type Step = 'intro' | 'q1' | 'reply1' | 'q2' | 'reply2' | 'q3' | 'reply3' | 'q4' | 'reply4' | 'q5' | 'reply5' | 'q6' | 'reply6' | 'pre-storybook' | 'storybook' | 'generating' | 'proposal' | 'response';

const questions = [
  {
    id: 'q1',
    text: "Do you think every person has only one true love, or maybe it’s still waiting for us?",
    options: ["💖 One true love forever", "🌼 Maybe still waiting", "😅 Not sure, I’m confused"],
    replies: {
      "💖 One true love forever": "Ohh so you believe in destiny type love… interesting 👀.",
      "🌼 Maybe still waiting": "Same here… sometimes it feels like love is shy, hiding somewhere 😂.",
      "😅 Not sure, I’m confused": "Same here… sometimes it feels like love is shy, hiding somewhere 😂."
    }
  },
  {
    id: 'q2',
    text: "If someone asked you who’s closest to your heart right now, what would you say?",
    options: ["👩‍👩‍👧 Family", "👯‍♀️ Friends", "💓 Maybe someone special 👀"],
     replies: {
      "👩‍👩‍👧 Family": "Cute 🥰 family love is the strongest.",
      "👯‍♀️ Friends": "Cute 🥰 friends love is the strongest.",
      "💓 Maybe someone special 👀": "Waaait 👀 who’s that lucky person?"
    }
  },
  {
    id: 'q3',
    text: "If love was like food, which one would you choose?",
    options: ["🍫 Sweet like chocolate", "🌶️ Spicy like biryani", "🍵 Warm and calm like tea", "😂 Street food — messy but fun"],
    replies: {
      "🍫 Sweet like chocolate": "Hah, so you like the sweet & calm type of love 😌.",
      "🌶️ Spicy like biryani": "Ahh you’re dangerous, full masala type love 😅.",
      "🍵 Warm and calm like tea": "Hah, so you like the sweet & calm type of love 😌.",
      "😂 Street food — messy but fun": "Ahh you’re dangerous, full masala type love 😅."
    }
  },
  {
      id: 'q4',
      text: "Do you think love is already in your life, or still on the way?",
      options: ["💘 Already in my life", "🚶 On the way", "🤷 Still searching"],
      replies: {
          "💘 Already in my life": "...",
          "🚶 On the way": "Hmm maybe it’s closer than you think 😏.",
          "🤷 Still searching": "Hmm maybe it’s closer than you think 😏."
      }
  },
  {
      id: 'q5',
      text: "If someone secretly liked you for 2 years, how should they confess?",
      options: ["🌹 With flowers and courage", "📖 By writing a cute story/letter", "🤭 Just say it directly, simple and honest"],
      replies: {
          "🌹 With flowers and courage": "Interesting… just asking randomly… not like anyone’s doing that or something 😅.",
          "📖 By writing a cute story/letter": "Interesting… just asking randomly… not like anyone’s doing that or something 😅.",
          "🤭 Just say it directly, simple and honest": "Interesting… just asking randomly… not like anyone’s doing that or something 😅."
      }
  },
  {
      id: 'q6',
      text: "If someone says ‘I like you’ every day 100 times, how will you feel?",
      options: ["🤗 Over the moon happy", "🙈 Shy but smiling", "😂 Block them after 10 times", "🧐 Depends on who it is…"],
      replies: {
          "🤗 Over the moon happy": "Good to know! *takes notes*",
          "🙈 Shy but smiling": "Aww, cute!",
          "😂 Block them after 10 times": "Oof, okay, I'll be careful then! 😂",
          "🧐 Depends on who it is…": "Ahh that’s the secret key 👀… hope I’m on the safe side 😅."
      }
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
  const [currentReply, setCurrentReply] = useState('');
  const [personalizedContent, setPersonalizedContent] = useState<PersonalizedProposalOutput | null>(null);
  const [proposalResponse, setProposalResponse] = useState<boolean | null>(null);
  const [playMusic, setPlayMusic] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleStart = () => {
    setPlayMusic(true);
    setStep('q1');
  };

  const handleAnswer = (answer: string, questionIndex: number) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    
    // @ts-ignore
    const replyText = questions[questionIndex].replies[answer];
    setCurrentReply(replyText);

    // Save answer to Firestore
    startTransition(async () => {
      await saveResponse({ name: 'User', answer: `Q${newAnswers.length}: ${answer}` });
    });
    
    const nextStep = `reply${questionIndex + 1}` as Step;
    setStep(nextStep);
  };

  const handleReplyContinue = (questionIndex: number) => {
    if (questionIndex < questions.length - 1) {
      const nextStep = `q${questionIndex + 2}` as Step;
      setStep(nextStep);
    } else {
      setStep('pre-storybook');
    }
  }
  
  const handlePreStorybookContinue = () => {
    setStep('storybook');
  }

  const handleStorybookContinue = () => {
    setStep('generating');
    startTransition(async () => {
      const result = await getPersonalizedContent({
        believesInDestiny: answers[0].includes("One true love"),
        loveStyle: answers[2], // "Sweet like chocolate", "Spicy like biryani", etc.
        confessionPreference: answers[4], // "With flowers and courage", etc.
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

    const finalAnswer = response ? 'Yes' : 'No';

    // Save final decision to Firestore
    startTransition(async () => {
      await saveResponse({ name: 'User', answer: finalAnswer });
    });

    // Send email via EmailJS
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (serviceId && templateId && publicKey) {
      const templateParams = {
        to_name: 'Hari',
        from_name: 'The HariVerse App',
        message: `The user has responded! Their answer was: ${finalAnswer}`,
        all_answers: answers.join(', '),
      };

      emailjs.send(serviceId, templateId, templateParams, publicKey)
        .then((result) => {
            console.log('EmailJS success:', result.text);
            toast({ title: 'Response sent!', description: 'Your decision has been emailed.' });
        }, (error) => {
            console.error('EmailJS error:', error.text);
            toast({ variant: 'destructive', title: 'Email Error', description: 'Could not send the email.' });
        });
    } else {
      console.warn('EmailJS environment variables are not set.');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 'intro':
        return <IntroView onStart={handleStart} />;
      case 'q1':
        return <QuestionView question={questions[0].text} options={questions[0].options} onAnswer={(answer) => handleAnswer(answer, 0)} />;
      case 'reply1':
        return <ReplyView reply={currentReply} onContinue={() => handleReplyContinue(0)} />
      case 'q2':
        return <QuestionView question={questions[1].text} options={questions[1].options} onAnswer={(answer) => handleAnswer(answer, 1)} />;
      case 'reply2':
        return <ReplyView reply={currentReply} onContinue={() => handleReplyContinue(1)} />
      case 'q3':
        return <QuestionView question={questions[2].text} options={questions[2].options} onAnswer={(answer) => handleAnswer(answer, 2)} />;
      case 'reply3':
         return <ReplyView reply={currentReply} onContinue={() => handleReplyContinue(2)} />
      case 'q4':
        return <QuestionView question={questions[3].text} options={questions[3].options} onAnswer={(answer) => handleAnswer(answer, 3)} />;
      case 'reply4':
        return <ReplyView reply={currentReply} onContinue={() => handleReplyContinue(3)} />
      case 'q5':
        return <QuestionView question={questions[4].text} options={questions[4].options} onAnswer={(answer) => handleAnswer(answer, 4)} />;
      case 'reply5':
        return <ReplyView reply={currentReply} onContinue={() => handleReplyContinue(4)} />
      case 'q6':
        return <QuestionView question={questions[5].text} options={questions[5].options} onAnswer={(answer) => handleAnswer(answer, 5)} />;
      case 'reply6':
        return <ReplyView reply={currentReply} onContinue={() => handleReplyContinue(5)} />
      case 'pre-storybook':
        return <PreStorybookView onContinue={handlePreStorybookContinue} />;
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
