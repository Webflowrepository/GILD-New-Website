"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    title: "Apply to the Network",
    body: "We review every application personally. Two-week response."
  },
  {
    number: "02",
    title: "Attend Your First Forum",
    body: "20-25 senior leaders. No demos. No selling."
  },
  {
    number: "03",
    title: "Get Introduced to the Right People",
    body: "You don't browse a directory. You don't send cold messages. You tell us what you're working on. We find the right person.",
    note: "Sara, our Community Manager, reaches out periodically with what might be useful."
  },
  {
    number: "04",
    title: "Keep the Conversation Going",
    body: "Newsletter, community, upcoming forums. No platform to manage."
  }
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const section = sectionRef.current;
      const viewport = viewportRef.current;
      const track = trackRef.current;

      if (!section || !viewport || !track || window.innerWidth < 768) {
        frame = 0;
        return;
      }

      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      const nextProgress = scrollable > 0 ? Math.min(Math.max(-rect.top / scrollable, 0), 1) : 0;
      const maxTranslate = Math.max(track.scrollWidth - viewport.clientWidth, 0);

      setProgress(nextProgress);
      setTranslateX(-maxTranslate * nextProgress);
      setActiveStep(Math.min(steps.length - 1, Math.round(nextProgress * (steps.length - 1))));
      frame = 0;
    };

    const requestUpdate = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} className="bg-slate-900 md:h-[360vh]">
      <div className="section-shell py-20 md:sticky md:top-16 md:flex md:min-h-[calc(100vh-64px)] md:flex-col md:justify-center md:py-0">
        <div className="mb-10 md:mb-14">
          <p className="section-label mb-0">How It Works</p>
        </div>

        <div className="md:hidden">
          <div className="space-y-5">
            {steps.map((step, index) => (
              <article
                key={step.number}
                className="rounded-card border border-slate-700 bg-slate-800 p-6"
              >
                <div className="flex items-center gap-4">
                  <p className="text-4xl font-medium text-teal-400">{step.number}</p>
                  <div className="h-px flex-1 bg-slate-700">
                    <div
                      className="h-px bg-teal-400"
                      style={{ width: index === steps.length - 1 ? "100%" : "35%" }}
                    />
                  </div>
                </div>
                <h2 className="mt-8 text-2xl font-medium leading-8 text-white">{step.title}</h2>
                <p className="mt-4 text-base leading-7 text-slate-100">{step.body}</p>
                {step.note ? (
                  <p className="mt-4 text-sm italic leading-6 text-slate-300">{step.note}</p>
                ) : null}
              </article>
            ))}
          </div>
        </div>

        <div className="hidden md:block">
          <div className="mb-10">
            <div className="h-px bg-slate-700">
              <div
                className="h-px bg-teal-400 transition-[width] duration-200 ease-out"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <div className="mt-4 flex justify-between">
              {steps.map((step, index) => (
                <button
                  key={step.number}
                  type="button"
                  className={`h-8 w-8 rounded-full border text-xs font-medium transition duration-300 ${
                    activeStep === index
                      ? "border-teal-400 bg-teal-500 text-white"
                      : "border-slate-700 text-slate-300"
                  }`}
                  onClick={() => {
                    const section = sectionRef.current;
                    if (!section) {
                      return;
                    }

                    const target =
                      section.offsetTop +
                      ((section.offsetHeight - window.innerHeight) * index) /
                        (steps.length - 1);
                    window.scrollTo({ top: target, behavior: "smooth" });
                  }}
                  aria-label={`Go to step ${step.number}`}
                >
                  {step.number}
                </button>
              ))}
            </div>
          </div>

          <div ref={viewportRef} className="overflow-hidden">
            <div
              ref={trackRef}
              className="flex gap-8 transition-transform duration-300 ease-out will-change-transform"
              style={{ transform: `translate3d(${translateX}px, 0, 0)` }}
            >
              {steps.map((step, index) => {
                const isActive = activeStep === index;

                return (
                  <article
                    key={step.number}
                    className={`min-h-[420px] w-[72vw] max-w-[760px] shrink-0 rounded-card border p-10 transition duration-300 lg:w-[62vw] ${
                      isActive
                        ? "translate-y-0 border-teal-500/60 bg-slate-800 opacity-100"
                        : "translate-y-2 border-slate-700 bg-slate-800/70 opacity-45"
                    }`}
                  >
                    <p className="text-7xl font-medium leading-none text-teal-400">
                      {step.number}
                    </p>
                    <h2 className="mt-12 max-w-2xl text-4xl font-medium leading-tight text-white">
                      {step.title}
                    </h2>
                    <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-100">
                      {step.body}
                    </p>
                    {step.note ? (
                      <p className="mt-6 max-w-xl text-sm italic leading-6 text-slate-300">
                        {step.note}
                      </p>
                    ) : null}
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
