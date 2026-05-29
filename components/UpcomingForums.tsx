"use client";

import Image from "next/image";
import Link from "next/link";
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
    <section ref={sectionRef} id="events" className="section-pad bg-[#1a2f45]">
      <div className="section-shell">

        {/* Header */}
        <div ref={headerRef} className="mb-10 text-center">
          <h2 className="font-serif text-[32px] font-normal leading-[1.1] tracking-[-0.015em] text-white md:text-[42px] lg:text-[48px] 3xl:text-[58px] 4xl:text-[74px]">
            Upcoming GILD Events
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[14px] leading-[1.85] text-white/45 md:text-[15px] 3xl:max-w-2xl 3xl:text-[16px] 4xl:text-[19px]">
            GILD events are where the network gathers. Curated rooms for senior
            AI and engineering leaders.{" "}
            <span className="text-[#5a9a9b]">Invite-only and intentionally small.</span>
          </p>
          <Link
            href="/events"
            className="mt-6 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-[#5a9a9b] transition-opacity hover:opacity-70"
          >
            View all events
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
              <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* 2-col grid */}
        <div ref={gridRef} className="grid gap-[22px] md:grid-cols-2">
          {forumEvents.map((event) => (
            <Link
              key={event.slug}
              href={`/events/${event.slug}`}
              className="group relative overflow-hidden rounded-[5px] border border-[#364a5a] text-white transition-all duration-300 hover:shadow-[0_6px_32px_rgba(0,0,0,0.5)]"
              style={{ backgroundColor: event.cardColor }}
            >
              {/* Main row */}
              <div className="relative flex items-start gap-4 px-6 pb-5 pt-6">

                {/* Left: content */}
                <div className="min-w-0 flex-1">
                  {/* Date + time */}
                  <p className="mb-2 text-[13px] font-medium text-white/60">
                    {event.date}, {event.meta}
                  </p>

                  {/* Title */}
                  <p className="mb-3 text-[16px] font-bold leading-[1.4] text-white md:text-[17px] 3xl:text-[19px] 4xl:text-[23px]">
                    {event.title}
                  </p>

                  {/* Description */}
                  <p className="mb-3 line-clamp-2 text-[14px] leading-[1.65] text-white/60 3xl:text-[15px] 4xl:text-[17px]">
                    {event.description}
                  </p>

                  {/* Location */}
                  <div className="mb-5 flex items-center gap-1.5 text-[13px] text-white/45">
                    <PinIcon />
                    <span>{event.locationFull}</span>
                  </div>

                  {/* CTA button */}
                  <span className="inline-block bg-white px-5 py-2 text-[12px] font-semibold text-[#07090c] transition-all duration-300 group-hover:bg-white/90">
                    Request Invite
                  </span>
                </div>

                {/* Right: thumbnail */}
                <div
                  className="relative mt-0.5 h-[116px] w-[116px] shrink-0 overflow-hidden rounded-[4px] border border-[#364a5a]"
                  style={{ backgroundColor: event.cardColor }}
                >
                  <Image
                    src={event.coverUrl}
                    alt=""
                    fill
                    sizes="116px"
                    className="object-contain p-1.5"
                    unoptimized
                  />
                </div>
              </div>

              {/* Status badges — bottom right */}
              <div className="relative flex items-center justify-end gap-2 px-6 pb-5">
                {event.isNextUp && (
                  <span className="bg-[#5a9a9b]/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#5a9a9b]">
                    Next Up
                  </span>
                )}
                <span className="border border-[#364a5a] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#5a9a9b]/80">
                  Open
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
