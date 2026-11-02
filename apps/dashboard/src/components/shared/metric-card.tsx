"use client";

import { type ElementType } from "react";
import { MoreHorizontal, TrendingUp } from "@/components/ui/icons";
import { Card } from "@/components/ui";

export function MetricCard({
  label,
  value,
  detail,
  icon: Icon,
  tone = "blue",
}: {
  label: string;
  value: string;
  detail: string;
  icon: ElementType;
  tone?: "blue" | "green" | "amber" | "red";
}) {
  const colors = {
    blue: "bg-primary-soft text-primary",
    green: "bg-success-soft text-success",
    amber: "bg-warning-soft text-warning-strong",
    red: "bg-danger-soft text-danger",
  };
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div className={`rounded-lg p-2 ${colors[tone]}`}>
          <Icon size={18} />
        </div>
        <MoreHorizontal size={17} className="text-ink-faint" />
      </div>
      <div className="mt-4 text-2xl font-bold">{value}</div>
      <div className="mt-0.5 text-xs font-medium text-ink-muted">{label}</div>
      <div className="mt-3 flex items-center gap-1 text-[11px] text-ink-muted">
        <TrendingUp size={12} className="text-success" />
        {detail}
      </div>
    </Card>
  );
}
