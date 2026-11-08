export type Design = 'cafe' | 'classic' | 'studio';

export const DESIGNS: { id: Design; letter: string; label: string; description: string }[] = [
  { id: 'cafe', letter: 'A', label: 'CAFE match', description: 'Closely follows the look of thecafe.org' },
  { id: 'classic', letter: 'B', label: 'Current', description: 'The current capstone design, lightly polished' },
  { id: 'studio', letter: 'C', label: 'Reimagined', description: 'A new direction built around the research' },
];

const isDesign = (value: string | null): value is Design => DESIGNS.some(d => d.id === value);

// The design lives in the real query string (before the #route) so a link such as
// /lead-alumni-hub/?design=studio#/events opens a specific option for a presentation.
export function initialDesign(): Design {
  const value = new URLSearchParams(window.location.search).get('design');
  return isDesign(value) ? value : 'classic';
}

export function syncDesignToUrl(design: Design) {
  const url = new URL(window.location.href);
  url.searchParams.set('design', design);
  window.history.replaceState(window.history.state, '', url);
}
