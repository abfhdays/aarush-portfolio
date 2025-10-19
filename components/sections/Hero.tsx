interface HeroProps {
  name: string;
  subtitle: string;
}

export default function Hero({ name, subtitle }: HeroProps) {
  return (
    <header className="text-center">
      <div className="eyebrow">portfolio</div>
      <h1 className="mt-1 font-display text-4xl md:text-5xl tracking-tight">
        {name}
      </h1>
      <p className="subtitle">{subtitle}</p>
    </header>
  );
}