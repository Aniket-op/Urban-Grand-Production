import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ── Temporary placeholder images from Unsplash (garment / textile themed) ──
const serviceImages: Record<string, string[]> = {
  "garment-manufacturing": [
    "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80",
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80",
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80",
  ],
  "private-label": [
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
    "https://images.unsplash.com/photo-1545291730-faff8ca1d4b0?w=800&q=80",
    "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80",
  ],
  "oem-odm": [
    "https://images.unsplash.com/photo-1605289982774-9a6fef564df8?w=800&q=80",
    "https://images.unsplash.com/photo-1614676471928-2ed0ad1061a4?w=800&q=80",
    "https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?w=800&q=80",
  ],
  "product-development": [
    "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=800&q=80",
    "https://images.unsplash.com/photo-1626456823899-3b2fd87745a3?w=800&q=80",
    "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=800&q=80",
  ],
  "fabric-sourcing": [
    "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=80",
    "https://images.unsplash.com/photo-1586349906319-47f4e68ba013?w=800&q=80",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  ],
  "quality-assurance": [
    "https://images.unsplash.com/photo-1574179807066-4a7a8e69e459?w=800&q=80",
    "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=800&q=80",
    "https://images.unsplash.com/photo-1574180566232-aaad1b5b8450?w=800&q=80",
  ],
  "export-logistics": [
    "https://images.unsplash.com/photo-1494961104209-3c223057bd26?w=800&q=80",
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
    "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&q=80",
  ],
  "fashion-brand": [
    "https://images.unsplash.com/photo-1558618047-3d15a8b3c8b2?w=800&q=80",
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
  ],
};

// ── Image Carousel (reused pattern from AboutCategory) ──────────────────────

