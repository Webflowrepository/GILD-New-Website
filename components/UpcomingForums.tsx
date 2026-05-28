"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, mobileStart, ScrollTrigger, reduced } from "@/lib/gsap";
import { forumEvents } from "@/lib/events";

export function UpcomingForums() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced()) return;
    const ctx = gsap.context(() => {
      const trigger = sectionRef.current;
      if (!trigger) return;

      gsap.from(labelRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.65,
        ease: "power2.out",
        scrollTrigger: { trigger, start: mobileStart(), once: true },
      });

      if (gridRef.current) {
        const cards = Array.from(gridRef.current.querySelectorAll("a"));
        // Use onEnter to avoid CSS transition-all on the <a> cards fighting
        // GSAP's initial state set on mount (which would make cards invisible)
        ScrollTrigger.create({
          trigger: gridRef.current,
          start: mobileStart("top 84%"),
          once: true,
          onEnter: () => {
            gsap.fromTo(
              cards,
              { opacity: 0, y: 44, scale: 0.97 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.72,
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
    <section ref={sectionRef} id="events" className="section-pad bg-[#0a0806]">
      <div className="section-shell">
        <p ref={labelRef} className="section-label">Upcoming Forums</p>
        <div ref={gridRef} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {forumEvents.map((event) => (
            <a
              key={`${event.date}-${event.url}`}
              href={event.url}
              target="_blank"
              rel="noreferrer"
              className="group overflow-hidden rounded-card border border-[rgba(255,248,235,0.07)] transition-all duration-500 hover:-translate-y-1 hover:border-[rgba(255,248,235,0.13)] hover:shadow-[0_8px_48px_rgba(0,0,0,0.5)]"
              style={{
                backgroundColor: event.cardColor,
                borderColor: undefined
              }}
            >
              <div
                className="relative aspect-square overflow-hidden"
                style={{ backgroundColor: event.cardColor }}
              >
                <Image
                  src={event.coverUrl}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-contain p-3 transition-all duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-7">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <p className="text-2xl font-medium leading-none text-[#5a9a9b]">
                      {event.date}
                    </p>
                    <p className="text-2xl font-medium leading-none text-white/85">
                      {event.location}
                    </p>
                  </div>
                  <span className="inline-flex min-h-8 items-center justify-center border border-[rgba(255,248,235,0.14)] px-4 py-1 text-center text-[10px] font-medium uppercase leading-4 tracking-[0.12em] text-white/50">
                    {event.status}
                  </span>
                </div>
                <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.18em] text-white/35">
                  {event.meta}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
