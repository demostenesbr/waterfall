"use client";

import { useState } from "react";
import { ArrowDownRight, CalendarDays, Check, CheckCircle2, ChevronRight, FileText, ListChecks, ShieldCheck, Users } from "@/components/ui/icons";
import { Badge, Button, Card, Input, Modal, Progress, Select, Title } from "@/components/ui";
import { useActivities } from "@/hooks/useActivities";
import { useCurrentDate } from "@/hooks/useCurrentDate";
import { statusTone } from "@/lib/status";
import { PageHeader } from "@/components/shared/page-header";
import { Field } from "@/components/shared/field";
import { phases } from "@/constants/portfolio";

export function LifecyclePage() {
  const currentDate = useCurrentDate();
  const [selected, setSelected] = useState(phases[2]);
  const [requestOpen, setRequestOpen] = useState(false);
  const lifecycleActivities = useActivities();
  return (
    <>
      <PageHeader
        title="Ciclo de Vida Cascata"
        description="Governança sequencial, entregáveis e Stage Gates do projeto WFL-001."
        action={
          <Button variant="secondary" onClick={() => setRequestOpen(true)}>
            <ArrowDownRight size={16} /> Solicitar revisão
          </Button>
        }
      />
      <Card className="mb-5 p-5">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">
              Progresso global do ciclo
            </div>
            <div className="mt-1 text-xl font-bold">
              Fase 4 de 7 · Implementação
            </div>
            <div className="text-sm text-ink-muted">
              3 Stage Gates aprovados · 1 em revisão
            </div>
          </div>
          <div className="min-w-64">
            <div className="mb-2 flex justify-between text-sm">
              <span>Conclusão geral</span>
              <strong>68%</strong>
            </div>
            <Progress value={68} />
          </div>
        </div>
      </Card>
      <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <div className="relative space-y-3 before:absolute before:bottom-8 before:left-[27px] before:top-8 before:w-px before:bg-line">
          <div className="relative z-10 mb-1 ml-1 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-danger">
            <span className="h-px w-5 bg-danger" />
            Data atual · {currentDate}
          </div>
          {phases.map((p, i) => {
            const phaseItems = lifecycleActivities.filter((item) =>
              item.phase.startsWith(p.id),
            );
            const late = phaseItems.filter(
              (item) => item.status === "Em atraso",
            ).length;
            return (
              <Card
                key={p.id}
                className={`relative cursor-pointer p-4 transition-all hover:border-primary/40 ${late ? "border-danger/40" : ""} ${selected.id === p.id ? "border-primary ring-2 ring-primary-soft" : ""}`}
              >
                <div
                  onClick={() => setSelected(p)}
                  className="flex items-start gap-4"
                >
                  <div
                    className={`z-10 flex size-7 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold ${late ? "border-danger bg-danger text-white" : p.status === "Aprovada" ? "border-success bg-success text-white" : p.status === "Em revisão" ? "border-warning bg-warning-soft text-warning-strong" : p.status === "Em andamento" ? "border-primary bg-primary text-white" : "border-line bg-white text-ink-muted"}`}
                  >
                    {p.status === "Aprovada" && !late ? (
                      <Check size={14} />
                    ) : (
                      i + 1
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                      <div>
                        <div className="text-[10px] font-bold tracking-wider text-ink-faint">
                          {p.id}
                        </div>
                        <div className="font-bold">{p.name}</div>
                      </div>
                      <div className="flex gap-2">
                        {late > 0 && (
                          <Badge tone="danger">{late} em atraso</Badge>
                        )}
                        <Badge tone={statusTone(p.status)}>{p.status}</Badge>
                      </div>
                    </div>
                    <div className="mt-1 text-sm text-ink-muted">
                      {p.description}
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-ink-muted sm:grid-cols-4">
                      <span>
                        <CalendarDays size={13} className="mr-1 inline" />
                        {p.dates}
                      </span>
                      <span>
                        <Users size={13} className="mr-1 inline" />
                        {p.owner}
                      </span>
                      <span>
                        <FileText size={13} className="mr-1 inline" />
                        {p.deliverables} entregáveis
                      </span>
                      <span>
                        <ListChecks size={13} className="mr-1 inline" />
                        {phaseItems.length} atividades
                      </span>
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex-1">
                        <Progress
                          value={p.progress}
                          tone={
                            p.status === "Aprovada"
                              ? "green"
                              : late
                                ? "amber"
                                : "blue"
                          }
                        />
                      </div>
                      <span className="text-xs font-bold">{p.progress}%</span>
                    </div>
                  </div>
                  <ChevronRight className="mt-1 text-ink-faint" size={18} />
                </div>
              </Card>
            );
          })}
        </div>
        <div>
          <Card className="sticky top-24 overflow-hidden">
            <div className="border-b border-line bg-surface-subtle p-5">
              <Badge tone={statusTone(selected.status)}>
                {selected.status}
              </Badge>
              <Title level={2} className="mt-3">
                {selected.name}
              </Title>
              <div className="mt-1 text-sm text-ink-muted">
                {selected.description}
              </div>
            </div>
            <div className="space-y-5 p-5">
              <div>
                <div className="mb-2 text-xs font-bold uppercase tracking-wide text-ink-muted">
                  Stage Gate
                </div>
                <div className="rounded-lg border border-warning/30 bg-warning-soft p-3 text-sm">
                  <div className="font-semibold text-warning-strong">
                    Critérios: {selected.criteria}
                  </div>
                  <div className="mt-1 text-xs text-ink-muted">
                    Todos os critérios obrigatórios devem ser atendidos antes da
                    aprovação formal.
                  </div>
                </div>
              </div>
              <div>
                <div className="mb-3 text-xs font-bold uppercase tracking-wide text-ink-muted">
                  Entregáveis principais
                </div>
                {[
                  "Documento de arquitetura",
                  "Modelo de dados",
                  "Especificação de APIs",
                  "Registro de decisões",
                ].map((x, i) => (
                  <div key={x} className="mb-2 flex items-center gap-2 text-sm">
                    <CheckCircle2
                      size={15}
                      className={i < 2 ? "text-success" : "text-ink-faint"}
                    />
                    <span>{x}</span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="secondary">
                  <FileText size={15} /> Documentos
                </Button>
                <Button disabled={selected.criteria !== "9/9"}>
                  <ShieldCheck size={15} /> Aprovar
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <Modal
        open={requestOpen}
        onClose={() => setRequestOpen(false)}
        title="Solicitar revisão de fase"
        footer={
          <>
            <Button variant="secondary" onClick={() => setRequestOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setRequestOpen(false)}>
              Registrar solicitação
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Field label="Fase anterior">
            <Select className="w-full">
              <option>F02 — Análise</option>
              <option>F01 — Levantamento de Requisitos</option>
            </Select>
          </Field>
          <Field label="Motivo da revisão">
            <Input placeholder="Descreva a necessidade de mudança..." />
          </Field>
          <div className="rounded-lg bg-primary-soft p-3 text-xs text-primary">
            A solicitação será registrada no histórico de mudanças e enviada ao
            responsável pela fase.
          </div>
        </div>
      </Modal>
    </>
  );
}
