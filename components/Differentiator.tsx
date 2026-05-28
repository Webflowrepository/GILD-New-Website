import Image from "next/image";

const fitItems = [
  "Enterprise engineering leader",
  "B2B founder or operator",
  "Prefer substance over networking theater"
];

const notFitItems = [
  "Looking for vendor exposure",
  "Want another Slack community",
  "Early consumer founder or junior engineer"
];

export function Differentiator() {
  return (
    <section
      id="fit"
      className="section-bridge relative overflow-hidden bg-[#050403]"
      style={{ minHeight: "clamp(540px, 80vh, 820px)" }}
    >
      {/* Full background image */}
      <Image
        src="/images/6a0334588976e5ff1daa64e4_GILD-37.1.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center opacity-65 [filter:saturate(0.8)_contrast(1.08)]"
      />
      {/* Cinematic overlay — heavier at bottom where text lives */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,4,3,0.18)_0%,rgba(5,4,3,0.62)_50%,rgba(5,4,3,0.94)_100%)]" />

      {/* Text content — bottom-aligned */}
      <div className="relative z-10 mx-auto flex max-w-[1100px] flex-col justify-end px-6 py-14 md:px-12 md:py-20 lg:px-16 lg:py-24"
        style={{ minHeight: "clamp(540px, 80vh, 820px)" }}
      >
        <div className="max-w-[820px]">
          <h2 className="text-[34px] leading-[1.1] tracking-[-0.02em] text-white md:text-[50px] lg:text-[58px]">
            GILD is built for depth &mdash; the right people, the right room, the
            right conversation.
          </h2>
          <p className="mt-5 max-w-[580px] text-[15px] leading-[1.85] text-white/55 md:text-base">
            Most communities optimize for scale. GILD optimizes for trust,
            relevance, and conversations that compound.
          </p>
        </div>

        <div className="mt-12 grid gap-10 border-t border-[rgba(255,248,235,0.1)] pt-10 md:grid-cols-2 md:gap-20">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-[#8fa39d]">
              You&apos;re a fit if
            </p>
            <ul className="mt-7 space-y-4">
              {fitItems.map((item) => (
                <li key={item} className="flex gap-5 text-[15px] leading-[1.75] text-white/85">
                  <span className="mt-[11px] h-px w-5 shrink-0 bg-[#8fa39d]/55" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-white/35">
              GILD isn&apos;t for you if
            </p>
            <ul className="mt-7 space-y-4">
              {notFitItems.map((item) => (
                <li key={item} className="flex gap-5 text-[15px] leading-[1.75] text-white/40">
                  <span className="mt-[11px] h-px w-5 shrink-0 bg-white/12" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
