"use client";

import Link from "next/link";
import { Activity, AlertTriangle, CheckCircle2, ChevronRight, Clock3, FileCheck2, Layers3, Plus, ShieldCheck, TrendingUp } from "@/components/ui/icons";
import { Badge, Button, Card, Progress, Title } from "@/components/ui";
import { DonutChart, LineChart } from "@/components/charts";
import { useActivities } from "@/hooks/useActivities";
import { DeadlineLabel, TimelineStrip } from "@/components/dashboard/ActivityTimeline";
import { formatDate } from "@/lib/dates";
import { calculateActivityStats } from "@/lib/schedule";
import { PageHeader } from "@/components/shared/page-header";
import { MetricCard } from "@/components/shared/metric-card";
import { evolutionData, projects as initialProjects } from "@/constants/portfolio";

export function DashboardPage() {
  const activities = useActivities();
  const activityStats = calculateActivityStats(activities);
  const attention = activities
    .filter((item) => item.status === "Em atraso" || item.daysRemaining <= 7)
    .sort((a, b) =>
      a.daysLate === b.daysLate
        ? a.daysRemaining - b.daysRemaining
        : b.daysLate - a.daysLate,
    );
  const statusIcons = [Clock3, Activity, AlertTriangle, CheckCircle2];
  return (
    <>
      <PageHeader
        title="Visão geral"
        description="Acompanhe a evolução, qualidade e os próximos marcos do portfólio."
        action={
          <Button>
            <Plus size={16} /> Novo projeto
          </Button>
        }
      />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard
          label="Projetos ativos"
          value="12"
          detail="+2 este trimestre"
          icon={Layers3}
        />
        <MetricCard
          label="Conclusão média"
          value="68%"
          detail="+6,4% este mês"
          icon={TrendingUp}
          tone="green"
        />
        <MetricCard
          label="Requisitos aprovados"
          value="142"
          detail="89% do total"
          icon={FileCheck2}
          tone="blue"
        />
        <MetricCard
          label="Taxa de aprovação QA"
          value="92,4%"
          detail="+3,1% vs. período anterior"
          icon={ShieldCheck}
          tone="green"
        />
      </div>
      <div className="mt-6 mb-3">
        <Title level={2}>Timeline & Activity Monitoring</Title>
        <div className="text-xs text-ink-muted">
          Visão executiva dos prazos e entregas do portfólio
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {activityStats.map((item, index) => {
          const Icon = statusIcons[index];
          const tone =
            item.status === "Em atraso"
              ? "red"
              : item.status === "Entregue"
                ? "green"
                : item.status === "Não iniciada"
                  ? "amber"
                  : "blue";
          return (
            <MetricCard
              key={item.status}
              label={item.status}
              value={String(item.count)}
              detail={`${item.percentage}% do total · ${index % 2 ? "+1" : "-1"} vs. período anterior`}
              icon={Icon}
              tone={tone as "red" | "green" | "amber" | "blue"}
            />
          );
        })}
      </div>
      <div className="mt-5 grid gap-5 xl:grid-cols-[1.15fr_1fr]">
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-line p-5">
            <div>
              <Title level={2}>Atividades que exigem atenção</Title>
              <div className="text-xs text-ink-muted">
                Atrasadas ou com vencimento nos próximos 7 dias
              </div>
            </div>
            <Badge tone="danger">{attention.length} alertas</Badge>
          </div>
          <div className="divide-y divide-line">
            {attention.slice(0, 5).map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center"
              >
                <div
                  className={`size-2 shrink-0 rounded-full ${item.status === "Em atraso" ? "bg-danger" : item.daysRemaining <= 3 ? "bg-warning" : "bg-primary"}`}
                />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold">
                    {item.name}
                  </div>
                  <div className="mt-1 text-xs text-ink-muted">
                    {item.project} · {item.phase} · {item.owner}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className="text-xs font-semibold">
                      {formatDate(item.dueDate)}
                    </div>
                    <DeadlineLabel activity={item} />
                  </div>
                  <Button
                    variant="ghost"
                    className="p-2"
                    aria-label="Visualizar atividade"
                  >
                    <ChevronRight size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <TimelineStrip activities={activities} />
      </div>
      <div className="mt-5 grid gap-5 xl:grid-cols-3">
        <Card className="p-5 xl:col-span-2">
          <div className="flex items-start justify-between">
            <div>
              <Title level={2}>Evolução do projeto</Title>
              <div className="text-xs text-ink-muted">
                Planejado versus realizado em 2025
              </div>
            </div>
            <Badge tone="info">Últimos 6 meses</Badge>
          </div>
          <div className="mt-4 h-72">
            <LineChart
              data={evolutionData}
              xKey="month"
              series={[
                {
                  key: "realizado",
                  label: "Realizado",
                  color: "var(--color-primary)",
                  area: true,
                },
                {
                  key: "planejado",
                  label: "Planejado",
                  color: "var(--color-ink-faint)",
                  dashed: true,
                  strokeWidth: 2,
                },
              ]}
            />
          </div>
        </Card>
        <Card className="p-5">
          <Title level={2}>Distribuição por etapa</Title>
          <div className="text-xs text-ink-muted">Projetos ativos no ciclo</div>
          <div className="h-52">
            <DonutChart
              data={[
                { name: "Requisitos", value: 3, color: "#2563eb" },
                { name: "Projeto", value: 2, color: "#7c3aed" },
                { name: "Implementação", value: 4, color: "#0ea5e9" },
                { name: "Testes", value: 2, color: "#16a34a" },
                { name: "Implantação", value: 1, color: "#f59e0b" },
              ]}
            />
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs text-ink-muted">
            {[
              "Requisitos · 3",
              "Projeto · 2",
              "Implementação · 4",
              "Testes · 2",
            ].map((x, i) => (
              <div key={x} className="flex items-center gap-2">
                <span
                  className={`size-2 rounded-full ${["bg-primary", "bg-purple", "bg-sky", "bg-success"][i]}`}
                />
                {x}
              </div>
            ))}
          </div>
        </Card>
      </div>
      <div className="mt-5 grid gap-5 xl:grid-cols-5">
        <Card className="overflow-hidden xl:col-span-3">
          <div className="flex items-center justify-between border-b border-line p-5">
            <div>
              <Title level={2}>Projetos em andamento</Title>
              <div className="text-xs text-ink-muted">
                Projetos que exigem acompanhamento
              </div>
            </div>
            <Link href="/projects" className="text-xs font-semibold text-primary">
              Ver todos
            </Link>
          </div>
          <div className="divide-y divide-line">
            {initialProjects.slice(0, 3).map((p) => (
              <div key={p.code} className="flex items-center gap-4 p-4">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary-soft font-bold text-primary">
                  {p.code.slice(0, 2)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold">{p.name}</div>
                  <div className="text-xs text-ink-muted">
                    {p.owner} · Entrega {p.due}
                  </div>
                  <div className="mt-2">
                    <Progress value={p.progress} />
                  </div>
                </div>
                <div className="text-sm font-bold">{p.progress}%</div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-5 xl:col-span-2">
          <div className="flex items-center justify-between">
            <Title level={2}>Atividades recentes</Title>
            <Activity size={17} className="text-ink-muted" />
          </div>
          <div className="mt-4 space-y-5">
            {[
              [
                "Stage Gate aprovado",
                "Fase de Análise aprovada por Marina",
                "há 18 min",
                "success",
              ],
              [
                "Documento atualizado",
                "Arquitetura de referência v2.1",
                "há 2 h",
                "info",
              ],
              [
                "Defeito crítico registrado",
                "Falha no fluxo de aprovação QA",
                "há 4 h",
                "danger",
              ],
              [
                "12 testes executados",
                "Ciclo de regressão #08",
                "ontem",
                "success",
              ],
            ].map(([a, b, c, t]) => (
              <div key={a} className="flex gap-3">
                <span
                  className={`mt-1 size-2 shrink-0 rounded-full ${t === "success" ? "bg-success" : t === "danger" ? "bg-danger" : "bg-primary"}`}
                />
                <div>
                  <div className="text-sm font-semibold">{a}</div>
                  <div className="text-xs text-ink-muted">{b}</div>
                  <div className="mt-1 text-[10px] text-ink-faint">{c}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
