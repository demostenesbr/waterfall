export const DAY_IN_MS = 86_400_000;

const toIsoDate = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

export const dateAtNoon = (value: Date | string) => {
  // Datas no formato AAAA-MM-DD representam o dia local, não meia-noite UTC.
  const dateOnly =
    typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)
      ? new Date(`${value}T12:00:00`)
      : new Date(value);
  dateOnly.setHours(12, 0, 0, 0);
  return dateOnly;
};

export const todayIso = () => toIsoDate(new Date());

export const relativeDate = (days: number) => {
  const date = dateAtNoon(new Date());
  date.setDate(date.getDate() + days);
  return toIsoDate(date);
};

export const formatDate = (value?: string) =>
  value
    ? new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "short",
        timeZone: "UTC",
      }).format(new Date(`${value}T12:00:00Z`))
    : "—";
