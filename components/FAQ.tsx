import { faqs } from "@/lib/faqs";

export function FAQ() {
  return (
    <section id="faq" className="section-pad bg-[#090706]">
      <div className="section-shell">
        <p className="section-label">FAQ</p>
        <div>
          {faqs.map((faq) => (
            <details key={faq.question} className="group border-b border-[rgba(255,248,235,0.07)]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-7 font-serif text-lg leading-[1.4] text-white/85 transition-colors duration-300 group-open:text-white">
                <span>{faq.question}</span>
                <span className="shrink-0 text-white/25 transition-transform duration-400 group-open:rotate-90">
                  ›
                </span>
              </summary>
              <p className="max-w-3xl pb-8 text-[14px] leading-[1.9] text-white/45">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
