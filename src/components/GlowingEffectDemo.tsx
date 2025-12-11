import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";

export function GlowingEffectDemo() {
  return (
    <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[42rem] xl:grid-rows-2">
      <GridItem
        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
        title="AI SaaS Landing Page"
        description="A landing page for a fictional AI tool. The focus here is on the 'futuristic' aesthetic currently dominating the tech industry."
        side="left"
      />
      <GridItem
        area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
        title="Financial Advisor"
        description="A personalized financial dashboard that doesn't just calculate numbers but visualizes your financial health."
        side="right"
      />
      <GridItem
        area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
        title="KashBerry AI"
        description="KashBerry AI is a cute, pink-themed AI fashion assistant that helps women discover trendy outfits, compare prices across Amazon, Myntra & Meesho, and shop smarter with LLM-powered recommendations."
        side="left"
      />
      <GridItem
        area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
        title="This card is also built by Cursor"
        description="I'm not even kidding. Ask my mom if you don't believe me."
        side="right"
      />
    </ul>
  );
}

interface GridItemProps {
  area: string;
  title: string;
  description: React.ReactNode;
  side: "left" | "right";
}

const GridItem = ({ area, title, description, side }: GridItemProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [pointerPosition, setPointerPosition] = useState<'left' | 'center' | 'right'>('center');

  const setGlow = (event: React.MouseEvent) => {
    const target = cardRef.current;
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const centerX = rect.width / 2;
    
    target.style.setProperty("--pointer-x", `${x}px`);
    target.style.setProperty("--pointer-y", `${event.clientY - rect.top}px`);
    
    if (x < centerX - 50) {
      setPointerPosition('left');
    } else if (x > centerX + 50) {
      setPointerPosition('right');
    } else {
      setPointerPosition('center');
    }
  };

  const clearGlow = () => {
    const target = cardRef.current;
    if (!target) return;
    target.style.removeProperty("--pointer-x");
    target.style.removeProperty("--pointer-y");
    setPointerPosition('center');
  };

  // Get pointer glow color based on side and position
  const getPointerColor = () => {
    if (side === 'left') {
      // Left boxes: blue on left, pink on right
      if (pointerPosition === 'left') return 'rgba(99, 102, 241, 0.15)'; // blue
      if (pointerPosition === 'right') return 'rgba(236, 72, 153, 0.15)'; // pink
      return 'rgba(168, 85, 247, 0.15)'; // blend
    } else {
      // Right boxes: pink on left, yellow on right
      if (pointerPosition === 'left') return 'rgba(236, 72, 153, 0.15)'; // pink
      if (pointerPosition === 'right') return 'rgba(234, 179, 8, 0.15)'; // yellow
      return 'rgba(245, 126, 88, 0.15)'; // blend
    }
  };

  return (
    <li className={cn("min-h-[18rem] list-none", area)}>
      <div 
        ref={cardRef}
        className="group relative h-full rounded-[20px] border border-border/30 p-[2px]"
        onMouseMove={setGlow}
        onMouseLeave={clearGlow}
      >
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={2}
          side={side}
          pointerPosition={pointerPosition}
        />
        <div className="relative flex h-full flex-col justify-end gap-6 overflow-hidden rounded-[18px] bg-card p-6 md:p-8">
          <div className="relative flex flex-1 flex-col justify-end gap-3">
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-foreground">
                {title}
              </h3>
              <p className="font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-muted-foreground">
                {description}
              </p>
            </div>
          </div>
          {/* Pointer glow effect */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-all duration-300 group-hover:opacity-40 rounded-[18px]"
            style={{
              background: `radial-gradient(300px circle at var(--pointer-x, 50%) var(--pointer-y, 50%), ${getPointerColor()}, transparent 50%)`,
            }}
          />
        </div>
      </div>
    </li>
  );
};
