import { useRef, useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import type { Subcategory, CollectionSlide } from "@/data/ourCollection";
import type { Product } from "@/components/ImageLightbox";
import ImageCarousel from "./ImageCarousel";

type Props = {
  categorySlide: CollectionSlide;
  gender: string;
  index: number; // determines zig-zag side
  /** Called when the user clicks “Enquiry Now”. Receives the pre-filtered
   *  product list for this slide's subcategory so the lightbox only shows
   *  relevant images. */
  onEnquiryClick: (products: Product[], startIndex?: number) => void;
};

/**
 * ExploreSection
 *
 * One zig-zag row for a single subcategory (e.g., "Jackets").
 * Even index  → image right, text left  (mirrors imageRight: true)
 * Odd index   → image left,  text right (mirrors imageRight: false)
 * Mobile      → always stacked (image on top, text below)
 */
const ExploreSection = ({ categorySlide, gender, index, onEnquiryClick }: Props) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [activeSubcategory, setActiveSubcategory] = useState<string>(
    categorySlide.subcategories[0]?.label || ""
  );

  // Build a Product[] filtered to this slide's subcategory for the lightbox
  const enquiryProducts: Product[] = categorySlide.subcategories.flatMap((sub) =>
    sub.images.map((img) => ({
      image: img,
      category: categorySlide.title,
      subcategory: sub.label,
    }))
  );

  // Calculate starting index for each subcategory in the flat slides array
  const getSubcategoryStartIndex = (subcategoryIndex: number) => {
    let startIndex = 0;
    for (let i = 0; i < subcategoryIndex; i++) {
      startIndex += categorySlide.subcategories[i].images.length;
    }
    return startIndex;
  };

  // Function to navigate to a specific subcategory
  const navigateToSubcategory = (subcategoryLabel: string) => {
    // Find the subcategory index
    const subcategoryIndex = categorySlide.subcategories.findIndex(
      (sub) => sub.label === subcategoryLabel
    );

    if (subcategoryIndex !== -1) {
      const startIndex = getSubcategoryStartIndex(subcategoryIndex);
      setActiveSlideIndex(startIndex);
      setActiveSubcategory(subcategoryLabel);
    }
  };

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
            {/* Active subcategory label */}
            {/* <div className="px-4 sm:px-6 md:px-8 lg:px-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSubcategory}
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
                    {activeSubcategory}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div> */}

            {/* Subcategory buttons */}
            <div className="flex flex-wrap gap-3 mt-2">
              {categorySlide.subcategories.map((subcategory, subIndex) => (
                <button
                  key={subcategory.label}
                  onClick={() => navigateToSubcategory(subcategory.label)}
                  className={`px-4 py-2 text-xs font-medium uppercase tracking-wider border rounded-md transition-all duration-300 ${activeSubcategory === subcategory.label
                    ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white"
                    : "border-black/20 dark:border-white/30 hover:bg-black/5 dark:hover:bg-white/10"
                    }`}
                >
                  {subcategory.label}
                </button>
              ))}
            </div>

            {/* Image count hint */}
            <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground font-medium">
              {categorySlide.subcategories.reduce((acc, sub) => acc + sub.images.length, 0)}{" "}
              {categorySlide.subcategories.reduce((acc, sub) => acc + sub.images.length, 0) === 1 ? "Style" : "Styles"}
            </p>

            {/* CTA */}
            <div className="flex items-center gap-4 flex-wrap mt-2">
              <button
                onClick={() => onEnquiryClick(enquiryProducts, 0)}
                className="inline-flex items-center gap-2 bg-black dark:bg-white
                           text-white dark:text-black px-6 py-3 text-[11px] uppercase
                           tracking-widest rounded-md hover:opacity-75 w-fit
                           transition-all duration-300 ease-elegant cursor-pointer"
              >
                Enquiry Now →
              </button>
              <Link
                to={`/category/${gender}/${categorySlide.id}`}
                className="inline-flex items-center gap-2 bg-transparent dark:bg-transparent
                           text-black dark:text-white px-6 py-3 text-[11px] uppercase
                           tracking-widest rounded-md hover:bg-black/5 dark:hover:bg-white/10 w-fit
                           transition-all duration-300 ease-elegant border border-black/20 dark:border-white/30"
              >
                Images →
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
              activeIndex={activeSlideIndex}
              setActiveIndex={(slideIndex) => {
                setActiveSlideIndex(slideIndex);
                // Find which subcategory this slide belongs to
                let currentPosition = 0;
                const targetSubcategory = categorySlide.subcategories.find((sub) => {
                  const subcategoryLength = sub.images.length;
                  if (slideIndex >= currentPosition && slideIndex < currentPosition + subcategoryLength) {
                    return true;
                  }
                  currentPosition += subcategoryLength;
                  return false;
                });
                if (targetSubcategory) {
                  setActiveSubcategory(targetSubcategory.label);
                }
              }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ExploreSection;
