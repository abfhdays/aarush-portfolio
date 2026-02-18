import type { ReactNode } from "react";

const SYNTAX_REGEX =
  /"[^"]*"|\b(SELECT|FROM|WHERE|LIMIT|GROUP BY|COUNT|SUM)\b|\b\d+(\.\d+)?[xms]?\b|\b(DUCKDB|POLARS|duckdb|polars|spark)\b/g;

function getClassName(match: string): string {
  if (match.startsWith('"') && match.endsWith('"')) return "syntax-string";
  if (/^(SELECT|FROM|WHERE|LIMIT|GROUP BY|COUNT|SUM)$/.test(match)) return "syntax-keyword";
  if (/^(DUCKDB|POLARS|duckdb|polars|spark)$/.test(match)) return "syntax-backend";
  if (/^\d+(\.\d+)?[xms]?$/.test(match)) return "syntax-number";
  return "";
}

export function highlightSyntax(text: string): ReactNode[] {
  const result: ReactNode[] = [];
  let currentIndex = 0;
  let key = 0;

  for (const match of text.matchAll(SYNTAX_REGEX)) {
    const matchText = match[0];
    const matchStart = match.index!;
    const matchEnd = matchStart + matchText.length;

    if (matchStart > currentIndex) {
      result.push(<span key={key++}>{text.slice(currentIndex, matchStart)}</span>);
    }

    result.push(
      <span key={key++} className={getClassName(matchText)}>
        {matchText}
      </span>
    );
    currentIndex = matchEnd;
  }

  if (currentIndex < text.length) {
    result.push(<span key={key++}>{text.slice(currentIndex)}</span>);
  }

  return result;
}
