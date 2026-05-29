"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, mobileStart, reduced } from "@/lib/gsap";

const steps = [
  {
    number: "01",
    title: "Apply to the Network",
    body: "We review every application personally."
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
    note: undefined
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
  const headerRef = useRef<HTMLDivElement | null>(null);
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

  // Section header entrance
  useEffect(() => {
    if (reduced() || !headerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: headerRef.current, start: mobileStart("top 84%"), once: true },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} className="bg-[#0f1c28] md:h-[360vh]">
      <div className="section-shell py-24 md:sticky md:top-[72px] md:flex md:min-h-[calc(100vh-72px)] md:flex-col md:justify-center md:py-0">
        <div ref={headerRef} className="mb-12 md:mb-16">
          <h2 className="section-label mb-0">How It Works</h2>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <div className="space-y-4">
            {steps.map((step) => (
              <article
                key={step.number}
                className="rounded-card border border-[rgba(255,248,235,0.07)] bg-[#162132] p-7"
              >
                <div className="flex items-center gap-4">
                  <p className="text-[42px] font-light leading-none text-[#5a9a9b]">
                    {step.number}
                  </p>
                  <div className="h-px flex-1 bg-[rgba(255,248,235,0.06)]" />
                </div>
                <h3 className="mt-8 font-serif text-2xl leading-[1.25] text-white/90">
                  {step.title}
                </h3>
                <p className="mt-4 text-[15px] leading-[1.85] text-white/55">{step.body}</p>
                {step.note ? (
                  <p className="mt-4 text-[14px] italic leading-[1.7] text-white/35">{step.note}</p>
                ) : null}
              </article>
            ))}
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden md:block">
          <div className="mb-12">
            <div className="h-px bg-[rgba(255,248,235,0.07)]">
              <div
                className="h-px bg-[#5a9a9b]/60 transition-[width] duration-300 ease-out"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <div className="mt-5 flex justify-between">
              {steps.map((step, index) => (
                <button
                  key={step.number}
                  type="button"
                  className={`h-7 w-7 rounded-full border text-[10px] font-medium transition-all duration-500 ${
                    activeStep === index
                      ? "border-[#5a9a9b]/70 bg-[#5a9a9b]/15 text-[#5a9a9b]"
                      : "border-[rgba(255,248,235,0.12)] text-white/30"
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
              className="flex gap-6 transition-transform duration-400 ease-out will-change-transform"
              style={{ transform: `translate3d(${translateX}px, 0, 0)` }}
            >
              {steps.map((step, index) => {
                const isActive = activeStep === index;

                return (
                  <article
                    key={step.number}
                    className={`min-h-[420px] w-[72vw] max-w-[760px] shrink-0 rounded-card border p-12 transition-all duration-500 lg:w-[62vw] ${
                      isActive
                        ? "translate-y-0 border-[rgba(255,248,235,0.1)] bg-[#162132] opacity-100 shadow-[0_4px_48px_rgba(0,0,0,0.55)]"
                        : "translate-y-2 border-[rgba(255,248,235,0.04)] bg-[#111e2c] opacity-25"
                    }`}
                  >
                    <p className="text-[72px] font-light leading-none text-[#5a9a9b] 3xl:text-[90px] 4xl:text-[112px]">
                      {step.number}
                    </p>
                    <h3 className="mt-12 max-w-3xl font-serif text-[24px] leading-[1.18] text-white/92 md:text-[28px] lg:text-[32px] 3xl:text-[38px] 4xl:text-[46px]">
                      {step.title}
                    </h3>
                    <p className="mt-7 max-w-2xl text-[15px] leading-[1.9] text-white/55 3xl:text-[17px] 4xl:text-[19px]">
                      {step.body}
                    </p>
                    {step.note ? (
                      <p className="mt-6 max-w-xl text-[14px] italic leading-[1.75] text-white/35">
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
