import Image from "next/image";
import { forumEvents } from "@/lib/events";

export function UpcomingForums() {
  return (
    <section id="events" className="section-pad bg-[#0a0806]">
      <div className="section-shell">
        <p className="section-label">Upcoming Forums</p>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {forumEvents.map((event) => (
            <a
              key={`${event.date}-${event.url}`}
              href={event.url}
              target="_blank"
              rel="noreferrer"
              className="group overflow-hidden rounded-card border border-[rgba(255,248,235,0.07)] transition-all duration-500 hover:-translate-y-0.5 hover:border-[rgba(255,248,235,0.13)] hover:shadow-[0_8px_48px_rgba(0,0,0,0.5)]"
              style={{
                backgroundColor: event.cardColor,
                borderColor: undefined
              }}
            >
              <div
                className="relative aspect-square overflow-hidden"
                style={{ backgroundColor: event.cardColor }}
              >
                <Image
                  src={event.coverUrl}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-contain p-3 transition-all duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div className="p-7">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <p className="text-2xl font-medium leading-none text-[#4a8888]">
                      {event.date}
                    </p>
                    <p className="text-2xl font-medium leading-none text-white/85">
                      {event.location}
                    </p>
                  </div>
                  <span className="inline-flex min-h-8 items-center justify-center border border-[rgba(255,248,235,0.14)] px-4 py-1 text-center text-[10px] font-medium uppercase leading-4 tracking-[0.12em] text-white/50">
                    {event.status}
                  </span>
                </div>
                <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.18em] text-white/35">
                  {event.meta}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
