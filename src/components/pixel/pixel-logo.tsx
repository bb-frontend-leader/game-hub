import { PixelIcon } from "./pixel-icon";

// Marca de la plataforma: libro pixel que rebota + nombre con contorno y sombra.
export function PixelLogo({
  size = "md",
  className = "",
}: {
  size?: "md" | "lg";
  className?: string;
}) {
  const big = size === "lg";

  return (
    <span className={`inline-flex items-center gap-3 sm:gap-4 ${className}`}>
      <PixelIcon name="book" scale={big ? 5 : 3} className="animate-px-bob shrink-0" />
      <span
        className={`px-title whitespace-nowrap ${big ? "text-[1.5rem] sm:text-[2.5rem]" : "text-base sm:text-xl lg:text-2xl"}`}
      >
        Books<span className="text-cyan">Quest</span>
      </span>
    </span>
  );
}
