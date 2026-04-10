import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  {
    content: `Panchsheel Knitwears respects the privacy of its customers and is committed to protecting personal information.`,
  },
  {
    content: `• Personal information such as name, phone number, email address, and shipping address may be collected when customers place an order or contact us through the website.
• This information is used primarily for order processing, product delivery, customer communication, and improving the website experience.
• Payment information is processed through secure third-party payment gateways and is not stored directly by the Panchsheel Knitwears website.
• Customer information will not be sold, rented, or shared with unauthorized third parties.
• Limited information may be shared with trusted service providers such as payment processors and logistics partners solely for the purpose of completing transactions and delivering products.
• The website may use cookies or similar technologies to improve website functionality, analyze traffic, and enhance user experience.`
  }
];

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col pt-20">
      <Navbar />

      {/* Hero */}
      <div className="bg-zinc-950 text-zinc-50 px-6 py-20 text-center">
        <p className="text-xs uppercase tracking-[0.4em] opacity-50 mb-4">Legal</p>
        <h1 className="font-display text-5xl md:text-6xl font-bold">Privacy Policy</h1>
      </div>

      {/* Content */}
      <div className="flex-1 max-w-3xl mx-auto w-full px-6 py-16 space-y-12">
        {sections.map((s, i) => (
          <div key={i}>
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

export default PrivacyPolicy;
