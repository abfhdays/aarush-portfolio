export default function GridPattern() {
  return (
    <svg className="site-grid" aria-hidden="true" focusable="false">
      <defs>
        <pattern id="site-grid-pattern" width="100" height="10" patternUnits="userSpaceOnUse">
          <path d="M 100 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeDasharray="2 2" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#site-grid-pattern)" />
    </svg>
  );
}
