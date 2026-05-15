import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const timelineData = [
  {
    year: "1978",
    title: "The Beginning",
    subtitle: "Foundation of Panchsheel Knitwears",
    description: "A vision took shape when Mr. Raj Paul Gupta established the business in a modest rented workshop, guided by craftsmanship, integrity, and dedication."
  },
  {
    year: "1982",
    title: "Strengthening the Foundation",
    subtitle: "Second Generation Joins",
    description: "With the entry of Mr. Sandeep Gupta, the company evolved with strong business acumen, operational discipline, and a focus on sustainable growth."
  },
  {
    year: "1994",
    title: "A Defining Milestone",
    subtitle: "Owned Manufacturing Facility Established",
    description: "Transition from a rented unit to a fully owned factory, expanding from 180 sq. yards to 553 sq. yards, marking a new phase of scale, efficiency, and independence."
  },
  {
    year: "2014",
    title: "Design Evolution",
    subtitle: "Third Generation Joins",
    description: "Mr. Nitish Gupta brought a fresh creative direction with expertise in fashion design, aligning the company with modern trends and product innovation."
  },
  {
    year: "2017",
    title: "Global Vision & Expansion",
    subtitle: "Next Generation Leadership Strengthens",
    description: "Mr. Neelesh Gupta, with a Master’s in International Business and expertise in design, joined the business—bringing global perspective, strategic growth, and a modern approach to branding and exports."
  },
  {
    year: "Present",
    title: "Heritage Meets Modern Excellence",
    subtitle: "Continuing the Legacy",
    description: "Today, Panchsheel Knitwears stands as a seamless blend of legacy, innovation, and global capability, delivering premium knitwear solutions with consistency, quality, and trust."
  }
];

const TimelineNode = ({ isLeft, index, isActive }: { isLeft: boolean, index: number, isActive: boolean }) => {
  return (
    <motion.div 
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 200 }}
      className={`absolute top-1/2 -translate-y-1/2 flex items-center justify-center
        ${isLeft ? 'right-[-20px] md:right-[-41px]' : 'left-[-20px] md:left-[-41px]'} 
        w-8 h-8 rounded-full bg-background border transition-all duration-500 z-10
        ${isActive ? 'border-[hsl(38,60%,50%)] shadow-[0_0_15px_rgba(200,160,50,0.5)]' : 'border-border/50'}`}
    >
      <motion.div 
        animate={isActive ? { scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] } : { scale: 1, opacity: 0.3 }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className={`w-2.5 h-2.5 rounded-full transition-colors duration-500 ${isActive ? 'bg-[hsl(38,60%,50%)]' : 'bg-border/50'}`} 
      />
    </motion.div>
  );
};

