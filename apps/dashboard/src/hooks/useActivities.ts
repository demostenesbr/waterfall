"use client";

import { useSyncExternalStore } from "react";
import { activityService } from "@/services/activities/activity-service";

export function useActivities() {
  return useSyncExternalStore(
    activityService.subscribe,
    activityService.getSnapshot,
    activityService.getServerSnapshot,
  );
}
