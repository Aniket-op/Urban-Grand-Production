import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import womenImg from "@/assets/women-1.avif";
import menImg from "@/assets/Men-1.jpg";
import kidsImg from "@/assets/kids-1.webp";

const categories = [
  { title: "Women's Collection", slug: "women", image: womenImg },
  { title: "Men's Collection", slug: "men", image: menImg },
  { title: "Kids Collection", slug: "kids", image: kidsImg },
];

const CategorySection = () => (
  <>
    <section className="flex flex-col w-[80%] mx-auto justify-center py-10 lg:py-10 h-full w-full overflow-hidden bg-background">
      <div className="px-8 lg:px-14 mb-10 lg:mb-16">
        <h2 className="text-2xl lg:text-3xl uppercase tracking-[0.35em] text-foreground font-semibold">
          Our Collections
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: i * 0.15 }}
            className="group relative block aspect-[4/3] overflow-hidden rounded-[20px] shadow-lg"
          >
            <Link to={`/contact?category=${cat.slug}`} className="block w-full h-full">
              <img
                src={cat.image}
                alt={cat.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30 transition-opacity duration-700 group-hover:bg-black/50" />

              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <h3 className="font-body text-base md:text-lg font-semibold tracking-[0.15em] uppercase text-white">
                  {cat.title}
                </h3>
                <div className="mt-3 h-[2px] w-0 bg-white transition-all duration-700 group-hover:w-16" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  </>
);

export default CategorySection;
