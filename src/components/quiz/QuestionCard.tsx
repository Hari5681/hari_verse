
'use client';

import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle } from 'lucide-react';

interface QuestionCardProps {
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  onAnswer: (isCorrect: boolean) => void;
}

export default function QuestionCard({ question, correctAnswer, incorrectAnswers, onAnswer }: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const answers = useMemo(() => {
    const all = [...incorrectAnswers, correctAnswer];
    return all.sort(() => Math.random() - 0.5);
  }, [correctAnswer, incorrectAnswers]);

  useEffect(() => {
    setSelectedAnswer(null);
    setIsAnswered(false);
  }, [question]);

  const handleAnswerClick = (answer: string) => {
    if (isAnswered) return;

    const isCorrect = answer === correctAnswer;
    setSelectedAnswer(answer);
    setIsAnswered(true);
    onAnswer(isCorrect);
  };

  const getButtonVariant = (answer: string) => {
    if (!isAnswered) return 'outline';
    if (answer === correctAnswer) return 'correct';
    if (answer === selectedAnswer && answer !== correctAnswer) return 'incorrect';
    return 'outline';
  };

  return (
    <div className="w-full text-left">
      <h3 className="text-xl md:text-2xl font-semibold mb-6">{question}</h3>
      <div className="grid grid-cols-1 gap-3">
        {answers.map((answer) => (
          <Button
            key={answer}
            onClick={() => handleAnswerClick(answer)}
            disabled={isAnswered}
            variant={getButtonVariant(answer) as any}
            className={cn("justify-start h-auto py-3 text-left whitespace-normal", {
                'border-green-500 bg-green-500/10 text-green-500': getButtonVariant(answer) === 'correct',
                'border-red-500 bg-red-500/10 text-red-500': getButtonVariant(answer) === 'incorrect',
            })}
          >
            <div className="flex items-center w-full">
              <span className="flex-grow">{answer}</span>
              {isAnswered && getButtonVariant(answer) === 'correct' && <CheckCircle className="h-5 w-5 ml-2 flex-shrink-0" />}
              {isAnswered && getButtonVariant(answer) === 'incorrect' && <XCircle className="h-5 w-5 ml-2 flex-shrink-0" />}
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}
