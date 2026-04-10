import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnquiryForm from "@/components/EnquiryForm";
import { ChevronLeft, ChevronRight } from "lucide-react";

import men1 from "@/assets/men/coats1.png";
import men2 from "@/assets/men/hoodies_1.png";
import men3 from "@/assets/men/jacket_1.png";
import men4 from "@/assets/men/sweatshirts_1.png";

import women1 from "@/assets/women/coat1.png";
import women2 from "@/assets/women/jacket_1.png";
import women3 from "@/assets/women/jacket_2.png";
import women4 from "@/assets/women/sweatshirts_1.png";

import kids1 from "@/assets/kids/coat1.png";
import kids2 from "@/assets/kids/hoodies1.png";
import kids3 from "@/assets/kids/hoodies2.png";
import kids4 from "@/assets/kids/jacket_1.png";

const menSlides = [
  { image: men1, label: "Men's Collection", sub: "Coats" },
  { image: men2, label: "Men's Collection", sub: "Hoodies & Sweatshirts" },
  { image: men3, label: "Men's Collection", sub: "Jackets" },
  { image: men4, label: "Men's Collection", sub: "Modern Wear" },
];

const womenSlides = [
  { image: women1, label: "Women's Collection", sub: "Coats" },
  { image: women2, label: "Women's Collection", sub: "Jackets" },
  { image: women3, label: "Women's Collection", sub: "Elegant Jackets" },
  { image: women4, label: "Women's Collection", sub: "Sweatshirts" },
];

const kidsSlides = [
  { image: kids1, label: "Kids Collection", sub: "Coats" },
  { image: kids2, label: "Kids Collection", sub: "Hoodies" },
  { image: kids3, label: "Kids Collection", sub: "Playful Hoodies" },
  { image: kids4, label: "Kids Collection", sub: "Jackets" },
];

const defaultSlides = [
  { image: men4, label: "Men's Collection", sub: "Classic & Modern Wear" },
  { image: women3, label: "Women's Collection", sub: "Elegant & Comfortable" },
  { image: kids3, label: "Kids Collection", sub: "Playful & Cozy Everyday" },
];

const Contact = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  let activeSlides = defaultSlides;
  if (category === "men") activeSlides = menSlides;
  else if (category === "women") activeSlides = womenSlides;
  else if (category === "kids") activeSlides = kidsSlides;

  const [current, setCurrent] = useState(0);

  // Reset slide index if category changes
  useEffect(() => {
    setCurrent(0);
  }, [category]);

  // Auto-advance slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % activeSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [activeSlides.length, category]);

  const prev = () => setCurrent((c) => (c === 0 ? activeSlides.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c + 1) % activeSlides.length);

  return (
    <div className="min-h-screen bg-background flex flex-col pt-20">
      <Navbar />

      {/* Main split layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2">

        {/* ── Left: Image Slideshow ── */}
        <div className="relative hidden lg:block overflow-hidden bg-[hsl(220,25%,12%)]">
          {/* Slides */}
          {activeSlides.map((slide, i) => (
            <div
              key={i}
              className="absolute inset-0 transition-opacity duration-700"
              style={{ opacity: i === current ? 1 : 0 }}
            >
              <img
                src={slide.image}
                alt={slide.label}
                className="w-full h-full object-cover"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            </div>
          ))}

          {/* Slide caption */}
          <div className="absolute bottom-16 left-10 right-10 text-white z-10">
            <p className="text-xs uppercase tracking-[0.35em] opacity-60 mb-1">
              {activeSlides[current]?.sub}
            </p>
            <p className="font-display text-3xl font-bold">{activeSlides[current]?.label}</p>
          </div>

          {/* Prev / Next arrows */}
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-md bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/25 transition-elegant"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-md bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/25 transition-elegant"
          >
            <ChevronRight size={18} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {activeSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-[3px] rounded-full transition-all transition-elegant ${i === current ? "bg-white w-8" : "bg-white/40 w-3"}`}
              />
            ))}
          </div>
        </div>

        {/* ── Right: Enquiry Form ── */}
        <div className="relative overflow-y-auto py-10 lg:py-0 flex flex-col justify-center bg-background pt-16 lg:pt-20">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-[hsl(38,60%,50%,0.05)] pointer-events-none" />
          <div className="relative z-10 w-full max-w-2xl mx-auto">
            <EnquiryForm />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
