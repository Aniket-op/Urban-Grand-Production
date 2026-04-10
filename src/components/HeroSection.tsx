import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Link } from "react-router-dom";
import heroVideo from "@/assets/video/hero_video.mp4";

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  // Ensure autoplay works (browsers require muted for autoplay)
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play().catch(() => { });
    }
  }, []);

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setMuted(video.muted);
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[hsl(220,25%,8%)]">
      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />

      {/* Gradient overlays for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 via-50% to-black/15 sm:from-black/85 sm:via-black/50 sm:via-45% sm:to-black/10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 sm:from-black/60 sm:via-transparent to-transparent pointer-events-none" />

      {/* Text content */}
      <div className="absolute inset-0 flex items-center">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 md:px-12 md:max-w-[55%] md:ml-[4%] md:mr-auto">
          {/* Established badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-5 sm:mb-6"
          >
            <span className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-white font-medium border border-white/15 px-3 sm:px-4 py-1.5 rounded-sm backdrop-blur-sm bg-white/[.1]">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              Established 1978
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <h1 className="font-display text-[2rem] sm:text-4xl md:text-5xl lg:text-[5.5rem] font-bold leading-[1] sm:leading-[0.95] tracking-[-0.02em] text-white">
              Premium Line by
              <br />
              <span className="italic font-normal">Panchsheel Knitwears</span>
            </h1>
            <p className="mt-4 sm:mt-8 max-w-md font-body text-2xl sm:text-lg md:text-3xl font-light tracking-wide text-white/70 leading-relaxed">
              Driven by Quality, Defined by Precision
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-7 sm:mt-10 flex items-center gap-4"
          >
            <Link
              to="/about/category/mission-vision"
              className="group bg-white text-black px-6 sm:px-8 py-3.5 sm:py-4 rounded-md text-[11px] sm:text-[12px] font-bold tracking-[0.15em] uppercase hover:bg-white/90 transition-elegant text-center inline-flex items-center gap-2"
            >
              Our Vision
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
            <Link
              to="/contact"
              className="group px-6 sm:px-8 py-3.5 sm:py-4 rounded-md text-[11px] sm:text-[12px] font-semibold tracking-[0.15em] uppercase text-white border border-white/25 hover:bg-white/10 hover:border-white/40 transition-elegant text-center inline-flex items-center gap-2 backdrop-blur-sm"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Mute / Unmute button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        onClick={toggleMute}
        className="absolute bottom-8 right-5 sm:bottom-10 sm:right-8 z-10 flex items-center gap-2 px-4 py-2.5 rounded-md border border-white/15 bg-black/30 backdrop-blur-md text-white/70 hover:text-white hover:bg-black/50 hover:border-white/25 transition-all duration-300 group"
        aria-label={muted ? "Unmute video" : "Mute video"}
      >
        {muted ? (
          <VolumeX size={18} className="group-hover:scale-110 transition-transform" />
        ) : (
          <Volume2 size={18} className="group-hover:scale-110 transition-transform" />
        )}
        <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-medium hidden sm:inline">
          {muted ? "Unmute" : "Mute"}
        </span>
      </motion.button>

      {/* Bottom gradient fade for smooth section transition */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
