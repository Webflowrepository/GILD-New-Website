import Image from "next/image";

const fit = [
  "You lead a software engineering organization at the enterprise level. Deciding, not just exploring.",
  "You run a B2B company and want peer relationships that produce real commercial value.",
  "You prefer substance to performance — thoughtful conversation over working the room."
];

const notFit = [
  "You're primarily looking for product exposure or vendor perspective.",
  "You want a Slack community — we're in-person, full stop.",
  "You're a consumer founder or junior engineer. There are better forums for that, and we'll gladly point you toward them."
];

export function FitNotFit() {
  return (
    <section id="fit" className="section-pad bg-slate-900">
      <div className="section-shell">
        <p className="section-label">Who It&apos;s For</p>
        <div className="relative mb-12 aspect-[2.4] overflow-hidden rounded-card bg-slate-800">
          <Image
            src="/images/698cced70159f31e5d1a0306_DSCF3589%201.avif"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="grid gap-10 md:grid-cols-2">
          <div className="border-l-2 border-teal-500 pl-6">
            <p className="mb-8 text-xs font-medium uppercase tracking-[0.24em] text-teal-400">
              You&apos;re a fit if
            </p>
            <div className="space-y-7">
              {fit.map((item) => (
                <p key={item} className="text-base leading-7 text-slate-100">
                  {item}
                </p>
              ))}
            </div>
          </div>
          <div className="border-l-2 border-slate-700 pl-6">
            <p className="mb-8 text-xs font-medium uppercase tracking-[0.24em] text-slate-300">
              GILD isn&apos;t for you if
            </p>
            <div className="space-y-7">
              {notFit.map((item) => (
                <p key={item} className="text-base leading-7 text-slate-300">
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
