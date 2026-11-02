"use client";

import { useState } from "react";
import { AlertTriangle, ArrowRight, CalendarDays, CheckCircle2, Clock3, Download, Filter, Layers3, TrendingUp } from "@/components/ui/icons";
import { BarChart } from "@/components/charts";
import { Button, Card, Progress, Select, Title } from "@/components/ui";
import { useActivities } from "@/hooks/useActivities";
import { calculateActivityStats } from "@/lib/schedule";
import { PageHeader } from "@/components/shared/page-header";
import { evolutionData } from "@/constants/portfolio";

export function ReportsPage() {
  const [period, setPeriod] = useState("Últimos 6 meses");
  const scheduleStats = calculateActivityStats(useActivities());
  return (
    <>
      <PageHeader
        title="Relatórios"
        description="Indicadores gerenciais e técnicos para acompanhamento e auditoria."
        action={
          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={() =>
                window.alert(
                  "Arquivo CSV preparado para exportação demonstrativa.",
                )
              }
            >
              <Download size={16} /> CSV
            </Button>
            <Button
              onClick={() =>
                window.alert(
                  "Relatório preparado para exportação demonstrativa.",
                )
              }
            >
              <Download size={16} /> PDF
            </Button>
          </div>
        }
      />
      <Card className="mb-5 flex flex-col gap-3 p-4 sm:flex-row">
        <Select value={period} onChange={(e) => setPeriod(e.target.value)}>
          <option>Últimos 6 meses</option>
          <option>Este ano</option>
          <option>Todo o período</option>
        </Select>
        <Select>
          <option>WFL-001 · WaterfallLab</option>
          <option>Todos os projetos</option>
        </Select>
        <Button variant="secondary">
          <Filter size={15} /> Aplicar filtros
        </Button>
        <div className="ml-auto text-xs text-ink-muted">
          Atualizado hoje, 11:42
        </div>
      </Card>
      <div className="grid gap-5 lg:grid-cols-2">
        <Card className="p-5">
          <Title level={2}>Planejadas versus entregues</Title>
          <div className="mt-4 h-64">
            <BarChart
              data={evolutionData}
              xKey="month"
              legend
              series={[
                {
                  key: "planejado",
                  label: "Planejado",
                  color: "var(--color-primary-soft-strong)",
                },
                {
                  key: "realizado",
                  label: "Realizado",
                  color: "var(--color-primary)",
                },
              ]}
            />
          </div>
        </Card>
        <Card className="p-5">
          <Title level={2}>Atividades por status</Title>
          <div className="mt-5 space-y-5">
            {scheduleStats.map((item) => (
              <div key={item.status}>
                <div className="mb-2 flex justify-between text-sm">
                  <span>{item.status}</span>
                  <strong>
                    {item.count} · {item.percentage}%
                  </strong>
                </div>
                <Progress
                  value={item.percentage}
                  tone={
                    item.status === "Entregue"
                      ? "green"
                      : item.status === "Em atraso"
                        ? "amber"
                        : "blue"
                  }
                />
              </div>
            ))}
          </div>
        </Card>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {[
          [
            "Atividades atrasadas",
            "Prazo excedido e impacto por fase",
            AlertTriangle,
          ],
          [
            "Entregues no prazo",
            "Histórico de cumprimento das entregas",
            CheckCircle2,
          ],
          [
            "Entregues com atraso",
            "Desvio entre prazo e conclusão real",
            Clock3,
          ],
          ["Próximos vencimentos", "Janelas de 1, 3, 5 e 7 dias", CalendarDays],
          [
            "Desempenho por projeto",
            "Progresso, atrasos e previsibilidade",
            TrendingUp,
          ],
          ["Desempenho por fase", "Cumprimento do cronograma Cascata", Layers3],
        ].map(([t, d, I]) => (
          <Card
            key={t as string}
            className="group cursor-pointer p-4 hover:border-primary"
          >
            <I className="text-primary" size={20} />
            <div className="mt-3 font-bold">{t as string}</div>
            <div className="mt-1 text-xs text-ink-muted">{d as string}</div>
            <div className="mt-4 flex items-center text-xs font-semibold text-primary">
              Visualizar{" "}
              <ArrowRight
                size={13}
                className="ml-1 transition-transform group-hover:translate-x-1"
              />
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
