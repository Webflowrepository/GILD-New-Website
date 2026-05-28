"use client";

import Image from "next/image";
import { trackApplyClick } from "@/lib/analytics";
import { openRequestInviteModal } from "@/components/RequestInviteModal";

function InstagramIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
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
    <footer className="border-t border-slate-700 bg-slate-900 py-10 md:py-12">
      <div className="section-shell">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <a href="/" aria-label="GILD home" className="relative block h-8 w-24">
              <Image
                src="/images/logo%20gild.png"
                alt="GILD"
                fill
                sizes="96px"
                className="object-contain object-left"
              />
            </a>
            <p className="mt-4 max-w-xs text-sm leading-6 text-white">
              An exclusive space where senior leaders come together to connect.
            </p>
            <div className="mt-5 flex items-center gap-4">
              <a
                href="https://www.linkedin.com/company/joingild/about/"
                target="_blank"
                rel="noreferrer"
                aria-label="GILD on LinkedIn"
                className="text-xl font-semibold text-white transition-colors hover:text-teal-400"
              >
                in
              </a>
              <a
                href="https://www.instagram.com/gild.hq/"
                target="_blank"
                rel="noreferrer"
                aria-label="GILD on Instagram"
                className="text-white transition-colors hover:text-teal-400"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-5 md:items-end">
            <nav className="flex flex-wrap items-center gap-x-4 gap-y-3 text-sm text-white">
              <a href="#" className="transition-colors hover:text-teal-400">
                Privacy
              </a>
              <span className="text-slate-300">|</span>
              <a href="#" className="transition-colors hover:text-teal-400">
                Code of Conduct
              </a>
              <span className="text-slate-300">|</span>
              <a href="#" className="transition-colors hover:text-teal-400">
                Contact
              </a>
            </nav>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={requestInvite}
                className="border border-white/70 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-teal-400 hover:text-teal-400"
              >
                Request Invite
              </button>
              <button
                type="button"
                onClick={requestInvite}
                className="border border-white/70 px-6 py-3 text-center text-sm font-medium text-white transition-colors hover:border-teal-400 hover:text-teal-400"
              >
                Explore Partnerships
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-700 pt-6">
          <p className="text-xs text-white">(c) 2026 Gild</p>
        </div>
      </div>
    </footer>
  );
}
