import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SubcategoryOverlay from "./SubcategoryOverlay";
import type { Subcategory } from "@/data/ourCollection";

type Props = {
  subcategories: Subcategory[];
  gender: string;
  imageRight: boolean;

  // ✅ NEW CONTROLLED STATE
  activeIndex: number;
  setActiveIndex: (index: number) => void;
};

const AUTO_ADVANCE_MS = 3800;
const PAUSE_AFTER_INTERACTION_MS = 10000;

const ImageCarousel = ({
  subcategories,
  gender,
  imageRight,
  activeIndex,
  setActiveIndex,
}: Props) => {

  const flatSlides = useMemo(() => {
    return subcategories.flatMap((sub) =>
      sub.images.map((img) => ({ src: img, label: sub.label }))
    );
  }, [subcategories]);

  const [active, setActive] = useState(activeIndex);
  const [isHovered, setIsHovered] = useState(false);

  const pauseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isPausedRef = useRef(false);

  // ✅ SYNC FROM PARENT (NO LOOP)
  useEffect(() => {
    if (activeIndex !== active) {
      setActive(activeIndex);
    }
  }, [activeIndex]);

  // ✅ SYNC BACK TO PARENT (SAFE)
  useEffect(() => {
    if (active !== activeIndex) {
      setActiveIndex(active);
    }
  }, [active]);

  const goTo = useCallback(
    (idx: number) => {
      const newIndex = (idx + flatSlides.length) % flatSlides.length;
      setActive(newIndex);

      // pause auto slide
      isPausedRef.current = true;
      if (pauseTimer.current) clearTimeout(pauseTimer.current);
      pauseTimer.current = setTimeout(() => {
        isPausedRef.current = false;
      }, PAUSE_AFTER_INTERACTION_MS);
    },
    [flatSlides.length]
  );

  const prev = useCallback(() => goTo(active - 1), [active, goTo]);
  const next = useCallback(() => goTo(active + 1), [active, goTo]);

  // ✅ AUTO SLIDE
  useEffect(() => {
    if (flatSlides.length <= 1) return;

    const interval = setInterval(() => {
      if (!isHovered && !isPausedRef.current) {
        setActive((a) => (a + 1) % flatSlides.length);
      }
    }, AUTO_ADVANCE_MS);

    return () => clearInterval(interval);
  }, [flatSlides.length, isHovered]);

  // cleanup
  useEffect(() => {
    return () => {
      if (pauseTimer.current) clearTimeout(pauseTimer.current);
    };
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden rounded-lg group cursor-pointer"
      style={{
        boxShadow: imageRight
          ? "-14px 14px 28px -5px rgba(0,0,0,0.32)"
          : "14px 14px 28px -5px rgba(0,0,0,0.32)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Images */}
      <div className="relative w-full h-[72vh] md:h-[78vh] overflow-hidden">
        {flatSlides.map((slide, i) => (
          <img
            key={i}
            src={slide.src}
            alt={`${slide.label} ${i + 1}`}
            className={`absolute inset-0 w-full h-full object-cover
            transition-all duration-700
            ${i === active ? "opacity-100 z-[1]" : "opacity-0 z-0"}`}
          />
        ))}
      </div>

      {/* Overlay */}
      <SubcategoryOverlay
        label={flatSlides[active]?.label || ""}
        gender={gender}
        imageIndex={active}
        total={flatSlides.length}
        imageRight={imageRight}
      />

      {/* Arrows */}
      {flatSlides.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-40 opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-40 opacity-0 group-hover:opacity-100"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}

      {/* Dots */}
      {flatSlides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          {flatSlides.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                goTo(i);
              }}
              className={`rounded-full ${i === active
                  ? "w-5 h-1.5 bg-[hsl(38,60%,55%)]"
                  : "w-1.5 h-1.5 bg-white/40"
                }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;