import LandingNavbar from "../components/landing/LandingNavbar";
import Hero from "../components/landing/Hero";
import Benefits from "../components/landing/Benefits";
import Trainers from "../components/landing/Trainers";
import Testimonials from "../components/landing/Testimonials";
import Plans from "../components/landing/Plans";
import DemoAccess from "../components/landing/DemoAccess";
import { FinalCTA, Footer } from "../components/landing/CTAFooter";

export default function Landing() {
  return (
    <div className="min-h-screen bg-base">
      <LandingNavbar />
      <Hero />
      <Benefits />
      <Trainers />
      <Plans />
      <Testimonials />
      <DemoAccess />
      <FinalCTA />
      <Footer />
    </div>
  );
}
