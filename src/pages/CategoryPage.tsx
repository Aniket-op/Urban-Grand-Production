import { useParams, Navigate, Link } from "react-router-dom";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnquiryForm from "@/components/EnquiryForm";

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

type Product = {
  image: string;
  subcategory: string;
};

type CategoryData = {
  title: string;
  tagline: string;
  accent: string; // tailwind gradient class
  products: Product[];
};

const categoryData: Record<string, CategoryData> = {
  men: {
    title: "Men's Collection",
    tagline: "Bold & Refined — Premium Knitwear for the Modern Man",
    accent: "from-[hsl(220,25%,10%)] to-[hsl(220,30%,18%)]",
    products: [
      { image: menJacket1, subcategory: "Jackets" },
      { image: menJacket2, subcategory: "Jackets" },
      { image: menCoats1, subcategory: "Coats" },
      { image: menCoats2, subcategory: "Coats" },
      { image: menCoats3, subcategory: "Coats" },
      { image: menHoodies1, subcategory: "Hoodies" },
      { image: menHoodies2, subcategory: "Hoodies" },
      { image: menHoodies3, subcategory: "Hoodies" },
      { image: menSweatshirts1, subcategory: "Sweatshirts" },
      { image: menSweatshirts2, subcategory: "Sweatshirts" },
      { image: menTshirts1, subcategory: "T-Shirts" },
      { image: menTshirts2, subcategory: "T-Shirts" },
      { image: menTshirts3, subcategory: "T-Shirts" },
      { image: menLower1, subcategory: "Lowers" },
      { image: menLower2, subcategory: "Lowers" },
      { image: menLower3, subcategory: "Lowers" },
      { image: menThermal1, subcategory: "Thermal" },
      { image: menThermal2, subcategory: "Thermal" },
    ],
  },
  women: {
    title: "Women's Collection",
    tagline: "Feminine Elegance — Timeless Silhouettes in Premium Knitwear",
    accent: "from-[hsl(220,20%,10%)] to-[hsl(340,15%,18%)]",
    products: [
      { image: womenJacket1, subcategory: "Jackets" },
      { image: womenJacket2, subcategory: "Jackets" },
      { image: womenJacket3, subcategory: "Jackets" },
      { image: womenCoat1, subcategory: "Coats" },
      { image: womenCoat2, subcategory: "Coats" },
      { image: womenCoat3, subcategory: "Coats" },
      { image: womenHoodies1, subcategory: "Hoodies" },
      { image: womenHoodies2, subcategory: "Hoodies" },
      { image: womenHoodies3, subcategory: "Hoodies" },
      { image: womenSweatshirts1, subcategory: "Sweatshirts" },
      { image: womenSweatshirts2, subcategory: "Sweatshirts" },
      { image: womenSweatshirts3, subcategory: "Sweatshirts" },
      { image: womenThermal1, subcategory: "Thermal" },
      { image: womenThermal2, subcategory: "Thermal" },
      { image: womenCardigans1, subcategory: "Cardigans" },
      { image: womenCardigans2, subcategory: "Cardigans" },
    ],
  },
  kids: {
    title: "Kids' Collection",
    tagline: "Playful & Cozy — High-Quality Clothing for Little Adventurers",
    accent: "from-[hsl(220,20%,10%)] to-[hsl(38,15%,18%)]",
    products: [
      { image: kidsJacket1, subcategory: "Jackets" },
      { image: kidsJacket2, subcategory: "Jackets" },
      { image: kidsJacket3, subcategory: "Jackets" },
      { image: kidsCoat1, subcategory: "Coats" },
      { image: kidsCoat2, subcategory: "Coats" },
      { image: kidsCoat3, subcategory: "Coats" },
      { image: kidsHoodies1, subcategory: "Hoodies" },
      { image: kidsHoodies2, subcategory: "Hoodies" },
      { image: kidsSweaters1, subcategory: "Sweaters" },
      { image: kidsSweaters2, subcategory: "Sweaters" },
      { image: kidsSweaters3, subcategory: "Sweaters" },
      { image: kidsThermal1, subcategory: "Thermal" },
      { image: kidsThermal2, subcategory: "Thermal" },
      { image: kidsThermal3, subcategory: "Thermal" },
    ],
  },
};

