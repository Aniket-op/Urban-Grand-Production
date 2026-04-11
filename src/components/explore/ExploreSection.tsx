import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import type { Subcategory, CollectionSlide } from "@/data/ourCollection";
import ImageCarousel from "./ImageCarousel";

type Props = {
  categorySlide: CollectionSlide;
  gender: string;
  index: number; // determines zig-zag side
};

/**
 * ExploreSection
 *
 * One zig-zag row for a single subcategory (e.g., "Jackets").
 * Even index  → image right, text left  (mirrors imageRight: true)
 * Odd index   → image left,  text right (mirrors imageRight: false)
 * Mobile      → always stacked (image on top, text below)
 */
const ExploreSection = ({ categorySlide, gender, index }: Props) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // Even indices: image on right (text left) — same as imageRight:true in CollectionSection
  const imageRight = (index + 1) % 2 === 0;

  const textSlideX = imageRight ? -55 : 55;
  const imgSlideX = imageRight ? 55 : -55;

  return (
    <div
      ref={ref}
      className={`w-full py-10 transition-colors duration-500
                  ${index % 2 === 0 ? "bg-white dark:bg-zinc-900" : "bg-[#FAF9F6] dark:bg-zinc-800/40"}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div
          className={`flex flex-col ${imageRight ? "md:flex-row" : "md:flex-row-reverse"
            } gap-20 items-center`}
        >
          {/* ── Text Column ─────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: textSlideX }}
            animate={
              inView
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: textSlideX }
            }
            transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-center gap-6 flex-1"
          >
            {/* Accent dot + tag row */}
            <div className="flex items-center gap-3">
              <span
                className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${categorySlide.accent}`}
              />
              <p className="text-[10px] tracking-[0.42em] uppercase text-muted-foreground font-semibold">
                {categorySlide.tag}
              </p>
            </div>

            {/* Category title */}
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight dark:text-white">
                {categorySlide.title}
              </h2>

              {/* Gold divider */}
              <div className="h-[2px] bg-[hsl(38,60%,50%)] w-14 mt-4" />
            </div>

            {/* Category collection description */}
            <p className="text-[15px] text-muted-medium dark:text-zinc-300 max-w-[420px] leading-relaxed">
              {categorySlide.description}
            </p>

            {/* Image count hint */}
            <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground font-medium">
              {categorySlide.subcategories.reduce((acc, sub) => acc + sub.images.length, 0)}{" "}
              {categorySlide.subcategories.reduce((acc, sub) => acc + sub.images.length, 0) === 1 ? "Style" : "Styles"}
            </p>

            {/* CTA */}
            <div className="flex items-center gap-4 flex-wrap">
              <Link
                to={`/category/${gender}/${categorySlide.id}`}
                className="inline-flex items-center gap-2 bg-black dark:bg-white
                           text-white dark:text-black px-6 py-3 text-[11px] uppercase
                           tracking-widest rounded-md hover:opacity-75 w-fit
                           transition-all duration-300 ease-elegant"
              >
                View {categorySlide.title} →
              </Link>
              <Link
                to={`/category/${gender}`}
                className="text-[11px] uppercase tracking-widest font-semibold
                           text-muted-medium hover:text-foreground dark:hover:text-white
                           underline-offset-4 hover:underline transition-colors duration-300"
              >
                All {gender.charAt(0).toUpperCase() + gender.slice(1)}
              </Link>
            </div>
          </motion.div>

          {/* ── Image Column ─────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: imgSlideX }}
            animate={
              inView
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: imgSlideX }
            }
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full md:w-[52%] flex-shrink-0"
          >
            <ImageCarousel
              subcategories={categorySlide.subcategories}
              gender={gender}
              imageRight={imageRight}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ExploreSection;
