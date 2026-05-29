"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// ─── Types ─────────────────────────────────────────────────────────────────

interface NewsletterItem {
  title: string;
  description: string;
  pubDate: string;
  cover: string;
  originalCover: string;
  guid: string;
  author: string;
  slug: string;
}

// ─── Constants ─────────────────────────────────────────────────────────────

const PAGE_SIZE_DESKTOP = 9;
const PAGE_SIZE_MOBILE = 6;

// ─── Helpers ───────────────────────────────────────────────────────────────

function monthKey(pubDate: string): string {
  const d = new Date(pubDate);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function monthLabel(key: string): string {
  const [year, month] = key.split("-");
  const d = new Date(Number(year), Number(month) - 1, 1);
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function formatDate(pubDate: string): string {
  const d = new Date(pubDate);
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

// Author initials for fallback avatar
function initials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

// ─── HTML cleaner ──────────────────────────────────────────────────────────
// Strips Beehiiv email boilerplate (social icons, unsubscribe footer, etc.)
function cleanNewsletterHtml(raw: string): string {
  if (typeof document === "undefined") return raw;
  const parser = new DOMParser();
  const doc = parser.parseFromString(raw, "text/html");

  // Remove elements that contain only images linking to social platforms
  const socialDomains = ["instagram.com", "linkedin.com", "youtube.com", "twitter.com", "facebook.com", "tiktok.com"];
  doc.querySelectorAll("a").forEach((a) => {
    const href = (a.getAttribute("href") ?? "").toLowerCase();
    const isSocial = socialDomains.some((d) => href.includes(d));
    if (isSocial) {
      // Remove the closest block-level ancestor (table cell, div, p, td)
      const block = a.closest("td, th, div, p, li") ?? a;
      block.remove();
    }
  });

  // Remove empty table rows left behind
  doc.querySelectorAll("tr").forEach((tr) => {
    if (!tr.textContent?.trim()) tr.remove();
  });

  // Remove unsubscribe / footer sections (common Beehiiv patterns)
  doc.querySelectorAll("*").forEach((el) => {
    const text = el.textContent?.toLowerCase() ?? "";
    if (
      text.includes("unsubscribe") ||
      text.includes("manage preferences") ||
      text.includes("you received this email")
    ) {
      el.remove();
    }
  });

  return doc.body.innerHTML;
}

// ─── Modal ─────────────────────────────────────────────────────────────────

function PostModal({
  item,
  onClose,
}: {
  item: NewsletterItem;
  onClose: () => void;
}) {
  const [html, setHtml] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetch(`/api/newsletter/${item.slug}`)
      .then((r) => {
        if (!r.ok) throw new Error("fetch failed");
        return r.json();
      })
      .then((data) => {
        // API returns { data: { html: "..." } }
        const raw = data?.data?.html ?? data?.html ?? "";
        setHtml(cleanNewsletterHtml(raw));
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [item.slug]);

  // Close on backdrop click
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto bg-black/75 backdrop-blur-sm"
      style={{ padding: "24px 16px 80px" }}
    >
      <div className="relative w-full max-w-3xl rounded-card bg-[#0d1822] shadow-[0_24px_80px_rgba(0,0,0,0.7)]">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white/50 transition-colors hover:bg-white/10 hover:text-white/80"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path
              d="M1 1L11 11M11 1L1 11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Cover */}
        {item.cover && (
          <div className="relative w-full overflow-hidden rounded-t-card" style={{ aspectRatio: "16/7" }}>
            <Image
              src={item.cover}
              alt={item.title}
              fill
              sizes="768px"
              className="object-cover [filter:saturate(0.85)_contrast(1.04)]"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1822]/80 via-transparent to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className="p-6 md:p-10">
          {/* Meta */}
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#5a9a9b]">
              {item.author}
            </span>
            <span className="text-white/20">·</span>
            <span className="text-[12px] text-white/40">{formatDate(item.pubDate)}</span>
          </div>

          {/* Title */}
          <h1 className="font-serif text-[28px] leading-[1.15] tracking-[-0.015em] text-white md:text-[36px]">
            {item.title}
          </h1>

          {/* Body */}
          {loading && (
            <div className="mt-8 space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-4 animate-pulse rounded bg-white/[0.06]"
                  style={{ width: i === 4 ? "60%" : "100%" }}
                />
              ))}
            </div>
          )}

          {error && (
            <div className="mt-8 rounded border border-red-900/30 bg-red-950/20 px-5 py-4">
              <p className="text-[14px] text-white/50">
                Unable to load the full article. Try opening it directly on the{" "}
                <a
                  href={item.guid}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#5a9a9b] underline"
                >
                  GILD newsletter
                </a>
                .
              </p>
            </div>
          )}

          {!loading && !error && html !== null && (
            <div
              className="newsletter-prose mt-8"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          )}

          {/* Fallback: link to original */}
          {!loading && (
            <div className="mt-8 border-t border-white/[0.07] pt-6">
              <a
                href={item.guid}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.14em] text-[#5a9a9b] transition-opacity hover:opacity-75"
              >
                Read on Beehiiv
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                  <path
                    d="M1 9L9 1M9 1H3M9 1V7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Card ──────────────────────────────────────────────────────────────────

function NewsletterCard({
  item,
  onClick,
}: {
  item: NewsletterItem;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full flex-col overflow-hidden rounded-card border border-[rgba(255,248,235,0.07)] bg-[#0d1822] text-left transition-all duration-300 hover:border-[rgba(90,154,155,0.25)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.45)]"
    >
      {/* Cover */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
        {item.cover ? (
          <>
            <Image
              src={item.cover}
              alt={item.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03] [filter:saturate(0.82)_contrast(1.04)]"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1822]/60 via-transparent to-transparent" />
          </>
        ) : (
          <div className="h-full w-full bg-[#111e2c]">
            <div className="flex h-full items-center justify-center">
              <span className="font-serif text-3xl text-white/10">G</span>
            </div>
          </div>
        )}
      </div>

      {/* Text */}
      <div className="flex flex-1 flex-col p-5">
        {/* Meta row */}
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#5a9a9b]">
            {item.author}
          </span>
          <span className="text-white/20">·</span>
          <span className="text-[11px] text-white/35">{formatDate(item.pubDate)}</span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-[17px] font-normal leading-[1.3] tracking-[-0.01em] text-white transition-colors duration-200 group-hover:text-white/85">
          {item.title}
        </h3>

        {/* Description */}
        {item.description && (
          <p className="mt-2.5 line-clamp-3 flex-1 text-[13px] leading-[1.8] text-white/50">
            {item.description}
          </p>
        )}

        {/* Read link */}
        <div className="mt-4 flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-[#5a9a9b] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          Read issue
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden>
            <path
              d="M1 8L8 1M8 1H3M8 1V6"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </button>
  );
}

// ─── Skeleton ──────────────────────────────────────────────────────────────

function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-card border border-[rgba(255,248,235,0.07)] bg-[#0d1822]">
      <div className="w-full animate-pulse bg-white/[0.05]" style={{ aspectRatio: "16/9" }} />
      <div className="p-5">
        <div className="mb-3 flex gap-2">
          <div className="h-3 w-16 animate-pulse rounded bg-white/[0.07]" />
          <div className="h-3 w-20 animate-pulse rounded bg-white/[0.05]" />
        </div>
        <div className="h-4 w-full animate-pulse rounded bg-white/[0.07]" />
        <div className="mt-1.5 h-4 w-4/5 animate-pulse rounded bg-white/[0.05]" />
        <div className="mt-3 h-3 w-full animate-pulse rounded bg-white/[0.04]" />
        <div className="mt-1 h-3 w-3/4 animate-pulse rounded bg-white/[0.04]" />
      </div>
    </div>
  );
}

// ─── Pagination ────────────────────────────────────────────────────────────

function Pagination({
  page,
  total,
  onChange,
}: {
  page: number;
  total: number;
  onChange: (p: number) => void;
}) {
  if (total <= 1) return null;

  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div className="mt-12 flex items-center justify-center gap-2">
      <button
        type="button"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="flex h-9 w-9 items-center justify-center rounded border border-[rgba(255,248,235,0.1)] text-white/40 transition-all hover:border-[rgba(255,248,235,0.25)] hover:text-white/70 disabled:cursor-not-allowed disabled:opacity-25"
        aria-label="Previous page"
      >
        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden>
          <path d="M7 1L1 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onChange(p)}
          className={`flex h-9 w-9 items-center justify-center rounded border text-[13px] font-medium transition-all ${
            p === page
              ? "border-[#5a9a9b]/40 bg-[#5a9a9b]/10 text-[#5a9a9b]"
              : "border-[rgba(255,248,235,0.07)] text-white/35 hover:border-[rgba(255,248,235,0.18)] hover:text-white/65"
          }`}
          aria-label={`Page ${p}`}
          aria-current={p === page ? "page" : undefined}
        >
          {p}
        </button>
      ))}

      <button
        type="button"
        disabled={page === total}
        onClick={() => onChange(page + 1)}
        className="flex h-9 w-9 items-center justify-center rounded border border-[rgba(255,248,235,0.1)] text-white/40 transition-all hover:border-[rgba(255,248,235,0.25)] hover:text-white/70 disabled:cursor-not-allowed disabled:opacity-25"
        aria-label="Next page"
      >
        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden>
          <path d="M1 1L7 7L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────

export default function NewsletterPage() {
  const [items, setItems] = useState<NewsletterItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [activeMonth, setActiveMonth] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [openItem, setOpenItem] = useState<NewsletterItem | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile for page size
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  // Fetch list
  useEffect(() => {
    fetch("/api/newsletter")
      .then((r) => {
        if (!r.ok) throw new Error("fetch failed");
        return r.json();
      })
      .then((data) => {
        // Data may be an array or wrapped: { data: [...] } or { items: [...] }
        const raw: NewsletterItem[] = Array.isArray(data)
          ? data
          : (data?.data ?? data?.items ?? []);
        // Sort descending by pubDate
        raw.sort(
          (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
        );
        setItems(raw);
      })
      .catch(() => setFetchError(true))
      .finally(() => setLoading(false));
  }, []);

  // Build month groups (sorted desc)
  const monthKeys = Array.from(
    new Set(items.map((item) => monthKey(item.pubDate)))
  ).sort((a, b) => b.localeCompare(a));

  // Filtered items
  const filtered = activeMonth
    ? items.filter((item) => monthKey(item.pubDate) === activeMonth)
    : items;

  // Reset page when filter changes
  const handleMonthClick = useCallback(
    (key: string | null) => {
      setActiveMonth((prev) => (prev === key ? null : key));
      setPage(1);
    },
    []
  );

  const handlePageChange = (p: number) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Pagination
  const pageSize = isMobile ? PAGE_SIZE_MOBILE : PAGE_SIZE_DESKTOP;
  const totalPages = Math.ceil(filtered.length / pageSize);
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

  const closeModal = useCallback(() => setOpenItem(null), []);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#07090c]">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="border-b border-[rgba(255,248,235,0.07)] bg-[#07090c] pb-16 pt-16 md:pb-20 md:pt-20">
          <div className="section-shell">
            <p className="section-label mb-4">Newsletter</p>
            <h1 className="font-serif text-[36px] leading-[1.08] tracking-[-0.018em] text-white md:text-[52px] lg:text-[60px]">
              The AI Builder Brief
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-[1.9] text-white/50 md:text-[16px]">
              Insights, trends, and real conversations from the GILD network — delivered
              to senior AI and engineering leaders building what&apos;s next.
            </p>
            <a
              href="https://gild-austin.beehiiv.com/subscribe"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-block bg-[#5a9a9b] px-7 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-[#4d8889]"
            >
              Subscribe Free
            </a>
          </div>
        </section>

        {/* ── Body: sidebar + grid ─────────────────────────────── */}
        <div className="section-shell py-12 md:py-16 lg:py-20">
          <div className="flex flex-col gap-10 lg:flex-row lg:gap-14 xl:gap-20">

            {/* ── Sidebar ────────────────────────────────────────── */}
            <aside className="shrink-0 lg:w-[180px]">
              {/* Mobile: horizontal chip scroll */}
              <div className="flex flex-wrap gap-2 lg:hidden">
                <button
                  type="button"
                  onClick={() => handleMonthClick(null)}
                  className={`rounded border px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] transition-all ${
                    activeMonth === null
                      ? "border-[#5a9a9b]/40 bg-[#5a9a9b]/10 text-[#5a9a9b]"
                      : "border-[rgba(255,248,235,0.1)] text-white/40 hover:border-[rgba(255,248,235,0.2)] hover:text-white/65"
                  }`}
                >
                  All
                </button>
                {monthKeys.map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleMonthClick(key)}
                    className={`rounded border px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] transition-all ${
                      activeMonth === key
                        ? "border-[#5a9a9b]/40 bg-[#5a9a9b]/10 text-[#5a9a9b]"
                        : "border-[rgba(255,248,235,0.1)] text-white/40 hover:border-[rgba(255,248,235,0.2)] hover:text-white/65"
                    }`}
                  >
                    {monthLabel(key)}
                  </button>
                ))}
              </div>

              {/* Desktop: sticky vertical list */}
              <div className="hidden lg:block">
                <div className="sticky top-[92px]">
                  <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.2em] text-white/30">
                    Filter by month
                  </p>
                  <ul className="space-y-1">
                    <li>
                      <button
                        type="button"
                        onClick={() => handleMonthClick(null)}
                        className={`w-full rounded px-3 py-2 text-left text-[13px] transition-all ${
                          activeMonth === null
                            ? "bg-[#5a9a9b]/10 text-[#5a9a9b]"
                            : "text-white/40 hover:bg-white/[0.04] hover:text-white/70"
                        }`}
                      >
                        All issues
                      </button>
                    </li>
                    {monthKeys.map((key) => {
                      const count = items.filter(
                        (item) => monthKey(item.pubDate) === key
                      ).length;
                      return (
                        <li key={key}>
                          <button
                            type="button"
                            onClick={() => handleMonthClick(key)}
                            className={`flex w-full items-center justify-between rounded px-3 py-2 text-left text-[13px] transition-all ${
                              activeMonth === key
                                ? "bg-[#5a9a9b]/10 text-[#5a9a9b]"
                                : "text-white/40 hover:bg-white/[0.04] hover:text-white/70"
                            }`}
                          >
                            <span>{monthLabel(key)}</span>
                            <span
                              className={`text-[11px] ${
                                activeMonth === key ? "text-[#5a9a9b]/70" : "text-white/20"
                              }`}
                            >
                              {count}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </aside>

            {/* ── Grid ───────────────────────────────────────────── */}
            <div className="flex-1 min-w-0">
              {/* Count line */}
              {!loading && !fetchError && (
                <p className="mb-6 text-[12px] uppercase tracking-[0.14em] text-white/25">
                  {filtered.length} {filtered.length === 1 ? "issue" : "issues"}
                  {activeMonth ? ` · ${monthLabel(activeMonth)}` : ""}
                </p>
              )}

              {/* Error */}
              {fetchError && (
                <div className="rounded border border-red-900/30 bg-red-950/20 px-6 py-8 text-center">
                  <p className="text-[15px] text-white/50">
                    Unable to load newsletter issues. Please try again later.
                  </p>
                  <a
                    href="https://gild-austin.beehiiv.com"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-block text-[13px] text-[#5a9a9b] underline"
                  >
                    Read on Beehiiv →
                  </a>
                </div>
              )}

              {/* Loading skeletons */}
              {loading && (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {Array.from({ length: pageSize || 6 }).map((_, i) => (
                    <CardSkeleton key={i} />
                  ))}
                </div>
              )}

              {/* Empty state */}
              {!loading && !fetchError && filtered.length === 0 && (
                <div className="py-16 text-center">
                  <p className="text-[15px] text-white/40">No issues found.</p>
                  <button
                    type="button"
                    onClick={() => handleMonthClick(null)}
                    className="mt-4 text-[13px] text-[#5a9a9b] underline"
                  >
                    Clear filter
                  </button>
                </div>
              )}

              {/* Cards */}
              {!loading && !fetchError && pageItems.length > 0 && (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {pageItems.map((item) => (
                    <NewsletterCard
                      key={item.slug}
                      item={item}
                      onClick={() => setOpenItem(item)}
                    />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {!loading && !fetchError && (
                <Pagination
                  page={page}
                  total={totalPages}
                  onChange={handlePageChange}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Modal */}
      {openItem && <PostModal item={openItem} onClose={closeModal} />}
    </>
  );
}
