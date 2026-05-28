import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { spotifyShow, youtubeEpisodes } from "@/lib/podcast";

export const metadata: Metadata = {
  title: "The GILD Podcast — Conversations with AI and Engineering Leaders",
  description:
    "Candid conversations with founders, executives, and senior operators about AI, leadership, and building real companies. Hosted by Gino Ferrand."
};

/* ── YouTube SVG icon ─────────────────────────────────────────── */
function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z" />
    </svg>
  );
}

/* ── Spotify SVG icon ─────────────────────────────────────────── */
function SpotifyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.52 17.28c-.24.36-.66.48-1.02.24-2.82-1.74-6.36-2.1-10.56-1.14-.42.12-.78-.18-.9-.54-.12-.42.18-.78.54-.9 4.56-1.02 8.52-.6 11.64 1.32.42.18.48.66.3 1.02zm1.44-3.3c-.3.42-.84.6-1.26.3-3.24-1.98-8.16-2.58-11.94-1.38-.48.12-.96-.12-1.08-.6-.12-.48.12-.96.6-1.08 4.38-1.32 9.78-.66 13.5 1.62.36.18.54.78.18 1.14zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.3c-.6.18-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.72 1.62.54.3.72 1.02.42 1.56-.3.42-1.02.6-1.56.3z" />
    </svg>
  );
}

