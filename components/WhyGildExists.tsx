"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, mobileStart, ScrollTrigger, reduced } from "@/lib/gsap";
import { trackApplyClick } from "@/lib/analytics";
import { openRequestInviteModal } from "@/components/RequestInviteModal";

const pillars = [
  {
    title: "Access to the Dinners",
    body: "Curated, in-person AI Forums in Austin, Dallas, and Miami, with more tech hubs launching across the country. Senior leaders only. Off-the-record. Themed around the problems members are actually working through.",
    img: "/images/Network%201.png",
  },
  {
    title: "AI-Powered Matchmaking",
    body: "Coming soon. Tell us who you want to meet, what you're working on, and what you need help with. Our system, supported by AI, finds the right peers and partners across the network and brokers double-opt-in introductions. You don't have to chase anyone. We do the work.",
    img: "/images/Network%202.jpg",
  },
  {
    title: "The GILD Community",
    body: "Coming soon. A private virtual space for members to stay connected between dinners. Share what you're building, ask the network for advice, and keep the conversations going.",
    img: "/images/Network%203.jpg",
  },
  {
    title: "Insights and Intelligence",
    body: "The AI Builder Brief newsletter, the GILD podcast, and quarterly intelligence from across the network. The trends, challenges, and decisions senior AI and engineering leaders are navigating, delivered to you.",
    img: "/images/Network%204.avif",
  },
];

const fitItems = [
  "Senior operators building with AI.",
  "People who value useful conversation.",
  "Leaders who prefer depth over visibility.",
];

const notFitItems = [
  "Vendor exposure.",
  "Passive community.",
  "Surface-level networking.",
];

const EVENT_IMG = "/images/DSC09759.jpg";

export function WhyGildExists() {
  const sectionRef  = useRef<HTMLElement>(null);
  const bannerRef   = useRef<HTMLDivElement>(null);
  const cardsRef    = useRef<HTMLDivElement>(null);
  const fitRef      = useRef<HTMLDivElement>(null);
  const notFitRef   = useRef<HTMLDivElement>(null);
  const divRef      = useRef<HTMLDivElement>(null);

  const requestAccess = () => {
    trackApplyClick("why_gild_exists");
    openRequestInviteModal();
  };

  useEffect(() => {
    if (reduced()) return;
    const ctx = gsap.context(() => {
      const trigger = sectionRef.current;
      if (!trigger) return;

      // Banner fade in
      gsap.from(bannerRef.current, {
        opacity: 0, y: 20, duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger, start: mobileStart("top 80%"), once: true },
      });

      // Cards stagger
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll("[data-pillar]");
        ScrollTrigger.create({
          trigger: cardsRef.current,
          start: mobileStart("top 84%"),
          once: true,
          onEnter: () => {
            gsap.fromTo(Array.from(cards),
              { opacity: 0, y: 28 },
              { opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: "power2.out", clearProps: "opacity,transform" }
            );
          },
        });
      }

      // Fit / not-fit
      if (fitRef.current) {
        gsap.from(fitRef.current, {
          opacity: 0, x: -18, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: fitRef.current, start: mobileStart("top 88%", "top 95%"), once: true },
        });
      }
      if (notFitRef.current) {
        gsap.from(notFitRef.current, {
          opacity: 0, x: 18, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: notFitRef.current, start: mobileStart("top 88%", "top 95%"), once: true },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="why" className="bg-[#07090c]">

      {/* ── BANNER ─────────────────────────────────────────── */}
      <div ref={bannerRef} className="relative overflow-hidden" style={{ minHeight: "560px" }}>
        {/* Background photo */}
        <Image
          src={EVENT_IMG}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60 [filter:saturate(0.78)_contrast(1.06)]"
          style={{ objectPosition: "center 40%" }}
        />
        {/* Dark overlays */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#07090c] to-transparent" />

        {/* Centered content */}
        <div className="relative z-10 flex min-h-[560px] flex-col items-center justify-center px-6 py-24 text-center">
          <p className="mb-6 text-[15px] font-medium uppercase tracking-[0.18em] text-white/65">
            Why GILD Exists
          </p>
          <h2 className="font-serif text-[32px] font-normal leading-[1.1] tracking-[-0.015em] text-white md:text-[42px] lg:text-[48px]">
            Apply To The GILD Network
          </h2>
          <p className="mx-auto mt-5 max-w-[480px] text-[14px] leading-[1.88] text-white/55 md:text-[15px]">
            Senior operators. Curated rooms. Direct conversation around
            what&nbsp;is actually working.
          </p>
          <button
            type="button"
            onClick={requestAccess}
            className="mt-10 bg-[#5a9a9b] px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-[#4d8889]"
          >
            Request Access
          </button>
        </div>
      </div>

      {/* ── FEATURE CARDS ──────────────────────────────────── */}
      <div className="section-shell section-pad">

        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="font-serif text-[32px] font-normal leading-[1.1] tracking-[-0.015em] text-white md:text-[42px] lg:text-[48px]">
            What you get as a member of GILD.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[14px] leading-[1.85] text-white/45 md:text-[15px]">
            GILD is more than dinners. The network is built to make every member more connected, more informed, and more effective.
          </p>
        </div>

        <div ref={cardsRef} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map(({ title, body, img }) => (
            <div
              key={title}
              data-pillar
              className="overflow-hidden rounded-card bg-[#0d1822]"
            >
              {/* Photo */}
              <div className="relative w-full" style={{ aspectRatio: "4 / 3" }}>
                <Image
                  src={img}
                  alt={title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover [filter:saturate(0.82)_contrast(1.04)]"
                  style={{ objectPosition: "center 35%" }}
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1822]/60 via-transparent to-transparent" />
              </div>

              {/* Text */}
              <div className="p-6">
                <h3 className="text-[13px] font-bold uppercase tracking-[0.08em] leading-snug text-white">
                  {title}
                </h3>
                <p className="mt-3 text-[13px] leading-[1.8] text-white/55">{body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── FIT FILTER ─────────────────────────────────── */}
        <div ref={divRef} className="mt-12 h-px bg-[rgba(255,248,235,0.07)]" />

        <div className="mt-8 grid gap-8 sm:grid-cols-2 sm:gap-10 lg:gap-20">
          <div ref={fitRef}>
            <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-[#5a9a9b]">
              For
            </p>
            <ul className="mt-5 space-y-3">
              {fitItems.map((item) => (
                <li
                  key={item}
                  className="flex items-baseline gap-4 text-[13px] leading-[1.72] text-white/72"
                >
                  <span className="mt-[9px] h-px w-4 shrink-0 bg-[#5a9a9b]/50" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div ref={notFitRef}>
            <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-white/28">
              Not for
            </p>
            <ul className="mt-5 space-y-3">
              {notFitItems.map((item) => (
                <li
                  key={item}
                  className="flex items-baseline gap-4 text-[13px] leading-[1.72] text-white/32"
                >
                  <span className="mt-[9px] h-px w-4 shrink-0 bg-white/12" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

    </section>
  );
}
