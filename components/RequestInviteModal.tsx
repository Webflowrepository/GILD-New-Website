"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { trackFormSubmit } from "@/lib/analytics";

type Step = 1 | 2 | 3;

type FormState = {
  firstName: string;
  lastName: string;
  workEmail: string;
  linkedinUrl: string;
  jobTitle: string;
  company: string;
  cities: string[];
  location: string;
  companyType: string;
  engagement: string[];
  aiWork: string;
  pressingChallenge: string;
  networkGoals: string;
  memberContribution: string;
};

const initialState: FormState = {
  firstName: "",
  lastName: "",
  workEmail: "",
  linkedinUrl: "",
  jobTitle: "",
  company: "",
  cities: [],
  location: "",
  companyType: "",
  engagement: [],
  aiWork: "",
  pressingChallenge: "",
  networkGoals: "",
  memberContribution: ""
};

const fieldClass =
  "w-full border border-[rgba(255,248,235,0.10)] bg-[#0f0d0b] px-4 py-3.5 text-[13px] text-white/80 placeholder:text-white/28 focus:border-[#5a9a9b] focus:outline-none transition-colors duration-200";

const textAreaClass =
  "mt-3 w-full border border-[rgba(255,248,235,0.10)] bg-[#0f0d0b] px-4 py-3.5 text-[13px] leading-6 text-white/80 placeholder:text-white/28 focus:border-[#5a9a9b] focus:outline-none transition-colors duration-200 resize-none";

const legendClass = "mb-3 text-[10px] font-medium uppercase tracking-[0.24em] text-white/38";

function openModalEventName() {
  return "gild:open-request-invite";
}

export function openRequestInviteModal() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(openModalEventName()));
}

