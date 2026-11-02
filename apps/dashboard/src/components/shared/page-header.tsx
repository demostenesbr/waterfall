"use client";

import { type ReactNode } from "react";
import { Title } from "@/components/ui";

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <Title>{title}</Title>
        <div className="mt-1 text-sm text-ink-muted">{description}</div>
      </div>
      {action}
    </div>
  );
}
