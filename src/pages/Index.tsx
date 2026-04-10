import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhoWeAre from "@/components/WhoWeAre";
import CollectionSection from "@/components/CollectionSection";
import AssociatesSection from "@/components/AssociatesSection";
import OurCommitment from "@/components/OurCommitment";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">

      {/* Overlay Navbar — scroll-morph behavior only on homepage */}
      <Navbar />

      {/* Hero — full screen, starts behind navbar overlay */}
      <HeroSection />


      {/* Who We Are */}
      <WhoWeAre />

      {/* Zig-Zag Collection Section */}
      <CollectionSection />

      {/* Associates + Commitment */}
      <AssociatesSection />

      <OurCommitment />

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default Index;
