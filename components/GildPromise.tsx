import Image from "next/image";

const promises = [
  "We protect your confidentiality absolutely.",
  "We will never turn the Forum into a sales channel.",
  "If you opt into the Talent Network, we only bring you real engagements.",
  "We keep our promises small and keep them.",
  "We respect your time — no unnecessary emails, no logins required.",
  "We will treat you like the serious operator you are."
];

export function GildPromise() {
  return (
    <section className="section-pad bg-slate-900">
      <div className="section-shell">
        <p className="section-label">Our Promise to You</p>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="relative aspect-[1.1] overflow-hidden rounded-card bg-slate-800">
            <Image
              src="/images/69bd5c0dfdb159a940d846a8_gild-partnership-model.avif"
              alt=""
              fill
              sizes="(min-width: 1024px) 36vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="max-w-3xl">
            {promises.map((promise) => (
              <p key={promise} className="mb-8 font-serif text-[22px] leading-[1.8] text-white">
                {promise}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
