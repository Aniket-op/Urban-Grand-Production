// ── Core Types ────
export type Subcategory = {
    label: string;
    primaryImage: string;   // The _1 image (or only image) — used in grid/carousel
    allImages: string[];    // All images for this style (1, 2, 3...) — used in lightbox/enquiry
};

export type CollectionSlide = {
    id: string;
    title: string;
    tag: string;
    description: string;
    imageRight: boolean;
    subcategories: Subcategory[];
    accent: string;
};

// ── Generic Metadata for Genders (Pages & Homepage) ────
export const genderMetadata: Record<string, Omit<CollectionSlide, "id" | "subcategories">> = {
    men: {
        title: "Men Collection",
        tag: "Bold & Refined",
        description: "Built for the contemporary man — structured cuts, premium fabrics, and versatile designs that move seamlessly from casual to formal.",
        imageRight: true,
        accent: "bg-blue-300/60",
    },
    women: {
        title: "Women Collection",
        tag: "Feminine Elegance",
        description: "Crafted for the modern woman — our women's line blends timeless silhouettes with premium knitwear. Designed for warmth without compromising on style.",
        imageRight: false,
        accent: "bg-rose-300/60",
    },
    kids: {
        title: "Kids Collection",
        tag: "Playful & Cozy",
        description: "Soft, durable, and endlessly fun — our kids' collection is engineered for active little lives. Premium yarns, safe dyes, and designs that kids actually love.",
        imageRight: true,
        accent: "bg-amber-300/60",
    }
};

// ── Category Metadata ────
const categoryMetadata: Record<string, { tag: string, description: string, accent: string }> = {
    jacket: { tag: "Layer Up", description: "Premium outerwear designed for shifting seasons and modern layering.", accent: "bg-blue-300/60" },
    coat: { tag: "Timeless", description: "Structured, sophisticated, and built for ultimate warmth and style.", accent: "bg-rose-300/60" },
    coats: { tag: "Timeless", description: "Structured, sophisticated, and built for ultimate warmth and style.", accent: "bg-rose-300/60" },
    hoodies: { tag: "Cozy Essentials", description: "Relaxed fits with unmatched softness for your everyday comfort.", accent: "bg-amber-300/60" },
    sweatshirts: { tag: "Refined Casual", description: "Classic crewnecks and premium knits perfect for downtime.", accent: "bg-emerald-300/60" },
    tshirts: { tag: "Everyday Basic", description: "The foundation of any good wardrobe, crafted from ultra-soft fabrics.", accent: "bg-violet-300/60" },
    lower: { tag: "Active Comfort", description: "Designed for movement and comfort without compromising silhouette.", accent: "bg-orange-300/60" },
    thermal: { tag: "Base Layers", description: "Essential warmth starting from the layer closest to you.", accent: "bg-cyan-300/60" },
    cardigans: { tag: "Knit Perfection", description: "Versatile button-ups bringing warmth and texture to any fit.", accent: "bg-fuchsia-300/60" },
    sweaters: { tag: "Knit Perfection", description: "Versatile knits bringing warmth and texture to any fit.", accent: "bg-fuchsia-300/60" },
};

// ── Load all image assets dynamically ────
const allAssets = import.meta.glob('@/assets/**/*.{png,jpg,jpeg,svg,webp,avif}', { eager: true });

/**
 * Intermediate structure used during parsing:
 * rawAssets[gender][category][styleLabel] = { count: number, url: string }[]
 *
 * Supports both naming conventions:
 *   - Legacy:  type_style.ext       → treated as single image (count = 0)
 *   - New:     type_style_count.ext → grouped by style, sorted by count
 */
const rawAssets: Record<string, Record<string, Record<string, { count: number; url: string }[]>>> = {};

