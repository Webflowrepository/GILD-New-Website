"use client";

import Image from "next/image";
import { trackApplyClick } from "@/lib/analytics";
import { openRequestInviteModal } from "@/components/RequestInviteModal";

function InstagramIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="5" y="5" width="14" height="14" rx="4" />
      <circle cx="12" cy="12" r="3.2" />
      <circle cx="16.7" cy="7.3" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Footer() {
  const requestInvite = () => {
    trackApplyClick("footer");
    openRequestInviteModal();
  };

  return (
    <footer className="border-t border-[rgba(255,248,235,0.07)] bg-[#080604] py-12 md:py-16">
      <div className="section-shell">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <a href="/" aria-label="GILD home" className="relative block h-8 w-24">
              <Image
                src="/images/logo%20gild.png"
                alt="GILD"
                fill
                sizes="96px"
                className="object-contain object-left opacity-80"
              />
            </a>
            <p className="mt-5 max-w-xs text-[13px] leading-[1.75] text-white/40">
              An exclusive space where senior leaders come together to connect.
            </p>
            <div className="mt-5 flex items-center gap-5">
              <a
                href="https://www.linkedin.com/company/joingild/about/"
                target="_blank"
                rel="noreferrer"
                aria-label="GILD on LinkedIn"
                className="text-sm font-semibold text-white/40 transition-colors duration-300 hover:text-white/75"
              >
                in
              </a>
              <a
                href="https://www.instagram.com/gild.hq/"
                target="_blank"
                rel="noreferrer"
                aria-label="GILD on Instagram"
                className="text-white/40 transition-colors duration-300 hover:text-white/75"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-5 md:items-end">
            <nav className="flex flex-wrap items-center gap-x-4 gap-y-3 text-[12px] text-white/35">
              <a href="#" className="transition-colors duration-300 hover:text-white/65">
                Privacy
              </a>
              <span className="text-white/15">|</span>
              <a href="#" className="transition-colors duration-300 hover:text-white/65">
                Code of Conduct
              </a>
              <span className="text-white/15">|</span>
              <a href="#" className="transition-colors duration-300 hover:text-white/65">
                Contact
              </a>
            </nav>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={requestInvite}
                className="border border-[rgba(255,248,235,0.18)] px-6 py-3 text-[11px] font-medium uppercase tracking-[0.14em] text-white/55 transition-all duration-400 hover:border-[rgba(255,248,235,0.4)] hover:text-white/80"
              >
                Request Invite
              </button>
              <button
                type="button"
                onClick={requestInvite}
                className="border border-[rgba(255,248,235,0.18)] px-6 py-3 text-center text-[11px] font-medium uppercase tracking-[0.14em] text-white/55 transition-all duration-400 hover:border-[rgba(255,248,235,0.4)] hover:text-white/80"
              >
                Explore Partnerships
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-[rgba(255,248,235,0.06)] pt-6">
          <p className="text-[11px] uppercase tracking-[0.1em] text-white/20">&copy; 2026 Gild</p>
        </div>
      </div>
    </footer>
  );
}
