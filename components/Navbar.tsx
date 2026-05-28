"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { trackApplyClick } from "@/lib/analytics";
import { openRequestInviteModal } from "@/components/RequestInviteModal";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Imperatively force background on the DOM node so no CSS transition
  // can interfere — guaranteed to work every time the menu opens.
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    if (isOpen) {
      el.style.backgroundColor = "#0a0806";
      el.style.borderBottomColor = "rgba(255,248,235,0.07)";
    } else {
      el.style.backgroundColor = "";
      el.style.borderBottomColor = "";
    }
  }, [isOpen]);

  const apply = () => {
    trackApplyClick("navbar");
    setIsOpen(false);
    openRequestInviteModal();
  };

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 border-b transition-colors duration-500 ${
        isScrolled
          ? "border-[rgba(255,248,235,0.07)] bg-[#0a0806] backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav className="section-shell flex h-[72px] items-center justify-between">
        <a href="/" aria-label="GILD home" className="relative h-8 w-24">
          <Image
            src="/images/logo%20gild.png"
            alt="GILD"
            fill
            sizes="96px"
            className="object-contain"
            priority
          />
        </a>
        <div className="hidden items-center gap-10 md:flex">
          <a
            href="/#events"
            className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/50 transition-colors duration-300 hover:text-white/85"
          >
            Events
          </a>
          <a
            href="/#why"
            className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/50 transition-colors duration-300 hover:text-white/85"
          >
            Network
          </a>
          <a
            href="/podcast"
            className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/50 transition-colors duration-300 hover:text-white/85"
          >
            Podcast
          </a>
          <button
            type="button"
            onClick={apply}
            className="bg-[#5a9a9b] px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:bg-[#4d8889]"
          >
            Request Access
          </button>
          <a
            href="/member-access"
            className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/28 transition-colors duration-300 hover:text-[#5a9a9b]"
          >
            Member Access
          </a>
        </div>
        <button
          type="button"
          className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] text-white/60 md:hidden"
          aria-label="Open navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span
            className={`h-px w-5 bg-current transition-all duration-300 ${
              isOpen ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-5 bg-current transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`h-px w-5 bg-current transition-all duration-300 ${
              isOpen ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>
      {isOpen ? (
        <div className="fixed inset-0 top-[72px] z-40 bg-[#0a0806] px-6 py-12 md:hidden">
          <div className="flex flex-col gap-8">
            {[
              { label: "Events", href: "/#events" },
              { label: "Network", href: "/#why" },
              { label: "Podcast", href: "/podcast" }
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="font-serif text-4xl text-white/85 transition-opacity duration-300 hover:opacity-60"
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={apply}
              className="mt-4 w-fit bg-[#5a9a9b] px-6 py-3 text-[11px] font-medium uppercase tracking-[0.16em] text-white"
            >
              Request Access
            </button>
            <a
              href="/member-access"
              onClick={() => setIsOpen(false)}
              className="mt-1 w-fit text-[10px] font-medium uppercase tracking-[0.22em] text-white/30 transition-colors duration-200 hover:text-[#5a9a9b]"
            >
              Member Access
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
