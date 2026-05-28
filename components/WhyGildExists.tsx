import { NetworkCards } from "@/components/NetworkCards";

export function WhyGildExists() {
  return (
    <section id="why" className="section-pad bg-slate-900">
      <div className="section-shell">
        <p className="section-label">Why GILD Exists</p>
        <div className="max-w-4xl">
          <p className="font-serif text-2xl leading-10 text-white md:text-[28px]">
            Most professional communities are built by extroverts for extroverts. They
            reward the people who work the room, post in the Slack, send the cold DMs,
            and show up loudest. The rest of us — the quieter operators — show up anyway
            because networking matters, and we leave exhausted.
          </p>
          <p className="mt-8 text-xl leading-8 text-slate-100">
            GILD exists because we believe there&apos;s a better way.
          </p>
        </div>
        <div className="mt-16">
          <NetworkCards />
        </div>
      </div>
    </section>
  );
}
