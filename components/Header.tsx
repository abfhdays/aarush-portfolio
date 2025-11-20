export default function Header() {
  return (
    <header className="mb-12">
      <h1 className="mb-2">Hi, I'm Aarush.</h1>
      <p className="text-[var(--text-secondary)] leading-relaxed">
        I'm a third-year Statistics major with a Computer Science minor at the 
        University of Waterloo. I work on machine learning, data infrastructure, 
        and building things that solve interesting problems.
      </p>
      <div className="flex gap-4 mt-4 text-sm">
        <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
          github
        </a>
        <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
          linkedin
        </a>
        <a href="mailto:your.email@example.com">
          email
        </a>
      </div>
    </header>
  );
}