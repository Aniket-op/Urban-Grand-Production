import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  {
    heading: "",
    content: `By accessing and using the Panchsheel Knitwears website, users agree to the following terms:`,
  },
  {
    heading: "",
    content: `• The website is intended to provide information about Panchsheel Knitwears products and allow customers to purchase garments through the online platform.
• Users agree to use the website only for lawful purposes and must not engage in fraudulent activities, unauthorized access, or misuse of website data.
• Product descriptions, images, and pricing are provided with the intention of accuracy. However, Panchsheel Knitwears reserves the right to modify product information, pricing, or availability without prior notice.
• During peak seasons or high-demand periods, certain products may sell out quickly. In some cases, inventory information may not update immediately, and a listed product may become unavailable after an order is placed. In such situations, Panchsheel Knitwears reserves the right to cancel the order and issue a refund or suggest an alternative product.
• Orders placed through the website must contain accurate and complete customer information including shipping and contact details.
• All website content including logos, images, product designs, text, and graphics are the intellectual property of Panchsheel Knitwears and may not be copied, reproduced, or distributed without permission.
• Panchsheel Knitwears shall not be held responsible for indirect losses, delays, or service interruptions caused by circumstances beyond its control including logistics delays or technical issues.
• Panchsheel Knitwears reserves the right to update or modify these terms at any time. Continued use of the website after updates indicates acceptance of the revised terms.
• Colors and appearance of products shown on the website may slightly vary depending on display settings and lighting conditions.`
  }
];

const TermsOfUse = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col pt-20">
      <Navbar />

      {/* Hero */}
      <div className="bg-zinc-950 text-zinc-50 px-6 py-20 text-center">
        <p className="text-xs uppercase tracking-[0.4em] opacity-50 mb-4">Legal</p>
        <h1 className="font-display text-5xl md:text-6xl font-bold">Terms of Use</h1>
      </div>

      {/* Content */}
      <div className="flex-1 max-w-3xl mx-auto w-full px-6 py-16 space-y-12">
        {sections.map((s, i) => (
          <div key={i}>
            {s.heading && <h2 className="font-display text-lg font-bold text-foreground mb-3">{s.heading}</h2>}
            <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
              {s.content.split("\n").map((para, j) => (
                <p key={j} className={para.startsWith("•") ? "pl-4" : ""}>{para}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default TermsOfUse;
