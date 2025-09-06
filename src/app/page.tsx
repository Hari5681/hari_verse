
'use client';

import { useState, useTransition } from 'react';
import { AnimatePresence } from 'framer-motion';
import { saveResponse } from './firestore-test/actions';
import { sendResponseEmail } from '@/lib/email';

import AudioPlayer from '@/components/common/AudioPlayer';
import Footer from '@/components/common/Footer';
import IntroView from '@/components/views/IntroView';
import QuestionView from '@/components/views/QuestionView';
import StorybookView from '@/components/views/StorybookView';
import ReplyView from '@/components/views/ReplyView';
import PreStorybookView from '@/components/views/PreStorybookView';
import NamePromptView from '@/components/views/NamePromptView';
import GenderPromptView from '@/components/views/GenderPromptView';
import MaleEndingView from '@/components/views/MaleEndingView';
import BrokenStoryView from '@/components/views/BrokenStoryView';
import CommentPromptView from '@/components/views/CommentPromptView';
import FinalThankYouView from '@/components/views/FinalThankYouView';


type Step = 
  | 'gender-prompt' 
  | 'name-prompt' 
  | 'intro' 
  | 'q1' 
  | 'reply1' 
  | 'q2' 
  | 'reply2' 
  | 'q3' 
  | 'reply3' 
  | 'q4' 
  | 'reply4' 
  | 'q5'
  | 'reply5' 
  | 'q6'
  | 'reply6'
  | 'comment-prompt'
  | 'pre-storybook' 
  | 'storybook'
  | 'broken-story'
  | 'male-ending'
  | 'final-thank-you';

const questions = {
  female: [
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
  ],
  male: [
    {
      id: 'q1',
      text: "What’s more painful?",
      options: ["😅 Missed breakfast", "😭 Missed crush’s reply", "😂 No WiFi"],
      replies: {
        "😅 Missed breakfast": "A true tragedy! 😂",
        "😭 Missed crush’s reply": "Ouch, that one hurts deep.",
        "😂 No WiFi": "The ultimate modern-day horror story. 😱"
      }
    },
    {
      id: 'q2',
      text: "How do you usually handle heartbreak?",
      options: ["🏋️‍♂️ Gym time", "🎶 Sad songs playlist", "🍻 Boys’ night out", "😴 Sleep and forget"],
      replies: {
        "🏋️‍♂️ Gym time": "Building muscle to hide the pain. Classic.",
        "🎶 Sad songs playlist": "Letting it all out with some sad tunes. I feel you.",
        "🍻 Boys’ night out": "Good friends are the best therapy.",
        "😴 Sleep and forget": "Sometimes the off switch is the best solution."
      }
    },
    {
      id: 'q3',
      text: "Which superpower would you pick if life gave you one?",
      options: ["🔥 Confidence with girls", "🤑 Unlimited money", "🕶️ Look cool always", "⏳ Turn back time"],
      replies: {
        "🔥 Confidence with girls": "A power many would desire!",
        "🤑 Unlimited money": "Can't go wrong with that one.",
        "🕶️ Look cool always": "Effortless style, a true gift.",
        "⏳ Turn back time": "To fix mistakes or re-live the good times? 🤔"
      }
    }
  ]
};

