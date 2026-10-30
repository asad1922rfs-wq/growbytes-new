/** Line icon for an industry, drawn from the path stored in content/industries. */
export function IndustryIcon({ path, className }: { path: string; className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d={path} />
    </svg>
  );
}
