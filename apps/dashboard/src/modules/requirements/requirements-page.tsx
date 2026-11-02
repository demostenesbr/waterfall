"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, ArrowRight, CheckCircle2, Clock3, Code2, Download, Edit3, FileText, Plus, Search, TestTube2, Trash2 } from "@/components/ui/icons";
import { Badge, Button, Card, Input, Modal, Select } from "@/components/ui";
import { useStoredState } from "@/hooks/useStoredState";
import { useActivities } from "@/hooks/useActivities";
import { ActivityEditorModal, ContextDeadlinePanel } from "@/components/dashboard/ActivityTimeline";
import { statusTone } from "@/lib/status";
import { PageHeader } from "@/components/shared/page-header";
import { MetricCard } from "@/components/shared/metric-card";
import { Field } from "@/components/shared/field";
import { requirements as initialRequirements } from "@/constants/portfolio";
import type { ActivitySchedule } from "@/types/activity";

export function RequirementsPage() {
  const allActivities = useActivities();
  const [items, setItems] = useStoredState(
    "waterfalllab-requirements",
    initialRequirements,
  );
  const [query, setQuery] = useState("");
  const [type, setType] = useState("Todos");
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [activityEditor, setActivityEditor] = useState<{
    open: boolean;
    activity: ActivitySchedule | null;
  }>({ open: false, activity: null });
  const filtered = useMemo(
    () =>
      items.filter(
        (r) =>
          r.name.toLowerCase().includes(query.toLowerCase()) &&
          (type === "Todos" || r.type === type),
      ),
    [items, query, type],
  );
  const add = () => {
    setItems([
      ...items,
      {
        id: `RF-00${items.length + 1}`,
        name: "Novo requisito",
        type: "Funcional",
        priority: "Média",
        owner: "Marina Costa",
        status: "Em análise",
        date: new Date().toLocaleDateString("pt-BR"),
        tests: 0,
      },
    ]);
    setOpen(false);
  };
  return (
    <>
      <PageHeader
        title="Requisitos"
        description="Elicitação, aprovação e rastreabilidade entre requisitos, implementação e testes."
        action={
          <div className="flex gap-2">
            <Button variant="secondary">
              <Download size={15} /> Exportar
            </Button>
            <Button onClick={() => setOpen(true)}>
              <Plus size={16} /> Novo requisito
            </Button>
          </div>
        }
      />
      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard
          label="Total de requisitos"
          value="38"
          detail="29 funcionais"
          icon={FileText}
        />
        <MetricCard
          label="Aprovados"
          value="28"
          detail="73,7% do total"
          icon={CheckCircle2}
          tone="green"
        />
        <MetricCard
          label="Em revisão"
          value="7"
          detail="3 aguardam parecer"
          icon={Clock3}
          tone="amber"
        />
        <MetricCard
          label="Cobertura por testes"
          value="91%"
          detail="+4% neste ciclo"
          icon={TestTube2}
        />
      </div>
      <Card>
        <div className="flex flex-col gap-3 border-b border-line p-4 md:flex-row">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-2.5 text-ink-faint"
              size={16}
            />
            <Input
              className="pl-9"
              placeholder="Buscar por ID, nome ou descrição..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <Select value={type} onChange={(e) => setType(e.target.value)}>
            <option>Todos</option>
            <option>Funcional</option>
            <option>Não funcional</option>
          </Select>
          <Select>
            <option>Todas as prioridades</option>
            <option>Crítica</option>
            <option>Alta</option>
          </Select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="bg-surface-muted text-xs text-ink-muted">
              <tr>
                {[
                  "ID / Requisito",
                  "Tipo",
                  "Prioridade",
                  "Responsável",
                  "Status",
                  "Rastreabilidade",
                  "Criado em",
                  "",
                ].map((x) => (
                  <th key={x} className="px-5 py-3 font-semibold">
                    {x}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-surface-subtle">
                  <td className="px-5 py-4">
                    <div className="font-mono text-xs font-bold text-primary">
                      {r.id}
                    </div>
                    <div className="mt-1 font-semibold">{r.name}</div>
                  </td>
                  <td className="px-5 py-4 text-ink-muted">{r.type}</td>
                  <td className="px-5 py-4">
                    <Badge
                      tone={
                        r.priority === "Crítica"
                          ? "danger"
                          : r.priority === "Alta"
                            ? "warning"
                            : "neutral"
                      }
                    >
                      {r.priority}
                    </Badge>
                  </td>
                  <td className="px-5 py-4">{r.owner}</td>
                  <td className="px-5 py-4">
                    <Badge tone={statusTone(r.status)}>{r.status}</Badge>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1 text-xs">
                      <Code2 size={14} className="text-primary" /> 1 módulo{" "}
                      <ArrowRight size={12} />
                      <TestTube2 size={14} className="text-success" /> {r.tests}{" "}
                      testes
                    </div>
                  </td>
                  <td className="px-5 py-4 text-ink-muted">{r.date}</td>
                  <td className="px-5 py-4">
                    <div className="flex">
                      <Button variant="ghost" className="p-2">
                        <Edit3 size={15} />
                      </Button>
                      <Button
                        variant="ghost"
                        className="p-2 text-danger"
                        onClick={() => setDeleteId(r.id)}
                      >
                        <Trash2 size={15} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <ContextDeadlinePanel
        title="Prazos dos artefatos de requisitos"
        activities={allActivities.filter((item) => item.phase.startsWith("F01"))}
        onView={(activity) => setActivityEditor({ open: true, activity })}
        onCreate={() => setActivityEditor({ open: true, activity: null })}
      />
      <ActivityEditorModal
        open={activityEditor.open}
        activity={activityEditor.activity}
        onClose={() => setActivityEditor({ open: false, activity: null })}
        onSaved={() => setActivityEditor({ open: false, activity: null })}
      />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Cadastrar requisito"
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={add}>Salvar requisito</Button>
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Identificador">
            <Input value={`RF-00${items.length + 1}`} readOnly />
          </Field>
          <Field label="Tipo">
            <Select className="w-full">
              <option>Funcional</option>
              <option>Não funcional</option>
            </Select>
          </Field>
          <div className="sm:col-span-2">
            <Field label="Nome">
              <Input placeholder="Nome objetivo do requisito" />
            </Field>
          </div>
          <Field label="Prioridade">
            <Select className="w-full">
              <option>Alta</option>
              <option>Média</option>
              <option>Baixa</option>
            </Select>
          </Field>
          <Field label="Responsável">
            <Select className="w-full">
              <option>Marina Costa</option>
              <option>Lucas Mendes</option>
            </Select>
          </Field>
          <div className="sm:col-span-2">
            <Field label="Critério de aceitação">
              <Input placeholder="Condição verificável para aprovação" />
            </Field>
          </div>
        </div>
      </Modal>
      <Modal
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        title="Excluir requisito"
        footer={
          <>
            <Button variant="secondary" onClick={() => setDeleteId(null)}>
              Cancelar
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                setItems(items.filter((x) => x.id !== deleteId));
                setDeleteId(null);
              }}
            >
              Excluir definitivamente
            </Button>
          </>
        }
      >
        <div className="flex gap-3">
          <div className="rounded-lg bg-danger-soft p-2 text-danger">
            <AlertTriangle size={20} />
          </div>
          <div className="text-sm text-ink-muted">
            Esta ação removerá <strong className="text-ink">{deleteId}</strong>{" "}
            e poderá afetar vínculos de rastreabilidade. Deseja continuar?
          </div>
        </div>
      </Modal>
    </>
  );
}
