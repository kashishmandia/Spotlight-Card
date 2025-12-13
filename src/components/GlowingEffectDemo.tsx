import { GlowCard } from "@/components/ui/glow-card";

export function GlowingEffectDemo() {
  return (
    <>
      <style>{glowStyles}</style>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto p-4">
        <GlowCard glowColor="blue-pink" className="flex flex-col justify-end">
          <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
            AI SaaS Landing Page
          </h3>
          <p className="text-sm md:text-base text-muted-foreground">
            A landing page for a fictional AI tool. The focus here is on the 'futuristic' aesthetic currently dominating the tech industry.
          </p>
        </GlowCard>

        <GlowCard glowColor="pink-yellow" className="flex flex-col justify-end">
          <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
            Financial Advisor
          </h3>
          <p className="text-sm md:text-base text-muted-foreground">
            A personalized financial dashboard that doesn't just calculate numbers but visualizes your financial health.
          </p>
        </GlowCard>

        <GlowCard glowColor="blue-pink" className="flex flex-col justify-end">
          <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
            KashBerry AI
          </h3>
          <p className="text-sm md:text-base text-muted-foreground">
            KashBerry AI is a cute, pink-themed AI fashion assistant that helps women discover trendy outfits, compare prices across Amazon, Myntra & Meesho, and shop smarter with LLM-powered recommendations.
          </p>
        </GlowCard>

        <GlowCard glowColor="pink-yellow" className="flex flex-col justify-end">
          <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
            This card is also built by Cursor
          </h3>
          <p className="text-sm md:text-base text-muted-foreground">
            I'm not even kidding. Ask my mom if you don't believe me.
          </p>
        </GlowCard>
      </div>
    </>
  );
}

const glowStyles = `
  [data-glow]::before,
  [data-glow]::after {
    pointer-events: none;
    content: "";
    position: absolute;
    inset: calc(var(--border-size, 2px) * -1);
    border: var(--border-size, 2px) solid transparent;
    border-radius: calc(var(--radius, 20) * 1px);
    background-attachment: fixed;
    background-size: calc(100% + (2 * var(--border-size, 2px))) calc(100% + (2 * var(--border-size, 2px)));
    background-repeat: no-repeat;
    background-position: 50% 50%;
    mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
    mask-clip: padding-box, border-box;
    mask-composite: intersect;
  }
  
  [data-glow]::before {
    background-image: radial-gradient(
      calc(var(--spotlight-size, 200px) * 0.75) calc(var(--spotlight-size, 200px) * 0.75) at
      calc(var(--x, 0) * 1px)
      calc(var(--y, 0) * 1px),
      hsl(var(--hue, 210) 100% 55% / 1), transparent 100%
    );
    filter: brightness(1.5);
  }
  
  [data-glow]::after {
    background-image: radial-gradient(
      calc(var(--spotlight-size, 200px) * 0.5) calc(var(--spotlight-size, 200px) * 0.5) at
      calc(var(--x, 0) * 1px)
      calc(var(--y, 0) * 1px),
      hsl(0 100% 100% / 0.8), transparent 100%
    );
  }
  
  [data-glow] [data-glow] {
    position: absolute;
    inset: 0;
    will-change: filter;
    opacity: var(--outer, 1);
    border-radius: calc(var(--radius, 20) * 1px);
    filter: blur(calc(var(--border-size, 2px) * 10));
    background: none;
    pointer-events: none;
    border: none;
  }
  
  [data-glow] > [data-glow]::before {
    inset: -10px;
    border-width: 10px;
  }
`;
