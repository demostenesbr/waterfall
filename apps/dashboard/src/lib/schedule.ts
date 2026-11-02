import { DAY_IN_MS, dateAtNoon } from "@/lib/dates";
import type {
  Activity,
  ActivitySchedule,
  ActivityStatus,
} from "@/types/activity";

export const ACTIVITY_STATUSES: ActivityStatus[] = [
  "Não iniciada",
  "Em andamento",
  "Em atraso",
  "Entregue",
];

export function calculateSchedule(
  activity: Activity,
  now = new Date(),
): ActivitySchedule {
  const today = dateAtNoon(now);
  const due = dateAtNoon(activity.dueDate);
  const daysRemaining = Math.ceil((due.getTime() - today.getTime()) / DAY_IN_MS);
  const deliveredLate = Boolean(
    activity.actualEnd &&
    dateAtNoon(activity.actualEnd).getTime() > due.getTime(),
  );
  let status: ActivityStatus;
  if (activity.actualEnd || activity.progress >= 100) status = "Entregue";
  else if (daysRemaining < 0) status = "Em atraso";
  else if (activity.actualStart) status = "Em andamento";
  else status = "Não iniciada";

  const alert =
    status === "Entregue"
      ? "Entregue"
      : status === "Em atraso"
        ? "Atraso"
        : daysRemaining <= 1
          ? "Vencimento crítico"
          : daysRemaining <= 3
            ? "Vencimento iminente"
            : daysRemaining <= 7
              ? "Atenção"
              : "No prazo";

  return {
    ...activity,
    status,
    alert,
    daysRemaining: Math.max(0, daysRemaining),
    daysLate: Math.max(0, -daysRemaining),
    deliveredLate,
  };
}

export function calculateActivityStats(items: ActivitySchedule[]) {
  const total = items.length;
  return ACTIVITY_STATUSES.map((status) => {
    const count = items.filter((item) => item.status === status).length;
    return {
      status,
      count,
      percentage: total ? Math.round((count / total) * 100) : 0,
    };
  });
}

export function toEditableActivity(activity: ActivitySchedule): Activity {
  const {
    status: _status,
    alert: _alert,
    daysRemaining: _daysRemaining,
    daysLate: _daysLate,
    deliveredLate: _deliveredLate,
    ...editable
  } = activity;
  void [_status, _alert, _daysRemaining, _daysLate, _deliveredLate];
  return editable;
}
