
'use client';

import React, { useEffect, useState, memo } from 'react';

const ConfettiPiece = memo(({ id }: { id: number }) => {
  const [style, setStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    const colors = ['#D0BFFF', '#FFC8DD', '#a8d8ea', '#fdea8d', '#f4a5ae'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomX = Math.random() * 100;
    const randomDelay = Math.random() * 5;
    const randomDuration = 3 + Math.random() * 3;
    const randomInitialRotation = Math.random() * 360;

    setStyle({
      backgroundColor: randomColor,
      left: `${randomX}vw`,
      animationDelay: `${randomDelay}s`,
      animationDuration: `${randomDuration}s`,
      transform: `rotate(${randomInitialRotation}deg)`,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className="confetti-piece" style={style} />;
});
ConfettiPiece.displayName = 'ConfettiPiece';


const Confetti = () => {
    const [pieces, setPieces] = useState<number[]>([]);

    useEffect(() => {
        const confettiCount = 150;
        setPieces(Array.from({ length: confettiCount }, (_, i) => i));
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-50">
            {pieces.map(i => <ConfettiPiece key={i} id={i} />)}
        </div>
    );
};

export default Confetti;