export default function Home() {
  const [step, setStep] = useState<Step>('gender-prompt');
  const [gender, setGender] = useState<'male' | 'female' | null>(null);
  const [userName, setUserName] = useState('');
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentReply, setCurrentReply] = useState('');
  const [playMusic, setPlayMusic] = useState(false);
  const [, startTransition] = useTransition();

  const handleGenderSelect = (selectedGender: 'male' | 'female') => {
    setGender(selectedGender);
    setStep('name-prompt');
    const data = { name: 'N/A', gender: selectedGender, answer: `Selected gender: ${selectedGender}` };
    startTransition(() => saveResponse(data));
    sendResponseEmail(data);
  }

  const handleNameSubmit = (name: string) => {
    setUserName(name);
    setStep('intro');
    const data = { name, gender, answer: 'Started Quiz' };
    startTransition(() => saveResponse(data));
    sendResponseEmail(data);
  };

  const handleStart = () => {
    setPlayMusic(true);
    setStep('q1');
  };

  const handleAnswer = (answer: string, questionIndex: number) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    
    // @ts-ignore
    const questionText = questions[gender!][questionIndex].text;
    // @ts-ignore
    const replyText = questions[gender!][questionIndex].replies[answer];
    setCurrentReply(replyText);

    const data = { name: userName, gender, question: questionText, answer };
    startTransition(() => saveResponse(data));
    sendResponseEmail(data);
    
    const nextStep = `reply${questionIndex + 1}` as Step;
    setStep(nextStep);
  };

  const handleReplyContinue = (questionIndex: number) => {
    // @ts-ignore
    if (questionIndex < questions[gender!].length - 1) {
      const nextStep = `q${questionIndex + 2}` as Step;
      setStep(nextStep);
    } else {
        setStep('comment-prompt');
    }
  }

  const handleCommentSubmit = (comment: string) => {
    const data = { name: userName, gender, comment, answer: 'User left a comment.' };
    startTransition(() => saveResponse(data));
    sendResponseEmail(data);
    setStep('pre-storybook');
  }
  
  const handlePreStorybookContinue = (response: boolean) => {
    const data = { name: userName, gender, answer: `Wants to see story: ${response ? 'Yes' : 'No'}` };
    startTransition(() => saveResponse(data));
    sendResponseEmail(data);

    if (response) {
      if (gender === 'female') {
        setStep('storybook');
      } else {
        setStep('broken-story');
      }
    } else {
        setStep('final-thank-you');
    }
  }

  const handleStoryContinue = () => {
     if (gender === 'male') {
        setStep('male-ending');
    } else {
        setStep('final-thank-you');
    }
  }

   const handleMaleEndingContinue = () => {
    setStep('final-thank-you');
  };


  const renderStep = () => {
    if (!gender) {
      return <GenderPromptView onSelect={handleGenderSelect} />;
    }
    
    const currentQuestions = questions[gender] || [];

    switch (step) {
      case 'name-prompt':
        return <NamePromptView onSubmit={handleNameSubmit} />;
      case 'intro':
        return <IntroView onStart={handleStart} name={userName} />;
      case 'q1':
        return <QuestionView question={currentQuestions[0].text} options={currentQuestions[0].options} onAnswer={(answer) => handleAnswer(answer, 0)} />;
      case 'reply1':
        return <ReplyView reply={currentReply} onContinue={() => handleReplyContinue(0)} />
      case 'q2':
        return <QuestionView question={currentQuestions[1].text} options={currentQuestions[1].options} onAnswer={(answer) => handleAnswer(answer, 1)} />;
      case 'reply2':
        return <ReplyView reply={currentReply} onContinue={() => handleReplyContinue(1)} />
      case 'q3':
        return <QuestionView question={currentQuestions[2].text} options={currentQuestions[2].options} onAnswer={(answer) => handleAnswer(answer, 2)} />;
      case 'reply3':
         return <ReplyView reply={currentReply} onContinue={() => handleReplyContinue(2)} />
      case 'q4':
        return <QuestionView question={currentQuestions[3].text} options={currentQuestions[3].options} onAnswer={(answer) => handleAnswer(answer, 3)} />;
      case 'reply4':
        return <ReplyView reply={currentReply} onContinue={() => handleReplyContinue(3)} />
      case 'q5':
        return <QuestionView question={currentQuestions[4].text} options={currentQuestions[4].options} onAnswer={(answer) => handleAnswer(answer, 4)} />;
      case 'reply5':
        return <ReplyView reply={currentReply} onContinue={() => handleReplyContinue(4)} />
      case 'q6':
        return <QuestionView question={currentQuestions[5].text} options={currentQuestions[5].options} onAnswer={(answer) => handleAnswer(answer, 5)} />;
      case 'reply6':
        return <ReplyView reply={currentReply} onContinue={() => handleReplyContinue(5)} />
      case 'comment-prompt':
        return <CommentPromptView onSubmit={handleCommentSubmit} />;
      case 'pre-storybook':
        return <PreStorybookView onContinue={handlePreStorybookContinue} />;
      case 'storybook':
        return <StorybookView onContinue={handleStoryContinue} />;
      case 'broken-story':
        return <BrokenStoryView onContinue={handleStoryContinue} />;
      case 'male-ending':
        return <MaleEndingView onContinue={handleMaleEndingContinue} />;
      case 'final-thank-you':
        return <FinalThankYouView />;
      default:
        return <GenderPromptView onSelect={handleGenderSelect} />;
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
