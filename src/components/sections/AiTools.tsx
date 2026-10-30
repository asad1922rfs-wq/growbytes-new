import {
  siClaude,
  siFigma,
  siFlutter,
  siNextdotjs,
  siReact,
  siShopify,
  siTailwindcss,
  siTypescript,
  siWordpress,
  siGithubcopilot,
  siGoogleads,
  siGoogleanalytics,
  siGooglegemini,
  siGooglesearchconsole,
  siHubspot,
  siMailchimp,
  siMeta,
  siOpenai,
  siSemrush,
} from "simple-icons";

type Tool = { title: string; hex: string; path: string };

// Cursor has no simple-icons entry; a simplified cube mark stands in.
const cursor: Tool = {
  title: "Cursor",
  hex: "171918",
  path: "M12 1.5 21.5 7v10L12 22.5 2.5 17V7Zm0 2.3L4.6 8.1 12 12.4l7.4-4.3ZM4.5 9.8v6.1l6.5 3.8v-6.1Zm15 0-6.5 3.8v6.1l6.5-3.8Z",
};

export const aiCodingTools: Tool[] = [cursor, siClaude, siOpenai, siGooglegemini, siGithubcopilot];
export const buildTools: Tool[] = [siFigma, siReact, siNextdotjs, siTypescript, siTailwindcss, siShopify, siWordpress, siFlutter];
export const marketingTools: Tool[] = [siGoogleads, siMeta, siGoogleanalytics, siGooglesearchconsole, siSemrush, siMailchimp, siHubspot];

/** Labelled row of tool marks, shown under a hero slide's buttons. */
export function ToolRow({ title, tools, className }: { title: string; tools: Tool[]; className?: string }) {
  return (
    <div className={className}>
      <p className="text-center text-[0.75rem] font-extrabold tracking-[0.14em] text-[#4a525a] uppercase sm:text-left">{title}</p>
      <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:justify-start sm:gap-x-10">
        {tools.map((t) => (
          <li key={t.title} title={t.title}>
            <svg role="img" aria-label={t.title} viewBox="0 0 24 24" className="size-9" style={{ fill: `#${t.hex}` }}>
              <path d={t.path} />
            </svg>
          </li>
        ))}
      </ul>
    </div>
  );
}
