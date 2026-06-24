import { SmoothScroll } from "@/lib/smooth-scroll";
import { Nav } from "@/components/nav";
import { AuthModals } from "@/components/auth-modals";
import { Footer } from "@/components/footer";
import { Loader } from "@/components/loader";
import { Cursor } from "@/components/cursor";
import { Hero } from "@/components/sections/hero";
import { SmartInvesting } from "@/components/sections/smart-investing";
import { LiveMarket } from "@/components/sections/live-market";
import { WhyChoose } from "@/components/sections/why-choose";
import { ContactSection } from "@/components/sections/contact";

export default function Index() {
  return (
    <>
      <Loader />
      <SmoothScroll />
      <Cursor />
      <Nav />
      <main className="relative">
        <Hero />
        <SmartInvesting />
        <LiveMarket />
        <WhyChoose />
        <ContactSection />
      </main>
      <Footer />
      <AuthModals />
    </>
  );
}
