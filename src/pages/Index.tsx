import { GlowingEffectDemo } from "@/components/GlowingEffectDemo";

const Index = () => {
  return (
    <div className="min-h-screen bg-background dark">
      <div className="dark bg-background min-h-screen">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4">
              Glowing Effect Cards
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Move your cursor over the cards to see the beautiful animated gradient border effect
            </p>
          </div>
          <GlowingEffectDemo />
        </div>
      </div>
    </div>
  );
};

export default Index;
