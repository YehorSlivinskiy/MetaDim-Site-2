import Navigation from "@/components/sections/Navigation";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Stats from "@/components/sections/Stats";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import WhyMetaDim from "@/components/sections/WhyMetaDim";
import Testimonials from "@/components/sections/Testimonials";
import Faq from "@/components/sections/Faq";
import ContactCTA from "@/components/sections/ContactCTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Marquee />
        <Stats />
        <Services />
        <Portfolio />
        <WhyMetaDim />
        <Testimonials />
        <Faq />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
