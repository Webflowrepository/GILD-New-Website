"use client";

import { useEffect, useState } from "react";
import { trackApplyClick } from "@/lib/analytics";
import { openRequestInviteModal } from "@/components/RequestInviteModal";

/**
 * Sticky pill CTA — visible on mobile only after the hero scrolls out of view.
 * Observes the hero section (first <section> inside <main>) via IntersectionObserver.
 */
export function MobileCtaBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Find the hero: first <section> child of <main>
    const hero =
      document.querySelector<HTMLElement>("main > section:first-child") ??
      document.querySelector<HTMLElement>("#hero-sentinel");

    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Bar appears once the hero exits the viewport
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const handleClick = () => {
    trackApplyClick("mobile_sticky_cta");
    openRequestInviteModal();
  };

  return (
    <div
      className={`
        fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 transition-all duration-500 md:hidden
        ${visible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-8 opacity-0 pointer-events-none"
        }
      `}
      aria-hidden={!visible}
    >
      <button
        type="button"
        onClick={handleClick}
        className="flex items-center gap-3 rounded-full border border-[rgba(255,248,235,0.14)] bg-[#0a0806]/88 px-6 py-3.5 backdrop-blur-md"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#5a9a9b]" aria-hidden />
        <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/90">
          Request Access
        </span>
      </button>
    </div>
  );
}