// ── Image Lightbox with zoom ─────────────────────────────────────────────────
const ImageLightbox = ({
  images,
  currentIndex,
  onClose,
  onNavigate,
}: {
  images: Product[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
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
      <div className="w-full md:w-[400px] lg:w-[480px] bg-background flex flex-col h-[65vh] md:h-full border-l border-border/20 shadow-[-10px_0_30px_rgba(0,0,0,0.5)] z-20 flex-shrink-0">
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
      </div>
    </motion.div>
  );
};

// ── Single product card
const ProductCard = ({
  product,
  index,
  onClick,
}: {
  product: Product;
  index: number;
  onClick: () => void;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-lg bg-section-alt corporate-card cursor-pointer"
      onClick={onClick}
    >
      {/* Image */}
      <div className="aspect-[3/4] overflow-hidden">
        <img
          src={product.image}
          alt={product.subcategory}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />
      </div>

      {/* Subcategory badge */}
      <div className="absolute top-3 left-3">
        <span className="bg-[hsl(220,25%,12%)]/85 dark:bg-white/15 backdrop-blur-sm text-white text-[10px] font-semibold tracking-[0.15em] uppercase px-3 py-1 rounded-md">
          {product.subcategory}
        </span>
      </div>

      {/* Zoom hint overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 backdrop-blur-sm rounded-full p-3">
          <ZoomIn size={20} className="text-white" />
        </div>
      </div>
    </motion.div>
  );
};

// ── Main page
const CategoryPage = () => {
  const { gender } = useParams<{ gender: string }>();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("All");

  useEffect(() => {
    setSelectedSubcategory("All");
  }, [gender]);

  if (!gender || !categoryData[gender]) {
    return <Navigate to="/" replace />;
  }

  const data = categoryData[gender];

  // other gender links
  const others = Object.keys(categoryData).filter((k) => k !== gender);

  const subcategories = ["All", ...Array.from(new Set(data.products.map(p => p.subcategory)))];
  const filteredProducts = selectedSubcategory === "All" 
    ? data.products 
    : data.products.filter(p => p.subcategory === selectedSubcategory);

  return (
    <div className="min-h-screen bg-background flex flex-col pt-20">
      <Navbar />

      {/* ── Hero banner */}
      <div className={`bg-gradient-to-br ${data.accent} text-white px-6 py-20 md:py-24 text-center`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          <p className="text-[10px] uppercase tracking-[0.45em] opacity-50 mb-4 font-semibold">
            Urban Grand
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            {data.title}
          </h1>
          <div className="h-[2px] bg-[hsl(38,60%,50%)] w-14 mt-5 mx-auto" />
          <p className="mt-4 max-w-xl mx-auto text-sm opacity-60 leading-relaxed">
            {data.tagline}
          </p>
        </motion.div>
      </div>

      {/* ── Category tabs */}
      <div className="sticky top-20 z-40 bg-background/95 backdrop-blur-md border-b border-border/40 shadow-sm flex flex-col">
        {/* Main Categories */}
        <div className="max-w-7xl mx-auto w-full px-6 flex items-center gap-1 h-12 overflow-x-auto">
          {Object.entries(categoryData).map(([key, cat]) => (
            <Link
              key={key}
              to={`/category/${key}`}
              className={`px-5 py-1.5 text-[11px] font-semibold tracking-[0.15em] uppercase rounded-md transition-all whitespace-nowrap ${key === gender
                ? "bg-foreground text-background"
                : "text-muted-medium hover:text-foreground"
                }`}
            >
              {cat.title.split("'")[0]}
            </Link>
          ))}
        </div>
        {/* Subcategories Filter */}
        <div>
          <div className="max-w-7xl mx-auto w-full px-6 flex items-center gap-1 h-12 overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {subcategories.map(sub => (
              <button
                key={sub}
                onClick={() => setSelectedSubcategory(sub)}
                className={`px-5 py-1.5 text-[11px] font-semibold tracking-[0.15em] uppercase rounded-md transition-all whitespace-nowrap ${
                  selectedSubcategory === sub
                    ? "bg-foreground text-background"
                    : "text-muted-medium hover:text-foreground"
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Product grid */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 lg:px-12 py-12 md:py-16">
        {/* Count label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={`${gender}-${selectedSubcategory}`}
          className="flex items-center justify-between mb-8"
        >
          <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground font-semibold">
            {filteredProducts.length} Products
          </p>
          <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground font-semibold">
            {selectedSubcategory === "All" ? data.title : `${data.title} - ${selectedSubcategory}`}
          </p>
        </motion.div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-muted-medium">
            <p>No products found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {filteredProducts.map((product, i) => (
              <ProductCard
                key={`${product.subcategory}-${i}`}
                product={product}
                index={i}
                onClick={() => setLightboxIndex(i)}
              />
            ))}
          </div>
        )}

        {/* Browse other categories */}
        {others.length > 0 && (
          <div className="mt-16 text-center border-t border-border/30 pt-12 flex items-center justify-center gap-4 flex-wrap">
            <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
              Browse
            </span>
            {others.map((key) => (
              <Link
                key={key}
                to={`/category/${key}`}
                className="text-[11px] uppercase tracking-widest font-semibold text-foreground/70 hover:text-foreground underline-offset-4 hover:underline transition-colors"
              >
                {categoryData[key].title.split("'")[0]}
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <ImageLightbox
            images={filteredProducts}
            currentIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={(i) => setLightboxIndex(i)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoryPage;
