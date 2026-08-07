import Cursor from "@/components/system/Cursor";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Featured from "@/components/Featured";
import Works from "@/components/Works";
import Capabilities from "@/components/Capabilities";
import Statements from "@/components/Statements";
import Inquiry from "@/components/Inquiry";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Cursor />
      <Nav />
      <main>
        {/* White / night alternation drives the contrast rhythm */}
        <Hero />
        <Marquee />
        <Featured />
        <Works />
        <Capabilities />
        <Statements />
        <Inquiry />
      </main>
      <Footer />
    </>
  );
}
