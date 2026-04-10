import { Linkedin, Facebook, Instagram, MapPin, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import logoUrl from "@/assets/logos/logo.png";

const companyLinks = [
  { label: "About Us", to: "/about" },
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms of Use", to: "/terms" },
  { label: "FAQ", to: "/faq" },
];

const platformLinks = [
  { label: "Men", to: "/contact?category=men" },
  { label: "Women", to: "/contact?category=women" },
  { label: "Kids", to: "/contact?category=kids" },
];

const Footer = () => {
  return (
    <footer className="w-full bg-[#FAF9F6] text-zinc-800 font-sans">
      {/* Decorative gold accent line */}
      <div className="h-[3px] bg-gradient-to-r from-transparent via-[hsl(38,60%,50%)] to-transparent" />

      <div className="px-5 sm:px-8 lg:px-16 pt-12 sm:pt-16 pb-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-10 lg:gap-8 mb-12 sm:mb-16">

          {/* Brand & Info Column */}
          <div className="flex flex-col gap-5 lg:w-1/4">
            <Link to="/" className="inline-flex items-center gap-3">
              <img src={logoUrl} alt="UrbanGrand Logo" className="h-14 w-auto rounded-md" />
              <p className="font-heading text-xl font-bold text-zinc-900  tracking-wide">URBAN GRAND</p>
            </Link>
            <div className="space-y-1">
              <p className="text-[13px] text-zinc-800  leading-relaxed font-medium">Premium Line by Panchsheel Knitwears.<br />Trusted craftsmanship since 1978.</p>
            </div>
            {/* Social Icons */}
            <div className="flex gap-3 mt-2">
              {[Linkedin, Facebook, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="flex items-center justify-center w-9 h-9 rounded-md bg-zinc-200/60 border border-zinc-300/40 ">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns container */}
          <div className="flex flex-col md:flex-row gap-12 lg:gap-24 lg:w-3/4 lg:justify-end">

            {/* Platform */}
            <div className="flex flex-col gap-5 min-w-[140px]">
              <h3 className="text-zinc-900  font-heading font-semibold text-[14px] uppercase tracking-[0.1em]">Platform</h3>
              <div className="h-[2px] w-8 bg-[hsl(38,60%,50%)]/60" />
              <ul className="space-y-3.5">
                {platformLinks.map((item) => (
                  <li key={item.label}>
                    <Link to={item.to} className="flex items-center text-[13px] font-medium text-zinc-800  hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors group">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 dark:bg-zinc-400 mr-3 flex-shrink-0 group-hover:bg-[hsl(38,60%,50%)] dark:group-hover:bg-[hsl(38,60%,50%)] transition-colors" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="flex flex-col gap-5 min-w-[140px]">
              <h3 className="text-zinc-900  font-heading font-semibold text-[14px] uppercase tracking-[0.1em]">Company</h3>
              <div className="h-[2px] w-8 bg-[hsl(38,60%,50%)]/60" />
              <ul className="space-y-3.5">
                {companyLinks.map((item) => (
                  <li key={item.label}>
                    <Link to={item.to} className="flex items-center text-[13px] font-medium text-zinc-800  hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors group">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 dark:bg-zinc-400 mr-3 flex-shrink-0 group-hover:bg-[hsl(38,60%,50%)] dark:group-hover:bg-[hsl(38,60%,50%)] transition-colors" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-5 min-w-[200px]">
              <h3 className="text-zinc-900 font-heading font-semibold text-[14px] uppercase tracking-[0.1em]">Contact</h3>
              <div className="h-[2px] w-8 bg-[hsl(38,60%,50%)]/60" />
              <ul className="space-y-3.5 text-[13px] font-medium text-zinc-800">
                <li>
                  <a href="mailto:URBANGRAND78@GMAIL.COM" className="flex items-center hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors lowercase">
                    <Mail size={15} className="text-zinc-700  mr-3 flex-shrink-0" />
                    URBANGRAND78@GMAIL.COM
                  </a>
                </li>
                <li>
                  <div className="flex items-start">
                    <Phone size={15} className="text-zinc-700 mr-3 flex-shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-1">
                      <span>(+91) 76968-80871</span>
                      <span>(+91) 94170-15928</span>
                      <span>(+91) 98888-91485</span>
                    </div>
                  </div>
                </li>
                <li className="pt-1">
                  <Link to="/map" className="flex items-start text-zinc-800  hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                    <MapPin size={15} className="text-zinc-700  mr-3 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">213/15-C, NEW KUNDAN PURI,<br />CIVIL LINES, LUDHIANA-141001 PUNJAB</span>
                  </Link>
                </li>
              </ul>
            </div>

          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-[hsl(38,60%,50%,0.6)] dark:border-[hsl(38,60%,50%,0.6)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-zinc-700 font-bold">
            © {new Date().getFullYear()} Panchsheel Knitwears. All rights reserved.
          </p>
          <p className="text-[10px] text-zinc-700 tracking-wider uppercase font-bold">
            Premium Knitwear Manufacturing Since 1978
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