const ImageCarousel = ({
  images,
  title,
  idx,
}: {
  images: string[];
  title: string;
  idx: number;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000 + (idx % 3) * 500);
    return () => clearInterval(timer);
  }, [images.length, idx]);

  return (
    <div className="relative w-full overflow-hidden bg-black/5 h-[50vh] md:h-[60vh] lg:h-[75vh]">
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          alt={`${title} image ${i + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out group-hover:scale-[1.04] ${
            i === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        />
      ))}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
        {images.map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              i === currentIndex ? "bg-white scale-125" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// ── Service bullet list ──────────────────────────────────────────────────────
const BulletList = ({ items }: { items: string[] }) => (
  <ul className="mt-4 space-y-2">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-2.5 text-muted-medium dark:text-zinc-300 text-[15px]">
        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[hsl(38,60%,50%)] flex-shrink-0" />
        {item}
      </li>
    ))}
  </ul>
);

// ── Individual service row ────────────────────────────────────────────────────
interface ServiceRowProps {
  idx: number;
  heading: string;
  subheading: string;
  body: string;
  bullets: string[];
  imageKey: string;
}

const ServiceRow = ({
  idx,
  heading,
  subheading,
  body,
  bullets,
  imageKey,
}: ServiceRowProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const imageRight = idx % 2 === 0;
  const images = serviceImages[imageKey] ?? serviceImages["garment-manufacturing"];

  return (
    <div
      ref={ref}
      className={`w-full py-16 md:py-24 transition-colors duration-500 ${
        !imageRight ? "bg-[#FAF9F6] dark:bg-zinc-800/40" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 lg:gap-16">

          {/* ── Content Column ─────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: imageRight ? -60 : 60 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: imageRight ? -60 : 60 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className={`flex flex-col justify-center gap-5 w-full pt-8 md:pt-0 ${
              imageRight
                ? "md:order-first md:pr-8 lg:pr-16"
                : "md:order-last md:pl-8 lg:pl-16"
            }`}
          >
            <div>
              <h2 className="font-display font-bold text-3xl md:text-4xl dark:text-white leading-tight">
                {heading}
              </h2>
              <div className="h-[2px] bg-[hsl(38,60%,50%)] w-14 my-4" />
              <p className="text-[13px] uppercase tracking-[0.18em] text-[hsl(38,60%,45%)] font-semibold italic mb-3">
                {subheading}
              </p>
              <p className="text-muted-medium dark:text-zinc-300 leading-relaxed text-[15px]">
                {body}
              </p>
              <BulletList items={bullets} />
            </div>
          </motion.div>

          {/* ── Image Column ──────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: imageRight ? 60 : -60 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: imageRight ? 60 : -60 }}
            transition={{ duration: 1.2 }}
            className={`relative w-full flex-shrink-0 ${
              imageRight ? "md:order-last" : "md:order-first"
            }`}
          >
            <div
              className={`relative overflow-hidden rounded-lg w-full group cursor-pointer ${
                imageRight ? "cardboard-shadow-left" : "cardboard-shadow-right"
              }`}
            >
              <ImageCarousel images={images} title={heading} idx={idx} />
            </div>

            {/* Decorative accent line */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 3, delay: 0.6 }}
              className={`absolute top-8 bottom-8 w-[3px] bg-[hsl(38,60%,50%)] glow-accent-shadow origin-top rounded-full z-10 ${
                imageRight
                  ? "-right-2 sm:-right-3 md:-right-4"
                  : "-left-2 sm:-left-3 md:-left-4"
              }`}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// ── Services data ─────────────────────────────────────────────────────────────
const services: Omit<ServiceRowProps, "idx">[] = [
  {
    heading: "Garment Manufacturing",
    subheading: "Premium Bulk Garment Manufacturing for Global Brands",
    body: "Urban Grand offers end-to-end garment manufacturing delivering flexible, high-quality production for brands, wholesalers and private label clients with scalable capacity and no MOQ.",
    bullets: [
      "Winter Wear Manufacturing",
      "Summer Wear Manufacturing",
      "Knitwear & Woven Garments",
      "Bulk Production Services",
    ],
    imageKey: "garment-manufacturing",
  },
  {
    heading: "Private Label Manufacturing",
    subheading: "Your Brand, Our Manufacturing Expertise",
    body: "We manufacture garments under your brand identity with complete confidentiality and precision. We support custom branding, labeling, and packaging to help you launch and scale your brand with confidence.",
    bullets: [
      "Custom Branding & Labeling",
      "Logo Printing & Embroidery",
      "Custom Packaging Solutions",
      "Style & Design Customization",
      "OEM / White Label Manufacturing",
    ],
    imageKey: "private-label",
  },
  {
    heading: "OEM / ODM Services",
    subheading: "Flexible Manufacturing Solutions Tailored to Your Brand Vision",
    body: "We support brands with reliable OEM and ODM solutions, offering flexible manufacturing based on your designs or our development expertise. We work closely with you to ensure every product meets your expectations in quality, functionality, and market readiness.",
    bullets: [
      "OEM Manufacturing Services",
      "ODM Design & Development",
      "Product Customization",
      "Pre-Production Coordination",
    ],
    imageKey: "oem-odm",
  },
  {
    heading: "Product Development & Sampling",
    subheading: "From Idea to Sample, Crafted with Precision",
    body: "We turn your ideas into well-structured prototypes that reflect your exact design vision, with our expert team refining every detail to ensure accuracy, perfect fit, and readiness for smooth bulk production.",
    bullets: [
      "Design Interpretation & Technical Support",
      "Pattern Making",
      "Sample Development",
      "Fabric & Trim Selection",
      "Fit Development & Size Grading",
      "Prototype Testing & Refinement",
    ],
    imageKey: "product-development",
  },
  {
    heading: "Fabric Sourcing",
    subheading: "Quality Materials, Responsibly Sourced",
    body: "We leverage our extensive supplier network to source premium fabrics and trims that align with your quality standards, sustainability goals, and production timelines — ensuring every garment starts with the finest materials.",
    bullets: [
      "Domestic & International Fabric Procurement",
      "Sustainable & Eco-Friendly Options",
      "Trim & Accessory Sourcing",
      "Fabric Quality Testing",
    ],
    imageKey: "fabric-sourcing",
  },
  {
    heading: "Quality Assurance",
    subheading: "Committed to Consistency, Precision, and Trusted Quality",
    body: "We focus on accuracy in measurements, stitching, and final presentation to deliver garments that meet your expectations and industry standards.",
    bullets: [
      "Fabric & Material Inspection",
      "Inline Production Inspection",
      "Final Quality Inspection",
      "Packing & Pre-Shipment Inspection",
    ],
    imageKey: "quality-assurance",
  },
  {
    heading: "Export & Logistics",
    subheading: "Seamless Global Delivery, Every Time",
    body: "Our experienced export team manages end-to-end logistics, documentation, and compliance to ensure your orders are delivered on time, anywhere in the world.",
    bullets: [
      "International Shipping & Freight",
      "Customs Clearance & Documentation",
      "Order Tracking & Transparency",
      "Flexible Incoterms Support",
    ],
    imageKey: "export-logistics",
  },
  {
    heading: "Fashion Brand Solutions",
    subheading: "Supporting Brands from Concept to Market Success",
    body: "We work closely with you to streamline production, maintain brand consistency, and help your collections reach the market with confidence.",
    bullets: [
      "Collection Planning Support",
      "Brand-Oriented Manufacturing",
      "Trend & Market Support",
      "Catalog & Launch Preparation",
    ],
    imageKey: "fashion-brand",
  },
];

// ── Why Choose section ────────────────────────────────────────────────────────
const highlights = [
  "No MOQ",
  "End-to-end support",
  "Private label capability",
  "Quality control",
  "Winter & Summer wear specialization",
];

const WhyChooseSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="w-full py-20 md:py-28 bg-[#FAF9F6] dark:bg-zinc-800/40">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1 }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-soft font-semibold border-b-2 border-[hsl(38,60%,50%)]/50 pb-2 inline-block mb-6">
            Our Advantage
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl dark:text-white mb-4 leading-tight">
            Why Choose Urban Grand?
          </h2>
          <div className="h-[2px] bg-[hsl(38,60%,50%)] w-14 mx-auto mb-10" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {highlights.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.7, delay: 0.1 * i }}
                className="flex items-center gap-3 bg-white dark:bg-zinc-700/40 rounded-xl px-5 py-4 shadow-sm border border-[hsl(38,60%,50%)]/15"
              >
                <CheckCircle2
                  size={22}
                  className="text-[hsl(38,60%,45%)] flex-shrink-0"
                />
                <span className="font-semibold text-[15px] text-foreground dark:text-white text-left">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <Link
              to="/map"
              className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-4 rounded-md font-semibold tracking-wide hover:opacity-90 transition-all duration-300 text-sm uppercase"
            >
              Contact Us
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

