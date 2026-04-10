import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import EnquiryForm from "@/components/EnquiryForm";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledCategory?: string;
  prefilledImage?: string;
}

const EnquiryModal = ({ isOpen, onClose, prefilledCategory, prefilledImage }: EnquiryModalProps) => {
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80]"
            onClick={onClose}
          />

          {/* Modal wrapper — flexbox centering (more reliable than translate on all viewports) */}
          <div
            className="fixed inset-0 z-[81] flex items-center justify-center p-3 sm:p-6 pointer-events-none"
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto w-full bg-background shadow-2xl rounded-sm overflow-hidden flex flex-col md:flex-row"
              style={{ maxWidth: prefilledImage ? "64rem" : "42rem", maxHeight: "90vh" }}
            >
              {/* Optional Image Column */}
              {prefilledImage && (
                <div className="hidden md:block md:w-2/5 relative flex-shrink-0 bg-muted">
                  <img
                    src={prefilledImage}
                    alt={`${prefilledCategory || 'Enquiry'} image`}
                    className="w-full h-full object-cover absolute inset-0"
                  />
                </div>
              )}

              {/* Form Column */}
              <div className={`flex flex-col flex-1 min-h-0 ${prefilledImage ? 'md:w-3/5' : 'w-full'}`}>
                {/* Header */}
                <div className="flex items-center justify-between px-4 sm:px-8 bg-background lg:px-12 py-4 sm:py-6 border-b border-border/20 flex-shrink-0">
                  <div>
                    <p className="text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.35em] uppercase text-muted-foreground font-semibold mb-1">
                      {prefilledCategory ? `${prefilledCategory.charAt(0).toUpperCase() + prefilledCategory.slice(1)} Collection` : "Get in Touch"}
                    </p>
                    <h3 className="font-display text-xl sm:text-2xl font-bold">Enquire Now</h3>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2.5 hover:bg-soft rounded-full transition-elegant text-muted-medium hover:text-foreground flex-shrink-0"
                    aria-label="Close modal"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Scrollable form body */}
                <div className="flex-1 overflow-y-auto">
                  <EnquiryForm />
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EnquiryModal;
