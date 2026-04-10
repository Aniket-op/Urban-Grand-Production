import { ChevronDown, Menu, X, Sun, Moon, Globe, LogIn, Mail, Phone } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import logoUrl from "@/assets/logos/logo.png";
import brochurePdf from "@/assets/PANCHSHEEL-PROFILE-LATEST.pdf";

type SubItem = { label: string; to: string; download?: boolean };
type MenuItem =
  | { label: string; to: string; slug?: never; subcategories?: never }
  | { label: string; to?: never; slug: string; subcategories: SubItem[] };

const centerMenuItems: MenuItem[] = [
  { label: "Home Page", to: "/" },
  {
    label: "Discover Us",
    slug: "about",
    subcategories: [
      { label: "Our Legacy & Brands", to: "/about/category/our-legacy" },
      { label: "Mission, Vision & Philosophy", to: "/about/category/mission-vision" },
      { label: "Our Leadership", to: "/about/category/our-leadership" },
      { label: "Company Credentials", to: "/about/category/company-credentials" },
      { label: "Brochure", to: brochurePdf, download: true },
    ],
  },
  {
    label: "Our Products",
    slug: "products",
    subcategories: [
      { label: "Men", to: "/category/men" },
      { label: "Women", to: "/category/women" },
      { label: "Kids", to: "/category/kids" },
    ],
  },
];

const allMenuItems: MenuItem[] = [
  ...centerMenuItems,
  { label: "Contact Us", to: "/map" },
];

