"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, mobileStart, ScrollTrigger, reduced } from "@/lib/gsap";
import { forumEvents } from "@/lib/events";

function PinIcon() {
  return (
    <svg width="11" height="13" viewBox="0 0 11 13" fill="none" aria-hidden>
      <path
        d="M5.5 0C3.015 0 1 2.015 1 4.5c0 3.375 4.5 8.5 4.5 8.5s4.5-5.125 4.5-8.5C10 2.015 7.985 0 5.5 0zm0 6.125A1.625 1.625 0 1 1 5.5 2.875a1.625 1.625 0 0 1 0 3.25z"
        fill="currentColor"
      />
    </svg>
  );
}

export function UpcomingForums() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced()) return;
    const ctx = gsap.context(() => {
      const trigger = sectionRef.current;
      if (!trigger) return;

      gsap.from(headerRef.current, {
        opacity: 0,
        y: 24,
        duration: 0.72,
        ease: "power2.out",
        scrollTrigger: { trigger, start: mobileStart(), once: true },
      });

      if (gridRef.current) {
        const cards = Array.from(gridRef.current.querySelectorAll("a"));
        ScrollTrigger.create({
          trigger: gridRef.current,
          start: mobileStart("top 84%"),
          once: true,
          onEnter: () => {
            gsap.fromTo(
              cards,
              { opacity: 0, y: 36 },
              {
                opacity: 1,
                y: 0,
                duration: 0.68,
                stagger: 0.1,
                ease: "power2.out",
                clearProps: "opacity,transform",
              }
            );
          },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="events" className="section-pad bg-[#0b1520]">
      <div className="section-shell">

        {/* Header */}
        <div ref={headerRef} className="mb-12 text-center">
          <h2 className="font-serif text-[32px] font-normal leading-[1.1] tracking-[-0.015em] text-white md:text-[42px] lg:text-[48px]">
            Upcoming GILD Events
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[14px] leading-[1.85] text-white/45 md:text-[15px]">
            GILD events are where the network gathers. Curated rooms for senior
            AI and engineering leaders. Invite-only and intentionally small.
          </p>
        </div>

        {/* 2-col grid */}
        <div ref={gridRef} className="grid gap-4 md:grid-cols-2">
          {forumEvents.map((event) => (
            <a
              key={`${event.date}-${event.url}`}
              href={event.url}
              target="_blank"
              rel="noreferrer"
              className="group relative overflow-hidden rounded-card border transition-all duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.55)]"
              style={{
                backgroundColor: event.cardColor,
                borderColor: event.borderColor,
              }}
            >
              {/* Subtle left-edge glow matching card color */}
              <div
                className="pointer-events-none absolute inset-y-0 left-0 w-24 opacity-40"
                style={{
                  background: `linear-gradient(to right, ${event.borderColor}, transparent)`,
                }}
              />

              <div className="relative flex items-start gap-4 p-5">
                {/* Left: content */}
                <div className="min-w-0 flex-1">
                  {/* Date + time */}
                  <p className="mb-2.5 text-[11px] font-medium text-white/40">
                    {event.date}, {event.meta}
                  </p>

                  {/* Title */}
                  <p className="mb-3 text-[14px] font-semibold leading-snug text-white/90">
                    {event.title}
                  </p>

                  {/* Description */}
                  <p className="mb-4 line-clamp-2 text-[12px] leading-[1.7] text-white/45">
                    {event.description}
                  </p>

                  {/* Location */}
                  <div className="mb-5 flex items-center gap-1.5 text-[11px] text-white/40">
                    <PinIcon />
                    <span>{event.locationFull}</span>
                  </div>

                  {/* CTA button */}
                  <span className="inline-block border border-white/25 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.18em] text-white/70 transition-colors duration-300 group-hover:border-white/45 group-hover:text-white/90">
                    Request Invite
                  </span>
                </div>

                {/* Right: thumbnail */}
                <div
                  className="relative h-[88px] w-[88px] shrink-0 overflow-hidden rounded-[4px]"
                  style={{ backgroundColor: event.cardColor }}
                >
                  <Image
                    src={event.coverUrl}
                    alt=""
                    fill
                    sizes="88px"
                    className="object-contain p-1.5"
                  />
                </div>
              </div>

              {/* Status badges — bottom right */}
              <div className="flex items-center justify-end gap-2 px-5 pb-4">
                {event.isNextUp && (
                  <span className="bg-[#5a9a9b]/15 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.2em] text-[#5a9a9b]">
                    Next Up
                  </span>
                )}
                <span className="border border-[#5a9a9b]/35 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.2em] text-[#5a9a9b]/70">
                  Open
                </span>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
