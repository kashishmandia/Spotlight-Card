import React, { useEffect, useRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'blue-pink' | 'pink-yellow';
}

const GlowCard: React.FC<GlowCardProps> = ({ 
  children, 
  className = '', 
  glowColor = 'blue-pink'
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncPointer = (e: PointerEvent) => {
      const { clientX: x, clientY: y } = e;
      
      if (cardRef.current) {
        cardRef.current.style.setProperty('--x', x.toFixed(2));
        cardRef.current.style.setProperty('--xp', (x / window.innerWidth).toFixed(2));
        cardRef.current.style.setProperty('--y', y.toFixed(2));
        cardRef.current.style.setProperty('--yp', (y / window.innerHeight).toFixed(2));
      }
    };

    document.addEventListener('pointermove', syncPointer);
    return () => document.removeEventListener('pointermove', syncPointer);
  }, []);

  // Blue-pink gradient for left cards, pink-yellow for right cards
  const colorConfig = glowColor === 'blue-pink' 
    ? { base: 250, spread: 60 }  // Blue to pink range
    : { base: 330, spread: 60 }; // Pink to yellow range

  return (
    <div
      ref={cardRef}
      data-glow
      style={{
        '--base': colorConfig.base,
        '--spread': colorConfig.spread,
        '--radius': '20',
        '--border': '2',
        '--backdrop': 'hsl(0 0% 10% / 0.8)',
        '--backup-border': 'hsl(0 0% 20% / 0.3)',
        '--size': '250',
        '--outer': '1',
        '--border-size': 'calc(var(--border, 2) * 1px)',
        '--spotlight-size': 'calc(var(--size, 200) * 1px)',
        '--hue': 'calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))',
        backgroundImage: `radial-gradient(
          var(--spotlight-size) var(--spotlight-size) at
          calc(var(--x, 0) * 1px)
          calc(var(--y, 0) * 1px),
          hsl(var(--hue, 210) 80% 60% / 0.08), transparent
        )`,
        backgroundColor: 'var(--backdrop, transparent)',
        backgroundSize: 'calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))',
        backgroundPosition: '50% 50%',
        backgroundAttachment: 'fixed',
        border: 'var(--border-size) solid var(--backup-border)',
        position: 'relative',
        touchAction: 'none',
      } as React.CSSProperties}
      className={cn(
        'rounded-[20px] relative p-6 md:p-8 min-h-[18rem]',
        className
      )}
    >
      <div data-glow className="absolute inset-0 rounded-[inherit] pointer-events-none" />
      {children}
    </div>
  );
};

export { GlowCard };
