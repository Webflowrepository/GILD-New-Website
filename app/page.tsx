import { Differentiator } from "@/components/Differentiator";
import { FAQ } from "@/components/FAQ";
import { FitNotFit } from "@/components/FitNotFit";
import { Footer } from "@/components/Footer";
import { GildPromise } from "@/components/GildPromise";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Navbar } from "@/components/Navbar";
import { SocialProof } from "@/components/SocialProof";
import { UpcomingForums } from "@/components/UpcomingForums";
import { WhatYouGet } from "@/components/WhatYouGet";
import { WhyGildExists } from "@/components/WhyGildExists";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <WhyGildExists />
        <Differentiator />
        <FitNotFit />
        <WhatYouGet />
        <HowItWorks />
        <UpcomingForums />
        <GildPromise />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
