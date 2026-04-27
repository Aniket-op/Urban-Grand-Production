import { useState, useEffect, useRef } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Download } from "lucide-react";
import { motion, useInView } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { aboutContent } from "@/data/aboutContent";
import brochurePdf from "@/assets/PANCHSHEEL-PROFILE-LATEST.pdf";

const ImageCarousel = ({ images, title, idx, isCertificate = false }: { images: string[], title: string, idx: number, isCertificate?: boolean }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000 + (idx % 3) * 500); // stagger animations
    return () => clearInterval(timer);
  }, [images.length, idx]);

  return (
    <div className={`relative w-full overflow-hidden bg-black/5 ${isCertificate ? 'h-[60vh] md:h-[70vh] bg-white' : 'h-[50vh] md:h-[60vh] lg:h-[75vh]'}`}>
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          alt={`${title} section ${idx + 1} image ${i + 1}`}
          className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${isCertificate ? 'object-contain p-4' : 'object-cover group-hover:scale-[1.04]'} ${i === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        />
      ))}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
        {images.map((_, i) => (
          <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-black/70 scale-125' : 'bg-black/30'} ${!isCertificate && (i === currentIndex ? '!bg-white' : '!bg-white/50')}`} />
        ))}
      </div>
    </div>
  );
};

const SectionRow = ({
  heading,
  content,
  hideImage,
  customImage,
  logo,
  idx,
  section,
  title,
  images
}: any) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const isEven = idx % 2 === 0;
  const imageRight = isEven; // Even rows: Image on right.

  const currentImages = customImage || images;

  if (hideImage) {
    return (
      <div ref={ref} className={`w-full py-16 md:py-24 transition-colors duration-500 ${!imageRight ? "bg-[#FAF9F6] dark:bg-zinc-800/40" : ""}`}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1.2 }}
            className="flex flex-col items-center text-center justify-center space-y-6 w-full lg:w-8/12 mx-auto"
          >
            {heading && (
              <div className="flex flex-col items-center gap-4">
                {logo && <img src={logo} alt={`${heading} logo`} className="h-[80px] w-auto object-contain mix-blend-multiply dark:mix-blend-normal rounded-md" />}
                <h2 className="font-display font-bold text-3xl md:text-4xl dark:text-white">
                  {heading}
                </h2>
                <div className="h-[2px] bg-[hsl(38,60%,50%)] w-14 my-2" />
              </div>
            )}
            <p className="text-muted-medium dark:text-zinc-300 leading-relaxed text-lg">
              {content}
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`w-full py-16 md:py-24 transition-colors duration-500 ${!imageRight ? "bg-[#FAF9F6] dark:bg-zinc-800/40" : ""}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 lg:gap-16">
          
          {/* ── Content Column ───────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: imageRight ? -60 : 60 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: imageRight ? -60 : 60 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className={`flex flex-col justify-center gap-7 w-full pt-8 md:pt-0 ${imageRight ? "md:order-first md:pr-8 lg:pr-16" : "md:order-last md:pl-8 lg:pl-16"}`}
          >
            <div>
              {logo && (
                <img src={logo} alt={`${heading} logo`} className="h-[60px] w-auto object-contain mix-blend-multiply dark:mix-blend-normal rounded-md mb-6" />
              )}

              {heading && (
                <h2 className="font-display font-bold text-3xl md:text-4xl dark:text-white">
                  {heading}
                </h2>
              )}

              {heading && <div className="h-[2px] bg-[hsl(38,60%,50%)] w-14 my-5" />}

              <p className="text-muted-medium dark:text-zinc-300 leading-relaxed text-lg">
                {content}
              </p>
            </div>
          </motion.div>

          {/* ── Image Column ─────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: imageRight ? 60 : -60 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: imageRight ? 60 : -60 }}
            transition={{ duration: 1.2 }}
            className={`relative w-full flex-shrink-0 ${imageRight ? "md:order-last" : "md:order-first"}`}
          >
            <div
              className={`relative overflow-hidden rounded-lg w-full group cursor-pointer ${imageRight ? "cardboard-shadow-left" : "cardboard-shadow-right"}`}
            >
              <ImageCarousel images={currentImages} title={heading || title} idx={idx} isCertificate={section === 'company-credentials'} />
            </div>

            {/* Decorative accent line and glow */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 3, delay: 0.6 }}
              className={`absolute top-8 bottom-8 w-[3px] bg-[hsl(38,60%,50%)] glow-accent-shadow origin-top rounded-full z-10 ${imageRight ? "-right-2 sm:-right-3 md:-right-4" : "-left-2 sm:-left-3 md:-left-4"}`}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const AboutCategory = () => {
  const { section } = useParams<{ section: string }>();

  if (!section || !aboutContent[section]) {
    // If not found, redirect to general About Us page
    return <Navigate to="/about" replace />;
  }

  const data = aboutContent[section];

  return (
    <div className="min-h-screen bg-background flex flex-col pt-20">
      <Navbar />

      <main className="flex-1 w-full pt-16 md:pt-24 pb-0">

        {/* Header Section */}
        <div className="max-w-[1400px] mx-auto px-6 text-center space-y-4 animate-fade-in mb-16 md:mb-24">
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-soft font-semibold border-b-2 border-[hsl(38,60%,50%)]/50 pb-2 inline-block">
            About Panchsheel Knitwears
          </span>
          <h1 className="font-display font-bold text-4xl md:text-5xl leading-tight text-foreground tracking-tight">
            {data.title}
          </h1>
          <div className="h-[2px] bg-[hsl(38,60%,50%)] w-14 mx-auto mt-4" />
        </div>

        {/* Zig-Zag Content Rows */}
        <div className="flex flex-col w-full">
          {data.description.map((row, idx) => (
            <SectionRow 
              key={idx}
              {...row}
              idx={idx}
              section={section}
              title={data.title}
              images={data.images}
            />
          ))}
        </div>
        
        {section === "our-legacy" && (
          <div className="pb-16 md:pb-24 pt-8">
            <a
              href={brochurePdf}
              download="PANCHSHEEL_BROCHURE.pdf"
              className="mx-auto flex w-fit items-center gap-2 bg-foreground text-background px-6 py-3.5 rounded-md font-semibold tracking-wide hover:opacity-90 transition-elegant text-sm"
            >
              <Download size={18} />
              Download Brochure
            </a>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default AboutCategory;
