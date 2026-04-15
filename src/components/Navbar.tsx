import { ChevronDown, Menu, X, Sun, Moon, Globe, LogIn, Mail, Phone, User, LogOut } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
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
      { label: "Men", to: "/explore/men" },
      { label: "Women", to: "/explore/women" },
      { label: "Kids", to: "/explore/kids" },
    ],
  },
];

const allMenuItems: MenuItem[] = [
  ...centerMenuItems,
  { label: "Contact Us", to: "/map" },
];

const languages = [
  { code: "en", label: "English", flagUrl: "https://hatscripts.github.io/circle-flags/flags/gb.svg" },
  { code: "hi", label: "Hindi", flagUrl: "https://hatscripts.github.io/circle-flags/flags/in.svg" },
  { code: "de", label: "German", flagUrl: "https://hatscripts.github.io/circle-flags/flags/de.svg" },
  { code: "fr", label: "French", flagUrl: "https://hatscripts.github.io/circle-flags/flags/fr.svg" },
  { code: "es", label: "Spanish", flagUrl: "https://hatscripts.github.io/circle-flags/flags/es.svg" },
  { code: "ja", label: "Japanese", flagUrl: "https://hatscripts.github.io/circle-flags/flags/jp.svg" },
  { code: "ar", label: "Arabic", flagUrl: "https://hatscripts.github.io/circle-flags/flags/sa.svg" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);

  // Auth state
  const { user, isAuthenticated, logout } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Detect scroll to toggle hero/scrolled state
  useEffect(() => {
    const onScroll = () => { if (location.pathname === "/") { setScrolled(window.scrollY > 60); } else { setScrolled(true); } }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Language
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(languages[0]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    setMobileOpen(false);
    toast.success("Logged out successfully.");
    navigate("/");
  };

  return (
    <>
      {/* ── NAV BAR ──────────────────────────────────────────────────────── */}
      <nav
        ref={navRef}
        className={`force-light h-[88px] flex items-center px-4 sm:px-5 lg:px-12 fixed w-full z-50 transition-all duration-700 ease-[cubic-bezier(0.22_1_0.36_1)] ${scrolled
          ? "top-0 bg-[#f7eac3] shadow-sm"
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
            className="rounded-sm mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
            style={{ height: '72px', width: '72px' }}
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
              <img src={currentLang.flagUrl} alt={currentLang.label} className="w-4 h-4 rounded-full" />
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
                  className={`w-full h-full text-left px-5 py-2.5 text-[13px] flex items-center gap-3 transition-colors ${currentLang.code === lang.code
                    ? "text-foreground font-semibold bg-muted/50"
                    : "text-foreground/70 hover:text-foreground hover:bg-muted/30"}`}
                >
                  <img src={lang.flagUrl} alt={lang.label} className="w-4 h-4 rounded-full" />
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          <div className="w-px h-4 bg-foreground/15 mx-1" />

          {/* ── Auth Button (Login / User Menu) ── */}
          {isAuthenticated && user ? (
            <div
              className="relative"
              onMouseEnter={() => setUserMenuOpen(true)}
              onMouseLeave={() => setUserMenuOpen(false)}
            >
              <button className="flex items-center flex-col px-4 lg:px-2 py-2 rounded-md border border-[hsl(38,60%,50%)]/30 text-[11px] font-semibold tracking-[0.1em] uppercase text-foreground/70 hover:text-foreground hover:border-[hsl(38,60%,50%)]/60 hover:bg-[hsl(38,60%,50%,0.05)] transition-elegant">
                <div className="w-6 h-6 rounded-full bg-[hsl(38,60%,50%,0.15)] flex items-center justify-center text-[9px] font-bold text-[hsl(38,60%,50%)]">
                  {user.fullName.charAt(0).toUpperCase()}
                </div>
                <span className="text-[9px] mt-0.5 max-w-[60px] truncate">{user.fullName.split(" ")[0]}</span>
              </button>

              {/* User dropdown */}
              <div
                className={`absolute top-full right-0 mt-2 w-48 bg-background border border-border/60 shadow-lg shadow-black/[0.06] rounded-md transition-all duration-300 py-1.5 ${userMenuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-2"}`}
              >
                <div className="px-4 py-2.5 border-b border-border/30">
                  <p className="text-[11px] font-semibold text-foreground truncate">{user.fullName}</p>
                  <p className="text-[10px] text-muted-foreground truncate">{user.emailAddress}</p>
                </div>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-4 py-2.5 text-[12px] text-foreground/70 hover:text-foreground hover:bg-muted/30 transition-colors"
                >
                  <User size={14} />
                  My Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-[12px] text-red-500/70 hover:text-red-500 hover:bg-red-50/50 transition-colors border-t border-border/30"
                >
                  <LogOut size={14} />
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center flex-col px-4 lg:px-2 py-2 rounded-md border border-foreground/20 text-[11px] font-semibold tracking-[0.1em] uppercase text-foreground/70 hover:text-foreground hover:border-foreground/40 hover:bg-muted/30 transition-elegant"
            >
              <User size={25} />
              <span>Login</span>
            </Link>
          )}
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
              <img src={logoUrl} alt="Urban Grand Logo" className="h-[72px] w-[72px] rounded-sm mix-blend-multiply" />
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

          {/* Mobile bottom: Language + Auth */}
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
                    <img src={lang.flagUrl} alt={lang.label} className="w-3.5 h-3.5 rounded-full" />
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              {isAuthenticated && user ? (
                <div className="flex items-center gap-3 w-full">
                  <Link
                    to="/profile"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 flex-1 px-4 py-2.5 rounded-md bg-[hsl(38,60%,50%,0.1)] text-xs font-semibold tracking-wide hover:bg-[hsl(38,60%,50%,0.2)] transition-elegant"
                  >
                    <div className="w-6 h-6 rounded-full bg-[hsl(38,60%,50%,0.2)] flex items-center justify-center text-[10px] font-bold text-[hsl(38,60%,50%)]">
                      {user.fullName.charAt(0).toUpperCase()}
                    </div>
                    <span className="truncate">{user.fullName}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-md border border-red-300/30 text-xs font-semibold tracking-wide text-red-500/80 hover:text-red-500 hover:border-red-400/50 transition-elegant"
                  >
                    <LogOut size={13} />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3 w-full">
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 flex-1 px-5 py-2.5 rounded-md bg-foreground text-background text-xs font-semibold tracking-wide hover:opacity-85 transition-elegant"
                  >
                    <User size={13} />
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 flex-1 px-5 py-2.5 rounded-md border border-foreground/20 text-xs font-semibold tracking-wide hover:bg-muted/30 transition-elegant"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
