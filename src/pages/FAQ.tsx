import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "Do you offer international shipping?",
    answer: "Currently, we only ship within India but plan to expand internationally soon."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 7-day return policy for unused items in their original packaging."
  },
  {
    question: "How can I track my order?",
    answer: "You will receive an email and SMS with a tracking link once your order is dispatched."
  },
  {
    question: "Do you do custom sizing or bulk orders?",
    answer: "Yes, we handle bulk orders. Please use the contact page to get in touch with our sales team for more information."
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
          <h3 className="text-lg font-semibold text-foreground">{faq.question}</h3>
        </div>
        <ChevronDown
          size={18}
          className={`text-muted-foreground transition-transform duration-300 flex-shrink-0 ml-4 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-40" : "max-h-0"}`}>
        <div className="px-6 pb-6 pt-0">
          <div className="pl-10 border-l-2 border-[hsl(38,60%,50%)]/40">
            <p className="text-muted-medium leading-relaxed">{faq.answer}</p>
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
          <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground font-semibold">
            Support
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Frequently Asked Questions
          </h1>
          <div className="h-[2px] bg-[hsl(38,60%,50%)] w-14 mx-auto mt-2" />
          <p className="text-muted-medium text-lg max-w-lg mx-auto">
            Find answers to common questions about our products and services.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} faq={faq} index={index} />
          ))}
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
