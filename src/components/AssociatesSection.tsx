import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import associate1 from "@/assets/associate1_montecarlo.png";
import associate2 from "@/assets/associate2_killerKing.png";
import associate3 from "@/assets/associate3_duke.jpg";
import associate4 from "@/assets/associate4_cobb.jpg";
import associate5 from "@/assets/associate5_klubFox.webp";
import associate6 from "@/assets/associate6_duke.jpg";
import associate7 from "@/assets/associate7.png";
import associate8 from "@/assets/associate8_meemee.png";

const associateImages = [
  associate1,
  associate2,
  associate3,
  associate4,
  associate5,
  associate6,
  associate7,
  associate8,
];

const AssociatesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="w-full py-8 sm:py-12 lg:py-16 bg-[#FAF9F6] overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-14">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-6"
        >
          <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground font-semibold mb-4">
            Trusted Partners
          </p>
          <h2 className="text-center font-display text-4xl sm:text-3xl md:text-4xl lg:text-[2.8rem] font-bold uppercase tracking-[0.06em] sm:tracking-[0.08em] text-foreground">
            Our Associates
          </h2>
          <div className="h-[2px] bg-[hsl(38,60%,50%)] w-14 mt-5 mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <p className="text-base text-muted-medium leading-relaxed text-justify">
            We partner with brands that value quality, consistency, and growth. We go beyond manufacturing —
          </p>
          <p className="text-base text-muted-medium leading-relaxed mt-2 text-justify">We become an extension of your brand, delivering products that align with your vision, market positioning and customer expectations.</p>
        </motion.div>
      </div>

      {/* Infinite Carousel */}
      <div className="relative w-full flex overflow-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-24 before:bg-gradient-to-r before:from-[hsl(215,18%,96%)] dark:before:from-[hsl(220,18%,8%)] before:to-transparent before:content-[''] after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-24 after:bg-gradient-to-l after:from-[hsl(215,18%,96%)] dark:after:from-[hsl(220,18%,8%)] after:to-transparent after:content-['']">
        {/* We use two sets of images to create a seamless infinite loop */}
        <div className="flex w-max animate-scroll gap-6 sm:gap-10 lg:gap-14 px-4 hover:[animation-play-state:paused]">
          {[...associateImages, ...associateImages].map((img, index) => (
            <div
              key={index}
              className="group flex flex-col justify-center items-center w-[140px] sm:w-[180px] md:w-[220px] h-[90px] sm:h-[110px] rounded-lg bg-white dark:bg-zinc-800/80 border border-border/60 overflow-hidden shrink-0 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <img
                src={img}
                alt={`Associate ${index}`}
                className="w-full h-full object-contain p-4 group-hover:scale-110 transition-all duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AssociatesSection;
