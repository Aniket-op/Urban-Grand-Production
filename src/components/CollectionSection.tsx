import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import EnquiryModal from "@/components/EnquiryModal";

// ── Women images
import womenCardigans1 from "@/assets/women/cardigans1.jpg";
import womenCardigans2 from "@/assets/women/cardigans2.jpg";
import womenCoat1 from "@/assets/women/coat1.png";
import womenCoat2 from "@/assets/women/coat2.jpg";
import womenCoat3 from "@/assets/women/coat3.jpg";
import womenHoodies1 from "@/assets/women/hoodies1.jpg";
import womenHoodies2 from "@/assets/women/hoodies2.jpg";
import womenHoodies3 from "@/assets/women/hoodies3.jpg";
import womenJacket1 from "@/assets/women/jacket_1.png";
import womenJacket2 from "@/assets/women/jacket_2.png";
import womenJacket3 from "@/assets/women/jacket_3.jpg";
import womenSweatshirts1 from "@/assets/women/sweatshirts_1.png";
import womenSweatshirts2 from "@/assets/women/sweatshirts_2.jpg";
import womenSweatshirts3 from "@/assets/women/sweatshirts_3.jpg";
import womenThermal1 from "@/assets/women/thermal1.jpg";
import womenThermal2 from "@/assets/women/thermal2.jpg";

// ── Men images
import menCoats1 from "@/assets/men/coats1.png";
import menCoats2 from "@/assets/men/coats2.jpg";
import menCoats3 from "@/assets/men/coats3.jpg";
import menHoodies1 from "@/assets/men/hoodies_1.png";
import menHoodies2 from "@/assets/men/hoodies_2.png";
import menHoodies3 from "@/assets/men/hoodies_3.png";
import menJacket1 from "@/assets/men/jacket_1.png";
import menJacket2 from "@/assets/men/jacket_2.png";
import menLower1 from "@/assets/men/lower1.jpg";
import menLower2 from "@/assets/men/lower2.jpg";
import menLower3 from "@/assets/men/lower3.webp";
import menSweatshirts1 from "@/assets/men/sweatshirts_1.png";
import menSweatshirts2 from "@/assets/men/sweatshirts_2.jpg";
import menThermal1 from "@/assets/men/thermal1.webp";
import menThermal2 from "@/assets/men/thermal2.webp";
import menTshirts1 from "@/assets/men/tshirts1.jpg";
import menTshirts2 from "@/assets/men/tshirts2.jpg";
import menTshirts3 from "@/assets/men/tshirts3.jpg";

// ── Kids images
import kidsCoat1 from "@/assets/kids/coat1.png";
import kidsCoat2 from "@/assets/kids/coat2.png";
import kidsCoat3 from "@/assets/kids/coat3.jpeg";
import kidsHoodies1 from "@/assets/kids/hoodies1.png";
import kidsHoodies2 from "@/assets/kids/hoodies2.png";
import kidsJacket1 from "@/assets/kids/jacket_1.png";
import kidsJacket2 from "@/assets/kids/jacket_2.png";
import kidsJacket3 from "@/assets/kids/jacket_3.jpg";
import kidsSweaters1 from "@/assets/kids/sweaters1.jpg";
import kidsSweaters2 from "@/assets/kids/sweaters2.jpg";
import kidsSweaters3 from "@/assets/kids/sweaters3.jpg";
import kidsThermal1 from "@/assets/kids/thermal1.jpg";
import kidsThermal2 from "@/assets/kids/thermal2.jpg";
import kidsThermal3 from "@/assets/kids/thermal3.webp";

type Subcategory = {
  label: string;
  images: string[];
};

type CollectionSlide = {
  id: string;
  title: string;
  tag: string;
  description: string;
  imageRight: boolean; // true = image on right, content on left
  subcategories: Subcategory[];
  accent: string; // tailwind bg color for accent dot
};

