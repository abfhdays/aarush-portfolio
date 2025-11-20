import Image from 'next/image';

interface HeroProps {
  subtitle: string;
}

export default function Hero({ subtitle }: HeroProps) {
  return (
    <header className="text-center">
      <div className="eyebrow">portfolio</div>
      <div className="mt-1 flex justify-center">
        <Image
          src="/name.jpg"
          alt="Aarush"
          width={300}
          height={80}
          className="h-auto"
          priority
        />
      </div>
      <p className="subtitle">{subtitle}</p>
    </header>
  );
}