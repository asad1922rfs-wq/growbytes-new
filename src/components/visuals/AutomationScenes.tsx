import type { ReactNode } from "react";

/**
 * One small editorial scene per AI automation capability, drawn on a shared
 * 320×180 canvas: warm paper, ink outlines, a single orange accent.
 * Labels are illustrative sample text (no client data, no results claimed).
 * Decorative; the accordion text carries the meaning.
 */
const INK = "#171918";
const MUTED = "#6b716c";
const ORANGE = "#F66135";
const ORANGE_TEXT = "#C2401B";
const PAPER = "#FFFFFF";
const LINE = "#d9d4ca";
const SOFT = "#efe9df";
const FONT = "var(--font-manrope), system-ui, sans-serif";

const Card = ({ x, y, w, h, r = 6, fill = PAPER, stroke = INK }: { x: number; y: number; w: number; h: number; r?: number; fill?: string; stroke?: string }) => (
  <rect x={x} y={y} width={w} height={h} rx={r} fill={fill} stroke={stroke} strokeWidth="1.5" />
);
const T = ({
  x,
  y,
  children,
  size = 7.5,
  weight = 500,
  color = MUTED,
  anchor = "start",
}: {
  x: number;
  y: number;
  children: ReactNode;
  size?: number;
  weight?: number;
  color?: string;
  anchor?: "start" | "middle" | "end";
}) => (
  <text x={x} y={y} fontSize={size} fontWeight={weight} fill={color} textAnchor={anchor} fontFamily={FONT}>
    {children}
  </text>
);
const H = (p: { x: number; y: number; children: ReactNode; color?: string; size?: number; anchor?: "start" | "middle" | "end" }) => (
  <T weight={800} color={p.color ?? INK} size={p.size ?? 8.5} {...p} />
);
const Flow = ({ d }: { d: string }) => (
  <path d={d} fill="none" stroke={ORANGE} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 4" />
);
const Arrow = ({ x, y }: { x: number; y: number }) => (
  <path d={`M${x - 5} ${y - 4}l5 4-5 4`} fill="none" stroke={ORANGE} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
);
const Window = ({ x, y, w, h, title }: { x: number; y: number; w: number; h: number; title?: string }) => (
  <>
    <Card x={x} y={y} w={w} h={h} />
    <path d={`M${x} ${y + 14}h${w}`} stroke={INK} strokeWidth="1.5" />
    <circle cx={x + 8} cy={y + 7} r="2" fill={INK} />
    <circle cx={x + 15} cy={y + 7} r="2" fill={LINE} />
    <circle cx={x + 22} cy={y + 7} r="2" fill={LINE} />
    {title && (
      <T x={x + w / 2} y={y + 9.5} size={6.5} anchor="middle">
        {title}
      </T>
    )}
  </>
);
const Spark = ({ x, y }: { x: number; y: number }) => <path d={`M${x} ${y - 5}l1.6 3.4 3.4 1.6-3.4 1.6-1.6 3.4-1.6-3.4-3.4-1.6 3.4-1.6z`} fill={ORANGE} />;

