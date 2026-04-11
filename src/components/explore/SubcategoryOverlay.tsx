import { Link } from "react-router-dom";

type Props = {
  label: string;
  gender: string; // "men" | "women" | "kids"
  imageIndex: number;
  total: number;
  imageRight: boolean; // controls text alignment
};

/**
 * SubcategoryOverlay
 *
 * Rendered inside ImageCarousel. At rest the label sits at the bottom corner.
 * On hover (via parent `group` class) it slides to the top corner while a
 * golden underline expands and a dark vignette fades in — identical to the
 * CollectionSection.tsx hover mechanic.
 */
const SubcategoryOverlay = ({
  label,
  gender,
  imageIndex,
  total,
  imageRight,
}: Props) => {
  const align = imageRight ? "items-start text-left" : "items-end text-right";

  return (
    <>
      {/* ── Default bottom gradient (hides on hover) ─────────────────── */}
      <div
        className="absolute inset-x-0 bottom-0 h-[45%] pointer-events-none z-20
                   transition-opacity duration-500 group-hover:opacity-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.82) 0%, transparent 100%)",
        }}
      />

      {/* ── Hover dark overlay ────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />

      {/* ── Sliding content container ─────────────────────────────────── */}
      <div
        className={`absolute z-30 left-7 right-7 flex flex-col
                    top-[calc(100%-88px)] group-hover:top-8
                    transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                    ${align}`}
      >
        {/* Brand micro-tag (visible only on hover) */}
        <p className="text-white/75 text-[9px] tracking-[0.38em] uppercase font-semibold mb-1
                      opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-75">
          Urban Grand
        </p>

        {/* Subcategory label */}
        <Link
          to={`/category/${gender}/${label.toLowerCase()}`}
          className="inline-block"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-white text-2xl font-bold tracking-tight drop-shadow-md
                         hover:text-[hsl(38,75%,70%)] transition-colors duration-300">
            {label}
          </h3>
        </Link>

        {/* Golden underline (expands on hover) */}
        <div
          className={`h-[2px] bg-[hsl(38,60%,55%)] mt-2.5 rounded-full
                      transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                      w-0 group-hover:w-20
                      ${imageRight ? "" : "self-end"}`}
        />

        {/* Image counter (visible on hover) */}
        <p
          className={`text-white/50 text-[10px] tracking-[0.25em] uppercase font-semibold mt-2
                      opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-150`}
        >
          {imageIndex + 1} / {total}
        </p>
      </div>
    </>
  );
};

export default SubcategoryOverlay;
