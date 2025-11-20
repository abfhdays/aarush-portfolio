interface SectionProps {
  title?: string;
  children: React.ReactNode;
}

export default function Section({ title, children }: SectionProps) {
  return (
    <section className="mb-6">
      {title && (
        <h2 className="mb-4 text-[1.4rem] font-normal underline underline-offset-4 decoration-[var(--accent)]"
          style={{
            fontFamily: "var(--font-sans), Inter, Arial, sans-serif",
            textTransform: "none",
            color: "#5e7d5e",
            letterSpacing: "0.01em",
          }}
        >
          {title}
        </h2>
      )}
      <div className="space-y-4">{children}</div>
    </section>
  );
}