export default function PodcastPage() {
  const allEpisodes = youtubeEpisodes;

  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="relative overflow-hidden pt-[72px]">
          {/* Background image — Frame 3.avif (dark navy) */}
          <div className="absolute inset-0">
            <Image
              src="/images/GILD PODcats Banner_files/69c52b65285924258f9d85a3_890cd5a1c508425c19134bdc2771c8ad_Frame 3.avif"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            {/* Left black gradient */}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.96)_0%,rgba(0,0,0,0.75)_25%,rgba(0,0,0,0.15)_50%,rgba(0,0,0,0.0)_60%)]" />
            {/* Right black gradient */}
            <div className="absolute inset-0 bg-[linear-gradient(270deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.60)_20%,rgba(0,0,0,0.0)_45%)]" />
            {/* Bottom fade into page bg */}
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#07090c] to-transparent" />
          </div>

          <div className="section-shell relative z-10">
            <div className="grid min-h-[280px] items-center md:min-h-[320px] lg:grid-cols-[1fr_auto]">

              {/* Left: text */}
              <div className="py-12 md:py-16 lg:py-20">
                <h1 className="font-serif text-[36px] font-normal leading-[1.05] tracking-[-0.018em] text-white md:text-[50px] lg:text-[58px] xl:text-[64px]">
                  The GILD Podcast
                </h1>
                <p className="mt-4 max-w-[520px] text-[14px] leading-[1.8] text-white/70 md:text-[16px]">
                  Conversations with leaders shaping the future of work,
                  leadership, and growth.
                </p>

                {/* Platform buttons using SVG images from gildhq.com */}
                <div className="mt-8 flex flex-wrap items-center gap-5">
                  <a
                    href="https://www.youtube.com/@GILDhq"
                    target="_blank"
                    rel="noreferrer"
                    className="transition-opacity duration-300 hover:opacity-80"
                    aria-label="Watch on YouTube"
                  >
                    <Image
                      src="/images/GILD PODcats Banner_files/69c4671ae1a5ade096c2e4c0_watch_on_youtube.svg"
                      alt="Watch on YouTube"
                      width={160}
                      height={44}
                      className="h-11 w-auto"
                    />
                  </a>
                  <a
                    href={spotifyShow.url}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-opacity duration-300 hover:opacity-80"
                    aria-label="Listen on Spotify"
                  >
                    <Image
                      src="/images/GILD PODcats Banner_files/69c52391c4cd90002297f65a_listen_on_spotify-button-white.svg"
                      alt="Listen on Spotify"
                      width={160}
                      height={44}
                      className="h-11 w-auto"
                    />
                  </a>
                </div>
              </div>

              {/* Right: host photo flush to bottom-right */}
              <div className="hidden self-end lg:block">
                <div className="relative" style={{ width: "340px", height: "310px" }}>
                  <Image
                    src="/images/GILD PODcats Banner_files/69c57c5d68047b5eac9380c9_7c28024a6ea89ff6008e1946a5b2533f_Frame 6 (1).avif"
                    alt="Gino Ferrand — Host of The GILD Podcast"
                    fill
                    sizes="340px"
                    className="object-contain object-bottom"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── All Episodes ─────────────────────────────────────── */}
        <section className="section-pad bg-white">
          <div className="section-shell">
            <div className="mb-10 flex items-end justify-between">
              <p className="text-[15px] font-medium uppercase tracking-[0.18em] text-[#9ca3af]">All Episodes</p>
              <a
                href="https://www.youtube.com/@GILDhq"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#5a9a9b] transition-colors duration-300 hover:text-[#374151]"
              >
                View all →
              </a>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {allEpisodes.map((episode) => (
                <div
                  key={episode.videoId}
                  className="group flex flex-col overflow-hidden rounded-card bg-white shadow-[0_2px_16px_rgba(0,0,0,0.18)] transition-shadow duration-300 hover:shadow-[0_6px_32px_rgba(0,0,0,0.28)]"
                >
                  {/* Thumbnail — clicking goes to YouTube */}
                  <a
                    href={episode.url}
                    target="_blank"
                    rel="noreferrer"
                    className="relative block aspect-video overflow-hidden bg-[#0a0806]"
                    tabIndex={-1}
                    aria-label={`Watch "${episode.title}" on YouTube`}
                  >
                    <Image
                      src={`https://img.youtube.com/vi/${episode.videoId}/maxresdefault.jpg`}
                      alt={episode.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover opacity-95 transition-all duration-500 group-hover:scale-[1.03] [filter:saturate(0.88)]"
                      unoptimized
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 shadow">
                        <svg width="14" height="16" viewBox="0 0 14 16" fill="none" aria-hidden>
                          <path d="M1.5 1L12.5 8L1.5 15V1Z" fill="#07090c" />
                        </svg>
                      </div>
                    </div>
                  </a>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-5">
                    {/* Guest + duration */}
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[13px] font-semibold text-[#111827]">{episode.guest}</p>
                      <span className="shrink-0 text-[12px] text-[#6b7280]">{episode.duration}</span>
                    </div>

                    {/* Date */}
                    <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.18em] text-[#9ca3af]">
                      {episode.published}
                    </p>

                    {/* Title with play icon */}
                    <a href={episode.url} target="_blank" rel="noreferrer">
                      <h3 className="mt-1.5 flex gap-2 text-[15px] font-semibold leading-[1.4] text-[#111827] transition-colors duration-300 hover:text-[#5a9a9b]">
                        <span className="mt-0.5 shrink-0 text-[#111827]">▶</span>
                        {episode.title}
                      </h3>
                    </a>

                    {/* Description */}
                    <p className="mt-2.5 line-clamp-3 text-[13px] leading-[1.75] text-[#6b7280]">
                      {episode.description}
                    </p>

                    {/* Tags */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {episode.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[#d1e9ea] px-3 py-1 text-[11px] font-medium text-[#5a9a9b]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Platform buttons — black SVG style */}
                    <div className="mt-auto flex items-center gap-3 pt-5">
                      <a
                        href={episode.url}
                        target="_blank"
                        rel="noreferrer"
                        className="transition-opacity duration-300 hover:opacity-75"
                        aria-label="Watch on YouTube"
                      >
                        <Image
                          src="/images/69c52506ac8138b8bae35b02_watch_on_youtube_mono_black.svg"
                          alt="Watch on YouTube"
                          width={130}
                          height={36}
                          className="h-9 w-auto"
                        />
                      </a>
                      <a
                        href={episode.spotifyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="transition-opacity duration-300 hover:opacity-75"
                        aria-label="Listen on Spotify"
                      >
                        <Image
                          src="/images/69c52506c929d82c40aaa2d8_listen_on_spotify_mono_black.svg"
                          alt="Listen on Spotify"
                          width={130}
                          height={36}
                          className="h-9 w-auto"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── About Host ───────────────────────────────────────── */}
        <section className="section-pad bg-[#0b1520]">
          <div className="section-shell">
            <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24 xl:grid-cols-[3fr_4fr]">

              {/* About the Podcast */}
              <div>
                <p className="section-label">About the Show</p>
                <p className="text-[15px] leading-[1.95] text-white/55">
                  The GILD Podcast is a broadcast window into the caliber of thinking inside GILD.
                  Each episode features a founder, executive, or senior operator in a candid,
                  unscripted conversation — no panel formats, no talking points. Real decisions,
                  real companies, real AI.
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <a
                    href="https://www.youtube.com/@GILDhq"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 border border-[rgba(255,255,255,0.12)] px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white/70 transition-all duration-300 hover:border-white/30 hover:text-white"
                  >
                    <YouTubeIcon className="h-3.5 w-3.5 text-[#FF0000]" />
                    YouTube
                  </a>
                  <a
                    href={spotifyShow.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 border border-[rgba(255,255,255,0.12)] px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white/70 transition-all duration-300 hover:border-white/30 hover:text-white"
                  >
                    <SpotifyIcon className="h-3.5 w-3.5 text-[#1DB954]" />
                    Spotify
                  </a>
                </div>
              </div>

              {/* About the Host */}
              <div className="border-t border-[rgba(255,248,235,0.07)] pt-10 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0">
                <p className="section-label">The Host</p>
                <p className="font-serif text-[22px] leading-[1.2] tracking-[-0.01em] text-white/90">
                  Gino Ferrand
                </p>
                <p className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-white/35">
                  Founder & CEO, GILD and Tecla
                </p>
                <p className="mt-6 text-[15px] leading-[1.95] text-white/55">
                  Gino speaks with founders, executives, and industry leaders about the ideas,
                  challenges, and trends shaping modern companies. He brings experience working
                  with high-growth businesses to discussions on leadership, hiring, AI, and the
                  future of work.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Spotify Embed ────────────────────────────────────── */}
        <section className="section-pad bg-[#07090c]">
          <div className="section-shell">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:items-center">
              <div>
                <p className="section-label">Also on Spotify</p>
                <h2 className="font-serif text-[28px] leading-[1.2] tracking-[-0.015em] text-white md:text-[36px]">
                  Listen wherever you are.
                </h2>
                <p className="mt-4 text-[14px] leading-[1.9] text-white/45">
                  {spotifyShow.description}
                </p>
              </div>
              <div className="overflow-hidden rounded-card border border-[rgba(255,248,235,0.07)]">
                <iframe
                  className="block h-[352px] w-full"
                  src={spotifyShow.embedUrl}
                  title={spotifyShow.title}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
