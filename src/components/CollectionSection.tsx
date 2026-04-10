import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { collections } from "@/data/ourCollection";
import type { CollectionSlide } from "@/data/ourCollection";

// ── Hero images (one per collection) ─────────────────────────────────────────
import men from "@/assets/men/homePage.jpg";
import women from "@/assets/women/homePage.jpg";
import kids from "@/assets/kids/homepage.jpg";

const heroImages: Record<string, string> = { men, women, kids };

// ── Slide Component ───────────────────────────────────────────────────────────

const CollectionSlideComponent = ({
  slide,
  isAlt,
}: {
  slide: CollectionSlide;
  isAlt: boolean;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div
      ref={ref}
      className={`w-full py-16 ${isAlt ? "bg-[#FAF9F6]" : "bg-white"}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div
          className={`flex flex-col ${
            slide.imageRight ? "md:flex-row" : "md:flex-row-reverse"
          } gap-16 items-center`}
        >
          {/* ── Content Column ───────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: slide.imageRight ? -60 : 60 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: slide.imageRight ? -60 : 60 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="flex flex-col justify-center gap-7 flex-1"
          >
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground font-semibold mb-4">
                {slide.tag}
              </p>

              <h2 className="text-4xl font-bold">{slide.title}</h2>

              <div className="h-[2px] bg-[hsl(38,60%,50%)] w-14 my-5" />

              <p className="text-lg text-muted-medium max-w-[480px]">
                {slide.description}
              </p>
            </div>

            <a
              href={`/category/${slide.id}`}
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 text-xs uppercase tracking-widest rounded-md hover:opacity-80 w-fit"
            >
              Explore →
            </a>
          </motion.div>

          {/* ── Image Column ─────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: slide.imageRight ? 60 : -60 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: slide.imageRight ? 60 : -60 }}
            transition={{ duration: 1.2 }}
            className="relative w-full md:w-[52%] flex-shrink-0"
          >
            {/* IMAGE CARD */}
            <div
              className="relative overflow-hidden rounded-lg w-full group cursor-pointer"
              style={{
                boxShadow: slide.imageRight
                  ? "-15px 15px 25px -5px rgba(0,0,0,0.35)"
                  : "15px 15px 25px -5px rgba(0,0,0,0.35)",
              }}
            >
              <img
                src={heroImages[slide.id]}
                alt={slide.title}
                className="w-full h-[80vh] object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />

              {/* Hover Dark Overlay (full image cover so top list is readable) */}
              <div 
                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" 
              />

              {/* Default Bottom Gradient (for resting state text readability) */}
              <div
                className="absolute inset-x-0 bottom-0 h-[45%] pointer-events-none z-20
                           transition-opacity duration-500 group-hover:opacity-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)",
                }}
              />

              {/* ── Content Container (Moves from bottom corner to top corner on hover) ── */}
              <div 
                className={`absolute z-30 flex flex-col 
                           top-[calc(100%-100px)] group-hover:top-8
                           transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                           ${slide.imageRight ? "left-8 items-start text-left" : "right-8 items-end text-right"}`}
              >
                {/* Title Block */}
                <div className={`flex flex-col ${slide.imageRight ? "items-start" : "items-end"}`}>
                  <p className="text-white/80 text-[10px] tracking-[0.35em] uppercase font-semibold mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                    Urban Grand
                  </p>
                  <h3 className="text-white text-3xl font-bold tracking-tight drop-shadow-md">
                    {slide.title}
                  </h3>
                  {/* Line Animation below heading */}
                  <div className={`h-[2px] bg-[hsl(38,60%,55%)] mt-3 rounded-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] w-0 group-hover:w-24`} />
                </div>

                {/* Subcategories Vertical List */}
                <div
                  className={`mt-6 flex flex-col gap-3
                             opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto
                             transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] delay-100
                             ${slide.imageRight ? "items-start" : "items-end"}`}
                >
                  {slide.subcategories.map((sub, i) => (
                    <a
                      key={sub.label}
                      href={`/category/${slide.id}/${sub.label.toLowerCase()}`}
                      style={{ transitionDelay: `${i * 40 + 100}ms` }}
                      className={`group/item flex items-center gap-3 text-white/75 hover:text-white transition-colors duration-300 w-fit ${slide.imageRight ? "flex-row" : "flex-row-reverse"}`}
                    >
                      <span className="w-4 h-[1px] bg-[hsl(38,60%,55%)]/60 group-hover/item:bg-[hsl(38,60%,55%)] group-hover/item:w-8 transition-all duration-300" />
                      <span className="text-sm font-semibold tracking-[0.15em] uppercase">
                        {sub.label}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// ── Main Section ──────────────────────────────────────────────────────────────

const CollectionSection = () => {
  return (
    <section className="w-full">
      {/* Header */}
      <div className="text-center py-12 bg-[#FAF9F6]">
        <p className="text-xs tracking-widest uppercase mb-4 text-muted-foreground">
          Our Range
        </p>

        <h2 className="text-5xl font-bold">Our Collection</h2>

        <div className="h-[2px] w-16 bg-[hsl(38,60%,50%)] mx-auto mt-5" />

        <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
          Explore our premium range of knitwear designed for men, women, and
          children.
        </p>
      </div>

      {/* Slides */}
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