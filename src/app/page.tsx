
'use client';

import { useState, useTransition } from 'react';
import { AnimatePresence } from 'framer-motion';
import { saveResponse } from './firestore-test/actions';

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
import QuizSelectionView from '@/components/views/QuizSelectionView';
import ResultsView from '@/components/views/ResultsView';
import AdventureView from '@/components/views/AdventureView';
import ComingSoonView from '@/components/views/ComingSoonView';


type Step = 
  | 'gender-prompt' 
  | 'name-prompt'
  | 'adventure-selection'
  | 'quiz-selection'
  | 'intro' 
  | 'question'
  | 'reply'
  | 'results'
  | 'comment-prompt'
  | 'pre-storybook' 
  | 'storybook'
  | 'broken-story'
  | 'male-ending'
  | 'final-thank-you'
  | 'coming-soon';

type QuizType = 'survey' | 'funny' | 'gk';
type AdventureType = 'quiz' | 'music' | 'movies' | 'ai-tools';

const questions = {
  survey_female: [
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
  survey_male: [
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
  ],
  funny: [
    { id: 'q1', text: "Why don't scientists trust atoms?", options: ["They're always lying", "They make up everything", "They have too much energy"], correctAnswer: "They make up everything" },
    { id: 'q2', text: "What do you call a fake noodle?", options: ["An Impasta", "A Faux-silli", "A Spaghetto"], correctAnswer: "An Impasta" },
    { id: 'q3', text: "Why did the scarecrow win an award?", options: ["He was outstanding in his field", "He was the best dressed", "He had a lot of straw-power"], correctAnswer: "He was outstanding in his field" },
  ],
  gk: [
    { id: 'q1', text: "What is the capital of Japan?", options: ["Kyoto", "Osaka", "Tokyo"], correctAnswer: "Tokyo" },
    { id: 'q2', text: "How many planets are in our solar system?", options: ["7", "8", "9"], correctAnswer: "8" },
    { id: 'q3', text: "What is the largest mammal in the world?", options: ["Elephant", "Blue Whale", "Giraffe"], correctAnswer: "Blue Whale" },
  ]
};

export default function Home() {
  const [step, setStep] = useState<Step>('gender-prompt');
  const [adventureType, setAdventureType] = useState<AdventureType | null>(null);
  const [quizType, setQuizType] = useState<QuizType | null>(null);
  const [gender, setGender] = useState<'male' | 'female' | null>(null);
  const [userName, setUserName] = useState('');
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [currentReply, setCurrentReply] = useState('');
  const [playMusic, setPlayMusic] = useState(false);
  const [, startTransition] = useTransition();

  const getQuestionSet = () => {
    if (!quizType) return [];
    if (quizType === 'survey') {
      return gender === 'female' ? questions.survey_female : questions.survey_male;
    }
    return questions[quizType] || [];
  }

  const handleGenderSelect = (selectedGender: 'male' | 'female') => {
    setGender(selectedGender);
    setStep('name-prompt');
    const data = { name: 'N/A', gender: selectedGender, answer: `Selected gender: ${selectedGender}` };
    startTransition(() => saveResponse(data));
  }

  const handleNameSubmit = (name: string) => {
    setUserName(name);
    setStep('adventure-selection');
    const data = { name, gender, answer: 'Submitted Name' };
    startTransition(() => saveResponse(data));
  };

  const handleAdventureSelect = (type: AdventureType) => {
    setAdventureType(type);
    if (type === 'quiz') {
      setStep('quiz-selection');
    } else {
      setStep('coming-soon');
    }
  }
  
  const handleQuizSelect = (type: QuizType) => {
    setQuizType(type);
    if (type === 'survey') {
      setStep('intro');
    } else {
      setPlayMusic(true);
      setStep('question');
    }
  };

  const handleStartSurvey = () => {
    setPlayMusic(true);
    setStep('question');
  };

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    const questionSet = getQuestionSet();
    const currentQuestion = questionSet[currentQuestionIndex];

    const data = { name: userName, gender, question: currentQuestion.text, answer };
    startTransition(() => saveResponse(data));

    if (quizType === 'survey') {
      // @ts-ignore
      const replyText = currentQuestion.replies[answer];
      setCurrentReply(replyText);
      setStep('reply');
    } else {
      // @ts-ignore
      if (answer === currentQuestion.correctAnswer) {
        setScore(prev => prev + 1);
      }
      if (currentQuestionIndex < questionSet.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        // Stays on 'question' step for a re-render
      } else {
        setStep('results');
      }
    }
  };

  const handleReplyContinue = () => {
    const questionSet = getQuestionSet();
    if (currentQuestionIndex < questionSet.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setStep('question');
    } else {
      // End of survey
      setStep('comment-prompt');
    }
  }
  
  const handleCommentSubmit = (comment: string) => {
    const data = { name: userName, gender, comment, answer: 'User left a comment.' };
    startTransition(() => saveResponse(data));

    // If coming from results, go to thank you. Otherwise, pre-storybook.
    if(quizType !== 'survey') {
      setStep('final-thank-you');
    } else {
      setStep('pre-storybook');
    }
  }

  const handleRestart = () => {
    // Reset to adventure selection, keeping name and gender
    setStep('adventure-selection');
    setAdventureType(null);
    setQuizType(null);
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setCurrentReply('');
    setPlayMusic(false);
  }
  
  const handlePreStorybookContinue = (response: boolean) => {
    const data = { name: userName, gender, answer: `Wants to see story: ${response ? 'Yes' : 'No'}` };
    startTransition(() => saveResponse(data));

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
    const questionSet = getQuestionSet();
    const currentQuestion = questionSet ? questionSet[currentQuestionIndex] : null;

    switch (step) {
      case 'gender-prompt':
        return <GenderPromptView onSelect={handleGenderSelect} />;
      case 'name-prompt':
        return <NamePromptView onSubmit={handleNameSubmit} />;
      case 'adventure-selection':
        return <AdventureView onSelect={handleAdventureSelect} />;
      case 'quiz-selection':
        return <QuizSelectionView onSelect={handleQuizSelect} />;
      case 'intro':
        return <IntroView onStart={handleStartSurvey} name={userName} />;
      case 'question':
        if (!currentQuestion) return null;
        return <QuestionView 
                  key={`${quizType}-${currentQuestionIndex}`} // Force re-render on new question/quiz
                  question={currentQuestion.text} 
                  options={currentQuestion.options} 
                  onAnswer={handleAnswer} 
                />;
      case 'reply':
        return <ReplyView reply={currentReply} onContinue={handleReplyContinue} />
      case 'results':
        return <ResultsView 
                  score={score} 
                  total={questionSet.length} 
                  onRestart={handleRestart}
                  onConnect={() => setStep('comment-prompt')}
               />;
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
        return <FinalThankYouView onRestart={handleRestart} />;
       case 'coming-soon':
        return <ComingSoonView onBack={handleRestart} />;
      default:
        return <GenderPromptView onSelect={handleGenderSelect} />;
    }
  };

  return (
    <>
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
            <div key={step} className="w-full max-w-lg px-4">
                {renderStep()}
            </div>
        </AnimatePresence>
      </div>
      <Footer />
      <AudioPlayer src="https://cdn.pixabay.com/audio/2022/02/07/audio_33b68d5b59.mp3" play={playMusic} />
    </>
  );
}
