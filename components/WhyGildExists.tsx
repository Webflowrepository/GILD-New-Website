"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, mobileStart, ScrollTrigger, reduced } from "@/lib/gsap";
import { trackApplyClick } from "@/lib/analytics";
import { openRequestInviteModal } from "@/components/RequestInviteModal";

const pillars = [
  {
    num: "01",
    title: "Curated rooms",
    body: "Private, off-the-record dinners and forums."
  },
  {
    num: "02",
    title: "Serious operators",
    body: "Founders, CEOs, CTOs, and engineering leaders."
  },
  {
    num: "03",
    title: "Useful signal",
    body: "No panels. No demos. No networking theater."
  }
];

const fitItems = [
  "Senior operators building with AI.",
  "People who value useful conversation.",
  "Leaders who prefer depth over visibility."
];

const notFitItems = [
  "Vendor exposure.",
  "Passive community.",
  "Surface-level networking."
];

// Image used in both desktop column and mobile fallback
const EVENT_IMG = "/images/DSC09759.jpg";

export function WhyGildExists() {
  const sectionRef   = useRef<HTMLElement>(null);
  const leftRef      = useRef<HTMLDivElement>(null);
  const imgDesktop   = useRef<HTMLDivElement>(null);
  const imgMobile    = useRef<HTMLDivElement>(null);
  const div1Ref      = useRef<HTMLDivElement>(null);
  const pillarsRef   = useRef<HTMLDivElement>(null);
  const div2Ref      = useRef<HTMLDivElement>(null);
  const fitRef       = useRef<HTMLDivElement>(null);
  const notFitRef    = useRef<HTMLDivElement>(null);

  const requestAccess = () => {
    trackApplyClick("why_gild_exists");
    openRequestInviteModal();
  };

  useEffect(() => {
    if (reduced()) return;
    const ctx = gsap.context(() => {
      const trigger = sectionRef.current;
      if (!trigger) return;

      // Left column children
      if (leftRef.current) {
        gsap.from(Array.from(leftRef.current.children), {
          opacity: 0, y: 26,
          duration: 0.7, stagger: 0.12, ease: "power2.out",
          scrollTrigger: { trigger, start: mobileStart("top 78%"), once: true }
        });
      }

      // Image (desktop + mobile)
      [imgDesktop, imgMobile].forEach((ref) => {
        if (ref.current) {
          gsap.from(ref.current, {
            opacity: 0, scale: 0.975,
            duration: 1.0, ease: "power3.out",
            scrollTrigger: { trigger, start: mobileStart("top 78%"), once: true }
          });
        }
      });

      // Dividers
      [div1Ref, div2Ref].forEach((ref) => {
        if (ref.current) {
          gsap.from(ref.current, {
            scaleX: 0, transformOrigin: "left center",
            duration: 0.9, ease: "power2.out",
            scrollTrigger: { trigger: ref.current, start: mobileStart("top 91%", "top 96%"), once: true }
          });
        }
      });

      // Pillars stagger on enter
      if (pillarsRef.current) {
        const items = pillarsRef.current.querySelectorAll("[data-pillar]");
        ScrollTrigger.create({
          trigger: pillarsRef.current,
          start: mobileStart("top 84%"),
          once: true,
          onEnter: () => {
            gsap.fromTo(Array.from(items),
              { opacity: 0, y: 22 },
              { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out", clearProps: "opacity,transform" }
            );
          }
        });
      }

      // Fit / not-fit columns
      if (fitRef.current) {
        gsap.from(fitRef.current, {
          opacity: 0, x: -20, duration: 0.62, ease: "power2.out",
          scrollTrigger: { trigger: fitRef.current, start: mobileStart("top 88%", "top 95%"), once: true }
        });
      }
      if (notFitRef.current) {
        gsap.from(notFitRef.current, {
          opacity: 0, x: 20, duration: 0.62, ease: "power2.out",
          scrollTrigger: { trigger: notFitRef.current, start: mobileStart("top 88%", "top 95%"), once: true }
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="why" className="section-pad bg-[#07090c]">
      <div className="section-shell">

        {/* ─────────────────────────────────────────────────
            TOP AREA: editorial two-column (desktop)
            stacked text → CTA → image (mobile)
        ───────────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-[54fr_46fr] lg:items-stretch lg:gap-12">

          {/* LEFT: eyebrow / headline / sub / CTA */}
          <div
            ref={leftRef}
            className="flex flex-col gap-7 lg:justify-between lg:gap-0 lg:py-2"
          >
            {/* Text block */}
            <div>
              <p className="section-label">Why GILD Exists</p>
              <h2 className="font-serif text-[36px] font-normal leading-[1.05] tracking-[-0.02em] text-white md:text-[56px] lg:text-[72px] xl:text-[82px] 2xl:text-[92px]">
                Apply To The GILD Network
              </h2>
              <p className="mt-5 max-w-[360px] text-[14px] leading-[1.88] text-white/46 lg:max-w-[400px] lg:text-[15px]">
                Senior operators. Curated rooms. Direct conversation around
                what&nbsp;is actually working.
              </p>
            </div>

            {/* CTA */}
            <div>
              <button
                type="button"
                onClick={requestAccess}
                className="bg-[#5a9a9b] px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-[#4d8889]"
              >
                Request Access
              </button>
            </div>
          </div>

          {/* RIGHT: image — desktop only */}
          <div
            ref={imgDesktop}
            className="relative hidden overflow-hidden rounded-card lg:block"
            style={{ minHeight: "440px" }}
          >
            <Image
              src={EVENT_IMG}
              alt="GILD dinner — operators in conversation"
              fill
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="object-cover [filter:saturate(0.80)_contrast(1.06)]"
              style={{ objectPosition: "center 38%" }}
              priority
            />
            {/* dual-gradient: warm bottom fade + very subtle top darkening */}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,11,9,0.15)_0%,rgba(13,11,9,0.08)_40%,rgba(13,11,9,0.55)_100%)]" />
          </div>
        </div>

        {/* Image — mobile only (below CTA, above pillars) */}
        <div
          ref={imgMobile}
          className="relative mt-8 overflow-hidden rounded-card lg:hidden"
          style={{ aspectRatio: "16 / 9" }}
        >
          <Image
            src={EVENT_IMG}
            alt="GILD dinner — operators in conversation"
            fill
            sizes="100vw"
            className="object-cover [filter:saturate(0.80)_contrast(1.06)]"
            style={{ objectPosition: "center 38%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07090c]/50 via-transparent to-transparent" />
        </div>

        {/* ─────────────────────────────────────────────────
            PILLARS — three-column row
        ───────────────────────────────────────────────── */}
        <div ref={div1Ref} className="mt-12 h-px bg-[rgba(255,248,235,0.07)]" />

        <div
          ref={pillarsRef}
          className="mt-9 grid gap-8 sm:grid-cols-3 sm:gap-6 lg:gap-14"
        >
          {pillars.map(({ num, title, body }) => (
            <div key={num} data-pillar>
              <p className="text-[11px] font-medium tracking-[0.24em] text-[#5a9a9b]">{num}</p>
              <h3 className="mt-3 font-serif text-[18px] leading-snug text-white/88">{title}</h3>
              <div className="mt-2.5 h-px w-6 bg-[#5a9a9b]/35" />
              <p className="mt-3 text-[13px] leading-[1.8] text-white/38">{body}</p>
            </div>
          ))}
        </div>

        {/* ─────────────────────────────────────────────────
            FIT FILTER — two slim columns
        ───────────────────────────────────────────────── */}
        <div ref={div2Ref} className="mt-11 h-px bg-[rgba(255,248,235,0.07)]" />

        <div className="mt-8 grid gap-8 sm:grid-cols-2 sm:gap-10 lg:gap-20">
          <div ref={fitRef}>
            <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-[#5a9a9b]">
              For
            </p>
            <ul className="mt-5 space-y-3">
              {fitItems.map((item) => (
                <li key={item} className="flex items-baseline gap-4 text-[13px] leading-[1.72] text-white/72">
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
                <li key={item} className="flex items-baseline gap-4 text-[13px] leading-[1.72] text-white/32">
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
