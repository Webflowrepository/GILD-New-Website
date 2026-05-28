"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { trackApplyClick } from "@/lib/analytics";
import { openRequestInviteModal } from "@/components/RequestInviteModal";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const apply = () => {
    trackApplyClick("navbar");
    setIsOpen(false);
    openRequestInviteModal();
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b border-slate-700/30 transition-colors duration-300 ${
        isScrolled ? "bg-[#e7eef2]/95 backdrop-blur-md" : "bg-[#e7eef2]"
      }`}
    >
      <nav className="section-shell flex h-[70px] items-center justify-between">
        <a href="/" aria-label="GILD home" className="relative h-8 w-24">
          <Image
            src="/images/logo%20gild%20blue.png"
            alt="GILD"
            fill
            sizes="96px"
            className="object-contain"
            priority
          />
        </a>
        <div className="hidden items-center gap-9 md:flex">
          <a
            href="/#events"
            className="text-xs font-medium tracking-[0.18em] text-slate-900 transition-colors duration-200 hover:text-teal-500"
          >
            Events
          </a>
          <a
            href="/#fit"
            className="text-xs font-medium tracking-[0.18em] text-slate-900 transition-colors duration-200 hover:text-teal-500"
          >
            Network
          </a>
          <a
            href="/podcast"
            className="text-xs font-medium tracking-[0.18em] text-slate-900 transition-colors duration-200 hover:text-teal-500"
          >
            Podcast
          </a>
          <button
            type="button"
            onClick={apply}
            className="bg-teal-500 px-7 py-4 text-sm font-medium text-white transition-colors duration-200 hover:bg-teal-400"
          >
            Request Access
          </button>
        </div>
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center text-slate-900 md:hidden"
          aria-label="Open navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className="text-2xl">{isOpen ? "x" : "menu"}</span>
        </button>
      </nav>
      {isOpen ? (
        <div className="fixed inset-0 top-[70px] z-40 bg-[#e7eef2] px-6 py-10 md:hidden">
          <div className="flex flex-col gap-7">
            {[
              { label: "Events", href: "/#events" },
              { label: "Network", href: "/#fit" },
              { label: "Podcast", href: "/podcast" }
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="font-serif text-3xl text-slate-900"
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={apply}
              className="mt-4 w-fit bg-teal-500 px-6 py-3 text-sm font-medium text-white"
            >
              Request Access
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
