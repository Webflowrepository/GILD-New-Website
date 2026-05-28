import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { EventDetailCTA } from "@/components/EventDetailCTA";

export const metadata: Metadata = {
  title: "AI and Engineering Leaders Dinner — May 27, 2026 · Austin, TX | GILD",
  description:
    "A private dinner for senior engineering leaders and AI operators in Austin, TX — May 27, 2026. Curated by GILD."
};

// ─── Gallery images
// Replace with exact May 27 photos once confirmed.
// All sourced from /public/images/events/
const galleryImages = [
  { src: "/images/events/DSC09665.jpg", alt: "Conversation at the GILD dinner — Austin" },
  { src: "/images/events/DSC09672.jpg", alt: "Operators in discussion — GILD Austin" },
  { src: "/images/events/DSC09695.jpg", alt: "Small group energy — GILD dinner" },
  { src: "/images/events/DSC09710.jpg", alt: "Attendees listening — GILD Austin" },
  { src: "/images/events/DSC09729.jpg", alt: "Warm room atmosphere — GILD forum" },
  { src: "/images/events/DSC09744.jpg", alt: "Candid moment — GILD dinner Austin" },
  { src: "/images/events/DSC09764.jpg", alt: "Leaders at the table — GILD" },
  { src: "/images/events/DSC09780.jpg", alt: "Room detail — GILD Austin dinner" },
  { src: "/images/events/DSC09929.jpg", alt: "Late evening conversation — GILD" },
  { src: "/images/events/DSC09931.jpg", alt: "Closing moments — GILD Austin" }
];

const themePoints = [
  {
    title: "Beyond demos",
    body: "How teams are moving from experiments to working AI systems."
  },
  {
    title: "Workflow reality",
    body: "Where AI agents help, where they break, and what teams need before scaling them."
  },
  {
    title: "Operating judgment",
    body: "How leaders decide what to automate, what to keep human, and what to stop doing."
  }
];

const attendeeRoles = [
  "Founders",
  "CTOs",
  "VPs of Engineering",
  "Engineering leaders",
  "Product operators",
  "AI builders",
  "Selective investors"
];

const signalPoints = [
  "AI agents need workflow context, not just better prompts.",
  "Human in the loop remains critical for judgment, quality, and trust.",
  "The best teams are simplifying systems before adding more automation."
];

