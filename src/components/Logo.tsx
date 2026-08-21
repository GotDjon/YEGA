import Image from "next/image";

// Logo officiel YEGA — mains protectrices formant un toit, palette Vert Émeraude / Or.
// "dark" (icône couleur, s'adapte en icône or sur thème sombre) pour l'en-tête ;
// "light" (icône or forcée) pour les fonds toujours sombres (hero login/register).
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

  return (
    <span className="flex items-center gap-2.5">
      {isLight ? (
        <Image
          src="/logo-icon-gold.png"
          alt="YEGA"
          width={Math.round(iconPx * ICON_RATIO.light)}
          height={iconPx}
          priority
          className="shrink-0"
        />
      ) : (
        <>
          <Image
            src="/logo-icon.png"
            alt="YEGA"
            width={Math.round(iconPx * ICON_RATIO.dark)}
            height={iconPx}
            priority
            className="shrink-0 dark:hidden"
          />
          <Image
            src="/logo-icon-gold.png"
            alt="YEGA"
            width={Math.round(iconPx * ICON_RATIO.light)}
            height={iconPx}
            priority
            className="hidden shrink-0 dark:block"
          />
        </>
      )}
      <span className="flex flex-col leading-none">
        <span
          className={
            `font-[family-name:var(--font-display)] ${textSize} font-semibold tracking-tight ` +
            (isLight ? "text-[#fff]" : "text-heading")
          }
        >
          YEGA
        </span>
        <span
          className={
            "text-[9px] font-medium uppercase tracking-[0.18em] " +
            (isLight
              ? "text-brand-gold-light/90"
              : "text-brand-gold-dark dark:text-brand-gold-on-dark")
          }
        >
          Le Cameroun en toute confiance
        </span>
      </span>
    </span>
  );
}
