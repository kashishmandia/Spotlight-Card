import React, { useEffect, useRef, ReactNode, useState } from 'react';
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
  const [isHovered, setIsHovered] = useState(false);

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

  // For pink-yellow, we use a different approach - calculate position relative to card
  const isPinkYellow = glowColor === 'pink-yellow';

  // Pointer glow color based on card type
  const getPointerColor = () => {
    return glowColor === 'blue-pink' 
      ? 'rgba(168, 85, 247, 0.15)' // purple blend
      : 'rgba(236, 72, 153, 0.15)'; // pink blend
  };

  // For blue-pink: use hue-based gradient (blue 250 → pink 320)
  // For pink-yellow: use explicit color gradient
  const getBackgroundImage = () => {
    if (isPinkYellow) {
      // Pink to yellow gradient based on mouse X position
      return `radial-gradient(
        var(--spotlight-size) var(--spotlight-size) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        color-mix(in hsl, #ec4899 calc((1 - var(--xp, 0.5)) * 100%), #facc15) / 0.08, transparent
      )`;
    }
    // Blue-pink uses hue interpolation
    return `radial-gradient(
      var(--spotlight-size) var(--spotlight-size) at
      calc(var(--x, 0) * 1px)
      calc(var(--y, 0) * 1px),
      hsl(calc(250 + (var(--xp, 0) * 70)) 80% 60% / 0.08), transparent
    )`;
  };

  return (
    <div
      ref={cardRef}
      data-glow
      data-glow-color={glowColor}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        '--base': isPinkYellow ? 330 : 250,
        '--spread': isPinkYellow ? 30 : 70,
        '--radius': '20',
        '--border': '2',
        '--backdrop': 'hsl(0 0% 10% / 0.8)',
        '--backup-border': 'hsl(0 0% 20% / 0.3)',
        '--size': '250',
        '--outer': '1',
        '--border-size': 'calc(var(--border, 2) * 1px)',
        '--spotlight-size': 'calc(var(--size, 200) * 1px)',
        '--hue': isPinkYellow 
          ? `calc(330 + (var(--xp, 0) * 30))` // Pink stays pink, slight shift
          : `calc(250 + (var(--xp, 0) * 70))`, // Blue to pink
        backgroundImage: getBackgroundImage(),
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
      {/* Pointer glow effect inside card */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity: isHovered ? 0.6 : 0,
          background: `radial-gradient(
            300px circle at calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px),
            ${getPointerColor()}, transparent 50%
          )`,
          backgroundAttachment: 'fixed',
        }}
      />
      <div className="relative z-10 h-full flex flex-col justify-end">{children}</div>
    </div>
  );
};

export { GlowCard };
