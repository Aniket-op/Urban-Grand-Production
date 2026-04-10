import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import customerSatisfactionLogo from "@/assets/logos/Customer satisfaction.jpg";
import madeInIndiaLogo from "@/assets/logos/Made in India.jpg";
import qualityAssuranceLogo from "@/assets/logos/Quality Assurance.jpg";
import timelyDeliveryLogo from "@/assets/logos/Timely delivery.jpg";

const commitments = [
  {
    logo: customerSatisfactionLogo,
    title: "Customer Satisfaction",
    description: "Ensuring 100% customer delight",
  },
  {
    logo: madeInIndiaLogo,
    title: "Made in India",
    description: "Proudly manufactured in India",
  },
  {
    logo: qualityAssuranceLogo,
    title: "Quality Assurance",
    description: "Uncompromising quality standards",
  },
  {
    logo: timelyDeliveryLogo,
    title: "Timely Delivery",
    description: "On-time delivery, every time",
  },
];

const OurCommitment = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="w-full py-8 sm:py-12 lg:py-16 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-14">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground font-semibold mb-4">
            Why Choose Us
          </p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.8rem] font-bold uppercase tracking-[0.06em] sm:tracking-[0.08em] text-foreground">
            Our Commitment
          </h2>
          <div className="h-[2px] bg-[hsl(38,60%,50%)] w-14 mt-5 mx-auto" />
        </motion.div>

        {/* Commitment cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 md:gap-6 lg:gap-8">
          {commitments.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="corporate-card rounded-xl p-4 sm:p-6 md:p-8 flex flex-col items-center justify-start text-center"
            >
              <div className="h-20 md:h-24 w-full max-w-[120px] flex items-center justify-center mb-5 bg-white dark:bg-zinc-800 rounded-lg p-2 border border-border/40">
                <img
                  src={item.logo}
                  alt={item.title}
                  className="max-h-full max-w-full object-contain mix-blend-multiply dark:mix-blend-normal"
                />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-2 text-[15px]" title={item.title}>{item.title}</h3>
              <p className="text-sm text-muted-medium leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurCommitment;
