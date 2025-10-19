interface ChipProps {
  children: React.ReactNode;
}

export default function Chip({ children }: ChipProps) {
  return (
    <span className="display:inline-block font-size:.75rem line-height:1.25rem padding:.25rem_.65rem border-radius:9999px background:var(--accent-bg) color:var(--accent-ink) border:1px_solid_var(--border)">
      {children}
    </span>
  );
}