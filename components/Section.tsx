export default function Section({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      {title && (
        <h2 className="section-title">
          {title}
        </h2>
      )}
      <div className="space-y-4">{children}</div>
    </section>
  );
}
