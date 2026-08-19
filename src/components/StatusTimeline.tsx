import {
  MISSION_STATUS_LABELS,
  MISSION_STATUS_ORDER,
  type MissionStatus,
} from "@/lib/supabase/types";

export function StatusTimeline({ statut }: { statut: MissionStatus }) {
  const currentIndex = MISSION_STATUS_ORDER.indexOf(statut);

  return (
    <ol className="flex flex-wrap items-center gap-2 text-xs">
      {MISSION_STATUS_ORDER.map((step, index) => {
        const isDone = index <= currentIndex;
        return (
          <li key={step} className="flex items-center gap-2">
            <span
              className={
                "rounded-full px-2.5 py-1 font-medium " +
                (isDone
                  ? "bg-brand-green text-white"
                  : "bg-gray-100 text-gray-400")
              }
            >
              {MISSION_STATUS_LABELS[step]}
            </span>
            {index < MISSION_STATUS_ORDER.length - 1 && (
              <span className="text-gray-300">→</span>
            )}
          </li>
        );
      })}
    </ol>
  );
}
