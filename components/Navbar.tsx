"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { trackApplyClick } from "@/lib/analytics";
import { openRequestInviteModal } from "@/components/RequestInviteModal";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Smooth bg on scroll only — menu bg handled by portal
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    el.style.transition = "background-color 500ms, border-color 500ms, backdrop-filter 500ms";
    el.style.backgroundColor = isScrolled ? "#0a0806" : "transparent";
    el.style.borderBottomColor = isScrolled ? "rgba(255,248,235,0.07)" : "transparent";
    el.style.backdropFilter = isScrolled ? "blur(12px)" : "none";
  }, [isScrolled]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  // Scroll to a section — works from any page
  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    close();
    const el = document.getElementById(id);
    if (el) {
      // Already on homepage — just smooth scroll
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      // On another page — navigate to homepage with hash
      window.location.href = `/#${id}`;
    }
  };

  const apply = () => {
    trackApplyClick("navbar");
    close();
    openRequestInviteModal();
  };

  const menuPortal = mounted && isOpen
    ? createPortal(
        // Full-screen overlay rendered directly in <body> — no stacking context issues
        <div
          className="fixed inset-0 bg-[#0a0806] md:hidden"
          style={{ zIndex: 9999 }}
        >
          {/* Top bar */}
          <div className="flex h-[72px] items-center justify-between px-6">
            <a href="/" aria-label="GILD home" className="relative h-8 w-24" onClick={close}>
              <Image
                src="/images/logo%20gild.png"
                alt="GILD"
                fill
                sizes="96px"
                className="object-contain"
                priority
              />
            </a>
            <button
              type="button"
              aria-label="Close navigation"
              onClick={close}
              className="flex h-11 w-11 items-center justify-center text-white/60"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-8 px-6 py-10">
            {[
              { label: "Events", href: "/#events", sectionId: "events" },
              { label: "Network", href: "/#why", sectionId: "why" },
              { label: "Podcast", href: "/podcast" },
              { label: "Newsletter", href: "/newsletter" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={item.sectionId ? scrollToSection(item.sectionId) : close}
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
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <header ref={headerRef} className="sticky top-0 z-50 border-b">
        <nav className="section-shell flex h-[72px] items-center justify-between 3xl:h-[88px] 4xl:h-[100px]">
          <a href="/" aria-label="GILD home" className="relative h-8 w-24 3xl:h-10 3xl:w-28 4xl:h-12 4xl:w-32">
            <Image
              src="/images/logo%20gild.png"
              alt="GILD"
              fill
              sizes="(min-width: 1920px) 128px, 96px"
              className="object-contain"
              priority
            />
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-10 md:flex">
            <a href="/#events" onClick={scrollToSection("events")} className="text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:text-white/75 3xl:text-[13px]">
              Events
            </a>
            <a href="/#why" onClick={scrollToSection("why")} className="text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:text-white/75 3xl:text-[13px]">
              Network
            </a>
            <a href="/podcast" className="text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:text-white/75 3xl:text-[13px]">
              Podcast
            </a>
            <a href="/newsletter" className="text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:text-white/75 3xl:text-[13px]">
              Newsletter
            </a>
            <button
              type="button"
              onClick={apply}
              className="bg-[#5a9a9b] px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:bg-[#4d8889] 3xl:px-8 3xl:py-3 3xl:text-[13px]"
            >
              Request Access
            </button>
          </div>

          {/* Hamburger */}
          <button
            type="button"
            className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] text-white/60 md:hidden"
            aria-label="Open navigation"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((v) => !v)}
          >
            <span className="h-px w-5 bg-current" />
            <span className="h-px w-5 bg-current" />
            <span className="h-px w-5 bg-current" />
          </button>
        </nav>
      </header>

      {menuPortal}
    </>
  );
}
