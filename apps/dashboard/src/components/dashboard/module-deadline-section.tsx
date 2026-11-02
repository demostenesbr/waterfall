"use client";

import { useState } from "react";
import {
  ActivityEditorModal,
  ContextDeadlinePanel,
} from "@/components/dashboard/ActivityTimeline";
import { useActivities } from "@/hooks/useActivities";
import type { ActivitySchedule } from "@/types/activity";

export function ModuleDeadlineSection({
  phase,
  title,
}: {
  phase: string;
  title: string;
}) {
  const [editor, setEditor] = useState<{
    open: boolean;
    activity: ActivitySchedule | null;
  }>({ open: false, activity: null });
  const activities = useActivities();
  const items = activities.filter((item) => item.phase.startsWith(phase));
  return (
    <>
      <ContextDeadlinePanel
        title={title}
        activities={items}
        onView={(activity) => setEditor({ open: true, activity })}
        onCreate={() => setEditor({ open: true, activity: null })}
      />
      <ActivityEditorModal
        open={editor.open}
        activity={editor.activity}
        onClose={() => setEditor({ open: false, activity: null })}
      />
    </>
  );
}