Object.entries(allAssets).forEach(([path, module]) => {
    // path e.g. /src/assets/men/jacket_bomber_1.jpg
    const parts = path.split('/assets/')[1]?.split('/');
    if (!parts || parts.length < 2) return;

    const gender = parts[0].toLowerCase();
    const filenameWithExt = parts[parts.length - 1];

    // Ignore hero/homepage images
    if (filenameWithExt.toLowerCase().includes('homepage')) return;

    const filename = filenameWithExt.split('.').slice(0, -1).join('.');

    if (!filename.includes('_')) {
        console.warn(`[Asset Parser] Skipping asset lacking subcategory format: ${path}`);
        return;
    }

    // Split into segments: could be [type, style] or [type, style, count]
    const segments = filename.split('_');

    let category: string;
    let styleLabel: string;
    let count: number;

    if (segments.length >= 3) {
        // Check if the last segment is a number (count)
        const lastSegment = segments[segments.length - 1];
        const parsedCount = parseInt(lastSegment, 10);

        if (!isNaN(parsedCount)) {
            // New format: type_style_count.ext (e.g., jacket_bomber_1.jpg)
            category = segments[0].trim().toLowerCase();
            // Join middle segments in case style has multiple words (e.g., button-up)
            const rawStyle = segments.slice(1, -1).join('_').trim();
            styleLabel = rawStyle.charAt(0).toUpperCase() + rawStyle.slice(1);
            count = parsedCount;
        } else {
            // Legacy: 3+ segments but last isn't a number — treat as type_style (first 2 segments)
            category = segments[0].trim().toLowerCase();
            const rawStyle = segments[1].trim();
            styleLabel = rawStyle.charAt(0).toUpperCase() + rawStyle.slice(1);
            count = 0;
        }
    } else {
        // Legacy format: type_style.ext (exactly 2 segments)
        category = segments[0].trim().toLowerCase();
        const rawStyle = segments[1].trim();
        styleLabel = rawStyle.charAt(0).toUpperCase() + rawStyle.slice(1);
        count = 0; // treated as single-image style
    }

    const imageUrl = (module as any).default || module;

    if (!rawAssets[gender]) rawAssets[gender] = {};
    if (!rawAssets[gender][category]) rawAssets[gender][category] = {};
    if (!rawAssets[gender][category][styleLabel]) rawAssets[gender][category][styleLabel] = [];

    rawAssets[gender][category][styleLabel].push({ count, url: imageUrl });
});

/**
 * Final parsed structure:
 * parsedAssets[gender][category][styleLabel] = Subcategory
 */
const parsedAssets: Record<string, Record<string, Record<string, Subcategory>>> = {};

Object.entries(rawAssets).forEach(([gender, categories]) => {
    parsedAssets[gender] = {};

    Object.entries(categories).forEach(([category, styles]) => {
        parsedAssets[gender][category] = {};

        Object.entries(styles).forEach(([styleLabel, entries]) => {
            // Sort by count so _1 comes first, _2 second, etc.
            // Legacy entries (count = 0) stay in insertion order
            entries.sort((a, b) => a.count - b.count);

            const allImages = entries.map(e => e.url);
            const primaryImage = allImages[0]; // _1 or the only image

            parsedAssets[gender][category][styleLabel] = {
                label: styleLabel,
                primaryImage,
                allImages,
            };
        });
    });
});

// ── Export Dynamic Category Slides Generator ────
export function getCollectionSlides(gender: string): CollectionSlide[] {
    const categoriesMap = parsedAssets[gender.toLowerCase()] || {};
    const slides: CollectionSlide[] = [];
    let isRight = true;

    // Sort categories alphabetically
    const sortedCategories = Object.keys(categoriesMap).sort();

    for (const catId of sortedCategories) {
        const stylesMap = categoriesMap[catId];

        // Build subcategories array, sorted alphabetically
        const subcategories: Subcategory[] = Object.values(stylesMap)
            .sort((a, b) => a.label.localeCompare(b.label));

        // Format Title
        const formattedTitle = catId.charAt(0).toUpperCase() + catId.slice(1) + (catId.endsWith('s') ? '' : 's');
        const meta = categoryMetadata[catId] || {
            tag: "Premium Quality",
            description: `Explore our premium collection of ${formattedTitle.toLowerCase()}.`,
            accent: "bg-indigo-300/60"
        };

        slides.push({
            id: catId,
            title: formattedTitle,
            tag: meta.tag,
            description: meta.description,
            imageRight: isRight,
            subcategories,
            accent: meta.accent,
        });

        isRight = !isRight;
    }

    return slides;
}

// ── Export Legacy "collections" map for Homepage / Nav / Root ────
// This aggregates the top-level Men/Women/Kids data using the generated subcategories map.
export const collections: CollectionSlide[] = ["men", "women", "kids"].map(genderId => {
    const meta = genderMetadata[genderId];
    // Map categories specifically into the format `CollectionSection` expects for the `<a href>` list:
    // It loops through `slide.subcategories` to show the vertical list of text links.
    // So for the homepage, our "subcategories" string list is just the top-level Categories (e.g. "Jackets")
    const categoryKeys = Object.keys(parsedAssets[genderId] || {}).sort();

    return {
        id: genderId,
        title: meta.title,
        tag: meta.tag,
        description: meta.description,
        imageRight: meta.imageRight,
        accent: meta.accent,
        subcategories: categoryKeys.map(cat => ({
            label: cat.charAt(0).toUpperCase() + cat.slice(1) + (cat.endsWith('s') ? '' : 's'),
            primaryImage: '',  // not needed by CollectionSection text links
            allImages: [],     // not needed by CollectionSection text links
        }))
    };
});