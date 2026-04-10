import { useEffect, useRef, useState } from "react";

interface CursorCardProps {
  image: string;
  title: string;
  description: string;
  visible: boolean;
}

const CursorCard = ({ image, title, description, visible }: CursorCardProps) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  // Track raw mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Smooth lerp follow
  useEffect(() => {
    if (!visible) return;

    const animate = () => {
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.12;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.12;
      setPos({ x: currentRef.current.x, y: currentRef.current.y });
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [visible]);

  if (!visible) return null;

  // Offset: show card to the right + slightly below cursor
  const offsetX = 20;
  const offsetY = -60;

  return (
    <div
      className="fixed z-[9999] pointer-events-none"
      style={{
        left: pos.x + offsetX,
        top: pos.y + offsetY,
        transform: "translateY(0)",
      }}
    >
      <div
        className="w-52 rounded-2xl overflow-hidden shadow-2xl bg-background subtle-border-strong"
        style={{ maxHeight: "280px", display: "flex", flexDirection: "column" }}
      >
        {/* Image */}
        <div className="h-36 shrink-0 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Scrollable content */}
        <div
          className="flex flex-col gap-1.5 px-3 py-3 overflow-y-auto pointer-events-auto"
          style={{ scrollbarWidth: "thin" }}
        >
          <p className="font-display font-bold text-sm text-foreground leading-tight">{title}</p>
          <p className="text-[11px] text-muted-soft leading-relaxed">{description}</p>
          <p className="text-[11px] text-muted-soft leading-relaxed mt-1">
            A legacy built with passion and craft — every detail intentional, every stitch a statement.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CursorCard;