// ── Page ──────────────────────────────────────────────────────────────────────
const OurServices = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col pt-20">
      <Navbar />

      <main className="flex-1 w-full pt-16 md:pt-24 pb-0">

        {/* Page Header */}
        <div className="max-w-[1400px] mx-auto px-6 text-center space-y-4 animate-fade-in mb-16 md:mb-24">
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-soft font-semibold border-b-2 border-[hsl(38,60%,50%)]/50 pb-2 inline-block">
            What We Offer
          </span>
          <h1 className="font-display font-bold text-4xl md:text-5xl leading-tight text-foreground tracking-tight">
            Our Services
          </h1>
          <p className="max-w-2xl mx-auto text-muted-medium text-lg leading-relaxed">
            End-to-end garment manufacturing solutions crafted for global brands,
            private labels, and wholesale clients — with no MOQ and unmatched quality.
          </p>
          <div className="h-[2px] bg-[hsl(38,60%,50%)] w-14 mx-auto mt-4" />
        </div>

        {/* Zig-Zag Service Rows */}
        <div className="flex flex-col w-full">
          {services.map((svc, idx) => (
            <ServiceRow key={svc.heading} idx={idx} {...svc} />
          ))}
        </div>

        {/* Why Choose Urban Grand */}
        <WhyChooseSection />
      </main>

      <Footer />
    </div>
  );
};

export default OurServices;