const TimelineCard = ({ item, index }: { item: typeof timelineData[0], index: number }) => {
  const isLeft = index % 2 === 0;
  
  const cardRef = useRef(null);
  
  // To highlight active milestone
  const inView = useInView(cardRef, { margin: "-30% 0px -30% 0px" });

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  
  // Parallax effect with spring for smoothness
  const rawY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const y = useSpring(rawY, { stiffness: 50, damping: 20 });

  return (
    <div className={`relative flex w-full my-6 md:my-16 justify-center md:justify-between items-center flex-col md:flex-row ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
      
      {/* Spacer for desktop to push card to one side */}
      <div className="hidden md:block w-[45%]" />

      {/* Card Content */}
      <motion.div
        ref={cardRef}
        style={{ y }}
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`w-full md:w-[45%] relative z-20 group transition-all duration-700 ${inView ? 'opacity-100 scale-100' : 'opacity-60 scale-[0.98]'}`}
      >
        {/* Connector Line (Desktop) */}
        <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-10 h-[1px] bg-gradient-to-r ${isLeft ? 'right-[-40px] from-transparent to-[hsl(38,60%,50%)]' : 'left-[-40px] from-[hsl(38,60%,50%)] to-transparent'} transition-opacity duration-700 ${inView ? 'opacity-60' : 'opacity-0'}`} />

        <div className="corporate-card bg-background/60 backdrop-blur-xl p-8 md:p-10 rounded-2xl border border-border/40 cardboard-shadow-flat transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:border-[hsl(38,60%,50%)]/30 relative overflow-hidden">
          
          {/* Decorative background glow inside card */}
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-[hsl(38,60%,50%)]/5 rounded-full blur-3xl group-hover:bg-[hsl(38,60%,50%)]/15 transition-colors duration-700 pointer-events-none" />

          {/* Mobile node indicator */}
          <div className="md:hidden absolute top-0 left-0 w-[2px] h-full bg-border/30">
            <motion.div 
              className="w-full bg-[hsl(38,60%,50%)] origin-top"
              style={{ scaleY: inView ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className={`md:hidden absolute top-10 left-[-4px] w-2.5 h-2.5 rounded-full transition-all duration-500 ${inView ? 'bg-[hsl(38,60%,50%)] shadow-[0_0_10px_rgba(200,160,50,0.5)]' : 'bg-border/50'}`} />

          <div className="pl-5 md:pl-0 relative z-10">
            <motion.span 
              className="font-display text-4xl md:text-5xl font-bold text-[hsl(38,60%,50%)] block mb-4 tracking-tight drop-shadow-sm opacity-90"
            >
              {item.year}
            </motion.span>
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-3 text-foreground leading-tight">
              {item.title}
            </h3>
            <h4 className="font-heading text-xs md:text-sm uppercase tracking-[0.15em] text-foreground/60 mb-5 font-semibold border-b border-border/50 pb-4">
              {item.subtitle}
            </h4>
            <p className="font-body text-foreground/70 leading-relaxed text-[15px] font-light">
              {item.description}
            </p>
          </div>
        </div>

        {/* Node for desktop */}
        <div className="hidden md:block">
          <TimelineNode isLeft={isLeft} index={index} isActive={inView} />
        </div>
      </motion.div>
    </div>
  );
};

const LeadershipJourney = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"]
  });

  // Smoother progress for the beam
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  const pathHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  
  // The beam follows the scroll and fades at the top/bottom
  const beamOpacity = useTransform(smoothProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden selection:bg-[hsl(38,60%,50%)]/30">
      
      {/* Subtle global background texture/gradient */}
      <div className="fixed inset-0 pointer-events-none -z-20 flex items-center justify-center overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] rounded-full bg-[hsl(38,60%,50%)]/[0.02] blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-[hsl(220,25%,12%)]/[0.03] blur-[100px]" />
      </div>

      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-[180px] pb-[60px] md:pt-[220px] md:pb-[100px] px-4">
        <div className="max-w-4xl mx-auto text-center z-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-eyebrow text-[hsl(38,60%,50%)] block mb-5 tracking-[0.3em]">A Heritage of Craftsmanship Since 1978</span>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight drop-shadow-sm">
              Our Leadership Journey
            </h1>
            <p className="font-body text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto font-light leading-relaxed">
              Decades of visionary leadership, relentless dedication, and an unwavering commitment to premium knitwear excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-40" ref={containerRef}>
        
        {/* Central Vertical Line Container (Desktop) */}
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-border/20 z-0">
          
          {/* Animated Fill Line */}
          <motion.div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-[hsl(38,60%,50%)] to-transparent"
            style={{ 
              height: pathHeight,
              opacity: beamOpacity
            }}
          />
          
          {/* Glowing Beam Head */}
          <motion.div 
            className="absolute left-1/2 -translate-x-1/2 w-[3px] h-32 bg-gradient-to-b from-transparent to-[hsl(38,60%,50%)] blur-[2px] rounded-full"
            style={{ 
              top: pathHeight,
              y: '-100%',
              opacity: beamOpacity
            }}
          />
        </div>

        {/* Timeline Events */}
        <div className="relative z-10 flex flex-col">
          {timelineData.map((item, index) => (
            <TimelineCard key={index} item={item} index={index} />
          ))}
        </div>

      </section>

      <Footer />
    </div>
  );
};

export default LeadershipJourney;
