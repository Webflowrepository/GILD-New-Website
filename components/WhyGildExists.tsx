"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, reduced } from "@/lib/gsap";

function IconRooms() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="1" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.1" />
      <rect x="9" y="1" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.1" />
      <rect x="1" y="9" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.1" />
      <rect x="9" y="9" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

function IconOperators() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="6" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.1" />
      <path d="M1 13.5c0-2.761 2.239-4 5-4s5 1.239 5 4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <circle cx="12" cy="6" r="2" stroke="currentColor" strokeWidth="1.1" />
      <path d="M12 10.5c1.657 0 3 .895 3 3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

function IconSignal() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1.5" y="9" width="2.5" height="5.5" rx="0.8" stroke="currentColor" strokeWidth="1.1" />
      <rect x="6.5" y="5.5" width="2.5" height="9" rx="0.8" stroke="currentColor" strokeWidth="1.1" />
      <rect x="11.5" y="1.5" width="2.5" height="13" rx="0.8" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

const principles = [
  {
    Icon: IconRooms,
    title: "Curated rooms.",
    body: "Intentionally small. Off-the-record conversations designed for substance over networking theater."
  },
  {
    Icon: IconOperators,
    title: "Senior operators.",
    body: "Built around engineering leaders, strategists, and operators serious about what they're building."
  },
  {
    Icon: IconSignal,
    title: "High-signal by design.",
    body: "No selling. No demos. Just real peer-to-peer conversation between people building the future of AI."
  }
];

export function WhyGildExists() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const principlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced()) return;
    const ctx = gsap.context(() => {
      const trigger = sectionRef.current;
      if (!trigger) return;

      gsap.from(imageRef.current, {
        opacity: 0,
        scale: 0.97,
        duration: 1.0,
        ease: "power3.out",
        scrollTrigger: { trigger, start: "top 80%", once: true },
      });

      gsap.from([labelRef.current, quoteRef.current], {
        opacity: 0,
        y: 28,
        duration: 0.72,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: { trigger, start: "top 78%", once: true },
      });

      gsap.from(dividerRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: { trigger, start: "top 70%", once: true },
      });

      const items = principlesRef.current?.querySelectorAll("[data-principle]");
      if (items?.length) {
        gsap.from(Array.from(items), {
          opacity: 0,
          y: 22,
          duration: 0.65,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger, start: "top 65%", once: true },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="why" className="section-pad section-bridge bg-[#0d0b09]">
      <div className="section-shell">
        <div className="grid gap-6 lg:grid-cols-[58fr_42fr] lg:gap-10 lg:items-stretch">

          <div ref={imageRef} className="relative aspect-[4/3] overflow-hidden rounded-card lg:aspect-auto lg:min-h-[600px]">
            <Image
              src="/images/698cced70159f31e5d1a0306_DSCF3589%201.avif"
              alt=""
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover [filter:saturate(0.82)_contrast(1.06)]"
              style={{ objectPosition: "center 40%" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b09]/50 via-transparent to-transparent" />
          </div>

          <div className="flex flex-col justify-between gap-10 lg:py-1">

            <div>
              <p ref={labelRef} className="section-label mb-7">Why GILD Exists</p>
              <p ref={quoteRef} className="font-serif text-[26px] leading-[1.45] text-white/90 lg:text-[24px] xl:text-[28px]">
                We built GILD for operators who still believe conversation matters.
              </p>
            </div>

            <div ref={dividerRef} className="h-px shrink-0 bg-[rgba(255,248,235,0.07)]" />

            <div ref={principlesRef} className="space-y-7">
              {principles.map(({ Icon, title, body }) => (
                <div key={title} data-principle className="flex gap-4">
                  <div className="mt-[3px] shrink-0 text-[#5a9a9b]">
                    <Icon />
                  </div>
                  <div>
                    <p className="font-serif text-[16px] leading-snug text-white/88">{title}</p>
                    <p className="mt-1.5 text-[13px] leading-[1.75] text-white/42">{body}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
