// Wordmark temporaire — sera remplacé par le logo officiel (mains/toit) dès réception du
// fichier de marque. Conserve la palette Vert Émeraude / Or en attendant.
export function Logo({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const isLight = variant === "light";
  return (
    <span className="flex items-center gap-2">
      <span
        className={
          "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold " +
          (isLight ? "bg-brand-gold text-brand-green-deep" : "bg-brand-green text-white")
        }
      >
        Y
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={
            "font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight " +
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
