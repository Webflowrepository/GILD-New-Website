"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { sponsors } from "@/lib/sponsors";
import { testimonials } from "@/lib/testimonials";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function SocialProof() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const [sectionVisible, setSectionVisible] = useState(false);
  const [marqueeVisible, setMarqueeVisible] = useState(true);
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());

  useEffect(() => {
    const section = sectionRef.current;
    const marquee = marqueeRef.current;
    if (!section || !marquee) {
      return;
    }

    const revealObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(true);
          revealObserver.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    const marqueeObserver = new IntersectionObserver(
      ([entry]) => setMarqueeVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const key = entry.target.getAttribute("data-card-key");
          if (entry.isIntersecting && key) {
            setVisibleCards((current) => {
              const next = new Set(current);
              next.add(key);
              return next;
            });
            cardObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealObserver.observe(section);
    marqueeObserver.observe(marquee);
    section.querySelectorAll("[data-card-key]").forEach((card) => cardObserver.observe(card));
    return () => {
      revealObserver.disconnect();
      marqueeObserver.disconnect();
      cardObserver.disconnect();
    };
  }, []);

  const hasMarquee = sponsors.length >= 6;
  const logoSet = hasMarquee ? [...sponsors, ...sponsors] : sponsors;

  return (
    <section
      ref={sectionRef}
      className={`section-pad section-bridge bg-[#0a0806] transition-all duration-700 ${
        sectionVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      }`}
    >
      <div className="section-shell">
        <p className="mb-16 font-sans text-[10px] font-medium uppercase tracking-[0.32em] text-white/35">
          Companies whose leadership is attending GILD events
        </p>
        <div ref={marqueeRef} className="overflow-hidden marquee-mask">
          {hasMarquee ? (
            <div
              className={`flex w-max gap-[50px] md:gap-[100px] ${
                marqueeVisible ? "sponsor-marquee" : ""
              } hover:[animation-play-state:paused]`}
            >
              {logoSet.map((logo, index) => (
                <div
                  key={`${logo.name}-${index}`}
                  className="flex h-5 min-w-[88px] items-center justify-center text-[11px] font-medium uppercase tracking-[0.14em] text-white/35 md:h-7 md:min-w-[112px]"
                >
                  {logo.src ? (
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      width={112}
                      height={28}
                      className="max-h-5 w-auto object-contain opacity-65 transition-opacity duration-500 hover:opacity-90 md:max-h-7"
                    />
                  ) : (
                    logo.name
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-10">
              {logoSet.map((logo, index) => (
                <div
                  key={`${logo.name}-${index}`}
                  className="flex h-5 min-w-[88px] items-center justify-center text-[11px] font-medium uppercase tracking-[0.14em] text-white/35 md:h-7 md:min-w-[112px]"
                >
                  {logo.src ? (
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      width={112}
                      height={28}
                      className="max-h-5 w-auto object-contain opacity-40 md:max-h-7"
                    />
                  ) : (
                    logo.name
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="mt-28 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <article
              key={testimonial.name}
              data-card-key={testimonial.name}
              className={`rounded-card border border-[rgba(255,248,235,0.06)] bg-[#110f0c] p-7 shadow-[0_2px_24px_rgba(0,0,0,0.45)] transition-all duration-700 hover:-translate-y-0.5 hover:border-[rgba(255,248,235,0.11)] hover:shadow-[0_8px_36px_rgba(0,0,0,0.55)] ${index >= 4 ? "hidden md:block" : ""} ${
                visibleCards.has(testimonial.name)
                  ? "translate-y-0 opacity-100"
                  : "translate-y-3 opacity-0"
              }`}
              style={{ transitionDelay: `${(index % 4) * 110}ms` }}
            >
              <div className="flex items-center gap-3">
                {testimonial.photoUrl ? (
                  <Image
                    src={testimonial.photoUrl}
                    alt={testimonial.name}
                    width={56}
                    height={56}
                    unoptimized
                    className="h-14 w-14 shrink-0 rounded-full object-cover opacity-90 [filter:saturate(0.85)]"
                  />
                ) : (
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#2e2820] text-sm font-medium text-white/60">
                    {initials(testimonial.name)}
                  </div>
                )}
                <div>
                  <p className="text-[13px] font-medium text-white/90">{testimonial.name}</p>
                  <p className="mt-1 text-[12px] leading-5 text-white/45">{testimonial.caption}</p>
                </div>
              </div>
              <p className="mt-8 text-[14px] leading-[1.85] text-white/70">
                &quot;{testimonial.quote}&quot;
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
