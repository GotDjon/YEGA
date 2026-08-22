import {
  getMissionStatusLabels,
  MISSION_STATUS_ORDER,
  type MissionStatus,
} from "@/lib/supabase/types";
import { getLocale } from "@/lib/i18n";

export async function StatusTimeline({ statut }: { statut: MissionStatus }) {
  const currentIndex = MISSION_STATUS_ORDER.indexOf(statut);
  const labels = getMissionStatusLabels(await getLocale());

  return (
    <div className="-mx-1 overflow-x-auto px-1 py-0.5">
      <ol className="flex min-w-max items-start">
        {MISSION_STATUS_ORDER.map((step, index) => {
          const isLast = index === MISSION_STATUS_ORDER.length - 1;
          // Le statut final ("Clôturée") est un aboutissement, pas une étape "en cours" —
          // il s'affiche donc comme terminé (coche), jamais en or.
          const isDone = index < currentIndex || (index === currentIndex && isLast);
          const isCurrent = index === currentIndex && !isLast;

          return (
            <li key={step} className={"flex items-center" + (isLast ? "" : " flex-1")}>
              <div className="flex flex-col items-center">
                <span
                  className={
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ring-4 " +
                    (isCurrent
                      ? "bg-brand-gold text-brand-green-deep ring-brand-gold-light"
                      : isDone
                        ? "bg-brand-green text-[#fff] ring-brand-green-light"
                        : "bg-white text-gray-300 ring-gray-100")
                  }
                >
                  {isDone ? "✓" : ""}
                </span>
                <span
                  className={
                    "mt-1.5 w-16 text-center text-[10px] font-medium leading-tight sm:w-20 " +
                    (isCurrent
                      ? "text-brand-gold-dark"
                      : isDone
                        ? "text-heading"
                        : "text-gray-400")
                  }
                >
                  {labels[step]}
                </span>
              </div>
              {!isLast && (
                <span
                  className={
                    "-mt-4 h-0.5 w-8 flex-1 " + (isDone ? "bg-brand-green" : "bg-gray-100")
                  }
                />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
