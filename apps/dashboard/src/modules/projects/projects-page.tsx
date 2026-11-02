"use client";

import { useState } from "react";
import { AlertTriangle, Box, CheckCircle2, Clock3, Filter, MoreHorizontal, Plus, Search } from "@/components/ui/icons";
import { Badge, Button, Card, Input, Modal, Progress, Select } from "@/components/ui";
import { useStoredState } from "@/hooks/useStoredState";
import { useActivities } from "@/hooks/useActivities";
import { ActivityEditorModal, ContextDeadlinePanel } from "@/components/dashboard/ActivityTimeline";
import { formatDate } from "@/lib/dates";
import { statusTone } from "@/lib/status";
import { PageHeader } from "@/components/shared/page-header";
import { MetricCard } from "@/components/shared/metric-card";
import { Field } from "@/components/shared/field";
import { projects as initialProjects } from "@/constants/portfolio";
import type { ActivitySchedule } from "@/types/activity";

export function ProjectsPage() {
  const [projects, setProjects] = useStoredState(
    "waterfalllab-projects",
    initialProjects,
  );
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Todos");
  const [open, setOpen] = useState(false);
  const [activityEditor, setActivityEditor] = useState<{
    open: boolean;
    activity: ActivitySchedule | null;
  }>({ open: false, activity: null });
  const activities = useActivities();
  const [scheduleStatus, setScheduleStatus] = useState("Todos");
  const [scheduleOwner, setScheduleOwner] = useState("Todos");
  const [lateOnly, setLateOnly] = useState(false);
  const projectSchedule = activities.filter(
    (item) =>
      item.project.startsWith("WFL-001") &&
      (scheduleStatus === "Todos" || item.status === scheduleStatus) &&
      (scheduleOwner === "Todos" || item.owner === scheduleOwner) &&
      (!lateOnly || item.status === "Em atraso"),
  );
  const filtered = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (status === "Todos" || p.status === status),
  );
  const addProject = () => {
    setProjects([
      ...projects,
      {
        code: `PRJ-0${projects.length + 1}`,
        name: "Novo projeto de software",
        client: "Organização",
        owner: "Marina Costa",
        status: "Em andamento",
        progress: 0,
        due: "30 Dez 2025",
      },
    ]);
    setOpen(false);
  };
  return (
    <>
      <PageHeader
        title="Projetos"
        description="Gerencie o portfólio e acompanhe cada iniciativa pelo ciclo Cascata."
        action={
          <Button onClick={() => setOpen(true)}>
            <Plus size={16} /> Novo projeto
          </Button>
        }
      />
      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard
          label="Total de projetos"
          value="16"
          detail="4 neste ano"
          icon={Box}
        />
        <MetricCard
          label="Em andamento"
          value="8"
          detail="50% do portfólio"
          icon={Clock3}
        />
        <MetricCard
          label="Concluídos"
          value="6"
          detail="+2 no trimestre"
          icon={CheckCircle2}
          tone="green"
        />
        <MetricCard
          label="Com pendências"
          value="2"
          detail="Requer atenção"
          icon={AlertTriangle}
          tone="amber"
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
              placeholder="Pesquisar projeto..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>Todos</option>
            <option>Em andamento</option>
            <option>Em revisão</option>
            <option>Concluído</option>
          </Select>
          <Button variant="secondary">
            <Filter size={15} /> Mais filtros
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="bg-surface-muted text-xs uppercase tracking-wide text-ink-muted">
              <tr>
                {[
                  "Projeto",
                  "Cliente",
                  "Responsável",
                  "Status",
                  "Progresso",
                  "Cronograma",
                  "",
                ].map((x) => (
                  <th key={x} className="px-5 py-3 font-semibold">
                    {x}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filtered.map((p) => {
                const related = activities.filter((item) =>
                  item.project.startsWith(p.code),
                );
                const late = related.filter(
                  (item) => item.status === "Em atraso",
                ).length;
                const next = related
                  .filter((item) => item.status !== "Entregue")
                  .sort((a, b) => a.dueDate.localeCompare(b.dueDate))[0];
                return (
                  <tr key={p.code} className="hover:bg-surface-subtle">
                    <td className="px-5 py-4">
                      <div className="font-semibold">{p.name}</div>
                      <div className="text-xs text-ink-muted">
                        {p.code} · Waterfall · Início 05 Jan 2025
                      </div>
                    </td>
                    <td className="px-5 py-4 text-ink-muted">{p.client}</td>
                    <td className="px-5 py-4">{p.owner}</td>
                    <td className="px-5 py-4">
                      <Badge tone={statusTone(p.status)}>{p.status}</Badge>
                    </td>
                    <td className="px-5 py-4">
                      <div className="mb-1 flex justify-between text-xs">
                        <span>
                          {p.progress}% · {related.length} atividades
                        </span>
                      </div>
                      <Progress
                        value={p.progress}
                        tone={p.progress === 100 ? "green" : "blue"}
                      />
                      {late > 0 && (
                        <div className="mt-1 text-[10px] font-semibold text-danger">
                          {late} em atraso
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <div className="text-xs font-semibold">
                        Conclusão {p.due}
                      </div>
                      <div className="mt-1 text-[10px] text-ink-muted">
                        Próximo:{" "}
                        {next
                          ? `${formatDate(next.dueDate)} · ${next.name}`
                          : "Sem pendências"}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <Button variant="ghost" className="p-2">
                        <MoreHorizontal size={17} />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
      <Card className="mt-5 flex flex-col gap-3 p-4 md:flex-row">
        <Select
          value={scheduleStatus}
          onChange={(e) => setScheduleStatus(e.target.value)}
        >
          <option>Todos</option>
          <option>Não iniciada</option>
          <option>Em andamento</option>
          <option>Em atraso</option>
          <option>Entregue</option>
        </Select>
        <Select
          value={scheduleOwner}
          onChange={(e) => setScheduleOwner(e.target.value)}
        >
          <option>Todos</option>
          <option>Marina Costa</option>
          <option>Lucas Mendes</option>
          <option>Rafael Lima</option>
          <option>Ana Souza</option>
          <option>Bruno Alves</option>
          <option>Camila Rocha</option>
          <option>Diego Martins</option>
        </Select>
        <Button
          variant={lateOnly ? "primary" : "secondary"}
          onClick={() => setLateOnly(!lateOnly)}
        >
          <AlertTriangle size={15} />
          Somente atrasadas
        </Button>
        <div className="ml-auto self-center text-xs text-ink-muted">
          {projectSchedule.length} atividades encontradas
        </div>
      </Card>
      <ContextDeadlinePanel
        title="Cronograma do projeto WFL-001"
        activities={projectSchedule.slice(0, 8)}
        onView={(activity) => setActivityEditor({ open: true, activity })}
        onCreate={() => setActivityEditor({ open: true, activity: null })}
      />
      <ActivityEditorModal
        open={activityEditor.open}
        activity={activityEditor.activity}
        onClose={() => setActivityEditor({ open: false, activity: null })}
      />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Criar novo projeto"
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={addProject}>Criar projeto</Button>
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Nome do projeto">
            <Input placeholder="Ex.: Portal corporativo" />
          </Field>
          <Field label="Código">
            <Input placeholder="PRJ-025" />
          </Field>
          <Field label="Responsável">
            <Select className="w-full">
              <option>Marina Costa</option>
              <option>Lucas Mendes</option>
            </Select>
          </Field>
          <Field label="Cliente / organização">
            <Input placeholder="Nome da organização" />
          </Field>
          <Field label="Data de início">
            <Input type="date" />
          </Field>
          <Field label="Previsão de conclusão">
            <Input type="date" />
          </Field>
          <Field label="Metodologia">
            <Input value="Modelo Cascata" readOnly />
          </Field>
          <Field label="Status">
            <Select className="w-full">
              <option>Planejamento</option>
              <option>Em andamento</option>
            </Select>
          </Field>
        </div>
      </Modal>
    </>
  );
}
