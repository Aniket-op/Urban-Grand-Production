import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import heroSlide1 from "@/assets/hero-slide-1.jpg";
import heroSlide3 from "@/assets/hero-slide-3.jpg";

const milestones = [
  {
    year: "2008",
    title: "The Beginning",
    body: "AURA was founded in a small atelier in Mumbai by two designers who shared a single conviction: that premium fashion should never compromise on ethics. With a team of six artisans and one sewing machine, we created our first capsule collection of twelve pieces.",
  },
  {
    year: "2011",
    title: "Our First Brand — Terracotta Threads",
    body: "Inspired by the earthy pigments of India's artisan heartlands, Terracotta Threads became our first fully launched brand. The debut collection sold out in three days. We knew we had struck something deep.",
  },
  {
    year: "2014",
    title: "Aurora Launches",
    body: "Aurora was born from a desire to push boundaries. Where Terracotta Threads honours the past, Aurora reimagines the future — iridescent silks, architectural cuts, and textiles that catch and scatter light like a dawn sky.",
  },
  {
    year: "2017",
    title: "Golden Gauge Joins the Family",
    body: "Our most precision-driven brand, Golden Gauge, launched to celebrate the art of tailoring at its purest. Each piece is hand-finished and comes with a lifetime alteration guarantee — a statement of confidence in our craft.",
  },
  {
    year: "2020",
    title: "Going Carbon-Neutral by 2030",
    body: "Amid a global reckoning with climate, AURA made its most consequential commitment: full carbon neutrality across all brands and supply chains by 2030. We formed Golden Labs to lead our R&D into bio-based fabrics and closed-loop production.",
  },
  {
    year: "Today",
    title: "Growing With Purpose",
    body: "AURA now operates across three continents, employs over 2,000 people, and serves customers in 40 countries. But our soul remains unchanged — a small atelier in Mumbai, two designers, and an absolute refusal to compromise.",
  },
];

const OurStory = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col pt-20">
      <Navbar />

      {/* Hero */}
      <div className="relative h-[60vh] overflow-hidden">
        <img src={heroSlide1} alt="Our Story" className="w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/55 to-black/85" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
          <p className="text-xs uppercase tracking-[0.5em] opacity-60 mb-4">Since 2008</p>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold leading-tight">
            Our <span className="italic font-normal">Story</span>
          </h1>
          <p className="mt-5 max-w-lg text-sm opacity-70 leading-relaxed">
            From a single atelier in Mumbai to a global fashion group — this is the story of AURA, told through the people, moments, and decisions that shaped us.
          </p>
        </div>
      </div>

      {/* Pull quote */}
      <div className="bg-soft py-16 px-6 text-center subtle-border border-y">
        <blockquote className="font-display text-2xl sm:text-3xl font-light text-foreground max-w-3xl mx-auto leading-relaxed italic">
          "We did not start AURA to build a fashion company. We started it to prove that beauty and conscience are not opposites."
        </blockquote>
        <p className="mt-4 text-xs uppercase tracking-widest text-muted-soft">— Founders, AURA Fashion Group</p>
      </div>

      {/* Timeline */}
      <div className="max-w-4xl mx-auto w-full px-6 py-20">
        <p className="text-xs uppercase tracking-[0.4em] text-muted-soft font-semibold text-center mb-16">
          Our Journey
        </p>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-border/60 -translate-x-1/2" />

          <div className="space-y-16">
            {milestones.map((m, i) => (
              <div
                key={m.year}
                className={`relative flex flex-col sm:flex-row gap-6 sm:gap-12 items-start ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"}`}
              >
                {/* Content side */}
                <div className={`flex-1 pl-14 sm:pl-0 ${i % 2 === 0 ? "sm:text-right sm:pr-12" : "sm:pl-12"}`}>
                  <span className="font-display text-3xl font-bold text-foreground/15 block">{m.year}</span>
                  <h3 className="font-display text-lg font-bold text-foreground mt-1 mb-2">{m.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{m.body}</p>
                </div>

                {/* Dot on the line */}
                <div className="absolute left-6 sm:left-1/2 top-3 w-3 h-3 rounded-full bg-foreground -translate-x-1/2 shrink-0" />

                {/* Empty side (desktop) */}
                <div className="hidden sm:block flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Closing image + CTA */}
      <div className="relative h-80 overflow-hidden">
        <img src={heroSlide3} alt="AURA Craftsmanship" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white text-center px-6">
          <h2 className="font-display text-3xl font-bold mb-4">Be Part of the Next Chapter</h2>
          <div className="flex gap-4 flex-wrap justify-center">
            <Link
              to="/contact"
              className="px-8 py-3 rounded-full bg-white text-black text-xs font-bold tracking-[0.2em] uppercase hover:bg-white/90 transition-elegant"
            >
              Get in Touch
            </Link>
            <Link
              to="/vision"
              className="px-8 py-3 rounded-full border border-white/50 text-white text-xs font-bold tracking-[0.2em] uppercase hover:bg-white/10 transition-elegant"
            >
              Our Vision
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OurStory;