const languages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "hi", label: "Hindi", flag: "🇮🇳" },
  { code: "de", label: "German", flag: "🇩🇪" },
  { code: "fr", label: "French", flag: "🇫🇷" },
  { code: "es", label: "Spanish", flag: "🇪🇸" },
  { code: "ja", label: "Japanese", flag: "🇯🇵" },
  { code: "ar", label: "Arabic", flag: "🇸🇦" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation(); // current route
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);

  // Detect scroll to toggle hero/scrolled state
  useEffect(() => {
    const onScroll = () => { if (location.pathname === "/") { setScrolled(window.scrollY > 60); } else { setScrolled(true); } }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Theme
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") return localStorage.getItem("theme") || "light";
    return "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((p) => (p === "light" ? "dark" : "light"));

  // Language
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(languages[0]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* ── NAV BAR ──────────────────────────────────────────────────────── */}
      <nav
        ref={navRef}
        className={`force-light h-[72px] flex items-center px-4 sm:px-5 lg:px-12 fixed w-full z-50 transition-all duration-700 ease-[cubic-bezier(0.22_1_0.36_1)] ${scrolled
          ? "top-0 bg-[#FAF9F6] shadow-sm"
          : "top-3 bg-transparent"
          }`}
      >
        {/* Decorative gold accent line */}
        <div
          className={`absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[hsl(38,60%,50%)] to-transparent transition-opacity duration-500 pointer-events-none ${scrolled ? "opacity-100" : "opacity-0"}`}
        />
        {/*
          Logo slides from center → left.
          We use a wrapper that occupies the full navbar width,
          then translate the logo to center when NOT scrolled.
          When scrolled, it returns to its natural left position.
        */}
        <Link
          ref={logoRef}
          to="/"
          className="flex items-center gap-2.5 sm:gap-3 group z-10 transition-all duration-700 ease-[cubic-bezier(0.22_1_0.36_1)]"
          style={{
            transform: scrolled
              ? "translateX(0)"
              : `translateX(calc(50vw - 50% - ${typeof window !== "undefined" && window.innerWidth < 640 ? "16px" : "48px"
              }))`,
          }}
        >
          <img
            src={logoUrl}
            alt="Urban Grand Logo"
            className="h-10 w-10 sm:h-[44px] sm:w-[44px] rounded-sm mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
          />
          <span className={`font-heading text-[17px] sm:text-[20px] font-bold tracking-[0.08em] leading-none transition-colors duration-500 text-black`}>
            URBAN GRAND
          </span>
        </Link>

        {/* Desktop nav links — centered in navbar */}
        <div
          className={`hidden md:flex gap-4 lg:gap-7 items-center h-full absolute left-1/2 -translate-x-1/2 transition-all duration-500 ${scrolled ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none translate-y-1"
            }`}
        >
          {centerMenuItems.map((item) => {
            if (item.to) {
              const active = location.pathname === item.to;
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`text-[11px] lg:text-[12px] font-semibold uppercase tracking-[0.12em] transition-elegant relative group whitespace-nowrap ${active ? "text-foreground" : "text-foreground/70 hover:text-foreground"
                    }`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-[-4px] left-0 w-full h-[1.5px] bg-foreground transition-transform origin-left ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                  />
                </Link>
              );
            }

            return (
              <div key={item.label} className="relative group h-full flex items-center">
                <button className="flex items-center gap-1 text-[11px] lg:text-[12px] font-semibold uppercase tracking-[0.12em] text-foreground/70 hover:text-foreground transition-elegant whitespace-nowrap">
                  {item.label}
                  <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                </button>

                <div className="absolute top-[60px] left-1/2 -translate-x-1/2 w-56 bg-background border border-border/60 shadow-lg shadow-black/[0.06] rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 py-1.5">
                  {item.subcategories.map((sub) =>
                    sub.download ? (
                      <a
                        key={sub.label}
                        href={sub.to}
                        download="PANCHSHEEL_BROCHURE.pdf"
                        className="flex items-center px-5 py-2.5 text-[13px] text-foreground/70 hover:text-foreground hover:bg-muted/50 transition-colors border-l-2 border-transparent hover:border-foreground/50"
                      >
                        {sub.label}
                      </a>
                    ) : (
                      <Link
                        key={sub.label}
                        to={sub.to}
                        className="flex items-center px-5 py-2.5 text-[13px] text-foreground/70 hover:text-foreground hover:bg-muted/50 transition-colors border-l-2 border-transparent hover:border-foreground/50"
                      >
                        {sub.label}
                      </Link>
                    )
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop right actions — fade in when scrolled */}
        <div
          className={`hidden md:flex items-center gap-2 lg:gap-3 ml-auto transition-all duration-500 ${scrolled ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none translate-y-1"
            }`}
        >
          {/* Contact Us link */}
          <Link
            to="/map"
            className={`text-[11px] lg:text-[12px] font-semibold uppercase tracking-[0.12em] transition-elegant relative group whitespace-nowrap ${location.pathname === "/map" ? "text-foreground" : "text-foreground/70 hover:text-foreground"}`}
          >
            Contact Us
            <span
              className={`absolute bottom-[-4px] left-0 w-full h-[1.5px] bg-foreground transition-transform origin-left ${location.pathname === "/map" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
            />
          </Link>

          <div className="w-px h-4 bg-foreground/15 mx-1" />

          {/* Language Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setLangOpen(true)}
            onMouseLeave={() => setLangOpen(false)}
          >
            <button className="flex items-center gap-1.5 text-[12px] text-foreground/70 hover:text-foreground transition-elegant font-semibold">
              <span>{currentLang.flag}</span>
              <span className="hidden lg:inline uppercase tracking-wide">{currentLang.label}</span>
              <ChevronDown
                size={13}
                className={`${langOpen ? "rotate-180" : ""} transition-transform duration-300`}
              />
            </button>

            <div
              className={`absolute top-full right-0 mt-4 w-44 bg-background border border-border/60 shadow-lg shadow-black/[0.06] rounded-md transition-all duration-300 py-1 ${langOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-2"}`}
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => { setCurrentLang(lang); setLangOpen(false); }}
                  className={`w-full text-left px-5 py-2.5 text-[13px] flex items-center gap-3 transition-colors ${currentLang.code === lang.code
                    ? "text-foreground font-semibold bg-muted/50"
                    : "text-foreground/70 hover:text-foreground hover:bg-muted/30"}`}
                >
                  <span className="text-base">{lang.flag}</span>
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          <div className="w-px h-4 bg-foreground/15 mx-1" />

          <button
            onClick={toggleTheme}
            className="p-2 rounded-md hover:bg-muted/50 transition-elegant text-foreground/70 hover:text-foreground"
            aria-label="Toggle theme"
            title={`Theme: ${theme}`}
          >
            {theme === "light" ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Login Button */}
          <button
            onClick={() => setLoginOpen(true)}
            className="flex items-center gap-2 px-4 lg:px-5 py-2 rounded-md border border-foreground/20 text-[11px] font-semibold tracking-[0.1em] uppercase text-foreground/70 hover:text-foreground hover:border-foreground/40 hover:bg-muted/30 transition-elegant"
          >
            <LogIn size={13} />
            <span className="hidden lg:inline">Login</span>
          </button>
        </div>

        {/* Mobile hamburger — always visible on mobile, but only when scrolled on hero page */}
        <button
          className={`md:hidden p-2 rounded-lg hover:bg-white/10 ml-auto z-10 transition-all duration-500 ${scrolled
            ? "opacity-100 pointer-events-auto text-foreground hover:bg-muted/50"
            : "opacity-100 pointer-events-auto text-white"
            }`}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* ── MOBILE FULLSCREEN MENU ──────────────────────────────────── */}
        <div
          className={`force-light fixed inset-0 top-0 left-0 w-full h-full bg-background/[0.98] backdrop-blur-xl z-[60] flex flex-col transition-all duration-500 ease-[cubic-bezier(0.22_1_0.36_1)] md:hidden ${mobileOpen
            ? "opacity-100 pointer-events-auto translate-x-0"
            : "opacity-0 pointer-events-none translate-x-full"
            }`}
        >
          {/* Mobile header */}
          <div className="flex items-center justify-between px-5 h-[72px] border-b border-border/30 flex-shrink-0">
            <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5">
              <img src={logoUrl} alt="Urban Grand Logo" className="h-10 w-10 rounded-sm mix-blend-multiply" />
              <span className="font-heading text-[17px] font-bold tracking-[0.08em] text-black">URBAN GRAND</span>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          {/* Mobile nav links */}
          <div className="flex-1 overflow-y-auto py-4">
            {allMenuItems.map((item) => {
              if (item.to) {
                return (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center px-6 py-4 text-[15px] font-semibold uppercase tracking-[0.08em] text-foreground/80 hover:text-foreground hover:bg-muted/20 transition-colors border-b border-border/20"
                  >
                    {item.label}
                  </Link>
                );
              }

              const isExpanded = mobileExpanded === item.label;
              return (
                <div key={item.label} className="border-b border-border/20">
                  <button
                    onClick={() => setMobileExpanded(isExpanded ? null : item.label)}
                    className="w-full flex items-center justify-between px-6 py-4 text-[15px] font-semibold uppercase tracking-[0.08em] text-foreground/80 hover:text-foreground transition-colors"
                  >
                    {item.label}
                    <ChevronDown
                      size={18}
                      className={`${isExpanded ? "rotate-180" : ""} transition-transform duration-300`}
                    />
                  </button>

                  <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-96" : "max-h-0"}`}>
                    <div className="bg-muted/10 py-1">
                      {item.subcategories.map((sub) =>
                        sub.download ? (
                          <a
                            key={sub.label}
                            href={sub.to}
                            download="PANCHSHEEL_BROCHURE.pdf"
                            onClick={() => setMobileOpen(false)}
                            className="block px-8 py-3.5 text-[14px] text-foreground/70 hover:text-foreground hover:bg-muted/20 transition-colors"
                          >
                            {sub.label}
                          </a>
                        ) : (
                          <Link
                            key={sub.label}
                            to={sub.to}
                            onClick={() => setMobileOpen(false)}
                            className="block px-8 py-3.5 text-[14px] text-foreground/70 hover:text-foreground hover:bg-muted/20 transition-colors"
                          >
                            {sub.label}
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile bottom: Language + Theme + Login */}
          <div className="flex-shrink-0 px-6 py-6 border-t border-border/30 space-y-5">
            {/* Language chips */}
            <div>
              <span className="text-[10px] uppercase tracking-widest text-foreground/50 font-semibold block mb-3">Language</span>
              <div className="flex gap-2 flex-wrap">
                {languages.slice(0, 4).map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setCurrentLang(lang)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md border transition-all ${currentLang.code === lang.code
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-foreground/70 hover:border-foreground/50"
                      }`}
                  >
                    <span>{lang.flag}</span>
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 transition-elegant text-foreground/80 hover:text-foreground font-semibold text-sm"
              >
                {theme === "light" ? (
                  <><Moon size={18} /> Dark Mode</>
                ) : (
                  <><Sun size={18} /> Light Mode</>
                )}
              </button>

              <button
                onClick={() => { setLoginOpen(true); setMobileOpen(false); }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-md bg-foreground text-background text-xs font-semibold tracking-wide hover:opacity-85 transition-elegant"
              >
                <LogIn size={13} />
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── LOGIN MODAL ──────────────────────────────────────────────────── */}
      {loginOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[70]"
            onClick={() => setLoginOpen(false)}
          />
          <div className="force-light fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[71] w-[calc(100%-2rem)] max-w-md bg-background border border-color-[hsl(38,60%,50%)] rounded-lg p-8 sm:p-10">
            <button
              onClick={() => setLoginOpen(false)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 hover:bg-muted/50 rounded-md transition-elegant text-foreground/70"
              aria-label="Close login"
            >
              <X size={18} />
            </button>
            <div className="text-center mb-8">
              <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground font-semibold mb-2">
                Welcome Back
              </p>
              <h2 className="font-display text-3xl font-bold">Sign In</h2>
            </div>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-2 font-semibold">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full bg-background border border-border px-4 py-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-foreground/30 transition-colors rounded-md"
                />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-2 font-semibold">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-background border border-border px-4 py-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-foreground/30 transition-colors rounded-md"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-foreground text-background py-4 text-xs font-bold tracking-[0.2em] uppercase hover:opacity-80 transition-elegant rounded-md"
              >
                Sign In
              </button>
              <p className="text-center text-xs text-muted-foreground">
                Don't have an account?{" "}
                <button type="button" className="underline hover:text-foreground transition-colors">
                  Register
                </button>
              </p>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
