
'use client';

import React, { useEffect, useState } from 'react';

const FloatingShapes = () => {
    const [shapes, setShapes] = useState<React.ReactNode[]>([]);
    
    useEffect(() => {
        const createShapes = () => {
            const shapeArray = [];
            const numberOfShapes = 25;
            const colors = [
                'hsl(var(--primary) / 0.4)',
                'hsl(var(--accent) / 0.4)',
                'hsl(var(--secondary) / 0.4)',
                '#FFFFFF',
            ];

            for (let i = 0; i < numberOfShapes; i++) {
                const size = Math.random() * 80 + 20; // 20px to 100px
                const left = Math.random() * 100;
                const duration = Math.random() * 15 + 10; // 10s to 25s
                const delay = Math.random() * 10;
                const color = colors[Math.floor(Math.random() * colors.length)];
                
                shapeArray.push(
                    <div
                        key={i}
                        className="floating-shape"
                        style={{
                            width: `${size}px`,
                            height: `${size}px`,
                            left: `${left}vw`,
                            animationDuration: `${duration}s`,
                            animationDelay: `${delay}s`,
                            backgroundColor: color,
                            boxShadow: `0 0 15px 5px ${color}`,
                        }}
                    />
                );
            }
            setShapes(shapeArray);
        };

        createShapes();
        // We only want this to run once on mount.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <div className="absolute inset-0 overflow-hidden">{shapes}</div>;
};

export default FloatingShapes;
