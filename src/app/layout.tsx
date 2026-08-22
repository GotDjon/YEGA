import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YEGA — Espace client",
  description:
    "Plateforme numérique YEGA : suivez vos projets au Cameroun où que vous soyez.",
};

// Applique le thème (clair/sombre) enregistré avant le premier rendu visible, pour éviter
// un flash de la mauvaise couleur au chargement (voir ThemeToggle.tsx).
const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem("yega-theme");
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (stored === "dark" || (!stored && prefersDark)) {
      document.documentElement.classList.add("dark");
    }
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${fraunces.variable} ${manrope.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
