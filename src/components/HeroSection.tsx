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
    <section className="relative h-screen w-full overflow-hidden">
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


      {/* Text content */}
      <div className="absolute inset-0 flex items-center">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 md:px-12 md:max-w-[55%] md:ml-[4%] md:mr-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <h1 className="font-display sm:text-4xl md:text-5xl lg:text-[4rem] font-bold leading-[1] sm:leading-[0.95] tracking-[-0.02em] text-white">
              Driven by Quality,
              <br />
              Defined by Precision
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-7 sm:mt-10 flex items-center gap-4"
          >
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
    </section >
  );
};

export default HeroSection;
