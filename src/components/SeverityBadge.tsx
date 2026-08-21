import { NOTIFICATION_SEVERITE_LABELS, type NotificationSeverite } from "@/lib/supabase/types";

const SEVERITE_STYLES: Record<NotificationSeverite, string> = {
  critique: "bg-red-100 text-red-700",
  attention: "bg-amber-100 text-amber-700",
  action: "bg-brand-green-light text-heading",
  info: "bg-gray-100 text-gray-600",
};

const SEVERITE_DOT: Record<NotificationSeverite, string> = {
  critique: "bg-red-500",
  attention: "bg-amber-500",
  action: "bg-brand-green",
  info: "bg-gray-400",
};

export function SeverityBadge({ severite }: { severite: NotificationSeverite }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ${SEVERITE_STYLES[severite]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${SEVERITE_DOT[severite]}`} />
      {NOTIFICATION_SEVERITE_LABELS[severite]}
    </span>
  );
}
