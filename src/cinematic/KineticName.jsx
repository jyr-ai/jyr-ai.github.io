/** "JYR-AI" kinetic wordmark — letters rise and rotate in on mount, staggered. */
const LETTERS = [
  { c: 'J' },
  { c: 'Y' },
  { c: 'R' },
  { c: '-', kind: 'dash' },
  { c: 'A', kind: 'ai' },
  { c: 'I', kind: 'ai' },
];

export default function KineticName() {
  return (
    <h1 className="kname" aria-label="JYR-AI">
      {LETTERS.map((l, i) => {
        const cls = [
          'kname__ch',
          l.kind === 'dash' ? 'dash' : '',
          l.kind === 'ai' ? 'kname__ai' : '',
        ]
          .filter(Boolean)
          .join(' ');
        return (
          <span
            key={`${l.c}-${i}`}
            aria-hidden="true"
            className={cls}
            style={{ animationDelay: `${0.15 + i * 0.09}s` }}
          >
            {l.c}
          </span>
        );
      })}
    </h1>
  );
}
