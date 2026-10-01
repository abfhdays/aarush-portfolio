export function getTeaser(description: string): string {
  const first = description.trim().split('\n\n')[0];
  return first
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`#]/g, '');
}
