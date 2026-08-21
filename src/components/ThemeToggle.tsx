"use client";

const STORAGE_KEY = "yega-theme";

export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = !root.classList.contains("dark");
    root.classList.toggle("dark", next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
    } catch {
      // stockage indisponible (navigation privée…) — la préférence ne sera simplement pas conservée
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Changer de thème (clair / sombre)"
      className="flex h-9 w-9 items-center justify-center rounded-full text-brand-gold transition-colors hover:bg-brand-gold-light dark:hover:bg-[#fff]/10"
    >
      {/* Lune : visible en thème clair (bouton pour passer au sombre) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5 dark:hidden"
      >
        <path
          fillRule="evenodd"
          d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z"
          clipRule="evenodd"
        />
      </svg>
      {/* Soleil : visible en thème sombre (bouton pour passer au clair) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="hidden h-5 w-5 dark:block"
      >
        <path d="M12 2.25a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.415 1.414a.75.75 0 1 0 1.06 1.06l1.415-1.414ZM21.75 12a.75.75 0 0 1-.75.75h-2a.75.75 0 0 1 0-1.5h2a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.414-1.415a.75.75 0 1 0-1.06 1.06l1.414 1.415ZM12 18a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0v-2A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.414 1.414a.75.75 0 0 0 1.06 1.06l1.415-1.414ZM6 12a.75.75 0 0 1-.75.75h-2a.75.75 0 0 1 0-1.5h2A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06L6.343 5.283a.75.75 0 1 0-1.06 1.06l1.414 1.414Z" />
      </svg>
    </button>
  );
}
