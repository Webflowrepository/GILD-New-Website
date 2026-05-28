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

export default function PodcastPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-[#050403] pb-0 pt-20 md:pt-28">
          {/* Subtle teal glow top-left */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_0%_0%,rgba(90,154,155,0.08),transparent)]" />

          <div className="section-shell relative z-10">
            <div className="grid items-end gap-12 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_440px]">

              {/* Left: text */}
              <div className="pb-16 md:pb-24">
                <p className="section-label">Podcast</p>
                <h1 className="font-serif text-[40px] font-normal leading-[1.08] tracking-[-0.018em] text-white md:text-[54px] lg:text-[64px]">
                  The GILD Podcast
                </h1>
                <p className="mt-5 max-w-[500px] text-[16px] leading-[1.8] text-white/55 md:text-[18px]">
                  Conversations with leaders shaping the future of work,
                  leadership, and growth.
                </p>
                <p className="mt-4 text-[12px] font-medium uppercase tracking-[0.22em] text-white/35">
                  Hosted by Gino Ferrand
                </p>

                {/* Platform badges */}
                <div className="mt-10 flex flex-wrap items-center gap-5">
                  <a
                    href="https://www.youtube.com/@GILDhq"
                    target="_blank"
                    rel="noreferrer"
                    className="transition-opacity duration-300 hover:opacity-75"
                    aria-label="Subscribe on YouTube"
                  >
                    <Image
                      src="/images/69c52616133b590e75afa227_subscribe_on_youtube.svg"
                      alt="Subscribe on YouTube"
                      width={160}
                      height={40}
                      className="h-9 w-auto"
                    />
                  </a>
                  <a
                    href={spotifyShow.url}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-opacity duration-300 hover:opacity-75"
                    aria-label="Follow on Spotify"
                  >
                    <Image
                      src="/images/69c526166b38b8ba821a58db_follow_on_spotify.svg"
                      alt="Follow on Spotify"
                      width={144}
                      height={40}
                      className="h-9 w-auto"
                    />
                  </a>
                </div>
              </div>

              {/* Right: podcast cover image flush to bottom */}
              <div className="hidden overflow-hidden rounded-t-[6px] lg:block"
                style={{ aspectRatio: "3/4" }}>
                <div className="relative h-full w-full">
                  <Image
                    src="/images/69c443191b1e58b9ce64b73c_b90b69231f2ce13203919586724fa1ee_bEdwXXOIlkda412XJUjib.avif"
                    alt="The GILD Podcast"
                    fill
                    sizes="440px"
                    className="object-cover [filter:saturate(0.85)]"
                    style={{ objectPosition: "center top" }}
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050403]/60 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Episodes ─────────────────────────────────────────── */}
        <section className="section-pad bg-[#080604]">
          <div className="section-shell">
            <div className="mb-12 flex items-end justify-between">
              <p className="section-label mb-0">Episodes</p>
              <a
                href="https://www.youtube.com/@GILDhq"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#5a9a9b] transition-colors duration-300 hover:text-white/80"
              >
                View all →
              </a>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {youtubeEpisodes.map((episode) => (
                <a
                  key={episode.videoId}
                  href={episode.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group overflow-hidden rounded-card border border-[rgba(255,248,235,0.07)] bg-[#0c0a08] transition-all duration-300 hover:border-[rgba(255,248,235,0.14)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden bg-[#0a0806]">
                    <Image
                      src={`https://img.youtube.com/vi/${episode.videoId}/maxresdefault.jpg`}
                      alt={episode.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover opacity-90 transition-all duration-500 group-hover:scale-[1.03] group-hover:opacity-100 [filter:saturate(0.85)]"
                      unoptimized
                    />
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90">
                        <svg width="16" height="18" viewBox="0 0 16 18" fill="none" aria-hidden>
                          <path d="M2 1.5L14 9L2 16.5V1.5Z" fill="#080604" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="p-5">
                    <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-white/35">
                      {episode.published}
                    </p>
                    <h3 className="mt-2.5 font-serif text-[16px] leading-[1.38] text-white/88 transition-colors duration-300 group-hover:text-white">
                      {episode.title}
                    </h3>
                    <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.2em] text-[#5a9a9b]">
                      Watch on YouTube →
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── Spotify ──────────────────────────────────────────── */}
        <section className="section-pad bg-[#050403]">
          <div className="section-shell">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-center">
              <div>
                <p className="section-label">Also on Spotify</p>
                <h2 className="font-serif text-[30px] leading-[1.2] tracking-[-0.015em] text-white md:text-[38px]">
                  Listen wherever you are.
                </h2>
                <p className="mt-5 text-[14px] leading-[1.9] text-white/50">
                  {spotifyShow.description}
                </p>
                <a
                  href={spotifyShow.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-block transition-opacity duration-300 hover:opacity-75"
                  aria-label="Follow on Spotify"
                >
                  <Image
                    src="/images/69c526166b38b8ba821a58db_follow_on_spotify.svg"
                    alt="Follow on Spotify"
                    width={144}
                    height={40}
                    className="h-9 w-auto"
                  />
                </a>
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

        {/* ── About ────────────────────────────────────────────── */}
        <section className="section-pad bg-[#080604]">
          <div className="section-shell">
            <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">

              {/* About the Podcast */}
              <div>
                <p className="section-label">About the Podcast</p>
                <p className="text-[15px] leading-[1.95] text-white/55">
                  The GILD Podcast is a broadcast window into the caliber of
                  thinking inside GILD: founder journeys, AI operating models,
                  technical leadership, and the decisions senior teams are
                  navigating right now. Each episode is a candid, unscripted
                  conversation — no panel formats, no talking points.
                </p>
              </div>

              {/* About the Host */}
              <div>
                <p className="section-label">About the Host</p>
                <p className="font-serif text-[20px] leading-[1.3] text-white/90">
                  Gino Ferrand
                </p>
                <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.2em] text-white/35">
                  Founder & CEO, GILD and Tecla
                </p>
                <p className="mt-5 text-[15px] leading-[1.95] text-white/55">
                  Gino speaks with founders, executives, and industry leaders
                  about the ideas, challenges, and trends shaping modern
                  companies. He brings experience working with high-growth
                  businesses to discussions on leadership, hiring, AI, and the
                  future of work.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Subscribe CTA ────────────────────────────────────── */}
        <section className="section-pad border-t border-[rgba(255,248,235,0.06)] bg-[#050403]">
          <div className="section-shell text-center">
            <h2 className="font-serif text-[30px] leading-[1.2] tracking-[-0.015em] text-white md:text-[38px]">
              Stay close to the conversation.
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-[14px] leading-[1.9] text-white/45">
              New episodes every two weeks. Founders, executives, and operators
              sharing what's actually working.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
              <a
                href="https://www.youtube.com/@GILDhq"
                target="_blank"
                rel="noreferrer"
                className="transition-opacity duration-300 hover:opacity-75"
                aria-label="Subscribe on YouTube"
              >
                <Image
                  src="/images/69c52616133b590e75afa227_subscribe_on_youtube.svg"
                  alt="Subscribe on YouTube"
                  width={160}
                  height={40}
                  className="h-9 w-auto"
                />
              </a>
              <a
                href={spotifyShow.url}
                target="_blank"
                rel="noreferrer"
                className="transition-opacity duration-300 hover:opacity-75"
                aria-label="Follow on Spotify"
              >
                <Image
                  src="/images/69c526166b38b8ba821a58db_follow_on_spotify.svg"
                  alt="Follow on Spotify"
                  width={144}
                  height={40}
                  className="h-9 w-auto"
                />
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
