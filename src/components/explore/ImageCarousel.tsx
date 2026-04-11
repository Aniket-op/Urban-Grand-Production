import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SubcategoryOverlay from "./SubcategoryOverlay";

type Props = {
  images: string[];
  label: string;
  gender: string;
  imageRight: boolean;
};

const AUTO_ADVANCE_MS = 3800;
const PAUSE_AFTER_INTERACTION_MS = 10000;

/**
 * ImageCarousel
 *
 * Displays a set of images for a single subcategory with:
 * - Auto-advancing slides (pauses on hover or after manual interaction)
 * - Dot navigation + left/right arrow buttons (shown on hover)
 * - SubcategoryOverlay with the label-slide-up premium hover animation
 * - Scale zoom on hover (same as CollectionSection)
 */
const ImageCarousel = ({ images, label, gender, imageRight }: Props) => {
  const [active, setActive] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const pauseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isPausedRef = useRef(false);

  const goTo = useCallback(
    (idx: number) => {
      setActive((idx + images.length) % images.length);
      // Pause auto-advance for a bit after manual interaction
      isPausedRef.current = true;
      if (pauseTimer.current) clearTimeout(pauseTimer.current);
      pauseTimer.current = setTimeout(() => {
        isPausedRef.current = false;
      }, PAUSE_AFTER_INTERACTION_MS);
    },
    [images.length]
  );

  const prev = useCallback(() => goTo(active - 1), [active, goTo]);
  const next = useCallback(() => goTo(active + 1), [active, goTo]);

  // Auto-advance
  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      if (!isHovered && !isPausedRef.current) {
        setActive((a) => (a + 1) % images.length);
      }
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(interval);
  }, [images.length, isHovered]);

  // Cleanup pause timer on unmount
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
      {/* ── Images ────────────────────────────────────────────────────── */}
      <div className="relative w-full h-[72vh] md:h-[78vh] overflow-hidden">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${label} ${i + 1}`}
            className={`absolute inset-0 w-full h-full object-cover
                        transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                        group-hover:scale-[1.04]
                        ${i === active ? "opacity-100 z-[1]" : "opacity-0 z-0"}`}
          />
        ))}
      </div>

      {/* ── Overlay: gradient + label (SubcategoryOverlay) ────────────── */}
      <SubcategoryOverlay
        label={label}
        gender={gender}
        imageIndex={active}
        total={images.length}
        imageRight={imageRight}
      />

      {/* ── Arrow navigation (visible on hover when >1 image) ─────────── */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-40
                       w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm
                       flex items-center justify-center text-white/70
                       hover:text-white hover:bg-black/65 transition-all duration-300
                       opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-40
                       w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm
                       flex items-center justify-center text-white/70
                       hover:text-white hover:bg-black/65 transition-all duration-300
                       opacity-0 group-hover:opacity-100"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}

      {/* ── Dot indicators ────────────────────────────────────────────── */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                goTo(i);
              }}
              aria-label={`Go to image ${i + 1}`}
              className={`rounded-full transition-all duration-400
                          ${
                            i === active
                              ? "w-5 h-1.5 bg-[hsl(38,60%,55%)]"
                              : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70"
                          }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
