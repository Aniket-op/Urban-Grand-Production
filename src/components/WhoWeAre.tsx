import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import legacyImg from "@/assets/Our-Legacy-1.png";

const WhoWeAre = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="who-we-are"
      className="w-full pt-8 sm:pt-16 md:pt-24 pb-4 sm:pb-8 md:pb-12 bg-background overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-2 sm:px-3 md:px-4 lg:px-6 grid grid-cols-1 md:grid-cols-2 sm:gap-16 md:gap-24 items-center">
        {/* Left — Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative group"
        >
          <div className="relative overflow-hidden rounded-lg shadow-xl shadow-black/[0.08]">
            <img
              src={legacyImg}
              alt="Urban Grand Heritage"
              className="w-full h-[80vh] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Accent border */}
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-lg pointer-events-none" />
          </div>
          {/* Floating accent card — corporate trust badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-6 md:-right-10 bg-[hsl(220,25%,12%)] dark:bg-[hsl(220,20%,18%)] dark:border dark:border-white/10 text-white px-5 py-4 sm:px-8 sm:py-6 shadow-2xl rounded-lg"
          >
            <span className="block text-2xl sm:text-3xl font-heading font-bold">48+</span>
            <span className="block text-[10px] tracking-[0.25em] uppercase mt-1 opacity-60 font-medium">Years of Craft</span>
          </motion.div>

          {/* Decorative accent line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute -left-4 top-8 bottom-8 w-[3px] bg-[hsl(38,60%,50%)] origin-top rounded-full hidden lg:block"
          />
        </motion.div>

        {/* Right — Text */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground font-semibold mb-5"
          >
            Our Story
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.05] tracking-[-0.01em] text-foreground mb-2"
          >
            Who We Are
          </motion.h2>

          {/* Animated underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="h-[2px] bg-[hsl(38,60%,50%)] w-16 origin-left mb-8"
          />

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="space-y-5 text-justify"
          >
            <p className="text-base sm:text-lg md:text-xl text-muted-medium leading-relaxed">
              Urban Grand is the premium fashion label of{" "}
              <span className="font-semibold text-foreground">Panchsheel Knitwears</span> — a legacy
              built over decades of precision craftsmanship and an unwavering commitment to quality.
            </p>
            <p className="text-base sm:text-lg md:text-xl text-muted-medium leading-relaxed">
              From the looms of Ludhiana to wardrobes across India, we design knitwear that tells a
              story — where tradition meets modern silhouette. Every stitch reflects the care of
              skilled artisans and the vision of a brand that has always put quality first.
            </p>
            <p className="text-base sm:text-lg md:text-xl text-muted-medium leading-relaxed">
              We cater to men, women, and children — offering timeless cuts, premium yarns, and
              seasonal collections that define contemporary Indian fashion.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="mt-10 flex items-center gap-6"
          >
            <Link
              to="/about/category/our-legacy"
              className="group inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase hover:opacity-85 transition-elegant rounded-md"
            >
              Know More
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhoWeAre;
