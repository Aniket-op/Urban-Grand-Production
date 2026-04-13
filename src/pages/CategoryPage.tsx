import { useParams, Navigate, Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ZoomIn } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImageLightbox, { type Product } from "@/components/ImageLightbox";

import { genderMetadata, getCollectionSlides } from "@/data/ourCollection";

type CategoryData = {
  title: string;
  tagline: string;
  accent: string; // tailwind gradient class
  products: Product[];
};

// ── Dynamic Category Data ────────────────────────────────────────────────────────
const accentMap: Record<string, string> = {
  men: "from-[hsl(220,25%,10%)] to-[hsl(220,30%,18%)]",
  women: "from-[hsl(220,20%,10%)] to-[hsl(340,15%,18%)]",
  kids: "from-[hsl(220,20%,10%)] to-[hsl(38,15%,18%)]"
};

const categoryData: Record<string, CategoryData> = {};

["men", "women", "kids"].forEach(gender => {
  const meta = genderMetadata[gender];
  if (!meta) return;

  const slides = getCollectionSlides(gender);

  const products: Product[] = slides.flatMap(slide =>
    slide.subcategories.flatMap(sub =>
      sub.images.map(img => ({
        image: img,
        subcategory: slide.title // Matches old CategoryPage behavior where subcategory = "Jackets", "Coats"
      }))
    )
  );

  categoryData[gender] = {
    title: meta.title,
    tagline: meta.description,
    accent: accentMap[gender] || "from-black to-zinc-800",
    products
  };
});


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
  const { gender, subcategory } = useParams<{ gender: string; subcategory?: string }>();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("All");

  useEffect(() => {
    if (!gender || !categoryData[gender]) return;

    // Find matching subcategory if provided in URL
    if (subcategory) {
      const data = categoryData[gender];
      const availableSubs = ["All", ...Array.from(new Set(data.products.map(p => p.subcategory)))];

      const search = subcategory.toLowerCase();
      // Look for exact match or pluralization match
      const match = availableSubs.find(s =>
        s.toLowerCase() === search ||
        s.toLowerCase() === `${search}s` ||
        `${s.toLowerCase()}s` === search
      );

      setSelectedSubcategory(match || "All");
    } else {
      setSelectedSubcategory("All");
    }
  }, [gender, subcategory]);

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
      <div
        className={`bg-gradient-to-br ${data.accent} text-white px-6 min-h-[35vh] flex items-center justify-center`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="text-center"
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
                className={`px-5 py-1.5 text-[11px] font-semibold tracking-[0.15em] uppercase rounded-md transition-all whitespace-nowrap ${selectedSubcategory === sub
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
