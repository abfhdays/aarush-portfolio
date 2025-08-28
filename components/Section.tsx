export default function Section({
  title,
  children,
}: { title?: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      {title && (
        <h2
          className="mb-4 text-[1.4rem] font-normal underline underline-offset-4 decoration-[var(--accent)]
                     text-[#396e39] tracking-[0.01em]
                     [font-family:var(--font-sans),_Inter,_Arial,_sans-serif]"
        >
          {title}
        </h2>
      )}
      <div className="space-y-4">{children}</div>
    </section>
  );
}

