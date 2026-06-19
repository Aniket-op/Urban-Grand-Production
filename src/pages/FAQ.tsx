import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "What types of garments do you manufacture?",
    answer: "We manufacture a wide range of apparel including T-shirts, sweatshirts, hoodies, polo shirts, tracksuits, jackets, uniforms, kidswear, ladieswear, and custom fashion garments."
  },
  {
    question: "What is your minimum order quantity (MOQ)?",
    answer: "Our MOQ depends on the product category and customization requirements. Generally, bulk orders start from 100-300 pieces per style."
  },
  {
    question: "Do you offer private labeling and custom branding?",
    answer: "Yes. We provide complete private label manufacturing including woven labels, printed labels, hangtags, packaging, embroidery, and custom branding solutions."
  },
  {
    question: "Can you manufacture garments based on our designs?",
    answer: "Absolutely. We offer OEM and ODM services and can manufacture products according to your designs, tech packs, samples, or specifications."
  },
  {
    question: "Do you provide samples before bulk production?",
    answer: "Yes. We can develop samples for approval before commencing bulk production to ensure product quality and design accuracy."
  },
  {
    question: "What fabrics do you work with?",
    answer: "We work with Cotton, Organic Cotton, Polyester, Cotton-Poly blends, Fleece, French Terry, Interlock, Rib, Pique, Jersey, and other specialized fabrics."
  },
  {
    question: "What customization options are available?",
    answer: "We offer: Screen Printing, DTF Printing, Sublimation Printing, Embroidery, Puff Printing, Silicone Printing, Appliqué Work, and Custom Labels & Packaging."
  },
  {
    question: "What is your production capacity?",
    answer: "Our manufacturing facility is capable of handling large-scale orders with strict quality control processes and timely delivery schedules."
  },
  {
    question: "How long does production take?",
    answer: "Production timelines vary based on order quantity and customization requirements. Typical lead times range from 15-45 days after order confirmation."
  },
  {
    question: "Do you export internationally?",
    answer: "Yes. We serve clients worldwide and can manage export documentation, packaging, and international shipping requirements."
  },
  {
    question: "How do you ensure product quality?",
    answer: "We maintain strict quality checks at every stage including fabric inspection, cutting, stitching, finishing, and final packing."
  },
  {
    question: "Can you match Pantone colors?",
    answer: "Yes. We can develop fabrics and prints according to specific Pantone color references."
  },
  {
    question: "What sizes can you manufacture?",
    answer: "We can produce garments in all standard and custom size ranges, including plus sizes and international size specifications."
  },
  {
    question: "Do you offer sustainable or eco-friendly manufacturing?",
    answer: "Yes. We can source organic, recycled, and sustainable materials based on client requirements."
  },
  {
    question: "What certifications do you have?",
    answer: "Certification availability may vary. Please contact us for details regarding compliance, quality, and social responsibility standards."
  },
  {
    question: "What payment terms do you offer?",
    answer: "Payment terms depend on the order value and client relationship. Typically, an advance payment is required before production begins."
  },
  {
    question: "Can you handle urgent bulk orders?",
    answer: "Yes. Depending on production capacity and order requirements, we can accommodate expedited production schedules."
  },
  {
    question: "How is pricing determined?",
    answer: "Pricing depends on: Fabric type, Garment style, Order quantity, Printing/Embroidery requirements, Packaging specifications, and Delivery destination."
  },
  {
    question: "Will my designs remain confidential?",
    answer: "Yes. We respect client confidentiality and do not share proprietary designs or product specifications."
  },
  {
    question: "How can I request a quotation?",
    answer: "You can submit your requirements through our inquiry form, email, or WhatsApp. Please include product details, quantity, customization requirements, and delivery location."
  }
];

const FAQItem = ({ faq, index }: { faq: typeof faqs[0]; index: number }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="corporate-card rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/20 transition-colors"
      >
        <div className="flex items-center gap-4">
          <span className="text-[13px] font-heading font-bold text-muted-soft">{`0${index + 1}`}</span>
          <h3 className="text-foreground">{faq.question}</h3>
        </div>
        <ChevronDown
          size={18}
          className={`text-muted-foreground transition-transform duration-300 flex-shrink-0 ml-4 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96" : "max-h-0"}`}>
        <div className="px-6 pb-6 pt-0">
          <div className="pl-10 border-l-2 border-[hsl(38,60%,50%)]/40">
            <p className="">{faq.answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col pt-20">
      <Navbar />
      
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-16 md:py-24 space-y-12">
        <div className="text-center space-y-4">
          <p className="text-eyebrow">
            Support
          </p>
          <h1 className="text-foreground">
            Frequently Asked Questions
          </h1>
          <div className="h-[2px] bg-[hsl(38,60%,50%)] w-14 mx-auto mt-2" />
          <p className="max-w-lg mx-auto">
            Find answers to common questions about our products and services.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} faq={faq} index={index} />
          ))}
        </div>

        <div className="corporate-card rounded-xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <p className="text-eyebrow">Partnership</p>
            <h2 className="text-foreground text-2xl font-heading font-bold">Why Choose Panchsheel Knitwears?</h2>
            <div className="h-[2px] bg-[hsl(38,60%,50%)] w-14 mx-auto mt-2" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
            {[
              "Direct Manufacturer",
              "Competitive Factory Pricing",
              "Custom Product Development",
              "Strict Quality Control",
              "Timely Deliveries",
              "Private Label Solutions",
              "Bulk Production Capability",
              "Experienced Team",
              "Domestic & International Shipping"
            ].map((reason, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-lg bg-muted/10 border border-border/30">
                <span className="text-[hsl(38,60%,50%)] font-heading font-bold text-sm flex-shrink-0">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-sm font-medium text-foreground">{reason}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center pt-8 border-t border-border/40">
          <p className="text-muted-medium mb-4">Still have questions?</p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-md bg-foreground text-background font-semibold hover:opacity-90 transition-elegant text-sm tracking-wide"
          >
            Contact Us
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
