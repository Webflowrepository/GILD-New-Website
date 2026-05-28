import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { spotifyShow, youtubeEpisodes } from "@/lib/podcast";

export const metadata: Metadata = {
  title: "GILD Podcast — AI Leadership & Operator Intelligence",
  description:
    "Watch and listen to the GILD Podcast: candid conversations with senior operators about AI, leadership, and building real companies."
};

export default function PodcastPage() {
  return (
    <>
      <Navbar />
      <main className="bg-slate-900">
        <section className="section-shell py-24 md:py-32">
          <p className="mb-8 text-xs font-medium uppercase tracking-[0.24em] text-teal-400">
            Podcast
          </p>
          <div className="max-w-4xl">
            <h1 className="text-4xl font-semibold leading-tight text-white md:text-6xl">
              High-signal conversations with operators building through AI.
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-100">
              The GILD Podcast is a broadcast window into the caliber of thinking inside
              GILD: founder journeys, AI operating models, technical leadership, and the
              decisions senior teams are navigating right now.
            </p>
          </div>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="https://www.youtube.com/@GILDhq"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-teal-500 px-7 py-4 text-center text-sm font-medium text-white transition-colors hover:bg-teal-400"
            >
              Watch on YouTube
            </a>
            <a
              href={spotifyShow.url}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/30 px-7 py-4 text-center text-sm font-medium text-white transition-colors hover:border-teal-400 hover:text-teal-400"
            >
              Listen on Spotify
            </a>
          </div>
        </section>

        <section className="section-shell py-20 md:py-28">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="section-label mb-5">YouTube</p>
              <h2 className="text-3xl font-semibold text-white md:text-4xl">Watch the episodes.</h2>
            </div>
            <a
              href="https://www.youtube.com/@GILDhq"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-teal-400 hover:text-white"
            >
              Open channel →
            </a>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {youtubeEpisodes.map((episode) => (
              <article
                key={episode.videoId}
                className="overflow-hidden rounded-card border border-slate-700 bg-slate-800"
              >
                <div className="aspect-video bg-slate-700">
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube.com/embed/${episode.videoId}`}
                    title={episode.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-300">
                    {episode.published}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold leading-7 text-white">
                    {episode.title}
                  </h3>
                  <a
                    href={episode.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex text-sm font-medium text-teal-400 hover:text-white"
                  >
                    Watch on YouTube →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell py-20 md:py-28">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="section-label mb-5">Spotify</p>
              <h2 className="text-3xl font-semibold text-white md:text-4xl">Listen on Spotify.</h2>
              <p className="mt-6 text-base leading-7 text-slate-100">{spotifyShow.description}</p>
              <a
                href={spotifyShow.url}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex rounded-full bg-teal-500 px-7 py-4 text-sm font-medium text-white transition-colors hover:bg-teal-400"
              >
                Open Spotify
              </a>
            </div>
            <div className="overflow-hidden rounded-card border border-slate-700 bg-slate-800 p-2">
              <iframe
                className="h-[520px] w-full"
                src={spotifyShow.embedUrl}
                title={spotifyShow.title}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
