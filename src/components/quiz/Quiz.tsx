
'use client';

import { useState, useEffect, useCallback } from 'react';
import { AlertTriangle, Loader2 } from 'lucide-react';
import QuestionCard from './QuestionCard';
import { Progress } from '@/components/ui/progress';

interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface QuizProps {
  difficulty: 'easy' | 'medium' | 'hard';
  onLevelComplete: (score: number) => void;
}

const he = require('he');

export default function Quiz({ difficulty, onLevelComplete }: QuizProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `https://opentdb.com/api.php?amount=5&difficulty=${difficulty}&type=multiple`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch questions from the server.');
        }
        const data = await response.json();
        if (data.response_code !== 0) {
          throw new Error('Could not retrieve questions. The API might be busy. Please try again later.');
        }
        
        const decodedQuestions = data.results.map((q: Question) => ({
          ...q,
          question: he.decode(q.question),
          correct_answer: he.decode(q.correct_answer),
          incorrect_answers: q.incorrect_answers.map((a: string) => he.decode(a)),
        }));
        
        setQuestions(decodedQuestions);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [difficulty]);

  const handleAnswer = useCallback((isCorrect: boolean) => {
    if (isCorrect) {
      setScore((prev) => prev + 10);
    } else {
      setScore((prev) => prev - 0); // Or -5 if you want to penalize
    }
    
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setTimeout(() => {
        setCurrentQuestionIndex(nextQuestionIndex);
      }, 1000); // 1-second delay to show feedback
    } else {
      setTimeout(() => {
        onLevelComplete(score + (isCorrect ? 10 : 0));
      }, 1000);
    }
  }, [currentQuestionIndex, questions.length, onLevelComplete, score]);


  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Loading Questions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg bg-destructive/10 p-6 text-center text-destructive-foreground">
        <AlertTriangle className="h-10 w-10 text-destructive" />
        <h3 className="mt-4 text-lg font-semibold">An Error Occurred</h3>
        <p className="mt-1 text-sm">{error}</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return <p>No questions found.</p>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progressValue = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="w-full animate-fade-in-up">
      <Progress value={progressValue} className="mb-4" />
      <p className="text-sm text-muted-foreground mb-4">Question {currentQuestionIndex + 1} of {questions.length}</p>
      <QuestionCard
        question={currentQuestion.question}
        correctAnswer={currentQuestion.correct_answer}
        incorrectAnswers={currentQuestion.incorrect_answers}
        onAnswer={handleAnswer}
      />
    </div>
  );
}

