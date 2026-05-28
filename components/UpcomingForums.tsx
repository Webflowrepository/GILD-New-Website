import Image from "next/image";
import { forumEvents } from "@/lib/events";

export function UpcomingForums() {
  return (
    <section id="events" className="section-pad bg-slate-900">
      <div className="section-shell">
        <p className="section-label">Upcoming Forums</p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {forumEvents.map((event) => (
            <a
              key={`${event.date}-${event.url}`}
              href={event.url}
              target="_blank"
              rel="noreferrer"
              className="group overflow-hidden rounded-card border transition duration-300 hover:-translate-y-0.5"
              style={{
                backgroundColor: event.cardColor,
                borderColor: event.borderColor
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
                  className="object-contain p-3 transition duration-300 group-hover:scale-[1.02]"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <p className="text-2xl font-medium leading-none text-teal-400">
                      {event.date}
                    </p>
                    <p className="text-2xl font-medium leading-none text-white">
                      {event.location}
                    </p>
                  </div>
                  <span className="inline-flex min-h-9 items-center justify-center rounded-full bg-teal-500/20 px-4 py-1 text-center text-xs font-medium leading-4 text-teal-400">
                    {event.status}
                  </span>
                </div>
                <p className="mt-5 text-xs font-medium uppercase tracking-[0.16em] text-slate-300">
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
