/**
 * ImageLightbox.tsx
 *
 * Shared lightbox component used by both CategoryPage and ExplorePage.
 * Displays a full-screen image viewer (zoom, drag, keyboard nav, thumbnails)
 * alongside an EnquiryForm panel.
 *
 * Extracted from CategoryPage.tsx — zero logic changes.
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from "lucide-react";
import EnquiryForm from "@/components/EnquiryForm";

// ── Shared product type ──────────────────────────────────────────────────────
export type Product = {
  image: string;
  category: string;
  subcategory: string;
};

// ── ImageLightbox ────────────────────────────────────────────────────────────
const ImageLightbox = ({
  images,
  currentIndex,
  onClose,
  onNavigate,
  inquireyForm = true
}: {
  images: Product[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
  inquireyForm?: boolean;
}) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const resetView = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  // Reset zoom when navigating
  useEffect(() => {
    resetView();
  }, [currentIndex, resetView]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          if (currentIndex > 0) onNavigate(currentIndex - 1);
          break;
        case "ArrowRight":
          if (currentIndex < images.length - 1) onNavigate(currentIndex + 1);
          break;
        case "+":
        case "=":
          setScale((s) => Math.min(s + 0.5, 5));
          break;
        case "-":
          setScale((s) => {
            const ns = Math.max(s - 0.5, 1);
            if (ns === 1) setPosition({ x: 0, y: 0 });
            return ns;
          });
          break;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [currentIndex, images.length, onClose, onNavigate]);

  // Scroll to zoom
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setScale((prev) => {
      const next = prev - e.deltaY * 0.002;
      const clamped = Math.min(Math.max(next, 1), 5);
      if (clamped === 1) setPosition({ x: 0, y: 0 });
      return clamped;
    });
  }, []);

  // Drag to pan (when zoomed)
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (scale <= 1) return;
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [scale, position]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging || scale <= 1) return;
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    },
    [isDragging, dragStart, scale]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Double-click to toggle zoom
  const handleDoubleClick = useCallback(() => {
    if (scale > 1) {
      resetView();
    } else {
      setScale(2.5);
    }
  }, [scale, resetView]);

  const zoomIn = () => setScale((s) => Math.min(s + 0.5, 5));
  const zoomOut = () => {
    setScale((s) => {
      const ns = Math.max(s - 0.5, 1);
      if (ns === 1) setPosition({ x: 0, y: 0 });
      return ns;
    });
  };

  const product = images[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[90] bg-black/95 backdrop-blur-md flex flex-col md:flex-row"
    >
      {/* Left side: Image Lightbox */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-white/50 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold">
              {product.subcategory}
            </span>
            <span className="text-white/25 text-xs">•</span>
            <span className="text-white/40 text-[10px] sm:text-[11px] uppercase tracking-wider">
              {currentIndex + 1} / {images.length}
            </span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Zoom controls */}
            <button
              onClick={zoomOut}
              disabled={scale <= 1}
              className="p-2 sm:p-2.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Zoom out"
            >
              <ZoomOut size={18} />
            </button>
            <span className="text-white/50 text-xs font-mono min-w-[3rem] text-center hidden sm:block">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={zoomIn}
              disabled={scale >= 5}
              className="p-2 sm:p-2.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Zoom in"
            >
              <ZoomIn size={18} />
            </button>
            <div className="w-px h-5 bg-white/15 mx-1 sm:mx-2" />
            <button
              onClick={onClose}
              className="p-2 sm:p-2.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all md:hidden"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Image container */}
        <div
          ref={containerRef}
          className="flex-1 relative overflow-hidden select-none"
          onWheel={handleWheel}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onDoubleClick={handleDoubleClick}
          style={{ cursor: scale > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in", touchAction: "none" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <img
                src={product.image}
                alt={product.subcategory}
                className="max-h-full max-w-full object-contain transition-transform duration-150 ease-out"
                style={{
                  transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
                }}
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows */}
          {currentIndex > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); onNavigate(currentIndex - 1); }}
              className="absolute left-2 sm:left-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all z-10"
              aria-label="Previous image"
            >
              <ChevronLeft size={22} />
            </button>
          )}
          {currentIndex < images.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); onNavigate(currentIndex + 1); }}
              className="absolute right-2 sm:right-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all z-10"
              aria-label="Next image"
            >
              <ChevronRight size={22} />
            </button>
          )}
        </div>

        {/* Bottom thumbnail strip */}
        <div className="flex-shrink-0 px-4 py-3 sm:py-4 overflow-x-auto">
          <div className="flex gap-2 justify-center">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => onNavigate(i)}
                className={`h-12 w-10 sm:h-14 sm:w-11 rounded-md overflow-hidden border-2 transition-all duration-200 flex-shrink-0 ${i === currentIndex
                  ? "border-white/80 scale-105 ring-1 ring-white/30"
                  : "border-white/15 opacity-50 hover:opacity-80 hover:border-white/40"
                  }`}
              >
                <img src={img.image} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Hint text */}
        <div className="text-center pb-3 sm:pb-4 hidden sm:block">
          <p className="text-white/25 text-[9px] sm:text-[10px] tracking-[0.2em] uppercase">
            Double-click to zoom • Scroll to zoom • Drag to pan
          </p>
        </div>
      </div>

      {/* Right side: Enquiry form */}
      {inquireyForm && <div className="w-full md:w-[400px] lg:w-[480px] bg-background flex flex-col h-[65vh] md:h-full border-l border-border/20 shadow-[-10px_0_30px_rgba(0,0,0,0.5)] z-20 flex-shrink-0">
        <div className="flex items-center justify-between px-6 lg:px-8 py-5 border-b border-border/20 flex-shrink-0 bg-background">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-semibold mb-1">
              {product.subcategory} Collection
            </p>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground">Enquire Now</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 hover:bg-soft rounded-full transition-elegant text-muted-medium hover:text-foreground flex-shrink-0 hidden md:block"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto w-full bg-background [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-border/50 hover:[&::-webkit-scrollbar-thumb]:bg-border">
          <EnquiryForm />
        </div>
      </div>}
    </motion.div>
  );
};

export default ImageLightbox;