export function RequestInviteModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<FormState>(initialState);

  useEffect(() => {
    const open = () => { setIsOpen(true); setStep(1); };
    window.addEventListener(openModalEventName(), open);
    return () => window.removeEventListener(openModalEventName(), open);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = originalOverflow; };
  }, [isOpen]);

  if (!isOpen) return null;

  const close = () => { setIsOpen(false); setStep(1); };

  const update = (field: keyof FormState, value: string) =>
    setForm((c) => ({ ...c, [field]: value }));

  const toggleArrayValue = (field: "cities" | "engagement", value: string) =>
    setForm((c) => ({
      ...c,
      [field]: c[field].includes(value)
        ? c[field].filter((i) => i !== value)
        : [...c[field], value]
    }));

  const continueToStepTwo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStep(2);
  };

  const submitApplication = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const response = await fetch("/api/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, source: "request_invite_modal" })
    });
    setIsSubmitting(false);
    if (response.ok) { trackFormSubmit("request_invite_modal"); setStep(3); }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/82 px-2 py-2 md:px-6 md:py-6">
      <div className="mx-auto flex h-full max-w-5xl flex-col overflow-hidden border border-[rgba(255,248,235,0.08)] bg-[#0c0a08] shadow-[0_32px_80px_rgba(0,0,0,0.7)]">

        {/* Header */}
        <div className="relative flex h-[60px] shrink-0 items-center justify-between border-b border-[rgba(255,248,235,0.07)] bg-[#080604] px-6">
          <div className="relative h-7 w-20">
            <Image
              src="/images/logo%20gild.png"
              alt="GILD"
              fill
              sizes="80px"
              className="object-contain object-left"
            />
          </div>

          {step < 3 && (
            <p className="absolute left-1/2 -translate-x-1/2 text-[10px] font-medium uppercase tracking-[0.28em] text-white/30">
              Step {step} of 2
            </p>
          )}

          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center text-white/35 transition-colors duration-200 hover:text-white/75"
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M1 1L12 12M12 1L1 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Progress bar */}
        {step < 3 && (
          <div className="h-[2px] shrink-0 bg-[rgba(255,248,235,0.04)]">
            <div
              className="h-full bg-[#5a9a9b] transition-all duration-500 ease-out"
              style={{ width: step === 1 ? "50%" : "100%" }}
            />
          </div>
        )}

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-5 py-8 md:px-10 md:py-10">

          {/* ── STEP 1 ── */}
          {step === 1 && (
            <form onSubmit={continueToStepTwo} className="mx-auto max-w-3xl space-y-6">
              <div className="mb-8">
                <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#5a9a9b]">
                  Your details
                </p>
                <h2 className="mt-3 font-serif text-[26px] leading-[1.2] text-white/90 md:text-[32px]">
                  Apply to join GILD.
                </h2>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <input
                  className={fieldClass}
                  required
                  placeholder="First Name*"
                  value={form.firstName}
                  onChange={(e) => update("firstName", e.target.value)}
                />
                <input
                  className={fieldClass}
                  required
                  placeholder="Last Name*"
                  value={form.lastName}
                  onChange={(e) => update("lastName", e.target.value)}
                />
              </div>

              <input
                className={fieldClass}
                required
                type="email"
                placeholder="Work Email*"
                value={form.workEmail}
                onChange={(e) => update("workEmail", e.target.value)}
              />
              <input
                className={fieldClass}
                type="url"
                placeholder="LinkedIn Profile URL"
                value={form.linkedinUrl}
                onChange={(e) => update("linkedinUrl", e.target.value)}
              />

              <div className="grid gap-5 md:grid-cols-2">
                <input
                  className={fieldClass}
                  required
                  placeholder="Job Title*"
                  value={form.jobTitle}
                  onChange={(e) => update("jobTitle", e.target.value)}
                />
                <input
                  className={fieldClass}
                  required
                  placeholder="Company*"
                  value={form.company}
                  onChange={(e) => update("company", e.target.value)}
                />
              </div>

              <fieldset>
                <legend className={legendClass}>Cities you&apos;re interested in</legend>
                <div className="grid gap-3 border border-[rgba(255,248,235,0.08)] bg-[#0f0d0b] px-5 py-4 md:grid-cols-3">
                  {["Austin", "Dallas", "Miami"].map((city) => (
                    <label key={city} className="flex cursor-pointer items-center gap-3 text-[13px] text-white/65 hover:text-white/85 transition-colors duration-150">
                      <input
                        type="checkbox"
                        checked={form.cities.includes(city)}
                        onChange={() => toggleArrayValue("cities", city)}
                        className="accent-[#5a9a9b]"
                      />
                      {city}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="grid gap-5 md:grid-cols-2">
                <input
                  className={fieldClass}
                  required
                  placeholder="Location (City, State)*"
                  value={form.location}
                  onChange={(e) => update("location", e.target.value)}
                />
                <label className="block">
                  <span className={legendClass}>Company type *</span>
                  <select
                    className={`${fieldClass} appearance-none`}
                    required
                    value={form.companyType}
                    onChange={(e) => update("companyType", e.target.value)}
                  >
                    <option value="" className="bg-[#0f0d0b]">Select one…</option>
                    <option value="Enterprise" className="bg-[#0f0d0b]">Enterprise</option>
                    <option value="B2B Tech Company" className="bg-[#0f0d0b]">B2B Tech Company</option>
                    <option value="AI Native Startup" className="bg-[#0f0d0b]">AI Native Startup</option>
                    <option value="Consulting / Advisory" className="bg-[#0f0d0b]">Consulting / Advisory</option>
                    <option value="Other" className="bg-[#0f0d0b]">Other</option>
                  </select>
                </label>
              </div>

              <fieldset>
                <legend className={legendClass}>How would you like to engage? *</legend>
                <div className="grid gap-3 border border-[rgba(255,248,235,0.08)] bg-[#0f0d0b] px-5 py-4 sm:grid-cols-2 md:grid-cols-4">
                  {["Attend events", "Explore sponsorship", "Speak / host", "Just follow along"].map((item) => (
                    <label key={item} className="flex cursor-pointer items-center gap-3 text-[13px] text-white/65 hover:text-white/85 transition-colors duration-150">
                      <input
                        type="checkbox"
                        checked={form.engagement.includes(item)}
                        onChange={() => toggleArrayValue("engagement", item)}
                        className="accent-[#5a9a9b]"
                      />
                      {item}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="flex justify-start pt-3">
                <button
                  type="submit"
                  className="bg-[#5a9a9b] px-10 py-3.5 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-[#4d8889]"
                >
                  Continue →
                </button>
              </div>
            </form>
          )}

          {/* ── STEP 2 ── */}
          {step === 2 && (
            <form onSubmit={submitApplication} className="mx-auto max-w-3xl">
              <div className="mb-8">
                <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#5a9a9b]">
                  A bit more
                </p>
                <h2 className="mt-3 font-serif text-[26px] leading-[1.2] text-white/90 md:text-[32px]">
                  Tell us what you&apos;re navigating.
                </h2>
              </div>

              <div className="space-y-8">
                <label className="block">
                  <span className="font-serif text-[15px] leading-snug text-white/80">
                    What are you working on with AI right now?
                  </span>
                  <p className="mt-1.5 text-[12px] leading-[1.7] text-white/35">
                    A sentence or two about your role, your company&apos;s AI work, and what you&apos;re navigating.
                  </p>
                  <textarea
                    className={textAreaClass}
                    required
                    rows={4}
                    value={form.aiWork}
                    onChange={(e) => update("aiWork", e.target.value)}
                  />
                </label>

                <label className="block">
                  <span className="font-serif text-[15px] leading-snug text-white/80">
                    What&apos;s the most pressing challenge on your plate right now?
                  </span>
                  <p className="mt-1.5 text-[12px] leading-[1.7] text-white/35">
                    Be specific. The more we understand, the more useful the network becomes for you.
                  </p>
                  <textarea
                    className={textAreaClass}
                    required
                    rows={4}
                    value={form.pressingChallenge}
                    onChange={(e) => update("pressingChallenge", e.target.value)}
                  />
                </label>

                <label className="block">
                  <span className="font-serif text-[15px] leading-snug text-white/80">
                    What do you want from the network?
                  </span>
                  <p className="mt-1.5 text-[12px] leading-[1.7] text-white/35">
                    Peers solving similar problems, senior leaders who&apos;ve scaled where you&apos;re scaling, hiring help, advisors — tell us what would actually help.
                  </p>
                  <textarea
                    className={textAreaClass}
                    required
                    rows={4}
                    value={form.networkGoals}
                    onChange={(e) => update("networkGoals", e.target.value)}
                  />
                </label>

                <label className="block">
                  <span className="font-serif text-[15px] leading-snug text-white/80">
                    What can you offer other members?
                  </span>
                  <p className="mt-1.5 text-[12px] leading-[1.7] text-white/35">
                    Expertise, experience, advisory or fractional work, hiring referrals — anything you&apos;d be open to sharing with peers.
                  </p>
                  <textarea
                    className={textAreaClass}
                    required
                    rows={4}
                    value={form.memberContribution}
                    onChange={(e) => update("memberContribution", e.target.value)}
                  />
                </label>
              </div>

              <div className="mt-10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/30 transition-colors duration-200 hover:text-white/60"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#5a9a9b] px-10 py-3.5 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-[#4d8889] disabled:cursor-wait disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting…" : "Submit Application"}
                </button>
              </div>
              <p className="mt-5 text-center text-[11px] text-white/25">
                Senior leaders only. We don&apos;t spam.
              </p>
            </form>
          )}

          {/* ── STEP 3 — Confirmation ── */}
          {step === 3 && (
            <div className="mx-auto flex min-h-[520px] max-w-2xl flex-col items-center justify-center text-center">
              <div className="mb-7 text-[#5a9a9b]">
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                  <circle cx="22" cy="22" r="21" stroke="currentColor" strokeWidth="1" />
                  <path d="M13 22l7 7 11-14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#5a9a9b]">
                Application received
              </p>
              <h2 className="mt-5 font-serif text-[32px] leading-[1.15] text-white/90 md:text-[40px]">
                Thanks for applying to GILD.
              </h2>
              <p className="mt-6 max-w-md text-[14px] leading-[1.9] text-white/48">
                We review every application personally. You&apos;ll hear from us within two weeks.
              </p>
              <p className="mt-4 max-w-md text-[13px] leading-[1.85] text-white/35">
                If you&apos;re a fit, we&apos;ll send a personal welcome with details on your first event and a link to join the community.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://www.linkedin.com/company/joingild/about/"
                  target="_blank"
                  rel="noreferrer"
                  className="border border-[rgba(255,248,235,0.18)] px-7 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-white/50 transition-colors duration-300 hover:border-[rgba(255,248,235,0.4)] hover:text-white/80"
                >
                  Follow GILD on LinkedIn
                </a>
                <button
                  type="button"
                  onClick={close}
                  className="border border-[rgba(255,248,235,0.18)] px-7 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-white/50 transition-colors duration-300 hover:border-[rgba(255,248,235,0.4)] hover:text-white/80"
                >
                  Close
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
