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
    <section id="fit" className="section-pad bg-[#0a0806]">
      <div className="mx-auto max-w-[1100px] px-6 md:px-12 lg:px-16">
        <div className="relative aspect-[2.45] min-h-[260px] overflow-hidden rounded-card bg-[#080605] md:min-h-[380px]">
          <Image
            src="/images/6a0334588976e5ff1daa64e4_GILD-37.1.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-80 [filter:saturate(0.82)_contrast(1.06)]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05),rgba(5,4,3,0.55))]" />
        </div>

        <div className="pt-16 md:pt-20">
          <div className="max-w-[820px]">
            <h2 className="text-[36px] leading-[1.1] tracking-[-0.02em] text-white md:text-[50px] lg:text-[58px]">
              GILD is built for depth &mdash; the right people, the right room, the
              right conversation.
            </h2>
            <p className="mt-6 max-w-[640px] text-[15px] leading-[1.85] text-white/55 md:text-base">
              Most communities optimize for scale. GILD optimizes for trust,
              relevance, and conversations that compound.
            </p>
          </div>

          <div className="mt-16 grid gap-12 border-t border-[rgba(255,248,235,0.07)] pt-12 md:grid-cols-2 md:gap-20">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-[#4a8888]">
                You&apos;re a fit if
              </p>
              <ul className="mt-8 space-y-5">
                {fitItems.map((item) => (
                  <li key={item} className="flex gap-5 text-[15px] leading-[1.75] text-white/80">
                    <span className="mt-[11px] h-px w-5 shrink-0 bg-[#4a8888]/50" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-white/35">
                GILD isn&apos;t for you if
              </p>
              <ul className="mt-8 space-y-5">
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
      </div>
    </section>
  );
}
