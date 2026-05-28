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
  "w-full border border-slate-300 bg-white px-4 py-4 text-sm text-slate-900 placeholder:text-slate-700 focus:border-teal-500 focus:outline focus:outline-2 focus:outline-teal-400/30";

const textAreaClass =
  "mt-3 w-full border border-slate-300 bg-white px-4 py-4 text-sm leading-6 text-slate-900 placeholder:text-slate-700 focus:border-teal-500 focus:outline focus:outline-2 focus:outline-teal-400/30";

function openModalEventName() {
  return "gild:open-request-invite";
}

export function openRequestInviteModal() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event(openModalEventName()));
}

export function RequestInviteModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<FormState>(initialState);

  useEffect(() => {
    const open = () => {
      setIsOpen(true);
      setStep(1);
    };

    window.addEventListener(openModalEventName(), open);
    return () => window.removeEventListener(openModalEventName(), open);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const close = () => {
    setIsOpen(false);
    setStep(1);
  };

  const update = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const toggleArrayValue = (field: "cities" | "engagement", value: string) => {
    setForm((current) => {
      const values = current[field];
      return {
        ...current,
        [field]: values.includes(value)
          ? values.filter((item) => item !== value)
          : [...values, value]
      };
    });
  };

  const continueToStepTwo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStep(2);
  };

  const submitApplication = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const response = await fetch("/api/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, source: "request_invite_modal" })
    });

    setIsSubmitting(false);

    if (response.ok) {
      trackFormSubmit("request_invite_modal");
      setStep(3);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/70 px-2 py-2 md:px-6 md:py-6">
      <div className="mx-auto flex h-full max-w-5xl flex-col overflow-hidden border border-slate-700 bg-[#d5dde2] shadow-2xl">
        <div className="relative flex h-16 shrink-0 items-center justify-center bg-slate-800">
          <div className="relative h-10 w-32">
            <Image
              src="/images/logo%20gild.png"
              alt="GILD"
              fill
              sizes="128px"
              className="object-contain"
            />
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close request invite form"
            className="absolute right-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center bg-slate-900 text-2xl leading-none text-white hover:bg-slate-700"
          >
            x
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-8 md:px-10">
          {step === 1 ? (
            <form onSubmit={continueToStepTwo} className="space-y-8">
              <div className="grid gap-8 md:grid-cols-2">
                <input
                  className={fieldClass}
                  required
                  placeholder="First Name*"
                  value={form.firstName}
                  onChange={(event) => update("firstName", event.target.value)}
                />
                <input
                  className={fieldClass}
                  required
                  placeholder="Last Name*"
                  value={form.lastName}
                  onChange={(event) => update("lastName", event.target.value)}
                />
              </div>
              <input
                className={fieldClass}
                required
                type="email"
                placeholder="Work Email*"
                value={form.workEmail}
                onChange={(event) => update("workEmail", event.target.value)}
              />
              <input
                className={fieldClass}
                type="url"
                placeholder="LinkedIn Profile URL"
                value={form.linkedinUrl}
                onChange={(event) => update("linkedinUrl", event.target.value)}
              />
              <input
                className={fieldClass}
                required
                placeholder="Job Title*"
                value={form.jobTitle}
                onChange={(event) => update("jobTitle", event.target.value)}
              />
              <input
                className={fieldClass}
                required
                placeholder="Company *"
                value={form.company}
                onChange={(event) => update("company", event.target.value)}
              />

              <fieldset>
                <legend className="mb-2 text-xs text-slate-900">
                  What Cities are you interested in?
                </legend>
                <div className="grid gap-3 border border-slate-300 bg-white px-5 py-4 text-sm text-slate-900 md:grid-cols-3">
                  {["Austin", "Dallas", "Miami"].map((city) => (
                    <label key={city} className="flex items-center justify-center gap-3">
                      <input
                        type="checkbox"
                        checked={form.cities.includes(city)}
                        onChange={() => toggleArrayValue("cities", city)}
                      />
                      {city}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="grid gap-8 md:grid-cols-2">
                <input
                  className={fieldClass}
                  required
                  placeholder="Location *"
                  value={form.location}
                  onChange={(event) => update("location", event.target.value)}
                />
                <label className="block">
                  <span className="mb-2 block text-xs text-slate-900">
                    What best describes your company? *
                  </span>
                  <select
                    className={fieldClass}
                    required
                    value={form.companyType}
                    onChange={(event) => update("companyType", event.target.value)}
                  >
                    <option value="">Please select one...</option>
                    <option value="Enterprise">Enterprise</option>
                    <option value="B2B Tech Company">B2B Tech Company</option>
                    <option value="AI Native Startup">AI Native Startup</option>
                    <option value="Consulting / Advisory">Consulting / Advisory</option>
                    <option value="Other">Other</option>
                  </select>
                </label>
              </div>

              <fieldset>
                <legend className="mb-2 text-xs text-slate-900">
                  How would you like to engage? *
                </legend>
                <div className="grid gap-3 border border-slate-300 bg-white px-5 py-4 text-sm text-slate-900 md:grid-cols-4">
                  {["Attend events", "Explore sponsorship", "Speak/host", "Just follow along"].map(
                    (item) => (
                      <label key={item} className="flex items-center justify-center gap-3">
                        <input
                          type="checkbox"
                          checked={form.engagement.includes(item)}
                          onChange={() => toggleArrayValue("engagement", item)}
                        />
                        {item}
                      </label>
                    )
                  )}
                </div>
              </fieldset>

              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="bg-teal-500 px-12 py-4 text-base font-semibold text-white transition-colors hover:bg-teal-400"
                >
                  Continue
                </button>
              </div>
            </form>
          ) : null}

          {step === 2 ? (
            <form onSubmit={submitApplication} className="mx-auto max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-teal-500">
                Step 2
              </p>
              <h2 className="mt-3 text-4xl text-slate-900">Tell us a bit more</h2>
              <div className="mt-8 space-y-8">
                <label className="block text-sm font-semibold text-slate-900">
                  9. What are you working on with AI right now?
                  <p className="mt-2 text-xs font-normal leading-5 text-slate-700">
                    A sentence or two about your role, your company&apos;s AI work, and what
                    you&apos;re navigating.
                  </p>
                  <textarea
                    className={textAreaClass}
                    required
                    rows={4}
                    value={form.aiWork}
                    onChange={(event) => update("aiWork", event.target.value)}
                  />
                </label>

                <label className="block text-sm font-semibold text-slate-900">
                  10. What&apos;s the most pressing challenge on your plate right now?
                  <p className="mt-2 text-xs font-normal leading-5 text-slate-700">
                    Be specific. The more we understand, the more useful the network
                    becomes for you.
                  </p>
                  <textarea
                    className={textAreaClass}
                    required
                    rows={4}
                    value={form.pressingChallenge}
                    onChange={(event) => update("pressingChallenge", event.target.value)}
                  />
                </label>

                <label className="block text-sm font-semibold text-slate-900">
                  11. What do you want from the network?
                  <p className="mt-2 text-xs font-normal leading-5 text-slate-700">
                    Peers solving similar problems, senior leaders who&apos;ve scaled where
                    you&apos;re scaling, hiring help, advisors, or just access to the events.
                    Tell us what would actually help.
                  </p>
                  <textarea
                    className={textAreaClass}
                    required
                    rows={4}
                    value={form.networkGoals}
                    onChange={(event) => update("networkGoals", event.target.value)}
                  />
                </label>

                <label className="block text-sm font-semibold text-slate-900">
                  12. What can you offer other members of the network?
                  <p className="mt-2 text-xs font-normal leading-5 text-slate-700">
                    Expertise, experience, advisory or fractional work, hiring referrals,
                    anything you&apos;d be open to sharing with peers.
                  </p>
                  <textarea
                    className={textAreaClass}
                    required
                    rows={4}
                    value={form.memberContribution}
                    onChange={(event) => update("memberContribution", event.target.value)}
                  />
                </label>
              </div>

              <div className="mt-10 flex flex-col items-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-teal-500 px-12 py-4 text-base font-semibold text-white transition-colors hover:bg-teal-400 disabled:cursor-wait disabled:opacity-70"
                >
                  {isSubmitting ? "Submitting..." : "Join Now"}
                </button>
                <p className="mt-4 text-xs text-slate-700">
                  For senior leaders only. We don&apos;t spam.
                </p>
              </div>
            </form>
          ) : null}

          {step === 3 ? (
            <div className="mx-auto flex min-h-[520px] max-w-3xl flex-col items-center justify-center text-center">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-teal-500">
                Step 3
              </p>
              <h2 className="mt-4 text-5xl leading-tight text-slate-900">
                Thanks for applying to GILD.
              </h2>
              <p className="mt-6 text-base leading-7 text-slate-800">
                We review every application personally. You&apos;ll hear from us within two
                weeks.
              </p>
              <p className="mt-4 text-base leading-7 text-slate-800">
                If you&apos;re a fit, we&apos;ll send you a personal welcome from our team with
                details on your next event and a link to join the GILD community.
              </p>
              <p className="mt-4 text-base leading-7 text-slate-800">
                In the meantime, follow us on LinkedIn to see what the network is up to.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://www.linkedin.com/company/joingild/about/"
                  target="_blank"
                  rel="noreferrer"
                  className="border border-slate-900 px-6 py-3 text-sm font-medium text-slate-900 transition-colors hover:border-teal-500 hover:text-teal-500"
                >
                  Follow GILD on LinkedIn
                </a>
                <button
                  type="button"
                  onClick={close}
                  className="border border-slate-900 px-6 py-3 text-sm font-medium text-slate-900 transition-colors hover:border-teal-500 hover:text-teal-500"
                >
                  Close
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
