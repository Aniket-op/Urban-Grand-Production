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
  /** Called when the user clicks “Enquire now”. Receives the pre-filtered
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
  // Each style's allImages are expanded so the enquiry lightbox shows all images of each style
  const enquiryProducts: Product[] = categorySlide.subcategories.flatMap((sub) =>
    sub.allImages.map((img) => ({
      image: img,
      allImages: sub.allImages,
      category: categorySlide.title,
      subcategory: sub.label,
    }))
  );

  // Calculate starting index for each subcategory in the flat slides array
  const getSubcategoryStartIndex = (subcategoryIndex: number) => {
    let startIndex = 0;
    for (let i = 0; i < subcategoryIndex; i++) {
      startIndex += categorySlide.subcategories[i].allImages.length;
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
          className="grid grid-cols-1 md:grid-cols-2 items-center"
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
            className={`flex flex-col justify-center gap-6 w-full pt-8 md:pt-0 ${imageRight ? "md:order-first md:pr-12 lg:pr-16" : "md:order-last md:pl-12 lg:pl-16"}`}
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
              <h2 className="dark:text-white">
                {categorySlide.title}
              </h2>

              {/* Gold divider */}
              <div className="h-[2px] bg-[hsl(38,60%,50%)] w-14 mt-4" />
            </div>

            {/* Category collection description */}
            <p className="max-w-[420px] dark:text-zinc-300">
              {categorySlide.description}
            </p>

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
              {categorySlide.subcategories.length}{" "}
              {categorySlide.subcategories.length === 1 ? "Style" : "Styles"}
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
                Enquire now →
              </button>
              <Link
                to={`/category/${gender}/${categorySlide.id}`}
                className="inline-flex items-center gap-2 bg-transparent dark:bg-transparent
                           text-black dark:bg-transparent dark:text-white px-6 py-3 text-[11px] uppercase
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
            className={`relative w-full flex-shrink-0 ${imageRight ? "md:order-last" : "md:order-first"}`}
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
                const subcategoryLength = sub.allImages.length;
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
