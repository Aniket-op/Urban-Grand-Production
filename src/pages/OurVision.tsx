import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import heroSlide1 from "@/assets/hero-slide-1.jpg";
import heroSlide2 from "@/assets/hero-slide-2.jpg";
import heroSlide3 from "@/assets/hero-slide-3.jpg";

const pillars = [
  {
    number: "01",
    title: "Craftsmanship First",
    body: "Every garment we create begins not with a trend, but with a question: does this outlast the season? We partner exclusively with master artisans who have spent decades honing their craft — from handwoven textiles in Rajasthan to precision-cut tailoring in Milan.",
  },
  {
    number: "02",
    title: "Future-Forward Design",
    body: "Our design studios operate at the intersection of heritage and innovation. We draw from centuries of fashion history while embracing cutting-edge materials science, 3D pattern engineering, and sustainable dyeing techniques to create garments that feel timeless yet utterly contemporary.",
  },
  {
    number: "03",
    title: "Radical Transparency",
    body: "We believe you deserve to know who made your clothes and how. Every AURA garment comes with a full supply chain trace — from raw fibre to finished product. We publish our factory audits annually and welcome press and public scrutiny.",
  },
  {
    number: "04",
    title: "Slow Fashion, Fast Culture",
    body: "We reject the 52-season fashion calendar. AURA releases two core collections per year, each designed to work across all seasons and years — not just the next three months. Buy less. Choose well. Make it last.",
  },
];

const images = [heroSlide1, heroSlide2, heroSlide3];

const OurVision = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col pt-20">
      <Navbar />

      {/* Full-screen cinematic hero */}
      <div className="relative h-[70vh] overflow-hidden">
        <img src={heroSlide2} alt="Vision" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
          <p className="text-xs uppercase tracking-[0.5em] opacity-60 mb-4">Our Philosophy</p>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold leading-tight max-w-3xl">
            Fashion with a <span className="italic font-normal">Purpose</span>
          </h1>
          <p className="mt-6 max-w-xl text-base opacity-70 leading-relaxed">
            We believe that the future of fashion is not faster — it is deeper. More considered. More connected to the hands that make it and the planet that sustains it.
          </p>
          <Link
            to="/contact"
            className="mt-10 px-10 py-4 rounded-full bg-white text-black text-xs font-bold tracking-[0.25em] uppercase hover:bg-white/90 transition-elegant"
          >
            Start Your Journey
          </Link>
        </div>
      </div>

      {/* Vision pillars */}
      <div className="max-w-5xl mx-auto w-full px-6 py-20">
        <p className="text-xs uppercase tracking-[0.4em] text-muted-soft font-semibold text-center mb-16">
          The Four Pillars of AURA
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {pillars.map((p) => (
            <div key={p.number} className="p-8 rounded-2xl subtle-border hover:subtle-border-strong bg-soft hover:bg-background transition-elegant">
              <span className="font-display text-5xl font-bold text-foreground/10 leading-none">{p.number}</span>
              <h3 className="font-display text-xl font-bold text-foreground mt-3 mb-3">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Image strip */}
      <div className="grid grid-cols-3 h-48 sm:h-64 overflow-hidden">
        {images.map((img, i) => (
          <div key={i} className="overflow-hidden">
            <img src={img} alt="" className="w-full h-full object-cover hover:scale-105 transition-all duration-700" />
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-zinc-950 text-zinc-50 text-center py-20 px-6">
        <h2 className="font-display text-4xl font-bold mb-4">Ready to Experience AURA?</h2>
        <p className="text-sm opacity-60 mb-8 max-w-md mx-auto">
          Reach out to our team for bulk orders, bespoke commissions, or simply to learn more about our collections.
        </p>
        <Link
          to="/contact"
          className="inline-block px-10 py-4 rounded-full bg-white text-black text-xs font-bold tracking-[0.25em] uppercase hover:opacity-90 transition-elegant"
        >
          Contact Us
        </Link>
      </div>

      <Footer />
    </div>
  );
};

export default OurVision;
