"use client";

import { FormEvent, useState } from "react";
import { trackFormSubmit } from "@/lib/analytics";

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
  "w-full rounded-lg border border-slate-700 bg-[#05080c] px-4 py-3 text-white placeholder:text-slate-300 focus:border-teal-400 focus:outline focus:outline-2 focus:outline-teal-400/30";

export function ApplicationForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

  return (
    <section id="apply" className="section-pad bg-slate-900">
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="max-w-xl">
            <p className="section-label">Apply</p>
            <h2 className="text-4xl leading-tight text-white md:text-5xl">
              Apply to the network.
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-100">
              We review every application personally. You&apos;ll hear back within two
              weeks.
            </p>
          </div>

          <div className="rounded-card border border-[#17212c] bg-[#020406] p-6 shadow-[0_22px_70px_rgba(0,0,0,0.3)] md:p-8">
            {submitted ? (
              <div className="flex min-h-[360px] flex-col justify-center">
                <h3 className="text-3xl leading-tight text-white">
                  Thanks. We&apos;ll be in touch within two weeks.
                </h3>
                <p className="mt-5 text-base leading-7 text-slate-100">
                  Our team will review your application and follow up personally if
                  there&apos;s a fit for the network.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="grid gap-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="text-sm font-medium text-white">
                    First Name
                    <input
                      className={`${inputClass} mt-2`}
                      required
                      value={form.firstName}
                      onChange={(event) => update("firstName", event.target.value)}
                    />
                  </label>
                  <label className="text-sm font-medium text-white">
                    Last Name
                    <input
                      className={`${inputClass} mt-2`}
                      required
                      value={form.lastName}
                      onChange={(event) => update("lastName", event.target.value)}
                    />
                  </label>
                </div>

                <label className="text-sm font-medium text-white">
                  Job Title
                  <input
                    className={`${inputClass} mt-2`}
                    required
                    value={form.jobTitle}
                    onChange={(event) => update("jobTitle", event.target.value)}
                  />
                </label>

                <label className="text-sm font-medium text-white">
                  Work Email
                  <input
                    className={`${inputClass} mt-2`}
                    required
                    type="email"
                    value={form.workEmail}
                    onChange={(event) => update("workEmail", event.target.value)}
                  />
                </label>

                <label className="text-sm font-medium text-white">
                  Company
                  <input
                    className={`${inputClass} mt-2`}
                    required
                    value={form.company}
                    onChange={(event) => update("company", event.target.value)}
                  />
                </label>

                <label className="text-sm font-medium text-white">
                  LinkedIn URL
                  <input
                    className={`${inputClass} mt-2`}
                    required
                    type="url"
                    value={form.linkedinUrl}
                    onChange={(event) => update("linkedinUrl", event.target.value)}
                  />
                </label>

                <label className="text-sm font-medium text-white">
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

                <label className="text-sm font-medium text-white">
                  What&apos;s your biggest leadership challenge right now?
                  <textarea
                    className={`${inputClass} mt-2 min-h-32 resize-y leading-6`}
                    required
                    rows={4}
                    value={form.challenge}
                    onChange={(event) => update("challenge", event.target.value)}
                  />
                </label>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-3 w-full rounded-full bg-teal-500 px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-teal-400 disabled:cursor-wait disabled:opacity-70 md:w-fit"
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
