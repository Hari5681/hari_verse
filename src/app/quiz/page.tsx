
'use client';

import { useState } from 'react';
import Quiz from '@/components/quiz/Quiz';
import LevelIntro from '@/components/quiz/LevelIntro';
import ScoreScreen from '@/components/quiz/ScoreScreen';
import { BrainCircuit } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

type GameState = 'intro' | 'playing' | 'level-score' | 'final-score';
type Difficulty = 'easy' | 'medium' | 'hard';

const levels: { difficulty: Difficulty; unlockScore: number; title: string; description: string }[] = [
  { difficulty: 'easy', unlockScore: 0, title: 'Level 1: The Basics', description: 'Let\'s start with some general knowledge questions to warm up!' },
  { difficulty: 'medium', unlockScore: 30, title: 'Level 2: Tech & Media', description: 'You\'ve passed the first challenge! Now for some questions on tech, music, and movies.' },
  { difficulty: 'hard', unlockScore: 70, title: 'Level 3: The Ultimate Test', description: 'The final level. These questions are tough. Good luck!' },
];

export default function QuizPage() {
  const [gameState, setGameState] = useState<GameState>('intro');
  const [currentLevel, setCurrentLevel] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [lastLevelScore, setLastLevelScore] = useState(0);

  const handleStartLevel = () => {
    setGameState('playing');
  };

  const handleLevelComplete = (score: number) => {
    setLastLevelScore(score);
    setTotalScore(prev => prev + score);
    setGameState('level-score');
  };

  const handleNext = () => {
    const nextLevel = currentLevel + 1;
    const canUnlockNext = totalScore >= levels[nextLevel]?.unlockScore;

    if (nextLevel < levels.length && canUnlockNext) {
      setCurrentLevel(nextLevel);
      setGameState('intro');
    } else {
      setGameState('final-score');
    }
  };

  const handleRetry = () => {
    setGameState('intro');
  };

  const handleRestart = () => {
    setGameState('intro');
    setCurrentLevel(0);
    setTotalScore(0);
    setLastLevelScore(0);
  };
  
  const currentLevelConfig = levels[currentLevel];
  const canUnlockNext = totalScore >= (levels[currentLevel + 1]?.unlockScore || Infinity);


  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 pt-20">
      <Card className="w-full max-w-2xl text-center bg-card/80 backdrop-blur-sm shadow-2xl shadow-primary/10">
        <CardContent className="p-6">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-primary/10 p-4 border-2 border-primary/20">
              <BrainCircuit className="h-12 w-12 text-primary" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight mb-2">Game-Style Quiz</h1>
          <div className="flex justify-center items-center gap-6 my-4 text-muted-foreground">
             <div className='text-center'>
                <div className="text-2xl font-bold text-primary">{currentLevel + 1}</div>
                <div className="text-sm">Level</div>
            </div>
            <div className='text-center'>
                <div className="text-2xl font-bold text-primary">{totalScore}</div>
                <div className="text-sm">Score</div>
            </div>
          </div>


          <div className="mt-6">
            {gameState === 'intro' && (
              <LevelIntro
                title={currentLevelConfig.title}
                description={currentLevelConfig.description}
                onStart={handleStartLevel}
              />
            )}

            {gameState === 'playing' && (
              <Quiz
                difficulty={currentLevelConfig.difficulty}
                onLevelComplete={handleLevelComplete}
              />
            )}

            {gameState === 'level-score' && (
              <ScoreScreen
                score={lastLevelScore}
                isFinal={currentLevel === levels.length - 1 || !canUnlockNext}
                canUnlockNext={canUnlockNext}
                onNext={handleNext}
                onRetry={handleRetry}
              />
            )}

            {gameState === 'final-score' && (
                <div className='animate-fade-in-up'>
                    <h2 className="text-3xl font-bold text-primary mb-4">Quiz Complete!</h2>
                    <p className="text-xl">Your final score is: <span className="font-bold">{totalScore}</span></p>
                    <p className="text-muted-foreground mt-2">
                      {totalScore >= 70 ? "You're a true quiz master! 🏆" : "Great effort! Play again to improve your score."}
                    </p>
                    <button
                        onClick={handleRestart}
                        className="mt-6 w-full rounded-md bg-primary px-4 py-2 text-primary-foreground font-semibold"
                    >
                        Play Again
                    </button>
                </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
