"use client";

import Image from "next/image";
import { trackApplyClick } from "@/lib/analytics";
import { openRequestInviteModal } from "@/components/RequestInviteModal";

const heroImage =
  "/images/698fafaef71444e6a1a61008_3278742058c10b66de59b113217d901e_website_hero_desktop.avif";

const benefits = [
  {
    title: "Access to the Dinners",
    image: "/images/698cced70159f31e5d1a0306_DSCF3589%201.avif",
    body: "Curated, in-person AI Forums in Austin, Dallas, and Miami, with more tech hubs launching across the country. Senior leaders only. Off-the-record. Themed around the problems members are actually working through."
  },
  {
    title: "Curated Peer Introductions",
    image: "/images/698cced72390e2bb0fb169db_b0cf61550cb322c41be6421d4e656b1e_GILD_Dinner_11_12%201.png",
    body: "Tell us who you want to meet, what you're working on, and what you need help with. Our team finds the right peers and brokers double-opt-in introductions. You don't have to chase anyone."
  },
  {
    title: "The GILD Community",
    image: "/images/698cced7420e375a392ba5d6_c4c5bd652e1e2b349cfa53ada74f9585_IMG_7293%201.png",
    body: "A private network for members to stay connected between dinners. Share what you're building, ask the network for advice, and keep the conversations going."
  },
  {
    title: "Insights and Intelligence",
    image: "/images/698cced7534e918894932c2b_DSCS6091%201.avif",
    body: "The AI Builder Brief newsletter, the GILD podcast, and quarterly intelligence from across the network. The trends, challenges, and decisions senior AI and engineering leaders are navigating, delivered to you."
  }
];

export function WhatYouGet() {
  const requestAccess = (location: string) => {
    trackApplyClick(location);
    openRequestInviteModal();
  };

  return (
    <section id="benefits" className="bg-black text-white">
      <div className="relative min-h-[260px] overflow-hidden md:min-h-[320px]">
        <Image
          src={heroImage}
          alt=""
          fill
          sizes="100vw"
          priority={false}
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="section-shell relative z-10 flex min-h-[260px] flex-col items-center justify-center py-16 text-center md:min-h-[320px]">
          <h2 className="max-w-4xl text-3xl font-semibold leading-tight text-white md:text-4xl">
            Apply To The GILD Network
          </h2>
          <p className="mt-6 max-w-2xl text-sm leading-6 text-slate-100 md:text-base">
            If you&apos;re a senior AI or engineering leader, we&apos;d like to meet you. We
            review every application personally. Tell us who you are, what you&apos;re
            working on, and what would be most valuable to you. We&apos;ll do the rest.
          </p>
          <button
            type="button"
            onClick={() => requestAccess("networking_banner")}
            className="mt-9 rounded px-7 py-3 text-sm font-medium text-slate-900 transition-colors duration-200 bg-white hover:bg-slate-100"
          >
            Request Access
          </button>
        </div>
      </div>

      <div className="section-shell py-20 md:py-28">
        <p className="section-label text-center">What You Get</p>
        <div className="mx-auto max-w-3xl text-center">
          <h3 className="text-3xl font-semibold leading-tight text-white md:text-4xl">
            What you get as a member of GILD.
          </h3>
          <p className="mt-6 text-sm leading-6 text-slate-100 md:text-base">
            GILD is more than dinners. The network is built to make every member more
            connected, more informed, and more effective.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <article key={benefit.title} className="bg-black">
              <div className="relative aspect-[1.55] overflow-hidden bg-slate-800">
                <Image
                  src={benefit.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <h4 className="mt-6 text-sm font-bold uppercase tracking-tight text-white">
                {benefit.title}
              </h4>
              <p className="mt-4 text-sm leading-6 text-slate-100">{benefit.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <button
            type="button"
            onClick={() => requestAccess("networking_bottom")}
            className="rounded px-7 py-3 text-sm font-medium text-slate-900 transition-colors duration-200 bg-white hover:bg-slate-100"
          >
            Request Access
          </button>
        </div>
      </div>
    </section>
  );
}
