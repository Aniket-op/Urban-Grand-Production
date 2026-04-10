import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  {
    title: "Our Legacy",
    body: `Panchsheel Knitwears was established in 1978, when garment manufacturing activities were initiated by the founding family, laying a strong foundation built on craftsmanship, consistency, and customer trust. Over the years, this legacy has been carefully nurtured and expanded, reflecting both growth and continuity.

Today, Panchsheel Knitwears specializes in knitwear, cloth apparel, kidswear, thermal wear, and other garment categories, catering to diverse market needs with dedication and professionalism.`,
  },
  {
    title: "Our Philosophy",
    body: `Precision in Every Stitch, Quality in Every Garment.

At Panchsheel Knitwears, our manufacturing philosophy is rooted in precision, durability, and uncompromising attention to detail. Since our inception, we have consistently upheld a commitment to craftsmanship and quality.`,
  },
  {
    title: "Our Mission",
    body: `Our mission at Panchsheel Knitwears is to manufacture high-quality garments that combine comfort, durability, and reliable craftsmanship. We are committed to maintaining strong production standards, ensuring timely delivery, and building long-term relationships with our customers and partners.`,
  },
  {
    title: "Our Brands",
    body: `To meet evolving fashion needs and customer preferences, Panchsheel Knitwears has introduced two distinct brands — Kidax and UrbanGrand — each representing quality, style, and comfort in its own segment.`,
  },
];

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col pt-20">
      <Navbar />

      {/* Hero banner */}
      <div className="bg-gradient-to-br from-[hsl(220,25%,10%)] to-[hsl(220,20%,18%)] text-zinc-50 px-6 py-24 text-center">
        <p className="text-[10px] uppercase tracking-[0.4em] opacity-50 mb-4 font-medium">Who We Are</p>
        <h1 className="font-display text-5xl md:text-6xl font-bold leading-tight">Panchsheel Knitwears</h1>
        <div className="h-[2px] bg-[hsl(38,60%,50%)] w-14 mt-6 mx-auto" />
        <p className="mt-5 max-w-xl mx-auto text-sm opacity-60 leading-relaxed">
          Craftsmanship, consistency, and customer trust since 1978.
        </p>
      </div>

      {/* Content sections */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-6 py-16 space-y-16">
        {sections.map((s, i) => (
          <div key={i} className={`flex flex-col md:flex-row gap-10 items-start ${i % 2 === 1 ? "md:flex-row-reverse" : ""} p-8 rounded-xl corporate-card`}>
            <div className="md:w-1/3 shrink-0">
              <span className="text-xs uppercase tracking-[0.35em] text-muted-soft font-semibold">{`0${i + 1}`}</span>
              <h2 className="font-display text-2xl font-bold mt-2 text-foreground">{s.title}</h2>
              <div className="h-[2px] bg-[hsl(38,60%,50%)] w-10 mt-3" />
            </div>
            <div className="flex-1">
              {s.body.split("\n\n").map((para, j) => (
                <p key={j} className="text-sm text-muted-foreground leading-relaxed mb-4">{para}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
