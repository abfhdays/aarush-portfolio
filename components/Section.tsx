export default function Section({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      {title && (
        <h2
          className="mb-4 text-2xl font-normal"
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
