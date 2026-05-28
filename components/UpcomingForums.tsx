"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, mobileStart, ScrollTrigger, reduced } from "@/lib/gsap";
import { forumEvents } from "@/lib/events";

function PinIcon() {
  return (
    <svg width="10" height="12" viewBox="0 0 11 13" fill="none" aria-hidden>
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
              { opacity: 0, y: 28 },
              {
                opacity: 1,
                y: 0,
                duration: 0.65,
                stagger: 0.09,
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
        <div ref={headerRef} className="mb-10 text-center">
          <h2 className="font-serif text-[32px] font-normal leading-[1.1] tracking-[-0.015em] text-white md:text-[42px] lg:text-[48px]">
            Upcoming GILD Events
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[14px] leading-[1.85] text-white/45 md:text-[15px]">
            GILD events are where the network gathers. Curated rooms for senior
            AI and engineering leaders.{" "}
            <span className="text-[#5a9a9b]">Invite-only and intentionally small.</span>
          </p>
        </div>

        {/* 2-col grid */}
        <div ref={gridRef} className="grid gap-[22px] md:grid-cols-2">
          {forumEvents.map((event) => (
            <a
              key={`${event.date}-${event.url}`}
              href={event.url}
              target="_blank"
              rel="noreferrer"
              className="group relative overflow-hidden rounded-[5px] border transition-all duration-300 hover:shadow-[0_6px_32px_rgba(0,0,0,0.5)]"
              style={{
                backgroundColor: event.cardColor,
                borderColor: event.borderColor,
              }}
            >
              {/* Left-edge accent — full card height */}
              <div
                className="pointer-events-none absolute bottom-0 left-0 top-0 w-[4px]"
                style={{ backgroundColor: event.borderColor }}
              />

              {/* Main row */}
              <div className="relative flex items-start gap-4 px-5 pb-4 pt-5">

                {/* Left: content */}
                <div className="min-w-0 flex-1">
                  {/* Date + time */}
                  <p className="mb-2 text-[12px] font-medium text-white/60">
                    {event.date}, {event.meta}
                  </p>

                  {/* Title */}
                  <p className="mb-2.5 text-[15px] font-bold leading-[1.4] text-white md:text-[16px]">
                    {event.title}
                  </p>

                  {/* Description */}
                  <p className="mb-3 line-clamp-2 text-[13px] leading-[1.65] text-white/55">
                    {event.description}
                  </p>

                  {/* Location */}
                  <div className="mb-5 flex items-center gap-1.5 text-[12px] text-white/45">
                    <PinIcon />
                    <span>{event.locationFull}</span>
                  </div>

                  {/* CTA button */}
                  <span className="inline-block bg-white/10 px-5 py-2 text-[12px] font-semibold text-white ring-1 ring-white/30 transition-all duration-300 group-hover:bg-white/18 group-hover:ring-white/50">
                    Request Invite
                  </span>
                </div>

                {/* Right: thumbnail */}
                <div
                  className="relative mt-0.5 h-[104px] w-[104px] shrink-0 overflow-hidden rounded-[4px] border"
                  style={{ borderColor: event.borderColor, backgroundColor: event.cardColor }}
                >
                  <Image
                    src={event.coverUrl}
                    alt=""
                    fill
                    sizes="104px"
                    className="object-contain p-1.5"
                    unoptimized
                  />
                </div>
              </div>

              {/* Status badges — bottom right */}
              <div className="relative flex items-center justify-end gap-2 px-5 pb-4">
                {event.isNextUp && (
                  <span className="bg-[#5a9a9b]/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#5a9a9b]">
                    Next Up
                  </span>
                )}
                <span className="border border-[#5a9a9b]/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#5a9a9b]/80">
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
