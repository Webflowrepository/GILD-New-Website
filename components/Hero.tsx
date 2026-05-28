"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { trackApplyClick } from "@/lib/analytics";
import { openRequestInviteModal } from "@/components/RequestInviteModal";
import { gsap, reduced } from "@/lib/gsap";
import { sponsors } from "@/lib/sponsors";

const heroImage =
  "/images/LANDING1_files/699386aa1bc9d6b6925f3043_3f7b9646a90570149eefeb01fac751a0_partners-hero.avif";

const logoSet = [...sponsors, ...sponsors]; // duplicate for seamless loop

export function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);

  const apply = () => {
    trackApplyClick("hero");
    openRequestInviteModal();
  };

  useEffect(() => {
    if (reduced()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(bgRef.current, { opacity: 0, duration: 1.1, ease: "power2.out" })
        .from(
          lineRefs.current.filter(Boolean),
          { y: "105%", opacity: 0, duration: 0.82, stagger: 0.13 },
          "-=0.48"
        )
        .from(subRef.current, { opacity: 0, y: 22, duration: 0.65 }, "-=0.38")
        .from(ctaRef.current, { opacity: 0, y: 12, scale: 0.96, duration: 0.5 }, "-=0.32")
        .from(logosRef.current, { opacity: 0, y: 10, duration: 0.6 }, "-=0.2");
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative flex min-h-[75vh] flex-col overflow-hidden bg-[#07090c] md:min-h-[calc(100vh-72px)]">
      {/* Background */}
      <div ref={bgRef} className="absolute inset-0">
        <Image
          src={heroImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-70 [filter:saturate(0.85)_contrast(1.06)]"
          style={{ objectPosition: "center 28%" }}
        />
        <div className="absolute inset-0 bg-black/28" />
        <div className="absolute inset-0 bg-[linear-gradient(108deg,rgba(5,4,3,0.82)_0%,rgba(5,4,3,0.38)_48%,rgba(5,4,3,0.18)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#07090c] to-transparent" />
      </div>

      {/* Main content — grows to fill space */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 items-center px-6 py-16 md:px-12 md:py-24 lg:px-16 xl:px-20 2xl:px-28">
        <div className="hero-drift max-w-[820px] text-left 2xl:max-w-[960px]">
          <h1 className="text-[36px] font-normal leading-[1.08] tracking-[-0.018em] text-white sm:text-[48px] md:text-[60px] lg:text-[70px] xl:text-[78px] 2xl:text-[92px]">
            <span className="block overflow-hidden">
              <span
                className="block"
                ref={(el: HTMLSpanElement | null) => { lineRefs.current[0] = el; }}
              >
                Invite-only Networking
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                className="block"
                ref={(el: HTMLSpanElement | null) => { lineRefs.current[1] = el; }}
              >
                &amp; Community for AI Leaders
              </span>
            </span>
          </h1>
          <p
            ref={subRef}
            className="mt-7 max-w-[520px] text-[15px] leading-[1.9] text-white/60 md:text-[17px] lg:text-[18px] 2xl:max-w-[620px] 2xl:text-[20px]"
          >
            GILD is a curated network of senior AI and engineering leaders, strategists,
            and technical operators. Join the network to be in our next AI Forum.
          </p>
          <button
            ref={ctaRef}
            type="button"
            onClick={apply}
            className="mt-10 bg-[#5a9a9b] px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-[#4d8889]"
          >
            Request Access
          </button>
        </div>
      </div>

      {/* Logo strip — visible on load, no scroll needed */}
      <div ref={logosRef} className="relative z-10 border-t border-white/[0.07] bg-black/20 backdrop-blur-sm">
        <div className="mx-auto max-w-[1600px] px-6 py-5 md:px-12 lg:px-16 xl:px-20 2xl:px-28">
          <p className="mb-4 text-[9px] font-medium uppercase tracking-[0.32em] text-white/30">
            Where leaders from these companies come to think and connect
          </p>
          <div
            className="overflow-hidden"
            style={{
              WebkitMaskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
              maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
            }}
          >
            <div className="flex w-max gap-[48px] md:gap-[80px]"
              style={{ animation: "marquee 45s linear infinite" }}
            >
              {logoSet.map((logo, i) => (
                <div
                  key={`${logo.name}-${i}`}
                  className="flex h-5 min-w-[72px] items-center justify-center"
                >
                  {logo.src ? (
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      width={96}
                      height={22}
                      className="max-h-[18px] w-auto object-contain opacity-50"
                    />
                  ) : (
                    <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/30">
                      {logo.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator — mobile only */}
      <div className="absolute bottom-20 left-1/2 z-10 -translate-x-1/2 md:hidden">
        <div className="flex flex-col items-center gap-1.5 opacity-35">
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="animate-bounce text-white" aria-hidden>
            <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </section>
  );
}
