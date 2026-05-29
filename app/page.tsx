import { ApplicationForm } from "@/components/ApplicationForm";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Navbar } from "@/components/Navbar";
import { SocialProof } from "@/components/SocialProof";
import { UpcomingForums } from "@/components/UpcomingForums";
import { WhyGildExists } from "@/components/WhyGildExists";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <WhyGildExists />
        <HowItWorks />
        <UpcomingForums />
        <ApplicationForm />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
