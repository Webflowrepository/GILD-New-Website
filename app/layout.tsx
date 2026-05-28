import type { Metadata } from "next";
import Script from "next/script";
import { DM_Serif_Display, Montserrat } from "next/font/google";
import "./globals.css";
import { ScrollBackground } from "@/components/ScrollBackground";
import { RequestInviteModal } from "@/components/RequestInviteModal";
import { MobileCtaBar } from "@/components/MobileCtaBar";
import { faqs } from "@/lib/faqs";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-montserrat"
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-dm-serif"
});

const title = "GILD — Invite-only Network for AI and Engineering Leaders";
const description =
  "GILD is a curated invite-only network for senior AI and engineering leaders. Small, off-the-record forums in Austin, Dallas, and Miami. Membership is free for qualifying leaders.";

export const metadata: Metadata = {
  metadataBase: new URL("https://gildhq.com"),
  title,
  description,
  openGraph: {
    title,
    description:
      "Curated network of senior AI and engineering leaders. Small forums, off-the-record conversations. Austin · Dallas · Miami.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title,
    description
  }
};

const faqEntities = faqs.slice(0, 6).map((faq) => ({
  "@type": "Question",
  name: faq.question,
  acceptedAnswer: {
    "@type": "Answer",
    text: faq.answer
  }
}));

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://gildhq.com/#organization",
      name: "GILD",
      url: "https://gildhq.com",
      description:
        "A curated invite-only network for senior AI and engineering leaders hosting small off-the-record forums in Austin, Dallas, and Miami.",
      foundingDate: "2025",
      sameAs: [
        "https://www.linkedin.com/company/joingild",
        "https://www.instagram.com/gild.hq"
      ]
    },
    {
      "@type": "WebPage",
      "@id": "https://gildhq.com/#webpage",
      url: "https://gildhq.com",
      name: title
    },
    {
      "@type": "FAQPage",
      mainEntity: faqEntities
    }
  ]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${dmSerif.variable}`}>
      <body className="font-sans">
        <ScrollBackground />
        <RequestInviteModal />
        <MobileCtaBar />
        <Script
          defer
          data-domain="gildhq.com"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
