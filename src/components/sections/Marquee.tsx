const items = [
  "DSTU B V.2.2-26",
  "ISO 9001:2015",
  "LEED Certified",
  "Knauf Partner",
  "Hilti Professional",
  "Würth Authorized",
  "EN 1090 Certified",
  "DBN V.1.2-2:2006",
  "BIM Level 2",
  "Masterspec Partner",
];

function MarqueeItem({ label }: { label: string }) {
  return (
    <span className="flex items-center gap-6 text-sm text-zinc-500 font-body tracking-wider uppercase whitespace-nowrap">
      <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0" />
      {label}
    </span>
  );
}

export default function Marquee() {
  return (
    <div className="border-y border-zinc-800 py-5 overflow-hidden">
      <div className="marquee-track flex gap-12 w-max">
        {items.map((item, i) => (
          <MarqueeItem key={`a-${i}`} label={item} />
        ))}
        {items.map((item, i) => (
          <MarqueeItem key={`b-${i}`} label={item} />
        ))}
      </div>
    </div>
  );
}
