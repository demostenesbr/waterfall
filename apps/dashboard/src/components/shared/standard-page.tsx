"use client";

import { type ElementType } from "react";
import { ChevronRight, MoreHorizontal, Plus } from "@/components/ui/icons";
import { Badge, Button, Card, Title } from "@/components/ui";
import { ModuleDeadlineSection } from "@/components/dashboard/module-deadline-section";
import { PageHeader } from "@/components/shared/page-header";
import { MetricCard } from "@/components/shared/metric-card";

export function StandardPage({
  title,
  description,
  metrics,
  cards,
  deadlinePhase,
  deadlineTitle,
}: {
  title: string;
  description: string;
  metrics: [string, string, ElementType][];
  cards: [string, string, ElementType][];
  deadlinePhase?: string;
  deadlineTitle?: string;
}) {
  return (
    <>
      <PageHeader
        title={title}
        description={description}
        action={
          <Button>
            <Plus size={16} /> Novo registro
          </Button>
        }
      />
      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {metrics.map(([l, v, I]) => (
          <MetricCard
            key={l}
            label={l}
            value={v}
            detail="Atualizado hoje"
            icon={I}
          />
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cards.map(([t, d, I]) => (
          <Card key={t} className="p-5">
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-primary-soft p-2 text-primary">
                <I size={19} />
              </div>
              <Button variant="ghost" className="p-2">
                <MoreHorizontal size={17} />
              </Button>
            </div>
            <Title level={2} className="mt-4">
              {t}
            </Title>
            <div className="mt-1 min-h-10 text-sm text-ink-muted">{d}</div>
            <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-xs">
              <Badge tone="success">Atualizado</Badge>
              <span className="font-semibold text-primary">
                Abrir <ChevronRight size={13} className="inline" />
              </span>
            </div>
          </Card>
        ))}
      </div>
      {deadlinePhase && (
        <ModuleDeadlineSection
          phase={deadlinePhase}
          title={deadlineTitle || "Cronograma e prazos"}
        />
      )}
    </>
  );
}
