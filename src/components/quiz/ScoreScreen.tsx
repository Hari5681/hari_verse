
'use client';

import { Award, TrendingUp, XCircle } from 'lucide-react';

interface ScoreScreenProps {
  score: number;
  isFinal: boolean;
  canUnlockNext: boolean;
  onNext: () => void;
  onRetry: () => void;
}

export default function ScoreScreen({ score, isFinal, canUnlockNext, onNext, onRetry }: ScoreScreenProps) {
  const message = score >= 30 ? "Excellent work!" : "Good try!";

  return (
    <div className="animate-fade-in-up">
      <h2 className="text-3xl font-bold mb-2">Level Complete!</h2>
      <p className="text-lg text-muted-foreground mb-6">{message}</p>
      
      <div className="text-6xl font-bold text-primary mb-8">{score}</div>

      {!isFinal && canUnlockNext && (
        <div className="mb-6 p-4 rounded-lg bg-green-500/10 text-green-400 flex items-center justify-center gap-2">
            <Award className="h-5 w-5" />
            <p className="font-semibold">Congratulations! You've unlocked the next level.</p>
        </div>
      )}

      {!isFinal && !canUnlockNext && (
         <div className="mb-6 p-4 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center gap-2">
            <XCircle className="h-5 w-5" />
            <p className="font-semibold">You didn't score enough to unlock the next level. Try again!</p>
        </div>
      )}


      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={onRetry}
          className="w-full rounded-md bg-secondary px-4 py-2 text-secondary-foreground font-semibold"
        >
          Retry Level
        </button>
        {canUnlockNext && !isFinal && (
            <button
                onClick={onNext}
                className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground font-semibold flex items-center justify-center gap-2"
            >
                Next Level <TrendingUp className="h-5 w-5" />
            </button>
        )}
         {isFinal && (
            <button
                onClick={onNext}
                className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground font-semibold"
            >
                View Final Score
            </button>
        )}
      </div>
    </div>
  );
}
