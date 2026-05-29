import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The AI Builder Brief — GILD Newsletter",
  description:
    "Insights, trends, and real conversations from the GILD network — delivered to senior AI and engineering leaders building what's next. Subscribe free.",
  openGraph: {
    title: "The AI Builder Brief — GILD Newsletter",
    description:
      "Insights, trends, and real conversations from the GILD network — delivered to senior AI and engineering leaders building what's next.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The AI Builder Brief — GILD Newsletter",
    description:
      "Insights, trends, and real conversations from the GILD network — delivered to senior AI and engineering leaders.",
  },
};

export default function NewsletterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
