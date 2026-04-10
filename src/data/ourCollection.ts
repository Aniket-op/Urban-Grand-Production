
// ── Women images
import womenCardigans1 from "@/assets/women/cardigans1.jpg";
import womenCardigans2 from "@/assets/women/cardigans2.jpg";
import womenCoat1 from "@/assets/women/coat1.png";
import womenCoat2 from "@/assets/women/coat2.jpg";
import womenCoat3 from "@/assets/women/coat3.jpg";
import womenHoodies1 from "@/assets/women/hoodies1.jpg";
import womenHoodies2 from "@/assets/women/hoodies2.jpg";
import womenHoodies3 from "@/assets/women/hoodies3.jpg";
import womenJacket1 from "@/assets/women/jacket_1.png";
import womenJacket2 from "@/assets/women/jacket_2.png";
import womenJacket3 from "@/assets/women/jacket_3.jpg";
import womenSweatshirts1 from "@/assets/women/sweatshirts_1.png";
import womenSweatshirts2 from "@/assets/women/sweatshirts_2.jpg";
import womenSweatshirts3 from "@/assets/women/sweatshirts_3.jpg";
import womenThermal1 from "@/assets/women/thermal1.jpg";
import womenThermal2 from "@/assets/women/thermal2.jpg";

// ── Men images
import menCoats1 from "@/assets/men/coats1.png";
import menCoats2 from "@/assets/men/coats2.jpg";
import menCoats3 from "@/assets/men/coats3.jpg";
import menHoodies1 from "@/assets/men/hoodies_1.png";
import menHoodies2 from "@/assets/men/hoodies_2.png";
import menHoodies3 from "@/assets/men/hoodies_3.png";
import menJacket1 from "@/assets/men/jacket_1.png";
import menJacket2 from "@/assets/men/jacket_2.png";
import menLower1 from "@/assets/men/lower1.jpg";
import menLower2 from "@/assets/men/lower2.jpg";
import menLower3 from "@/assets/men/lower3.webp";
import menSweatshirts1 from "@/assets/men/sweatshirts_1.png";
import menSweatshirts2 from "@/assets/men/sweatshirts_2.jpg";
import menThermal1 from "@/assets/men/thermal1.webp";
import menThermal2 from "@/assets/men/thermal2.webp";
import menTshirts1 from "@/assets/men/tshirts1.jpg";
import menTshirts2 from "@/assets/men/tshirts2.jpg";
import menTshirts3 from "@/assets/men/tshirts3.jpg";

// ── Kids images
import kidsCoat1 from "@/assets/kids/coat1.png";
import kidsCoat2 from "@/assets/kids/coat2.png";
import kidsCoat3 from "@/assets/kids/coat3.jpeg";
import kidsHoodies1 from "@/assets/kids/hoodies1.png";
import kidsHoodies2 from "@/assets/kids/hoodies2.png";
import kidsJacket1 from "@/assets/kids/jacket_1.png";
import kidsJacket2 from "@/assets/kids/jacket_2.png";
import kidsJacket3 from "@/assets/kids/jacket_3.jpg";
import kidsSweaters1 from "@/assets/kids/sweaters1.jpg";
import kidsSweaters2 from "@/assets/kids/sweaters2.jpg";
import kidsSweaters3 from "@/assets/kids/sweaters3.jpg";
import kidsThermal1 from "@/assets/kids/thermal1.jpg";
import kidsThermal2 from "@/assets/kids/thermal2.jpg";
import kidsThermal3 from "@/assets/kids/thermal3.webp";


// ── Single collection slide ────
export type Subcategory = {
    label: string;
    images: string[];
};

export type CollectionSlide = {
    id: string;
    title: string;
    tag: string;
    description: string;
    imageRight: boolean; // true = image on right, content on left
    subcategories: Subcategory[];
    accent: string; // tailwind bg color for accent dot
};

export const collections: CollectionSlide[] = [
    {
        id: "men",
        title: "Men Collection",
        tag: "Bold & Refined",
        description:
            "Built for the contemporary man — structured cuts, premium fabrics, and versatile designs that move seamlessly from casual to formal.",
        imageRight: true,
        accent: "bg-blue-300/60",
        subcategories: [
            { label: "Jacket", images: [menJacket1, menJacket2] },
            { label: "Coats", images: [menCoats1, menCoats2, menCoats3] },
            { label: "Sweatshirts", images: [menSweatshirts1, menSweatshirts2] },
            { label: "Hoodies", images: [menHoodies1, menHoodies2, menHoodies3] },
            { label: "T-Shirts", images: [menTshirts1, menTshirts2, menTshirts3] },
            { label: "Lowers", images: [menLower1, menLower2, menLower3] },
            { label: "Thermal", images: [menThermal1, menThermal2] },
        ],
    },
    {
        id: "women",
        title: "Women Collection",
        tag: "Feminine Elegance",
        description:
            "Crafted for the modern woman — our women's line blends timeless silhouettes with premium knitwear. Designed for warmth without compromising on style.",
        imageRight: false,
        accent: "bg-rose-300/60",
        subcategories: [
            { label: "Jacket", images: [womenJacket1, womenJacket2, womenJacket3] },
            { label: "Coats", images: [womenCoat1, womenCoat2, womenCoat3] },
            { label: "Sweatshirts", images: [womenSweatshirts1, womenSweatshirts2, womenSweatshirts3] },
            { label: "Hoodies", images: [womenHoodies1, womenHoodies2, womenHoodies3] },
            { label: "Thermal", images: [womenThermal1, womenThermal2] },
            { label: "Cardigans", images: [womenCardigans1, womenCardigans2] },
        ],
    },
    {
        id: "kids",
        title: "Kids Collection",
        tag: "Playful & Cozy",
        description:
            "Soft, durable, and endlessly fun — our kids' collection is engineered for active little lives. Premium yarns, safe dyes, and designs that kids actually love.",
        imageRight: true,
        accent: "bg-amber-300/60",
        subcategories: [
            { label: "Jacket", images: [kidsJacket1, kidsJacket2, kidsJacket3] },
            { label: "Coats", images: [kidsCoat1, kidsCoat2, kidsCoat3] },
            { label: "Sweaters", images: [kidsSweaters1, kidsSweaters2, kidsSweaters3] },
            { label: "Hoodies", images: [kidsHoodies1, kidsHoodies2] },
            { label: "Thermal", images: [kidsThermal1, kidsThermal2, kidsThermal3] },
        ],
    },
];