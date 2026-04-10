import image1 from "@/assets/Our-Legacy-1.png";
import image2 from "@/assets/Our-Legacy-2.png";
import image3 from "@/assets/Our-Legacy-4.png";
import image5 from "@/assets/Our-Legacy-5.png";
import infra1 from "@/assets/infra1.png";
import infra2 from "@/assets/infra2.png";
import infra3 from "@/assets/infra3.png";
import kidaxLogo from "@/assets/kidax.jpeg";
import urbangrantLogo from "@/assets/logos/logo.png";
import PanchsheelKnitwearsLogo from "@/assets/Panchsheel-Knitwears.jpeg";
import gst from "@/assets/gst_certificate.png";
import udyam1 from "@/assets/UDYAM_REGISTRATION_CERTIFICATE.png";
import udyam2 from "@/assets/UDYAM_REGISTRATION_CERTIFICATE2.png";
export interface AboutSectionData {
  title: string;
  description: {
    heading: string;
    content: string;
    hideImage?: boolean;
    customImage?: string[];
    logo?: string;
  }[];
  images: string[];
}

export const aboutContent: Record<string, AboutSectionData> = {
  "our-legacy": {
    title: "Our Legacy & Our Brands",
    description: [
      { heading: "Overview", content: "Panchsheel Knitwears was established in 1978, when garment manufacturing activities were initiated by the founding family, laying a strong foundation built on craftsmanship, consistency, and customer trust. Over the years, this legacy has been carefully nurtured and expanded, reflecting both growth and continuity.", },
      { heading: "Our Approach", content: "Today, Panchsheel Knitwears specializes in knitwear, cloth apparel, kidswear, thermal wear, and other garment categories, catering to diverse market needs with dedication and professionalism.", },
      { heading: "Commitment", content: "Since its inception, the organization has consistently believed that true success lies not only in production capacity but also in a strong commitment to quality assurance, timely delivery, and customer satisfaction. Whether handling small consignments or large-volume orders, the company maintains high production standards and reliable delivery, making it a trusted partner in garment manufacturing." },
      { heading: "Our Infrastructure", content: "We operate with advanced, state-of-the-art machinery across all departments in our both manufacturing units in Punjab. Equipped with technology sourced from leading global manufacturers, our facilities are designed to deliver international-standard garments with tailored accuracy and cohesion.", customImage: [infra1, infra2, infra3] },
      // --- Our Brands ---
      { heading: "Panchsheel Knitwears", content: "To meet evolving fashion needs and customer preferences, Panchsheel Knitwears has introduced two distinct brands — Kidax and UrbanGrand — each representing quality, style, and comfort in its own segment.", logo: PanchsheelKnitwearsLogo },
      { heading: "Kidax", content: "Kidax focuses on comfortable, durable, and stylish clothing for children. The brand is designed to support active lifestyles while ensuring softness, safety, and everyday comfort.", logo: kidaxLogo },
      { heading: "UrbanGrand", content: "UrbanGrand represents a premium line of apparel that blends modern design with superior fabric quality. With a focus on refined style and craftsmanship, the brand is gaining attention for its contemporary look and premium finish.", logo: urbangrantLogo },
      { heading: "", content: "Together, these brands reflect Panchsheel Knitwears's commitment to combining manufacturing expertise with modern fashion trends.", hideImage: true },
    ],
    images: [image1, image2, image3, image5]
  },
  // Alias — redirect handled in router
  "our-brands": {
    title: "Our Legacy & Our Brands",
    description: [
      { heading: "Panchsheel Knitwears", content: "To meet evolving fashion needs and customer preferences, Panchsheel Knitwears has introduced two distinct brands — Kidax and UrbanGrand — each representing quality, style, and comfort in its own segment.", logo: PanchsheelKnitwearsLogo },
      { heading: "Kidax", content: "Kidax focuses on comfortable, durable, and stylish clothing for children. The brand is designed to support active lifestyles while ensuring softness, safety, and everyday comfort.", logo: kidaxLogo },
      { heading: "UrbanGrand", content: "UrbanGrand represents a premium line of apparel that blends modern design with superior fabric quality. With a focus on refined style and craftsmanship, the brand is gaining attention for its contemporary look and premium finish.", logo: urbangrantLogo },
    ],
    images: [image1, image3, image2]
  },
  "philosophy-core-values": {
    title: "Philosophy, Mission & Vision",
    description: [
      { heading: "Philosophy", content: "At Panchsheel Knitwears, our manufacturing philosophy is rooted in precision, durability, and uncompromising attention to detail. From the careful selection of raw materials to the final stages of finishing, each garment is developed through a disciplined and quality-driven process.", },
      { heading: "Core Values", content: "We believe that true manufacturing excellence lies in consistency, process discipline, and continuous improvement. Our core values emphasize consistency, trust, and long-term relationships, earning the confidence of clients who value attractive apparel and enduring quality.", },
      { heading: "Our Mission", content: "Our mission at Panchsheel Knitwears is to manufacture high-quality garments that combine comfort, durability, and reliable craftsmanship. We are committed to maintaining strong production standards, ensuring timely delivery, and building long-term relationships with our customers and partners.", },
      { heading: "Our Vision", content: "Our vision is to grow as a trusted apparel manufacturer known for quality, consistency, and innovation. Through our brands Kidax and UrbanGrand, we aim to deliver premium garments while continuing the legacy of craftsmanship and reliability established since 1978." },
    ],
    images: [image2, image3, image1]
  },
  "mission-vision": {
    title: "Philosophy, Mission & Vision",
    description: [
      { heading: "Philosophy", content: "At Panchsheel Knitwears, our manufacturing philosophy is rooted in precision, durability, and uncompromising attention to detail. From the careful selection of raw materials to the final stages of finishing, each garment is developed through a disciplined and quality-driven process.", },
      { heading: "Core Values", content: "We believe that true manufacturing excellence lies in consistency, process discipline, and continuous improvement. Our core values emphasize consistency, trust, and long-term relationships, earning the confidence of clients who value attractive apparel and enduring quality.", },
      { heading: "Our Mission", content: "Our mission at Panchsheel Knitwears is to manufacture high-quality garments that combine comfort, durability, and reliable craftsmanship. We are committed to maintaining strong production standards, ensuring timely delivery, and building long-term relationships with our customers and partners.", },
      { heading: "Our Vision", content: "Our vision is to grow as a trusted apparel manufacturer known for quality, consistency, and innovation. Through our brands Kidax and UrbanGrand, we aim to deliver premium garments while continuing the legacy of craftsmanship and reliability established since 1978." },
    ],
    images: [image3, image1, image2]
  },
  "our-leadership": {
    title: "Our Leadership",
    description: [
      { heading: "Guiding Vision", content: "At Panchsheel Knitwears, leadership is guided by a vision of quality, responsibility, and continuous growth. Our leadership philosophy focuses on maintaining strong manufacturing standards while adapting to evolving industry trends and customer expectations. With decades of experience in the textile and apparel sector, the leadership team emphasizes precision in production, reliability in delivery, and long-term partnerships with clients. Their approach combines traditional craftsmanship with modern manufacturing practices to ensure consistent product quality." },
      { heading: "", content: "Through strategic direction and commitment to innovation, the leadership continues to strengthen Panchsheel Knitwears's legacy while guiding the company toward sustainable growth and expanding brand presence.", hideImage: true },
    ],
    images: [image2, image1, image3]
  },
  "company-credentials": {
    title: "Company Credentials",
    description: [
      { heading: "", content: "Panchsheel Knitwears operates as a legally registered business entity and complies with all applicable regulatory requirements. The company holds official registrations including GST and Udyam (MSME) certification, reflecting its commitment to transparent and compliant business operations.", customImage: [gst, udyam1, udyam2] },
    ],
    images: [image3, image2, image1]
  }
};
