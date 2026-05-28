"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { trackFormSubmit } from "@/lib/analytics";
import { gsap, reduced } from "@/lib/gsap";

type FormState = {
  firstName: string;
  lastName: string;
  jobTitle: string;
  workEmail: string;
  company: string;
  linkedinUrl: string;
  community: string;
  challenge: string;
};

const initialState: FormState = {
  firstName: "",
  lastName: "",
  jobTitle: "",
  workEmail: "",
  company: "",
  linkedinUrl: "",
  community: "Engineering Leaders Forum",
  challenge: ""
};

const inputClass =
  "w-full rounded-none border border-[rgba(255,248,235,0.1)] bg-[#0c0a08] px-4 py-3 text-[13px] text-white/85 placeholder:text-white/25 focus:border-[rgba(181,148,90,0.45)] focus:outline focus:outline-2 focus:outline-[rgba(181,148,90,0.12)]";

export function ApplicationForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const update = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const response = await fetch("/api/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, source: "homepage_form" })
    });

    setIsSubmitting(false);

    if (response.ok) {
      trackFormSubmit(form.community);
      setSubmitted(true);
    }
  };

  useEffect(() => {
    if (reduced()) return;
    const ctx = gsap.context(() => {
      const trigger = sectionRef.current;
      if (!trigger) return;

      gsap.from(leftRef.current, {
        opacity: 0,
        y: 32,
        duration: 0.72,
        ease: "power2.out",
        scrollTrigger: { trigger, start: "top 80%", once: true },
      });

      gsap.from(rightRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.78,
        delay: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger, start: "top 80%", once: true },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="apply" className="section-pad bg-[#0d0b09]">
      <div className="section-shell">
        <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div ref={leftRef} className="max-w-xl">
            <p className="section-label">Apply</p>
            <h2 className="font-serif text-4xl leading-[1.1] tracking-[-0.015em] text-white md:text-5xl">
              Apply to the network.
            </h2>
            <p className="mt-6 text-[14px] leading-[1.9] text-white/50">
              We review every application personally. You&apos;ll hear back within two
              weeks.
            </p>
          </div>

          <div ref={rightRef} className="rounded-card border border-[rgba(255,248,235,0.07)] bg-[#0f0d0b] p-6 shadow-[0_4px_60px_rgba(0,0,0,0.4)] md:p-8">
            {submitted ? (
              <div className="flex min-h-[360px] flex-col justify-center">
                <h3 className="font-serif text-3xl leading-[1.2] text-white/90">
                  Thanks. We&apos;ll be in touch within two weeks.
                </h3>
                <p className="mt-6 text-[14px] leading-[1.9] text-white/50">
                  Our team will review your application and follow up personally if
                  there&apos;s a fit for the network.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="grid gap-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="text-[11px] font-medium uppercase tracking-[0.1em] text-white/45">
                    First Name
                    <input
                      className={`${inputClass} mt-2`}
                      required
                      value={form.firstName}
                      onChange={(event) => update("firstName", event.target.value)}
                    />
                  </label>
                  <label className="text-[11px] font-medium uppercase tracking-[0.1em] text-white/45">
                    Last Name
                    <input
                      className={`${inputClass} mt-2`}
                      required
                      value={form.lastName}
                      onChange={(event) => update("lastName", event.target.value)}
                    />
                  </label>
                </div>

                <label className="text-[11px] font-medium uppercase tracking-[0.1em] text-white/45">
                  Job Title
                  <input
                    className={`${inputClass} mt-2`}
                    required
                    value={form.jobTitle}
                    onChange={(event) => update("jobTitle", event.target.value)}
                  />
                </label>

                <label className="text-[11px] font-medium uppercase tracking-[0.1em] text-white/45">
                  Work Email
                  <input
                    className={`${inputClass} mt-2`}
                    required
                    type="email"
                    value={form.workEmail}
                    onChange={(event) => update("workEmail", event.target.value)}
                  />
                </label>

                <label className="text-[11px] font-medium uppercase tracking-[0.1em] text-white/45">
                  Company
                  <input
                    className={`${inputClass} mt-2`}
                    required
                    value={form.company}
                    onChange={(event) => update("company", event.target.value)}
                  />
                </label>

                <label className="text-[11px] font-medium uppercase tracking-[0.1em] text-white/45">
                  LinkedIn URL
                  <input
                    className={`${inputClass} mt-2`}
                    required
                    type="url"
                    value={form.linkedinUrl}
                    onChange={(event) => update("linkedinUrl", event.target.value)}
                  />
                </label>

                <label className="text-[11px] font-medium uppercase tracking-[0.1em] text-white/45">
                  Which community?
                  <select
                    className={`${inputClass} mt-2`}
                    required
                    value={form.community}
                    onChange={(event) => update("community", event.target.value)}
                  >
                    <option>Engineering Leaders Forum</option>
                    <option>Founder Community</option>
                  </select>
                </label>

                <label className="text-[11px] font-medium uppercase tracking-[0.1em] text-white/45">
                  What&apos;s your biggest leadership challenge right now?
                  <textarea
                    className={`${inputClass} mt-2 min-h-32 resize-y leading-[1.8]`}
                    required
                    rows={4}
                    value={form.challenge}
                    onChange={(event) => update("challenge", event.target.value)}
                  />
                </label>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-4 w-full bg-[#5a9a9b] px-8 py-4 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-[#4d8889] disabled:cursor-wait disabled:opacity-50 md:w-fit"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
