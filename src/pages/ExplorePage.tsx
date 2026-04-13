import { useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ExploreSection from "@/components/explore/ExploreSection";
import ImageLightbox from "@/components/ImageLightbox";
import { useEnquiryLightbox } from "@/hooks/useEnquiryLightbox";
import { collections, getCollectionSlides, genderMetadata } from "@/data/ourCollection";

// Hero background images (one per gender)
import menHero from "@/assets/men/homePage.jpg";
import womenHero from "@/assets/women/homePage.jpg";
import kidsHero from "@/assets/kids/homepage.jpg";

const heroImages: Record<string, string> = {
  men: menHero,
  women: womenHero,
  kids: kidsHero,
};

// Gradient overlays per gender (luxury dark tones)
const heroGradients: Record<string, string> = {
  men: "from-[hsl(220,30%,6%)]/70 via-[hsl(220,25%,10%)]/50 to-transparent",
  women: "from-[hsl(340,20%,6%)]/70 via-[hsl(340,15%,12%)]/50 to-transparent",
  kids: "from-[hsl(38,25%,6%)]/70 via-[hsl(38,20%,10%)]/50 to-transparent",
};

const genderOrder = ["men", "women", "kids"];

const ExplorePage = () => {
  const { gender } = useParams<{ gender: string }>();

  // Scroll to top on gender change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [gender]);

  const genderData = gender ? genderMetadata[gender] : null;

  if (!gender || !genderData) {
    return <Navigate to="/explore/men" replace />;
  }

  const { products, lightboxIndex, openLightbox, closeLightbox, setLightboxIndex } =
    useEnquiryLightbox();

  const categorySlides = getCollectionSlides(gender);
  const others = genderOrder.filter((g) => g !== gender);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* ── Hero Banner ──────────────────────────────────────────────── */}
      <div className="relative w-full h-[42vh] md:h-[42vh] overflow-hidden !text-center">
        {/* Background image */}
        <AnimatePresence mode="wait">
          <motion.img
            key={gender}
            src={heroImages[gender]}
            alt={genderData.title}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Gradient overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-r ${heroGradients[gender]}`}
        />
        {/* Bottom fade to page background */}
        {/* <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-background via-transparent to-transparent" /> */}

        {/* Hero Content */}
        <div className="relative z-10 min-h-[50vh] flex items-center justify-center px-8 md:px-16 max-w-7xl mx-auto w-full">
          <motion.div
            key={`content-${gender}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-center w-full max-w-3xl mx-auto"
          >
            <p className="text-[10px] tracking-[0.45em] uppercase text-white/55 font-semibold mb-3">
              Urban Grand
            </p>

            <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight">
              {genderData.title}
            </h1>

            <div className="h-[2px] bg-[hsl(38,60%,55%)] w-16 mt-4 mb-4 mx-auto" />

            <p className="text-white/60 text-sm md:text-base max-w-lg leading-relaxed mx-auto">
              {genderData.tag} — {genderData.description}
            </p>
          </motion.div>
        </div>


      </div>

      {/* ── Section header ────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto w-full px-6 pt-10 pb-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground font-semibold mb-1">
              {categorySlides.length} Categories
            </p>
            <h2 className="text-2xl font-bold dark:text-white">
              Browse the Collection
            </h2>
          </div>
          <Link
            to={`/category/${gender}`}
            className="text-[11px] uppercase tracking-widest font-semibold
                       text-muted-medium hover:text-foreground dark:hover:text-white
                       underline-offset-4 hover:underline transition-colors duration-300"
          >
            View all in grid →
          </Link>
        </div>
        <div className="h-px bg-border/40 mt-5" />
      </div>

      {/* ── Zig-Zag Explore Sections ──────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={gender}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {categorySlides.map((categorySlide, idx) => (
            <ExploreSection
              key={`${gender}-${categorySlide.id}`}
              categorySlide={categorySlide}
              gender={gender}
              index={idx}
              onEnquiryClick={openLightbox}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* ── Browse Other Genders ──────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto w-full px-6 py-16 text-center border-t border-border/30">
        <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground font-semibold mb-6">
          Also Explore
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          {others.map((g) => {
            const otherSlide = collections.find((c) => c.id === g)!;
            return (
              <Link
                key={g}
                to={`/explore/${g}`}
                className="relative overflow-hidden rounded-lg group w-40 h-48"
              >
                <img
                  src={heroImages[g]}
                  alt={otherSlide.title}
                  className="absolute inset-0 w-full h-full object-cover
                             transition-transform duration-700 group-hover:scale-[1.07]"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/35 transition-colors duration-500" />
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-5">
                  <p className="text-white font-bold text-sm tracking-widest uppercase">
                    {g}
                  </p>
                  <div className="h-[1.5px] bg-[hsl(38,60%,55%)] w-0 group-hover:w-8 transition-all duration-500 mt-1.5 rounded-full" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <Footer />

      {/* ── Enquiry Lightbox (triggered from ExploreSection) ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <ImageLightbox
            images={products}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onNavigate={(i) => setLightboxIndex(i)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExplorePage;
