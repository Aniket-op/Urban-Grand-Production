import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Download } from "lucide-react";
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
    <div className={`relative w-full max-w-md overflow-hidden rounded-xl shadow-xl shadow-black/[0.08] group/carousel ${isCertificate ? 'aspect-[3/4] bg-white' : 'aspect-[4/3] md:aspect-[3/2] lg:aspect-[4/3]'}`}>
      <div className="absolute inset-0 bg-black/5 z-10 pointer-events-none" />
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          alt={`${title} section ${idx + 1} image ${i + 1}`}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${isCertificate ? 'object-contain p-2' : 'object-cover'} ${i === currentIndex ? 'opacity-100 block' : 'opacity-0'}`}
        />
      ))}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
        {images.map((_, i) => (
          <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-black/70 scale-125' : 'bg-black/30'} ${!isCertificate && (i === currentIndex ? '!bg-white' : '!bg-white/50')}`} />
        ))}
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

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-6 py-16 md:py-24 space-y-24 md:space-y-32">

        {/* Header Section */}
        <div className="text-center space-y-4 animate-fade-in">
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-soft font-semibold border-b-2 border-[hsl(38,60%,50%)]/50 pb-2 inline-block">
            About Panchsheel Knitwears
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground tracking-tight">
            {data.title}
          </h1>
          <div className="h-[2px] bg-[hsl(38,60%,50%)] w-14 mx-auto mt-2" />
        </div>

        {/* Zig-Zag Content Rows */}
        <div className="flex flex-col gap-20 md:gap-32">
          {data.description.map(({ heading, content, hideImage, customImage, logo }, idx) => {
            const isEven = idx % 2 === 0;
            const hasBg = idx % 2 !== 0;

            return (
              <div
                key={idx}
                className={`flex flex-col ${hideImage ? 'items-center text-center' : isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center justify-center gap-12 lg:gap-24 group ${hasBg ? 'bg-black/[0.03] dark:bg-white/[0.03] p-8 md:p-12 lg:p-16 rounded-[2rem]' : ''}`}
              >
                {/* Content Side */}
                <div className={`w-full ${hideImage ? 'lg:w-8/12 text-center' : 'lg:w-5/12'} flex flex-col justify-center space-y-6 animate-fade-in order-2 lg:order-none`}>
                  {heading && (
                    <div className={`flex items-center gap-4 border-b border-border/40 pb-3 ${hideImage ? 'mx-auto' : 'self-start'}`}>
                      {logo && <img src={logo} alt={`${heading} logo`} className="h-[80px] w-auto object-contain mix-blend-multiply dark:mix-blend-normal rounded-md" />}
                      <h3 className="text-2xl font-display font-semibold text-foreground">
                        {heading}
                      </h3>
                    </div>
                  )}
                  <p className={`text-base md:text-lg lg:text-xl text-muted-medium leading-relaxed ${hideImage ? 'text-center' : 'text-justify'}`}>
                    {content}
                  </p>
                </div>

                {/* Image Side (Carousel or Custom Image) */}
                {!hideImage && (
                  <div className="w-full lg:w-5/12 flex justify-center animate-scale-in order-1 lg:order-none">
                    {customImage ? (
                      <ImageCarousel images={customImage} title={heading || data.title} idx={idx} isCertificate={section === 'company-credentials'} />
                    ) : (
                      <ImageCarousel images={data.images} title={data.title} idx={idx} isCertificate={section === 'company-credentials'} />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {section === "our-legacy" && (
          <a
            href={brochurePdf}
            download="PANCHSHEEL_BROCHURE.pdf"
            className="mt-8 mx-auto flex w-fit items-center gap-2 bg-foreground text-background px-6 py-3.5 rounded-md font-semibold tracking-wide hover:opacity-90 transition-elegant text-sm"
          >
            <Download size={18} />
            Download Brochure
          </a>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default AboutCategory;
