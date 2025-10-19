interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'soft';
}

export default function Badge({ children, variant = 'default' }: BadgeProps) {
  const baseClasses = "inline-block text-xs px-2 py-0.5 rounded";
  const variantClasses = variant === 'soft' 
    ? "bg-[#f3e7d6] text-[var(--accent)] ring-1 ring-[var(--border)]"
    : "bg-[var(--accent-bg)] text-[var(--accent-ink)] border border-[var(--border)]";
  
  return <span className={`${baseClasses} ${variantClasses}`}>{children}</span>;
}