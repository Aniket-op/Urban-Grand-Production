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
      className="w-full pt-6 sm:pt-10 md:pt-14 pb-4 sm:pb-6 md:pb-8 bg-background dark:bg-zinc-900 transition-colors duration-500 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-2 sm:px-3 md:px-4 lg:px-6 grid grid-cols-1 md:grid-cols-2 sm:gap-16 md:gap-24 items-center">
        {/* Left — Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative group"
          style={{
            boxShadow: "15px 15px 25px -5px rgba(0,0,0,0.35)",
          }}
        >
          <div className="relative overflow-hidden rounded-lg shadow-xl shadow-black/[0.08]">
            <img
              src={legacyImg}
              alt="Urban Grand Heritage"
              className="w-full h-[80vh] object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            />
            {/* Accent border */}
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-lg pointer-events-none" />
          </div>

          {/* Decorative accent line and glow */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute -left-2 sm:-left-3 lg:-left-4 top-8 bottom-8 w-[3px] bg-[hsl(38,60%,50%)] shadow-[0_0_15px_rgba(212,175,55,0.7)] origin-top rounded-full z-10"
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
            className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground dark:text-zinc-400 font-semibold mb-5"
          >
            Our Story
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.05] tracking-[-0.01em] text-foreground dark:text-white mb-2"
          >
            Who We Are
          </motion.h2>

          {/* Animated underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="h-[2px] bg-[hsl(38,60%,50%)] w-16 origin-left mb-5"
          />

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="space-y-5 text-justify"
          >
            <p className="text-base sm:text-lg md:text-xl text-muted-medium dark:text-zinc-300 leading-relaxed">
              Urban Grand is the premium fashion label of{" "}
              <span className="font-semibold text-foreground dark:text-white">Panchsheel Knitwears</span> — a legacy
              built over decades of precision craftsmanship and an unwavering commitment to quality.
            </p>
            <p className="text-base sm:text-lg md:text-xl text-muted-medium dark:text-zinc-300 leading-relaxed">
              From the looms of Ludhiana to wardrobes across India, we design knitwear that tells a
              story — where tradition meets modern silhouette. Every stitch reflects the care of
              skilled artisans and the vision of a brand that has always put quality first.
            </p>
            <p className="text-base sm:text-lg md:text-xl text-muted-medium dark:text-zinc-300 leading-relaxed">
              We cater to men, women, and children — offering timeless cuts, premium yarns, and
              seasonal collections that define contemporary Indian fashion.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="mt-6 flex items-center gap-6"
          >
            <Link
              to="/about/category/our-legacy"
              className="group inline-flex items-center gap-3 bg-foreground dark:bg-white text-background dark:text-black px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase hover:opacity-85 transition-all duration-300 rounded-md"
            >
              Know More
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section >
  );
};

export default WhoWeAre;
