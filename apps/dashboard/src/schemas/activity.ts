import { parseArray, parseRecord, parseString } from "./parsers";
import type { Activity } from "@/types/activity";

export function validateActivityDraft(draft: Activity): string[] {
  const errors: string[] = [];
  if (!draft.id.trim()) errors.push("Informe o código da atividade.");
  if (!draft.name.trim()) errors.push("Informe o nome da atividade.");
  if (!draft.dueDate) errors.push("Informe a data de entrega.");
  if (draft.plannedStart && draft.dueDate && draft.plannedStart > draft.dueDate) {
    errors.push("O início planejado não pode ser posterior à entrega.");
  }
  if (draft.progress < 0 || draft.progress > 100) {
    errors.push("O progresso deve estar entre 0 e 100.");
  }
  return errors;
}

export const parseStoredActivities = parseArray((value): Activity => {
  const record = parseRecord(value, "atividade");
  parseString(record.id, "id");
  parseString(record.name, "name");
  parseString(record.dueDate, "dueDate");
  return record as unknown as Activity;
});