export const automationScenes: ReactNode[] = [
  /* 0 Business process automation: a workflow run, product-UI style */
  <g key="0">
    <defs>
      <filter id="sc0-shadow" x="-10%" y="-10%" width="120%" height="130%">
        <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#171918" floodOpacity="0.08" />
      </filter>
    </defs>
    <rect x={44} y={14} width={232} height={154} rx={12} fill={PAPER} stroke={LINE} filter="url(#sc0-shadow)" />
    {/* Header */}
    <H x={58} y={34} size={9}>
      New inquiry workflow
    </H>
    <T x={58} y={45} size={6.5}>
      Website form · Kitchen refit
    </T>
    <rect x={214} y={25} width={50} height={14} rx={7} fill="#fdebe5" />
    <circle cx={223} cy={32} r={2.5} fill={ORANGE} />
    <T x={244} y={34.5} size={6.5} color={ORANGE_TEXT} weight={700} anchor="middle">
      Running
    </T>
    <path d="M44 54h232" stroke={LINE} />
    {/* Step rail */}
    <path d="M64 68v72" stroke={LINE} strokeWidth="1.5" />
    {[
      { y: 68, title: "Inquiry received", note: "Details extracted", state: "done" },
      { y: 94, title: "Team review", note: "Waiting for Ops team", state: "active" },
      { y: 120, title: "Update CRM", note: "Create lead record", state: "todo" },
      { y: 146, title: "Schedule follow-up", note: "Call within 1 day", state: "todo" },
    ].map((st) => (
      <g key={st.title}>
        {st.state === "done" && (
          <>
            <circle cx={64} cy={st.y} r={6} fill={INK} />
            <path d={`M61.5 ${st.y}l1.8 1.8 3.4-3.6`} fill="none" stroke={PAPER} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </>
        )}
        {st.state === "active" && (
          <>
            <circle cx={64} cy={st.y} r={8.5} fill="#fdebe5" />
            <circle cx={64} cy={st.y} r={5} fill={ORANGE} />
          </>
        )}
        {st.state === "todo" && <circle cx={64} cy={st.y} r={5.5} fill={PAPER} stroke={LINE} strokeWidth="1.5" />}
        <T x={78} y={st.y - 1} size={7.5} color={st.state === "todo" ? MUTED : INK} weight={st.state === "todo" ? 600 : 800}>
          {st.title}
        </T>
        <T x={78} y={st.y + 8.5} size={6}>
          {st.note}
        </T>
      </g>
    ))}
    {/* Inline action on the active step */}
    <rect x={204} y={87} width={60} height={15} rx={7.5} fill={INK} />
    <T x={234} y={97} size={6.5} color={PAPER} weight={700} anchor="middle">
      Approve
    </T>
    <T x={262} y={127} size={6} anchor="end">
      Queued
    </T>
    <T x={262} y={153} size={6} anchor="end">
      Queued
    </T>
  </g>,

  /* 1 Inquiry handling: messages sorted into three trays */
  <g key="1">
    {[
      { s: "Quote request", f: "via website", dot: LINE },
      { s: "Order arrived late", f: "via email", dot: LINE },
      { s: "Unusual request", f: "via chat", dot: ORANGE },
    ].map((m, i) => (
      <g key={m.s}>
        <Card x={18} y={36 + i * 38} w={112} h={30} />
        <circle cx={31} cy={51 + i * 38} r="5" fill={m.dot} />
        <H x={42} y={49 + i * 38} size={8}>
          {m.s}
        </H>
        <T x={42} y={59 + i * 38} size={6.5}>
          {m.f}
        </T>
      </g>
    ))}
    <Flow d="M134 51h52M134 89h52M134 127h52" />
    <Arrow x={188} y={51} />
    <Arrow x={188} y={89} />
    <Arrow x={188} y={127} />
    {[
      { y: 51, label: "Sales", note: "Auto-assigned" },
      { y: 89, label: "Support", note: "Auto-assigned" },
      { y: 127, label: "Review", note: "Check first" },
    ].map((t) => (
      <g key={t.label}>
        <Card x={194} y={t.y - 15} w={108} h={30} fill={t.label === "Review" ? SOFT : PAPER} />
        <H x={204} y={t.y - 1} color={t.label === "Review" ? ORANGE_TEXT : INK}>
          {t.label}
        </H>
        <T x={204} y={t.y + 9} size={6.5}>
          {t.note}
        </T>
      </g>
    ))}
  </g>,

  /* 2 Knowledge assistant: question, sourced answer, document */
  <g key="2">
    <Card x={18} y={28} w={142} h={26} r={13} fill={SOFT} />
    <T x={30} y={44} size={7.5} color={INK}>
      What is our refund window?
    </T>
    <Card x={30} y={64} w={142} h={62} r={12} />
    <Spark x={42} y={78} />
    <H x={50} y={81} size={8}>
      Assistant
    </H>
    <T x={42} y={95} size={7.5} color={INK}>
      Refunds are accepted within
    </T>
    <T x={42} y={105} size={7.5} color={INK}>
      30 days of delivery.
    </T>
    <rect x={42} y={110} width={66} height={11} rx="5.5" fill={ORANGE} />
    <T x={75} y={117.5} size={6} color={PAPER} weight={700} anchor="middle">
      Source: Policy, p.2
    </T>
    <Flow d="M172 100c10 0 10-6 20-6" />
    <Card x={196} y={24} w={108} h={132} />
    <H x={208} y={42}>
      Returns policy
    </H>
    <T x={208} y={56} size={6.5}>
      1. Eligibility
    </T>
    <T x={208} y={67} size={6.5}>
      Items must be unused.
    </T>
    <T x={208} y={82} size={6.5}>
      2. Time limits
    </T>
    <rect x={203} y={86} width={94} height={24} rx="3" fill="none" stroke={ORANGE} strokeWidth="1.5" />
    <T x={208} y={96} size={6.5} color={INK}>
      Refunds within 30 days
    </T>
    <T x={208} y={105} size={6.5} color={INK}>
      of delivery.
    </T>
    <T x={208} y={124} size={6.5}>
      3. Exchanges
    </T>
    <T x={208} y={135} size={6.5}>
      Free for the first swap.
    </T>
  </g>,

  /* 3 Document processing: invoice fields lifted into a structured table */
  <g key="3">
    <Card x={20} y={20} w={116} h={140} />
    <H x={32} y={38} size={9}>
      INVOICE
    </H>
    <T x={32} y={50} size={6.5}>
      Northwind Supplies
    </T>
    {[
      { y: 70, k: "Invoice no.", v: "INV-0381" },
      { y: 90, k: "Date", v: "12 Mar 2026" },
      { y: 110, k: "Total due", v: "$1,240.00" },
    ].map((f) => (
      <g key={f.k}>
        <rect x={27} y={f.y - 10} width={102} height={15} rx="3" fill="none" stroke={ORANGE} strokeWidth="1.5" />
        <T x={32} y={f.y} size={6.5}>
          {f.k}
        </T>
        <T x={124} y={f.y} size={6.5} color={INK} weight={700} anchor="end">
          {f.v}
        </T>
      </g>
    ))}
    <T x={32} y={134} size={6.5}>
      Payment terms: 30 days
    </T>
    <Flow d="M138 90h34" />
    <Arrow x={174} y={90} />
    <Card x={180} y={42} w={120} h={96} />
    <H x={190} y={58} size={8}>
      Ready for review
    </H>
    {[
      { k: "Supplier", v: "Northwind" },
      { k: "Invoice", v: "INV-0381" },
      { k: "Date", v: "12 Mar" },
      { k: "Total", v: "$1,240.00" },
    ].map((r, i) => (
      <g key={r.k}>
        <path d={`M180 ${66 + i * 16}h120`} stroke={LINE} strokeWidth="1.25" />
        <T x={190} y={77 + i * 16} size={6.5}>
          {r.k}
        </T>
        <T x={290} y={77 + i * 16} size={6.5} color={INK} weight={700} anchor="end">
          {r.v}
        </T>
      </g>
    ))}
    <circle cx={292} cy={50} r="6" fill={ORANGE} />
    <path d="M289 50l2 2 4-4.5" fill="none" stroke={PAPER} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </g>,

  /* 4 CRM integrations: form and CRM windows kept in sync */
  <g key="4">
    <Window x={16} y={30} w={116} h={124} title="Contact form" />
    {[
      { y: 54, k: "Name", v: "Jordan Lee" },
      { y: 80, k: "Email", v: "jordan@acme.co" },
      { y: 106, k: "Company", v: "Acme Studio" },
    ].map((f) => (
      <g key={f.k}>
        <T x={26} y={f.y} size={6}>
          {f.k}
        </T>
        <rect x={26} y={f.y + 3} width={96} height={13} rx="3" fill="none" stroke={LINE} strokeWidth="1.5" />
        <T x={31} y={f.y + 12} size={6.5} color={INK}>
          {f.v}
        </T>
      </g>
    ))}
    <rect x={26} y={132} width={40} height={13} rx="3" fill={INK} />
    <T x={46} y={141} size={6.5} color={PAPER} weight={700} anchor="middle">
      Send
    </T>
    <Flow d="M136 78h44M180 104h-44" />
    <Arrow x={182} y={78} />
    <path d="M139 100l-4 4 4 4" fill="none" stroke={ORANGE} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    <Window x={188} y={30} w={116} h={124} title="CRM" />
    <circle cx={208} cy={64} r="10" fill={SOFT} stroke={INK} strokeWidth="1.5" />
    <T x={208} y={67} size={7} color={INK} weight={800} anchor="middle">
      JL
    </T>
    <H x={224} y={62} size={8}>
      Jordan Lee
    </H>
    <T x={224} y={72} size={6.5}>
      Acme Studio
    </T>
    {[
      { k: "Stage", v: "New lead", hot: true },
      { k: "Owner", v: "Sales" },
      { k: "Source", v: "Website" },
    ].map((r, i) => (
      <g key={r.k}>
        <T x={198} y={98 + i * 16} size={6.5}>
          {r.k}
        </T>
        <T x={294} y={98 + i * 16} size={6.5} color={r.hot ? ORANGE_TEXT : INK} weight={700} anchor="end">
          {r.v}
        </T>
      </g>
    ))}
  </g>,

  /* 5 AI features in existing software: a record with a drafted summary panel */
  <g key="5">
    <Window x={16} y={22} w={288} h={136} title="Customer record" />
    <rect x={17} y={37} width={58} height={120} fill={SOFT} />
    {["Orders", "Customers", "Tickets", "Reports"].map((m, i) => (
      <T key={m} x={26} y={54 + i * 15} size={7} color={i === 1 ? INK : MUTED} weight={i === 1 ? 800 : 500}>
        {m}
      </T>
    ))}
    <H x={88} y={54} size={9}>
      Riverside Café
    </H>
    <T x={88} y={66} size={6.5}>
      Customer since 2023
    </T>
    {[
      ["Last order", "4 days ago"],
      ["Open tickets", "2"],
      ["Preferred contact", "Email"],
    ].map(([k, v], i) => (
      <g key={k}>
        <T x={88} y={86 + i * 15} size={6.5}>
          {k}
        </T>
        <T x={186} y={86 + i * 15} size={6.5} color={INK} weight={700} anchor="end">
          {v}
        </T>
      </g>
    ))}
    <rect x={198} y={46} width={96} height={102} rx="6" fill={PAPER} stroke={ORANGE} strokeWidth="1.5" />
    <Spark x={210} y={60} />
    <H x={218} y={63} size={8}>
      Draft summary
    </H>
    {["Regular buyer, mostly", "wholesale coffee. Two", "delivery tickets open;", "reply by email."].map((l, i) => (
      <T key={l} x={208} y={80 + i * 11} size={6.5} color={INK}>
        {l}
      </T>
    ))}
    <rect x={208} y={128} width={44} height={13} rx="6.5" fill={INK} />
    <T x={230} y={137} size={6.5} color={PAPER} weight={700} anchor="middle">
      Use draft
    </T>
    <T x={258} y={137} size={6.5}>
      Edit
    </T>
  </g>,

  /* 6 Customer-facing chat on a website */
  <g key="6">
    <Window x={16} y={22} w={206} h={136} title="yourstore.com" />
    <H x={30} y={60} size={13}>
      Spring collection
    </H>
    <T x={30} y={76} size={7.5}>
      Free returns on every order.
    </T>
    <rect x={30} y={88} width={54} height={16} rx="4" fill={INK} />
    <T x={57} y={98.5} size={7} color={PAPER} weight={700} anchor="middle">
      Shop now
    </T>
    <Card x={170} y={46} w={134} h={116} r={10} />
    <path d="M170 68V56a10 10 0 0 1 10-10h114a10 10 0 0 1 10 10v12z" fill={INK} />
    <circle cx={183} cy={57} r="4" fill={ORANGE} />
    <T x={192} y={60} size={7} color={PAPER} weight={700}>
      Help
    </T>
    <Card x={178} y={76} w={90} h={18} r={9} fill={SOFT} stroke={LINE} />
    <T x={186} y={88} size={6.5} color={INK}>
      Hi! How can I help?
    </T>
    <Card x={206} y={100} w={90} h={18} r={9} />
    <T x={214} y={112} size={6.5} color={INK}>
      Do you ship to the UK?
    </T>
    <Card x={178} y={124} w={104} h={18} r={9} fill={SOFT} stroke={LINE} />
    <T x={186} y={136} size={6.5} color={INK}>
      Yes, in 3–5 working days.
    </T>
    <T x={237} y={154} size={6.5} color={ORANGE_TEXT} weight={700} anchor="middle">
      Talk to a person →
    </T>
  </g>,

  /* 7 Reporting: chart with a short written summary beside it */
  <g key="7">
    <Card x={16} y={24} w={170} h={132} />
    <H x={28} y={42} size={8.5}>
      Inquiries by week
    </H>
    <path d="M30 136h144" stroke={LINE} strokeWidth="1.5" />
    {[
      [42, 30, "W1"],
      [66, 44, "W2"],
      [90, 38, "W3"],
      [114, 58, "W4"],
      [138, 52, "W5"],
      [162, 70, "W6"],
    ].map(([x, h, l]) => (
      <g key={l as string}>
        <rect
          x={(x as number) - 8}
          y={136 - (h as number)}
          width={16}
          height={h as number}
          rx="3"
          fill={x === 162 ? ORANGE : SOFT}
          stroke={INK}
          strokeWidth="1.25"
        />
        <T x={x as number} y={147} size={6} anchor="middle">
          {l}
        </T>
      </g>
    ))}
    <Flow d="M188 90h10" />
    <Card x={200} y={36} w={104} h={108} />
    <Spark x={212} y={52} />
    <H x={220} y={55} size={8}>
      Weekly summary
    </H>
    {["Inquiries rose again", "this week, mostly from", "search. Pricing page", "visits are worth a look."].map((l, i) => (
      <T key={l} x={210} y={74 + i * 11} size={6.5} color={INK}>
        {l}
      </T>
    ))}
    <T x={210} y={132} size={6.5} color={ORANGE_TEXT} weight={700}>
      View source data →
    </T>
  </g>,

  /* 8 Workflow review: a mapped process with a magnifier over one step */
  <g key="8">
    <Card x={16} y={20} w={288} h={140} fill={SOFT} />
    <H x={28} y={38} size={8.5}>
      Current workflow
    </H>
    {[
      { x: 62, y: 70, l: "Inquiry" },
      { x: 140, y: 70, l: "Quote" },
      { x: 218, y: 70, l: "Invoice" },
      { x: 100, y: 124, l: "Follow-up" },
      { x: 178, y: 124, l: "Report" },
    ].map((b) => (
      <g key={b.l}>
        <rect x={b.x - 28} y={b.y - 13} width={56} height={26} rx="5" fill={PAPER} stroke={INK} strokeWidth="1.5" />
        <T x={b.x} y={b.y + 2.5} size={7.5} color={INK} weight={700} anchor="middle">
          {b.l}
        </T>
      </g>
    ))}
    <path d="M90 70h22M168 70h22M74 83l16 28M150 83l16 28M128 124h22" stroke={INK} strokeWidth="1.25" fill="none" />
    <circle cx={262} cy={118} r="24" fill={PAPER} stroke={ORANGE} strokeWidth="2" />
    <path d="M279 135l12 12" stroke={ORANGE} strokeWidth="3" strokeLinecap="round" />
    <T x={262} y={114} size={6.5} color={INK} weight={800} anchor="middle">
      Good fit
    </T>
    <T x={262} y={124} size={6} anchor="middle">
      for automation
    </T>
  </g>,
];
