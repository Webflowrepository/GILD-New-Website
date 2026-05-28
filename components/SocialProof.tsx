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
      { threshold: 0.2 }
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
      { threshold: 0.18 }
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
      className={`section-pad bg-slate-900 transition duration-500 ${
        sectionVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      }`}
    >
      <div className="section-shell">
        <h2 className="mx-auto mb-[60px] max-w-3xl text-center text-xl font-medium text-white md:text-2xl">
          Companies whose leadership is attending GILD events
        </h2>
        <div ref={marqueeRef} className="marquee-mask overflow-hidden">
          {hasMarquee ? (
            <div
              className={`flex w-max gap-[50px] md:gap-[100px] ${
                marqueeVisible ? "sponsor-marquee" : ""
              } hover:[animation-play-state:paused]`}
            >
              {logoSet.map((logo, index) => (
                <div
                  key={`${logo.name}-${index}`}
                  className="flex h-5 min-w-[88px] items-center justify-center text-xs font-semibold uppercase tracking-[0.12em] text-slate-100 md:h-7 md:min-w-[112px] md:text-sm"
                >
                  {logo.src ? (
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      width={112}
                      height={28}
                      className="max-h-5 w-auto object-contain md:max-h-7"
                    />
                  ) : (
                    logo.name
                  )}
                </div>
              ))}
            </div>
          ) : (
            // Fallback condition: fewer than 6 logos render as a static centered row.
            <div className="flex flex-wrap justify-center gap-10">
              {logoSet.map((logo, index) => (
                <div
                  key={`${logo.name}-${index}`}
                  className="flex h-5 min-w-[88px] items-center justify-center text-xs font-semibold uppercase tracking-[0.12em] text-slate-100 md:h-7 md:min-w-[112px] md:text-sm"
                >
                  {logo.src ? (
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      width={112}
                      height={28}
                      className="max-h-5 w-auto object-contain md:max-h-7"
                    />
                  ) : (
                    logo.name
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="mt-24 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <article
              key={testimonial.name}
              data-card-key={testimonial.name}
              className={`rounded-card border border-[#17212c] bg-[#05080c] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.22)] transition duration-500 hover:-translate-y-0.5 hover:border-teal-500/30 ${
                visibleCards.has(testimonial.name)
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: `${(index % 4) * 75}ms` }}
            >
              <div className="flex items-center gap-3">
                {testimonial.photoUrl ? (
                  <Image
                    src={testimonial.photoUrl}
                    alt={testimonial.name}
                    width={56}
                    height={56}
                    className="h-14 w-14 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-slate-700 text-sm font-medium text-slate-100">
                    {initials(testimonial.name)}
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold text-white">{testimonial.name}</p>
                  <p className="mt-1 text-sm leading-5 text-slate-100">{testimonial.caption}</p>
                </div>
              </div>
              <p className="mt-8 text-base leading-7 text-white">&quot;{testimonial.quote}&quot;</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
