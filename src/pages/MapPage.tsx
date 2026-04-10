import { motion } from "framer-motion";
import { MapPin, Navigation, ExternalLink, Phone, Mail, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3422.935!2d75.857!3d30.912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDU0JzQ0LjAiTiA3NcKwNTEnMjUuMiJF!5e0!3m2!1sen!2sin!4v1";

const GOOGLE_MAPS_LINK = "https://maps.app.goo.gl/QQFf4Q21gVMyjt8F8";

const MapPage = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Hero banner */}
      <div className="border-b border-[#cd9a33]/60 text-zinc-50 px-5 sm:px-8 py-16 sm:py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[10px] text-foreground uppercase tracking-[0.4em] opacity-50 mb-4 font-medium">
            Find Us
          </p>
          <h1 className="text-foreground font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
            Our Location
          </h1>
          <div className="h-[2px] bg-[hsl(38,60%,50%)] w-14 mt-6 mx-auto" />
          <p className="mt-5 max-w-xl mx-auto text-foreground text-sm opacity-60 leading-relaxed">
            Visit our manufacturing unit and showroom in the heart of Ludhiana, Punjab.
          </p>
        </motion.div>
      </div>

      {/* Main content */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-5 sm:px-8 md:px-12 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

          {/* Map embed — takes 2/3 width on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="corporate-card rounded-xl overflow-hidden">
              {/* Map header */}
              <div className="bg-background px-5 sm:px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-[hsl(38,60%,50%)]/20 flex items-center justify-center">
                    <MapPin size={16} className="text-[hsl(38,60%,50%)]" />
                  </div>
                  <div>
                    <p className="text-foreground text-sm font-semibold">Panchsheel Knitwears</p>
                    <p className="text-foreground text-[11px]">Manufacturing Unit & Showroom</p>
                  </div>
                </div>
                <a
                  href={GOOGLE_MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-white/60 hover:text-white transition-colors font-medium"
                >
                  Open in Maps
                  <ExternalLink size={12} />
                </a>
              </div>

              {/* Map iframe */}
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-muted">
                <iframe
                  src={MAP_EMBED_URL}
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Panchsheel Knitwears Location"
                />
              </div>

              {/* Map footer */}
              <div className="px-5 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-background border-t border-border/30">
                <div className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <Navigation size={14} className="mt-0.5 flex-shrink-0 text-[hsl(38,60%,50%)]" />
                  <span>213/15-C, New Kundan Puri, Civil Lines, Ludhiana – 141001, Punjab</span>
                </div>
                <a
                  href={GOOGLE_MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background text-[11px] font-bold tracking-[0.15em] uppercase rounded-md hover:opacity-85 transition-elegant flex-shrink-0"
                >
                  Get Directions
                  <span>→</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact info sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="space-y-6"
          >
            {/* Address card */}
            <div className="corporate-card rounded-xl p-6 sm:p-7">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-md bg-[hsl(38,60%,50%)]/10 flex items-center justify-center">
                  <MapPin size={18} className="text-[hsl(38,60%,50%)]" />
                </div>
                <h3 className="font-heading font-semibold text-foreground text-[15px]">Address</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                213/15-C, New Kundan Puri,<br />
                Civil Lines, Ludhiana – 141001,<br />
                Punjab, India
              </p>
            </div>

            {/* Phone card */}
            <div className="corporate-card rounded-xl p-6 sm:p-7">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-md bg-[hsl(38,60%,50%)]/10 flex items-center justify-center">
                  <Phone size={18} className="text-[hsl(38,60%,50%)]" />
                </div>
                <h3 className="font-heading font-semibold text-foreground text-[15px]">Phone</h3>
              </div>
              <div className="space-y-2">
                <a href="tel:+917696880871" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                  (+91) 76968-80871
                </a>
                <a href="tel:+919417015928" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                  (+91) 94170-15928
                </a>
                <a href="tel:+919888891485" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                  (+91) 98888-91485
                </a>
              </div>
            </div>

            {/* Email card */}
            <div className="corporate-card rounded-xl p-6 sm:p-7">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-md bg-[hsl(38,60%,50%)]/10 flex items-center justify-center">
                  <Mail size={18} className="text-[hsl(38,60%,50%)]" />
                </div>
                <h3 className="font-heading font-semibold text-foreground text-[15px]">Email</h3>
              </div>
              <a href="mailto:urbangrand78@gmail.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors break-all">
                urbangrand78@gmail.com
              </a>
            </div>

            {/* Hours card */}
            {/* <div className="corporate-card rounded-xl p-6 sm:p-7">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-md bg-[hsl(38,60%,50%)]/10 flex items-center justify-center">
                  <Clock size={18} className="text-[hsl(38,60%,50%)]" />
                </div>
                <h3 className="font-heading font-semibold text-foreground text-[15px]">Business Hours</h3>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Monday – Saturday</span>
                  <span className="font-medium text-foreground">9:00 AM – 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-medium text-foreground/60">Closed</span>
                </div>
              </div>
            </div> */}
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MapPage;
