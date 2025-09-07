
'use client';

interface LevelIntroProps {
  title: string;
  description: string;
  onStart: () => void;
}

export default function LevelIntro({ title, description, onStart }: LevelIntroProps) {
  return (
    <div className="animate-fade-in-up">
      <h2 className="text-3xl font-bold text-primary mb-4">{title}</h2>
      <p className="text-lg text-muted-foreground mb-8">{description}</p>
      <button
        onClick={onStart}
        className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground font-semibold transition-transform hover:scale-105"
      >
        Start Level
      </button>
    </div>
  );
}
