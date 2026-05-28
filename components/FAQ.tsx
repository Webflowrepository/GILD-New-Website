"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, mobileStart, reduced } from "@/lib/gsap";
import { faqs } from "@/lib/faqs";

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);

  const toggle = () => {
    const el = bodyRef.current;
    if (!el) { setOpen((v) => !v); return; }

    if (reduced()) {
      el.style.display = open ? "none" : "block";
      setOpen((v) => !v);
      return;
    }

    if (!open) {
      el.style.display = "block";
      const h = el.scrollHeight;
      gsap.set(el, { height: 0, opacity: 0, overflow: "hidden" });
      gsap.to(el, {
        height: h,
        opacity: 1,
        duration: 0.38,
        ease: "power2.out",
        onComplete: () => {
          el.style.height = "auto";
          el.style.overflow = "";
        },
      });
      gsap.to(iconRef.current, { rotation: 90, duration: 0.3, ease: "power2.out" });
    } else {
      gsap.to(el, {
        height: 0,
        opacity: 0,
        overflow: "hidden",
        duration: 0.28,
        ease: "power2.in",
        onComplete: () => {
          el.style.display = "none";
          gsap.set(el, { clearProps: "height,opacity,overflow" });
        },
      });
      gsap.to(iconRef.current, { rotation: 0, duration: 0.3, ease: "power2.out" });
    }
    setOpen((v) => !v);
  };

  return (
    <div data-faq-item className="border-b border-[#5a9a9b]/30">
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 py-6 text-left font-serif text-lg leading-[1.4] text-white/80 transition-colors duration-300 hover:text-white"
      >
        <span>{question}</span>
        <span
          ref={iconRef}
          className="shrink-0 text-[#5a9a9b] text-xl leading-none"
          style={{ display: "inline-block", transformOrigin: "center" }}
        >
          ›
        </span>
      </button>
      <div ref={bodyRef} style={{ display: "none", overflow: "hidden" }}>
        <p className="max-w-3xl pb-7 text-[14px] leading-[1.9] text-white/45">{answer}</p>
      </div>
    </div>
  );
}

export function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced()) return;
    const ctx = gsap.context(() => {
      const trigger = sectionRef.current;
      if (!trigger) return;

      gsap.from(labelRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.65,
        ease: "power2.out",
        scrollTrigger: { trigger, start: mobileStart(), once: true },
      });

      if (listRef.current) {
        const items = listRef.current.querySelectorAll("[data-faq-item]");
        gsap.from(Array.from(items), {
          opacity: 0,
          y: 18,
          duration: 0.55,
          stagger: 0.07,
          ease: "power2.out",
          scrollTrigger: { trigger, start: mobileStart("top 80%"), once: true },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="faq" className="section-pad bg-[#090706]">
      <div className="section-shell">
        <p ref={labelRef} className="section-label">FAQ</p>
        <div ref={listRef} className="border-t border-[#5a9a9b]/30">
          {faqs.map((faq) => (
            <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
