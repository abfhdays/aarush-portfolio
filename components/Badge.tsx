export default function Badge({ children }: { children: React.ReactNode }) {
  return <span className="text-xs rounded px-2 py-1 bg-zinc-100">{children}</span>;
}