const collections: CollectionSlide[] = [
  {
    id: "men",
    title: "Men Collection",
    tag: "Bold & Refined",
    description:
      "Built for the contemporary man — structured cuts, premium fabrics, and versatile designs that move seamlessly from casual to formal.",
    imageRight: true,
    accent: "bg-blue-300/60",
    subcategories: [
      { label: "Jacket", images: [menJacket1, menJacket2] },
      { label: "Coats", images: [menCoats1, menCoats2, menCoats3] },
      { label: "Sweatshirts", images: [menSweatshirts1, menSweatshirts2] },
      { label: "Hoodies", images: [menHoodies1, menHoodies2, menHoodies3] },
      { label: "T-Shirts", images: [menTshirts1, menTshirts2, menTshirts3] },
      { label: "Lowers", images: [menLower1, menLower2, menLower3] },
      { label: "Thermal", images: [menThermal1, menThermal2] },
    ],
  },
  {
    id: "women",
    title: "Women Collection",
    tag: "Feminine Elegance",
    description:
      "Crafted for the modern woman — our women's line blends timeless silhouettes with premium knitwear. Designed for warmth without compromising on style.",
    imageRight: false,
    accent: "bg-rose-300/60",
    subcategories: [
      { label: "Jacket", images: [womenJacket1, womenJacket2, womenJacket3] },
      { label: "Coats", images: [womenCoat1, womenCoat2, womenCoat3] },
      { label: "Sweatshirts", images: [womenSweatshirts1, womenSweatshirts2, womenSweatshirts3] },
      { label: "Hoodies", images: [womenHoodies1, womenHoodies2, womenHoodies3] },
      { label: "Thermal", images: [womenThermal1, womenThermal2] },
      { label: "Cardigans", images: [womenCardigans1, womenCardigans2] },
    ],
  },
  {
    id: "kids",
    title: "Kids Collection",
    tag: "Playful & Cozy",
    description:
      "Soft, durable, and endlessly fun — our kids' collection is engineered for active little lives. Premium yarns, safe dyes, and designs that kids actually love.",
    imageRight: true,
    accent: "bg-amber-300/60",
    subcategories: [
      { label: "Jacket", images: [kidsJacket1, kidsJacket2, kidsJacket3] },
      { label: "Coats", images: [kidsCoat1, kidsCoat2, kidsCoat3] },
      { label: "Sweaters", images: [kidsSweaters1, kidsSweaters2, kidsSweaters3] },
      { label: "Hoodies", images: [kidsHoodies1, kidsHoodies2] },
      { label: "Thermal", images: [kidsThermal1, kidsThermal2, kidsThermal3] },
    ],
  },
];

// ── Single collection slide ────────────────────────────────────────────────

