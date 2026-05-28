"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap, mobileStart, reduced } from "@/lib/gsap";

type EventData = {
  date: string;
  title: string;
  location: string;
  href?: string;
};

const visibleEvents: EventData[] = [
  {
    date: "May 27, 2026",
    title: "AI and Engineering Leaders Dinner",
    location: "Austin, TX",
    href: "/past-events/ai-and-engineering-leaders-dinner-austin-may-27-2026"
  },
  { date: "May 12, 2026", title: "Making AI Gains Stick", location: "Austin, TX", href: "/past-events/making-ai-gains-stick-austin-may-12-2026" },
  { date: "Apr 28, 2026", title: "AI Agents in Real Workflows", location: "Austin, TX" },
  { date: "Apr 14, 2026", title: "Speed as an AI Advantage", location: "Dallas, TX" },
];

const hiddenEvents: EventData[] = [
  { date: "Mar 31, 2026", title: "Hiring and Retaining AI Talent", location: "Miami, FL" },
  { date: "Mar 17, 2026", title: "Build vs. Buy: AI Infrastructure", location: "Austin, TX" },
  { date: "Mar 3, 2026", title: "AI ROI: Making the Business Case", location: "Dallas, TX" },
  { date: "Feb 17, 2026", title: "Data Strategy for AI-First Teams", location: "Austin, TX" },
  { date: "Feb 3, 2026", title: "Organizational Change and AI", location: "Miami, FL" },
  { date: "Jan 20, 2026", title: "Engineering Culture in the AI Era", location: "Austin, TX" },
];

function EventRow({ date, title, location, href }: EventData) {
  const inner = (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
      <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:gap-7">
        <p className={`w-[160px] shrink-0 text-[12px] font-medium uppercase tracking-[0.22em] transition-colors duration-200 ${
          href ? "text-[#5a9a9b] group-hover:text-[#6db0b1]" : "text-[#5a9a9b]"
        }`}>
          {date}
        </p>
        <p className={`font-serif text-[19px] leading-snug transition-colors duration-200 ${
          href ? "text-white/85 group-hover:text-white" : "text-white/85"
        }`}>
          {title}
          {href && (
            <span className="ml-3 inline-block translate-x-0 text-[15px] text-[#5a9a9b] opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100">
              →
            </span>
          )}
        </p>
      </div>
      <p className={`shrink-0 text-[13px] uppercase tracking-[0.14em] transition-colors duration-200 ${
        href ? "text-white/32 group-hover:text-white/48" : "text-white/32"
      }`}>
        {location}
      </p>
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        data-event-row
        className="group block border-b border-[rgba(255,248,235,0.06)] py-5 transition-colors duration-200 hover:border-[rgba(90,154,155,0.22)] cursor-pointer"
      >
        {inner}
      </Link>
    );
  }

  return (
    <div
      data-event-row
      className="flex flex-col gap-1 border-b border-[rgba(255,248,235,0.06)] py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
    >
      <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:gap-7">
        <p className="w-[160px] shrink-0 text-[12px] font-medium uppercase tracking-[0.22em] text-[#5a9a9b]">
          {date}
        </p>
        <p className="font-serif text-[19px] leading-snug text-white/85">{title}</p>
      </div>
      <p className="shrink-0 text-[13px] uppercase tracking-[0.14em] text-white/32">{location}</p>
    </div>
  );
}

export function PastForums() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const expandRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (reduced()) return;
    const ctx = gsap.context(() => {
      const trigger = sectionRef.current;
      if (!trigger) return;

      gsap.from(headerRef.current, {
        opacity: 0,
        y: 28,
        duration: 0.72,
        ease: "power2.out",
        scrollTrigger: { trigger, start: mobileStart(), once: true },
      });

      if (listRef.current) {
        const rows = listRef.current.querySelectorAll("[data-event-row]");
        gsap.from(Array.from(rows), {
          opacity: 0,
          y: 18,
          duration: 0.55,
          stagger: 0.07,
          ease: "power2.out",
          scrollTrigger: { trigger, start: mobileStart("top 78%"), once: true },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  const toggle = () => {
    const el = expandRef.current;
    if (!el) { setExpanded((v) => !v); return; }

    if (reduced()) {
      el.style.display = expanded ? "none" : "block";
      setExpanded((v) => !v);
      return;
    }

    if (!expanded) {
      el.style.display = "block";
      const h = el.scrollHeight;
      gsap.set(el, { height: 0, overflow: "hidden", opacity: 0 });
      gsap.to(el, {
        height: h,
        opacity: 1,
        duration: 0.48,
        ease: "power2.out",
        onComplete: () => { el.style.height = "auto"; el.style.overflow = ""; },
      });
    } else {
      gsap.to(el, {
        height: 0,
        opacity: 0,
        overflow: "hidden",
        duration: 0.32,
        ease: "power2.in",
        onComplete: () => { el.style.display = "none"; gsap.set(el, { clearProps: "all" }); },
      });
    }
    setExpanded((v) => !v);
  };

  return (
    <section ref={sectionRef} id="past-forums" className="section-pad bg-[#0d1318]">
      <div className="section-shell">

        <div ref={headerRef} className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-label mb-4">Past Forums</p>
          </div>
        </div>

        <div ref={listRef} className="border-t border-[rgba(255,248,235,0.07)]">
          {visibleEvents.map((e) => (
            <EventRow key={e.date} {...e} />
          ))}
        </div>

        <div ref={expandRef} style={{ display: "none", overflow: "hidden" }}>
          <div>
            {hiddenEvents.map((e) => (
              <EventRow key={e.date} {...e} />
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={toggle}
          className="mt-8 flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.18em] text-white/40 transition-colors duration-300 hover:text-white/75"
        >
          <span
            className="inline-block text-[#5a9a9b] transition-transform duration-300"
            style={{ transform: expanded ? "rotate(45deg)" : "rotate(0deg)" }}
          >
            +
          </span>
          <span>{expanded ? "Show fewer" : "View all past events"}</span>
        </button>

      </div>
    </section>
  );
}
