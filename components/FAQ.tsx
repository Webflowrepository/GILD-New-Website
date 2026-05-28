import { faqs } from "@/lib/faqs";

export function FAQ() {
  return (
    <section id="faq" className="section-pad bg-slate-900">
      <div className="section-shell">
        <p className="section-label">FAQ</p>
        <div>
          {faqs.map((faq) => (
            <details key={faq.question} className="group border-b border-slate-700">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-serif text-lg text-white">
                <span>{faq.question}</span>
                <span className="text-slate-300 transition-transform duration-200 group-open:rotate-90">
                  ›
                </span>
              </summary>
              <p className="max-w-3xl pb-6 text-base leading-7 text-slate-100">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
