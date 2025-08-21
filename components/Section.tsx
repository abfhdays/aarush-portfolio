export default function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl mb-4">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}
