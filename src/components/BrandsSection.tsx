import { Star } from "lucide-react";
import { useState } from "react";
import CursorCard from "./CursorCard";
import heroSlide1 from "@/assets/hero-slide-1.jpg";
import heroSlide2 from "@/assets/hero-slide-2.jpg";
import heroSlide3 from "@/assets/hero-slide-3.jpg";

const brands = [
  {
    id: "kidax",
    initials: "KX",
    icon: null,
    name: "Kidax",
    tagline: "Comfortable, durable kidswear",
    image: heroSlide1,
    info: "Kidax focuses on comfortable, durable, and stylish clothing for children. The brand is designed to support active lifestyles while ensuring softness, safety, and everyday comfort.",
  },
  {
    id: "urbangrand78",
    initials: "UG",
    icon: Star,
    name: "UrbanGrand78",
    tagline: "Premium, refined contemporary style",
    image: heroSlide2,
    info: "UrbanGrand78 represents a premium line of apparel that blends modern design with superior fabric quality. With a focus on refined style and craftsmanship, the brand is gaining attention for its contemporary look and premium finish.",
  }
];

const BrandsSection = () => {
  const [hovered, setHovered] = useState<(typeof brands)[0] | null>(null);

  return (
    <section className="flex flex-col justify-center px-8 lg:px-14 py-12 h-full">

      {/* Cursor-following card */}
      <CursorCard
        image={hovered?.image ?? ""}
        title={hovered?.name ?? ""}
        description={hovered?.info ?? ""}
        visible={!!hovered}
      />

      <h2 className="text-2xl uppercase tracking-[0.35em] text-muted-soft mb-8 font-semibold">
        Our Brands
      </h2>
      <div className="flex flex-col gap-4">
        {brands.map((brand) => {
          const Icon = brand.icon;
          return (
            <div
              key={brand.id}
              className="group flex items-center gap-5 p-5 rounded-2xl subtle-border hover:subtle-border-strong hover:bg-soft transition-elegant cursor-pointer"
              onMouseEnter={() => setHovered(brand)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Icon badge */}
              <div className="w-11 h-11 rounded-xl bg-primary/5 subtle-border flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-elegant">
                {Icon ? (
                  <Icon size={17} className="text-foreground" />
                ) : (
                  <span className="font-display font-bold text-sm text-foreground">{brand.initials}</span>
                )}
              </div>

              {/* Name + tagline */}
              <div className="flex-1 min-w-0">
                <p className="font-display font-bold text-base tracking-wide text-foreground leading-tight">
                  {brand.name}
                </p>
                <p className="text-xs text-muted-soft mt-0.5">{brand.tagline}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BrandsSection;
