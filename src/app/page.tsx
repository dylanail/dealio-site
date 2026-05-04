import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { WhyDealio } from "@/components/WhyDealio";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { AboutBlock, CTABand, Footer } from "@/components/Sections";

export default function Home() {
  return (
    <main style={{ maxWidth: 1280, margin: "0 auto", background: "#fff" }}>
      <Hero />
      <AboutBlock />
      <Services />
      <WhyDealio />
      <Pricing />
      <FAQ />
      <CTABand />
      <Footer />
    </main>
  );
}
