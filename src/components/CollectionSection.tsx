import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ── Only the images actually used (first image per collection) ──
import men from "@/assets/men/homePage.jpg";
import women from "@/assets/women/homePage.jpg";
import kids from "@/assets/kids/homepage.jpg";

type CollectionSlide = {
  id: string;
  title: string;
  tag: string;
  description: string;
  imageRight: boolean;
  image: string;
};

const collections: CollectionSlide[] = [
  {
    id: "men",
    title: "Men Collection",
    tag: "Bold & Refined",
    description:
      "Built for the contemporary man — structured cuts, premium fabrics, and versatile designs that move seamlessly from casual to formal.",
    imageRight: true,
    image: men,
  },
  {
    id: "women",
    title: "Women Collection",
    tag: "Feminine Elegance",
    description:
      "Crafted for the modern woman — our women's line blends timeless silhouettes with premium knitwear. Designed for warmth without compromising on style.",
    imageRight: false,
    image: women,
  },
  {
    id: "kids",
    title: "Kids Collection",
    tag: "Playful & Cozy",
    description:
      "Soft, durable, and endlessly fun — our kids' collection is engineered for active little lives. Premium yarns, safe dyes, and designs that kids actually love.",
    imageRight: true,
    image: kids,
  },
];

// ── Single collection slide ────────────────────────────────────────────────

const CollectionSlideComponent = ({
  slide,
  isAlt,
}: {
  slide: CollectionSlide;
  isAlt: boolean;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const ImageCol = (
    <motion.div
      initial={{ opacity: 0, x: slide.imageRight ? 60 : -80 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full md:w-[52%] flex-shrink-0 group"
    >
      <div
        className="relative overflow-hidden rounded-lg w-full h-full"
        style={{
          boxShadow: slide.imageRight
            ? '-15px 15px 25px -5px rgba(0,0,0,2)'
            : '15px 15px 25px -5px rgba(0,0,0,2)'
        }}
      >
        <img
          src={slide.image}
          alt={slide.title}
          className="w-full h-[80vh] object-cover group-hover:scale-[1.03] transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-700 pointer-events-none z-20" />
      </div>

      {/* Decorative accent line */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.4 }}
        className={`absolute ${slide.imageRight ? "-right-3 sm:-right-4" : "-left-3 sm:-left-4"} top-8 bottom-8 w-[3px] bg-[hsl(38,60%,50%)] origin-top rounded-full hidden md:block`}
      />
    </motion.div>
  );

  const ContentCol = (
    <motion.div
      initial={{ opacity: 0, x: slide.imageRight ? -60 : 60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 3, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col justify-center gap-7 flex-1 min-w-0"
    >
      {/* Content panel */}
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
      {/* CTA */}
      <div className="flex items-center gap-4 sm:gap-5 pt-2 px-4 sm:px-6 md:px-8 lg:px-0">
        <a
          href={`/category/${slide.id}`}
          className="group inline-flex items-center gap-2 sm:gap-3 bg-foreground text-background px-6 sm:px-8 py-3.5 sm:py-4 text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase hover:opacity-85 transition-elegant rounded-md"
        >
          Explore
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
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
  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
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
          isAlt={idx % 2 === 0}
        />
      ))}
    </section>
  );
};

export default CollectionSection;
