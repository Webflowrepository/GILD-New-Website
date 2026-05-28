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
    <section id="benefits" className="bg-[#060504] text-white">
      <div className="relative min-h-[280px] overflow-hidden md:min-h-[360px]">
        <Image
          src={heroImage}
          alt=""
          fill
          sizes="100vw"
          priority={false}
          className="object-cover opacity-30 [filter:saturate(0.75)_contrast(1.1)]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,3,2,0.68),rgba(4,3,2,0.76))]" />
        <div className="section-shell relative z-10 flex min-h-[280px] flex-col items-center justify-center py-20 text-center md:min-h-[360px]">
          <h2 className="max-w-4xl font-serif text-[30px] leading-[1.18] tracking-[-0.015em] text-white md:text-[42px]">
            Apply To The GILD Network
          </h2>
          <p className="mt-7 max-w-xl text-[13px] leading-[1.85] text-white/55 md:text-[14px]">
            If you&apos;re a senior AI or engineering leader, we&apos;d like to meet you. We
            review every application personally. Tell us who you are, what you&apos;re
            working on, and what would be most valuable to you. We&apos;ll do the rest.
          </p>
          <button
            type="button"
            onClick={() => requestAccess("networking_banner")}
            className="mt-10 border border-white/25 px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.2em] text-white/75 transition-all duration-500 hover:border-white/55 hover:text-white"
          >
            Request Access
          </button>
        </div>
      </div>

      <div className="section-shell py-24 md:py-36">
        <p className="section-label text-center">What You Get</p>
        <div className="mx-auto max-w-3xl text-center">
          <h3 className="font-serif text-[30px] leading-[1.2] tracking-[-0.015em] text-white md:text-[40px]">
            What you get as a member of GILD.
          </h3>
          <p className="mt-6 text-[13px] leading-[1.85] text-white/50 md:text-[14px]">
            GILD is more than dinners. The network is built to make every member more
            connected, more informed, and more effective.
          </p>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <article key={benefit.title} className="group">
              <div className="relative aspect-[1.55] overflow-hidden rounded-card bg-[#0d0b09]">
                <Image
                  src={benefit.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover opacity-85 transition-all duration-700 group-hover:scale-[1.03] group-hover:opacity-95 [filter:saturate(0.88)]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060504]/50 via-transparent to-transparent" />
              </div>
              <h4 className="mt-6 font-serif text-[16px] leading-snug text-white/90">
                {benefit.title}
              </h4>
              <p className="mt-3 text-[13px] leading-[1.85] text-white/45">{benefit.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-24 flex justify-center">
          <button
            type="button"
            onClick={() => requestAccess("networking_bottom")}
            className="border border-white/20 px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.2em] text-white/65 transition-all duration-500 hover:border-white/45 hover:text-white/90"
          >
            Request Access
          </button>
        </div>
      </div>
    </section>
  );
}
