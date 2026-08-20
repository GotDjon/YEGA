import Image from "next/image";

// Logo officiel YEGA — mains protectrices formant un toit, palette Vert Émeraude / Or.
// "dark" (icône couleur) pour fonds clairs, "light" (icône or) pour fonds sombres.
const ICON_RATIO = { dark: 610 / 660, light: 173 / 212 };

export function Logo({
  variant = "dark",
  size = "md",
}: {
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg";
}) {
  const iconPx = size === "lg" ? 56 : size === "sm" ? 28 : 34;
  const textSize = size === "lg" ? "text-2xl" : size === "sm" ? "text-base" : "text-lg";
  const isLight = variant === "light";
  const ratio = isLight ? ICON_RATIO.light : ICON_RATIO.dark;

  return (
    <span className="flex items-center gap-2.5">
      <Image
        src={isLight ? "/logo-icon-gold.png" : "/logo-icon.png"}
        alt="YEGA"
        width={Math.round(iconPx * ratio)}
        height={iconPx}
        priority
        className="shrink-0"
      />
      <span className="flex flex-col leading-none">
        <span
          className={
            `font-[family-name:var(--font-display)] ${textSize} font-semibold tracking-tight ` +
            (isLight ? "text-white" : "text-brand-green-dark")
          }
        >
          YEGA
        </span>
        <span
          className={
            "text-[9px] font-medium uppercase tracking-[0.18em] " +
            (isLight ? "text-brand-gold-light/90" : "text-brand-gold-dark")
          }
        >
          Le Cameroun en toute confiance
        </span>
      </span>
    </span>
  );
}