const CollectionSlideComponent = ({
  slide,
  onEnquire,
  isAlt,
}: {
  slide: CollectionSlide;
  onEnquire: (category: string, image?: string) => void;
  isAlt: boolean;
}) => {
  const [activeSub, setActiveSub] = useState(0);
  const [activeImg, setActiveImg] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const currentImages = slide.subcategories[activeSub]?.images ?? [];

  // Auto-cycle images, and change subcategory when all images have been shown
  useEffect(() => {
    const imagesCount = currentImages.length || 1;
    const timer = setInterval(() => {
      setActiveImg((prevImg) => {
        const nextImg = prevImg + 1;
        if (nextImg >= imagesCount) {
          // Move to next subcategory
          setActiveSub((prevSub) => (prevSub + 1) % slide.subcategories.length);
          return 0; // Reset image index for the next subcategory
        }
        return nextImg;
      });
    }, 2500); // cycle every 2.5 seconds
    return () => clearInterval(timer);
  }, [activeSub, slide.subcategories, currentImages.length]);

  const handleSubClick = (idx: number) => {
    setActiveSub(idx);
    setActiveImg(0);
  };

  const ImageCol = (
    <motion.div
      initial={{ opacity: 0, x: slide.imageRight ? 60 : -60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full md:w-[52%] flex-shrink-0 group"
    >
      <div className="relative overflow-hidden rounded-lg shadow-xl shadow-black/[0.06] w-full h-full">
        <AnimatePresence mode="wait">
          <motion.img
            key={`${activeSub}-${activeImg}`}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            src={currentImages[activeImg] ?? currentImages[0]}
            alt={`${slide.title} — ${slide.subcategories[activeSub]?.label}`}
            className="w-full h-[80vh] object-cover group-hover:scale-[1.03] transition-transform duration-700"
          />
        </AnimatePresence>

        {/* Active Category Badge Overlay */}
        <div className="absolute top-6 right-6 z-20 pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={`badge-${activeSub}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="bg-background/80 backdrop-blur-md border border-white/10 shadow-xl px-4 sm:px-5 py-2 rounded-md"
            >
              <p className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase text-foreground">
                {slide.subcategories[activeSub]?.label}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Image thumbnails when multiple images available */}
        {currentImages.length > 1 && (
          <div className="absolute bottom-4 right-4 flex gap-2 z-10">
            {currentImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`h-12 w-10 rounded-md overflow-hidden border-2 transition-all duration-200 ${i === activeImg ? "border-white scale-105" : "border-white/30 hover:border-white/60"
                  }`}
              >
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Accent dot */}
        <div className={`absolute top-6 left-6 w-3 h-3 rounded-full ${slide.accent} ring-4 ring-white/20 z-10`} />
      </div>

      {/* Decorative accent line */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
        className={`absolute ${slide.imageRight ? "-right-3 sm:-right-4" : "-left-3 sm:-left-4"} top-8 bottom-8 w-[3px] bg-[hsl(38,60%,50%)] origin-top rounded-full hidden md:block`}
      />
    </motion.div>
  );

  const ContentCol = (
    <motion.div
      initial={{ opacity: 0, x: slide.imageRight ? -60 : 60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col justify-center gap-7 flex-1 min-w-0"
    >
      {/* Content panel with subtle corporate card styling */}
      <div className="p-4 sm:p-6 md:p-8 lg:p-0">
        <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground font-semibold mb-4">
          {slide.tag}
        </p>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] font-bold leading-[1.05] tracking-[-0.01em] text-foreground">
          {slide.title}
        </h2>
        <div className="h-[2px] bg-[hsl(38,60%,50%)] w-14 my-5" />
        <p className="text-base sm:text-lg md:text-xl text-muted-medium leading-relaxed max-w-[480px] text-justify">
          {slide.description}
        </p>
      </div>

      {/* Subcategories */}
      <div className="px-6 md:px-8 lg:px-0">
        <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-semibold mb-4">
          Browse by Category
        </p>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {slide.subcategories.map((sub, i) => (
            <button
              key={sub.label}
              onClick={() => handleSubClick(i)}
              className={`relative px-4 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-[12px] font-semibold tracking-[0.1em] uppercase rounded-md border transition-all duration-250 ${i === activeSub
                ? "bg-foreground text-background border-foreground"
                : "border-border text-muted-medium hover:border-foreground/40 hover:text-foreground"
                }`}
            >
              {sub.label}
              {i === activeSub && (
                <motion.div
                  layoutId={`sub-indicator-${slide.id}`}
                  className="absolute inset-0 bg-foreground rounded-md -z-10"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Active subcategory label */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSub}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="border-l-2 border-foreground/15 pl-5"
          >
            <p className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-1">
              Currently Viewing
            </p>
            <p className="font-display text-xl font-semibold text-foreground">
              {slide.subcategories[activeSub]?.label}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* CTA */}
      <div className="flex items-center gap-4 sm:gap-5 pt-2 px-4 sm:px-6 md:px-8 lg:px-0">
        <button
          onClick={() => onEnquire(slide.id, currentImages[activeImg] ?? currentImages[0])}
          className="group inline-flex items-center gap-2 sm:gap-3 bg-foreground text-background px-6 sm:px-8 py-3.5 sm:py-4 text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase hover:opacity-85 transition-elegant rounded-md"
        >
          Enquire Now
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </button>
        <a
          href={`/category/${slide.id}`}
          className="text-[11px] font-semibold tracking-[0.2em] uppercase text-muted-medium hover:text-foreground transition-elegant underline-offset-4 hover:underline"
        >
          For Images
        </a>
      </div>
    </motion.div>
  );

  return (
    <div ref={ref} className={`w-full py-8 sm:py-12 md:py-16 ${isAlt ? 'bg-section-alt' : 'bg-background'}`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-10">
        <div
          className={`flex flex-col ${slide.imageRight ? "md:flex-row" : "md:flex-row-reverse"
            } gap-8 sm:gap-12 md:gap-16 lg:gap-24 items-center`}
        >
          {ContentCol}
          {ImageCol}
        </div>
      </div>
    </div>
  );
};

// ── Main CollectionSection ──────────────────────────────────────────────────

const CollectionSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [enquiryCategory, setEnquiryCategory] = useState<string | undefined>(undefined);
  const [enquiryImage, setEnquiryImage] = useState<string | undefined>(undefined);

  const handleEnquire = (category: string, image?: string) => {
    setEnquiryCategory(category);
    setEnquiryImage(image);
    setModalOpen(true);
  };

  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <>
      <section className="w-full bg-background" id="collections">
        {/* Section header */}
        <div
          ref={sectionRef}
          className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-10 pt-4 sm:pt-8 md:pt-12 pb-6 sm:pb-10 md:pb-12 bg-[#FAF9F6]"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground font-semibold mb-4">
              Our Range
            </p>

            <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.01em] text-foreground">
              Our Collection
            </h2>

            <div className="h-[2px] bg-[hsl(38,60%,50%)] w-16 mt-5 mx-auto" />

            <p className="mt-6 max-w-2xl mx-auto text-muted-medium text-base sm:text-lg md:text-xl leading-relaxed">
              Explore our premium range of knitwear designed for men, women, and children — crafted with quality yarns and contemporary styles.
            </p>
          </motion.div>
        </div>

        {/* Zig-zag slides with alternating backgrounds */}
        {collections.map((slide, idx) => (
          <CollectionSlideComponent
            key={slide.id}
            slide={slide}
            onEnquire={handleEnquire}
            isAlt={idx % 2 === 0}
          />
        ))}
      </section>

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        prefilledCategory={enquiryCategory}
        prefilledImage={enquiryImage}
      />
    </>
  );
};

export default CollectionSection;
