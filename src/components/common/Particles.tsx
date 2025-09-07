// Inspired by https://github.com/VincentGarreau/particles.js
// Originally created by Vincent Garreau
// Adapted for React and TypeScript by dbarros

'use client';
import { useCallback, useEffect, useMemo, useRef } from 'react';

type ParticlesProps = {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  refresh?: boolean;
  color?: string;
  vx?: number;
  vy?: number;
};

type RGBA = {
  r: number;
  g: number;
  b: number;
  a: number;
};

const hexToRgb = (hex: string): RGBA => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
        a: 1,
      }
    : { r: 255, g: 255, b: 255, a: 1 };
};

const hslToRgb = (h: number, s: number, l: number): RGBA => {
  s /= 100;
  l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0,
    g = 0,
    b = 0;
  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);
  return { r, g, b, a: 1 };
};

export function Particles({
  className,
  quantity = 30,
  staticity = 50,
  ease = 50,
  refresh = false,
  color = '#ffffff',
  vx = 0,
  vy = 0,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const circles = useRef<any[]>([]);
  const mousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const mouse = useRef<{ x: number; y: number; vx: number; vy: number }>({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
  });
  const dpr =
    typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
  const tela = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const canvas = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const TAU = 2 * Math.PI;

  const rgb = useMemo(() => {
    if (color.startsWith('hsl')) {
      const [h, s, l] = color.match(/\d+/g)?.map(Number) || [0, 0, 100];
      return hslToRgb(h, s, l);
    }
    return hexToRgb(color);
  }, [color]);

  const circleParams = useCallback((): any => {
    const x = Math.floor(Math.random() * tela.current.w);
    const y = Math.floor(Math.random() * tela.current.h);
    const s = Math.floor(Math.random() * 2) + 1;
    const alpha = 0;
    const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1));
    const dx = (Math.random() - 0.5) * 0.1;
    const dy = (Math.random() - 0.5) * 0.1;
    const magnetism = 0.1 + Math.random() * 4;
    return {
      x,
      y,
      s,
      alpha,
      targetAlpha,
      dx,
      dy,
      magnetism,
    };
  }, []);

  const R = (n: number, r: number) => n * dpr * r;

  const drawCircle = useCallback(
    (circle: any, update = false) => {
      if (context.current) {
        const { x, y, s, alpha } = circle;
        context.current.beginPath();
        context.current.arc(
          R(x, 1),
          R(y, 1),
          R(s, 1),
          0,
          TAU,
          false
        );
        context.current.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
        context.current.fill();
        context.current.closePath();
      }
      if (update) {
        updateCircle(circle);
      }
    },
    [rgb]
  );
  
  const updateCircle = (circle: any) => {
    let { x, y, s, dx, dy, alpha, targetAlpha, magnetism } = circle;
    
    // Mouse interaction
    const mouseX = mouse.current.x;
    const mouseY = mouse.current.y;
    const distanceX = mouseX - x;
    const distanceY = mouseY - y;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
    const attraction = 150;
    if (distance < attraction) {
      const forceDirectionX = distanceX / distance;
      const forceDirectionY = distanceY / distance;
      const force = (attraction - distance) / attraction;
      dx += forceDirectionX * force * 0.05 * magnetism;
      dy += forceDirectionY * force * 0.05 * magnetism;
    }
    
    // Ease / Friction
    dx *= (100 - ease) / 100;
    dy *= (100 - ease) / 100;

    // Movement
    x += dx;
    y += dy;

    // Boundary check
    if (x < 0 || x > tela.current.w) dx *= -1;
    if (y < 0 || y > tela.current.h) dy *= -1;

    // Fade in/out
    if (alpha < targetAlpha) {
      alpha += 0.01;
    }

    // Assign new values
    circle.x = x;
    circle.y = y;
    circle.dx = dx;
    circle.dy = dy;
    circle.alpha = alpha;
  };

  const animate = useCallback(() => {
    if (!context.current) return;
    context.current.clearRect(0, 0, canvas.current.w, canvas.current.h);
    circles.current.forEach((circle: any) => drawCircle(circle, true));
    requestAnimationFrame(animate);
  }, [drawCircle]);

  const init = useCallback(() => {
    if (canvasContainerRef.current && canvasRef.current) {
      const container = canvasContainerRef.current;
      tela.current.w = container.offsetWidth;
      tela.current.h = container.offsetHeight;

      canvas.current.w = tela.current.w * dpr;
      canvas.current.h = tela.current.h * dpr;

      canvasRef.current.width = canvas.current.w;
      canvasRef.current.height = canvas.current.h;

      context.current = canvasRef.current.getContext('2d');
      if (context.current) {
        context.current.scale(dpr, dpr);
      }
    }

    circles.current = [];
    for (let i = 0; i < quantity; i++) {
      circles.current.push(circleParams());
    }

    requestAnimationFrame(animate);
  }, [animate, circleParams, dpr, quantity]);

  const onMouseMove = (event: MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const { clientX, clientY } = event;
      mouse.current.x = clientX - rect.left;
      mouse.current.y = clientY - rect.top;
    }
  };

  useEffect(() => {
    init();
    window.addEventListener('resize', init);
    window.addEventListener('mousemove', onMouseMove);
    return () => {
      window.removeEventListener('resize', init);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [init]);

  useEffect(() => {
    if (refresh) {
      init();
    }
  }, [refresh, init]);

  return (
    <div className={className} ref={canvasContainerRef} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