export default function EventDetailPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* ─────────────────────────────────────────────
            HERO
        ───────────────────────────────────────────── */}
        <section className="relative min-h-[70vh] overflow-hidden bg-[#050403] md:min-h-[80vh]">
          <div className="absolute inset-0">
            <Image
              src="/images/events/DSC09759.jpg"
              alt="AI and Engineering Leaders Dinner — Austin, May 27 2026"
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-65 [filter:saturate(0.82)_contrast(1.06)]"
              style={{ objectPosition: "center 40%" }}
            />
            <div className="absolute inset-0 bg-black/35" />
            <div className="absolute inset-0 bg-[linear-gradient(165deg,rgba(5,4,3,0.88)_0%,rgba(5,4,3,0.45)_50%,rgba(5,4,3,0.25)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#0a0806] to-transparent" />
          </div>

          <div className="section-shell relative z-10 flex min-h-[70vh] flex-col justify-end py-16 md:min-h-[80vh] md:py-24">
            <div className="max-w-3xl">
              {/* Back link */}
              <Link
                href="/#past-forums"
                className="mb-8 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.28em] text-white/38 transition-colors duration-200 hover:text-white/65"
              >
                <span>←</span>
                <span>Past Events</span>
              </Link>

              <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-[#5a9a9b]">
                May 27, 2026 · Austin, TX
              </p>
              <h1 className="mt-4 font-serif text-[32px] font-normal leading-[1.1] tracking-[-0.015em] text-white md:text-[48px] lg:text-[58px]">
                AI and Engineering<br className="hidden sm:block" /> Leaders Dinner
              </h1>
              <p className="mt-5 max-w-xl text-[14px] leading-[1.9] text-white/52 md:text-[15px]">
                A private room for engineering leaders and AI operators discussing
                what is actually working — beyond demos, tools, and surface‑level adoption.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <EventDetailCTA />
                <Link
                  href="/#past-forums"
                  className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/38 transition-colors duration-200 hover:text-white/65"
                >
                  ← Back to Past Events
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────
            1. EVENT OVERVIEW
        ───────────────────────────────────────────── */}
        <section className="section-pad bg-[#0a0806]">
          <div className="section-shell">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">

              {/* Left label col */}
              <div>
                <p className="section-label">Room Theme</p>
                <h2 className="font-serif text-[26px] leading-[1.2] tracking-[-0.015em] text-white/90 md:text-[32px]">
                  What the room explored
                </h2>
                <p className="mt-5 text-[14px] leading-[1.88] text-white/46">
                  This dinner brought together senior engineering leaders, founders,
                  and AI operators to discuss where AI is creating reliable leverage
                  inside real teams.
                </p>
              </div>

              {/* Right points col */}
              <div className="space-y-8 border-t border-[rgba(255,248,235,0.06)] pt-8 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0">
                {themePoints.map(({ title, body }, i) => (
                  <div key={title} className="flex gap-6">
                    <span className="mt-[3px] shrink-0 text-[11px] font-medium tracking-[0.2em] text-[#5a9a9b]">
                      0{i + 1}
                    </span>
                    <div>
                      <p className="font-serif text-[17px] leading-snug text-white/88">{title}</p>
                      <p className="mt-2 text-[13px] leading-[1.8] text-white/42">{body}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────
            2. PHOTO GALLERY
        ───────────────────────────────────────────── */}
        <section className="section-pad bg-[#080604]">
          <div className="section-shell">
            <div className="mb-12">
              <p className="section-label">Inside the room</p>
              <p className="max-w-xl font-serif text-[22px] leading-[1.4] text-white/75 md:text-[26px]">
                Selected moments from the May 27 GILD dinner in Austin.
              </p>
            </div>

            {/* Editorial grid: 2-col on mobile, mixed on desktop */}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
              {galleryImages.map((img, i) => (
                <div
                  key={img.src}
                  className={`relative overflow-hidden rounded-card bg-[#0f0d0b] ${
                    // Span first and fifth images for visual rhythm
                    i === 0 ? "col-span-2 aspect-[16/9]" :
                    i === 4 ? "col-span-2 aspect-[16/9] md:col-span-1 md:aspect-square" :
                    "aspect-square"
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                    className="object-cover [filter:saturate(0.85)_contrast(1.04)] transition-transform duration-700 hover:scale-[1.03]"
                    style={{ objectPosition: "center 35%" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080604]/30 via-transparent to-transparent" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────
            3. ATTENDEE PROFILE
        ───────────────────────────────────────────── */}
        <section className="section-pad bg-[#0d0b09]">
          <div className="section-shell">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">

              <div>
                <p className="section-label">Who was in the room</p>
                <p className="mt-2 text-[13px] leading-[1.85] text-white/42">
                  The room was curated for senior operators with context,
                  responsibility, and real decisions to make.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {attendeeRoles.map((role) => (
                  <span
                    key={role}
                    className="border border-[rgba(255,248,235,0.09)] px-4 py-2.5 text-[12px] font-medium uppercase tracking-[0.18em] text-white/55"
                  >
                    {role}
                  </span>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────
            4. SIGNAL FROM THE ROOM
        ───────────────────────────────────────────── */}
        <section className="section-pad bg-[#0a0806]">
          <div className="section-shell max-w-[860px]">
            <p className="section-label">Signal from the room</p>
            <blockquote className="font-serif text-[22px] leading-[1.5] text-white/85 md:text-[28px] lg:text-[32px]">
              The strongest conversations were not about whether AI matters.
              They were about where it creates reliable leverage inside real teams.
            </blockquote>

            <div className="mt-12 space-y-5 border-t border-[rgba(255,248,235,0.07)] pt-10">
              {signalPoints.map((point) => (
                <div key={point} className="flex gap-5 text-[14px] leading-[1.8] text-white/60">
                  <span className="mt-[10px] h-px w-5 shrink-0 bg-[#5a9a9b]/50" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────
            5. CLOSING CTA
        ───────────────────────────────────────────── */}
        <section className="section-pad bg-[#0d0b09]">
          <div className="section-shell">
            <div className="border-t border-[rgba(255,248,235,0.07)] pt-14">
              <p className="section-label">Next rooms</p>
              <h2 className="max-w-xl font-serif text-[30px] leading-[1.15] tracking-[-0.015em] text-white md:text-[40px]">
                Want to be in the next room?
              </h2>
              <p className="mt-5 max-w-md text-[14px] leading-[1.9] text-white/46">
                GILD is invitation‑first and intentionally curated. Request access to
                upcoming forums in Austin, Dallas, and Miami.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-5">
                <EventDetailCTA />
                <Link
                  href="/#past-forums"
                  className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/36 transition-colors duration-200 hover:text-white/65"
                >
                  ← Back to Past Events
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
