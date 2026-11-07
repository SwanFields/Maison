const items = [
  "Exclusive Collection",
  "Hand-finished in Atelier",
  "Complimentary Gift Wrapping",
  "Worldwide Delivery",
  "Made in Limited Numbers",
];

export default function MarqueeStrip() {
  const track = [...items, ...items, ...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-petal/80 bg-white py-5">
      <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
        {track.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center gap-10">
            <span className="text-[10px] uppercase tracking-[0.34em] text-ink/50">{item}</span>
            <span className="h-1 w-1 rounded-full bg-bloom/60" />
          </span>
        ))}
      </div>
    </div>
  );
}