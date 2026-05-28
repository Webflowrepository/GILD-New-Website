"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { trackApplyClick } from "@/lib/analytics";
import { openRequestInviteModal } from "@/components/RequestInviteModal";
import { gsap, reduced } from "@/lib/gsap";

const heroImage = "/images/6a075d85473e1e56a5c8df65_DSC09920.jpg";

export function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

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
        .from(ctaRef.current, { opacity: 0, y: 12, scale: 0.96, duration: 0.5 }, "-=0.32");
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative min-h-[calc(100vh-72px)] overflow-hidden bg-[#050403]">
      <div ref={bgRef} className="absolute inset-0">
        <Image
          src={heroImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-50 [filter:saturate(0.8)_contrast(1.08)]"
          style={{ objectPosition: "center 28%" }}
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-[linear-gradient(108deg,rgba(5,4,3,0.92)_0%,rgba(5,4,3,0.52)_42%,rgba(5,4,3,0.35)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#0d0b09] to-transparent" />
      </div>

      <div className="section-shell relative z-10 flex min-h-[calc(100vh-72px)] items-center py-28">
        <div className="hero-drift max-w-[860px] text-left">
          <h1 className="text-[32px] font-normal leading-[1.12] tracking-[-0.015em] text-white md:text-[44px] lg:text-[54px]">
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
            className="mt-8 max-w-[480px] text-[15px] leading-[1.85] text-white/55 md:text-base"
          >
            GILD is a curated network of senior AI and engineering leaders, strategists,
            and technical operators. Join the network to be in our next AI Forum.
          </p>
          <button
            ref={ctaRef}
            type="button"
            onClick={apply}
            className="mt-12 bg-[#5a9a9b] px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-[#4d8889]"
          >
            Request Access
          </button>
        </div>
      </div>
    </section>
  );
}
