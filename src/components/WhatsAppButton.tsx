import { getLocale, UI } from "@/lib/i18n";

// Numéro WhatsApp Business de YEGA (format international, sans "+" ni espaces pour wa.me).
const WHATSAPP_NUMBER = "237652343154";

export async function WhatsAppButton() {
  const t = UI[await getLocale()];
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t.whatsapp_message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={t.whatsapp_label}
      className="fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/25 transition-transform hover:scale-105"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" className="h-7 w-7">
        <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.31.65 4.468 1.777 6.303L4 29l7.887-1.744A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm0 21.818c-1.965 0-3.79-.57-5.33-1.55l-.382-.238-4.68 1.035 1.02-4.56-.25-.394A9.77 9.77 0 0 1 5.182 15c0-5.973 4.85-10.818 10.822-10.818 5.972 0 10.818 4.845 10.818 10.818 0 5.973-4.846 10.818-10.818 10.818Zm6.02-8.096c-.33-.165-1.951-.963-2.253-1.073-.303-.11-.523-.165-.744.165-.22.33-.853 1.073-1.046 1.293-.192.22-.385.248-.715.083-.33-.165-1.393-.513-2.653-1.636-.981-.875-1.644-1.956-1.836-2.286-.192-.33-.02-.508.145-.673.149-.148.33-.385.495-.578.165-.192.22-.33.33-.55.11-.22.055-.413-.028-.578-.083-.165-.744-1.793-1.02-2.456-.269-.645-.542-.557-.744-.567l-.633-.011c-.22 0-.578.083-.881.413s-1.156 1.13-1.156 2.756 1.183 3.196 1.348 3.416c.165.22 2.328 3.554 5.64 4.983.788.34 1.403.543 1.883.695.791.252 1.51.216 2.079.131.634-.095 1.951-.797 2.226-1.567.275-.77.275-1.43.192-1.567-.083-.138-.303-.22-.633-.385Z" />
      </svg>
    </a>
  );
}
