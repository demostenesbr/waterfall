import { createSeedActivities } from "@/constants/activities";
import { calculateSchedule, toEditableActivity } from "@/lib/schedule";
import { parseStoredActivities } from "@/schemas/activity";
import type { Activity, ActivitySchedule } from "@/types/activity";

const STORAGE_KEY = "waterfalllab-activities";
const EMPTY: ActivitySchedule[] = [];

type Snapshot = { raw: string | null; items: ActivitySchedule[] };

let snapshot: Snapshot | null = null;
const listeners = new Set<() => void>();

function readRaw(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function parseActivities(raw: string | null): Activity[] {
  if (!raw) return createSeedActivities();
  try {
    return parseStoredActivities(JSON.parse(raw));
  } catch {
    return createSeedActivities();
  }
}

function emit() {
  listeners.forEach((listener) => listener());
}

export const activityService = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    const onStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY || event.key === null) listener();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", onStorage);
    };
  },

  // Snapshot estável por conteúdo armazenado, exigido pelo useSyncExternalStore.
  getSnapshot(): ActivitySchedule[] {
    const raw = readRaw();
    if (snapshot && snapshot.raw === raw) return snapshot.items;
    const items = parseActivities(raw).map((activity) =>
      calculateSchedule(activity),
    );
    snapshot = { raw, items };
    return items;
  },

  // O servidor não conhece o armazenamento local nem a data do usuário.
  getServerSnapshot(): ActivitySchedule[] {
    return EMPTY;
  },

  save(activity: Activity): ActivitySchedule {
    const current = activityService.getSnapshot().map(toEditableActivity);
    const index = current.findIndex((item) => item.id === activity.id);
    if (index >= 0) current[index] = activity;
    else current.unshift(activity);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    } catch {
      // Armazenamento indisponível: a alteração vale apenas para esta sessão.
    }
    emit();
    return calculateSchedule(activity);
  },
};
