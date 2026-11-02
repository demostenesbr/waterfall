import { describe, expect, it } from "vitest";
import { calculateActivityStats, calculateSchedule } from "../../src/lib/schedule";
import { statusTone } from "../../src/lib/status";
import { validateActivityDraft } from "../../src/schemas/activity";
import type { Activity } from "../../src/types/activity";

const now = new Date("2025-06-10T15:00:00Z");

const base: Activity = {
  id: "ATV-X",
  name: "Atividade",
  description: "",
  project: "WFL-001",
  phase: "F04 · Implementação",
  category: "Teste",
  plannedStart: "2025-06-01",
  dueDate: "2025-06-20",
  progress: 10,
  owner: "Ana",
  dependencies: [],
  history: [],
};

describe("calculateSchedule", () => {
  it("marks unfinished past-due activities as late", () => {
    const result = calculateSchedule(
      { ...base, dueDate: "2025-06-07", actualStart: "2025-06-02" },
      now,
    );
    expect(result.status).toBe("Em atraso");
    expect(result.alert).toBe("Atraso");
    expect(result.daysLate).toBe(3);
    expect(result.daysRemaining).toBe(0);
  });

  it("marks completed activities as delivered, flagging late delivery", () => {
    const result = calculateSchedule(
      { ...base, dueDate: "2025-06-05", actualEnd: "2025-06-08", progress: 100 },
      now,
    );
    expect(result.status).toBe("Entregue");
    expect(result.deliveredLate).toBe(true);
  });

  it("classifies upcoming deadlines by urgency", () => {
    const started = { ...base, actualStart: "2025-06-02" };
    expect(calculateSchedule({ ...started, dueDate: "2025-06-11" }, now).alert).toBe("Vencimento crítico");
    expect(calculateSchedule({ ...started, dueDate: "2025-06-13" }, now).alert).toBe("Vencimento iminente");
    expect(calculateSchedule({ ...started, dueDate: "2025-06-16" }, now).alert).toBe("Atenção");
    expect(calculateSchedule({ ...started, dueDate: "2025-06-30" }, now).alert).toBe("No prazo");
  });

  it("treats activities without a start date as not started", () => {
    expect(calculateSchedule(base, now).status).toBe("Não iniciada");
  });
});

describe("calculateActivityStats", () => {
  it("counts every status and computes percentages", () => {
    const items = [
      calculateSchedule(base, now),
      calculateSchedule({ ...base, actualStart: "2025-06-02" }, now),
      calculateSchedule({ ...base, progress: 100 }, now),
      calculateSchedule({ ...base, progress: 100 }, now),
    ];
    const stats = calculateActivityStats(items);
    expect(stats.map((item) => item.count)).toEqual([1, 1, 0, 2]);
    expect(stats.find((item) => item.status === "Entregue")?.percentage).toBe(50);
  });

  it("handles an empty list", () => {
    expect(calculateActivityStats([]).every((item) => item.percentage === 0)).toBe(true);
  });
});

describe("statusTone", () => {
  it("maps statuses to badge tones", () => {
    expect(statusTone("Aprovada")).toBe("success");
    expect(statusTone("Em andamento")).toBe("info");
    expect(statusTone("Em revisão")).toBe("warning");
    expect(statusTone("Bloqueada")).toBe("danger");
    expect(statusTone("Não iniciada")).toBe("neutral");
  });
});

describe("validateActivityDraft", () => {
  it("accepts a valid draft", () => {
    expect(validateActivityDraft(base)).toEqual([]);
  });

  it("reports missing and inconsistent fields", () => {
    const errors = validateActivityDraft({
      ...base,
      name: " ",
      plannedStart: "2025-07-01",
      progress: 150,
    });
    expect(errors).toHaveLength(3);
  });
});
