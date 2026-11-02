"use client";

import { useState } from "react";
import { Activity, AlertTriangle, BookOpen, Box, Bug, CheckCircle2, CircleDot, Clock3, Code2, Filter, GitBranch, Plus, Server, ShieldCheck, TestTube2, TrendingUp, Users, Wrench } from "@/components/ui/icons";
import { LineChart } from "@/components/charts";
import { Badge, Button, Card, Progress, Select, Title } from "@/components/ui";
import { useActivities } from "@/hooks/useActivities";
import { ActivityEditorModal, ContextDeadlinePanel } from "@/components/dashboard/ActivityTimeline";
import { PageHeader } from "@/components/shared/page-header";
import { MetricCard } from "@/components/shared/metric-card";
import { qaData } from "@/constants/portfolio";
import type { ActivitySchedule } from "@/types/activity";

export function TestingPage() {
  const allActivities = useActivities();
  const [tab, setTab] = useState("Catálogo de testes");
  const [testLevel, setTestLevel] = useState("Todos");
  const [activityEditor, setActivityEditor] = useState<{
    open: boolean;
    activity: ActivitySchedule | null;
  }>({ open: false, activity: null });
  const testTypes = [
    {
      name: "Teste Unitário",
      level: "Nível de teste",
      scope: "Funções, métodos e classes isoladas",
      owner: "Desenvolvimento",
      tool: "Jest / JUnit",
      kind: "Caixa-branca",
      description:
        "Valida a menor unidade de código de forma rápida e isolada, usando mocks quando necessário.",
      example: "Calcular o percentual de conclusão de uma fase.",
      icon: Code2,
    },
    {
      name: "Teste de Integração",
      level: "Nível de teste",
      scope: "Módulos, APIs e bancos de dados",
      owner: "Desenvolvimento / QA",
      tool: "Supertest / Postman",
      kind: "Híbrida",
      description:
        "Verifica contratos, interfaces e a comunicação correta entre componentes dependentes.",
      example: "Criar requisito e persistir seu vínculo com casos de teste.",
      icon: GitBranch,
    },
    {
      name: "Teste de Sistema",
      level: "Nível de teste",
      scope: "Aplicação completa",
      owner: "QA",
      tool: "Cypress / Playwright",
      kind: "Caixa-preta",
      description:
        "Valida o produto integrado em ambiente semelhante à produção contra requisitos funcionais e não funcionais.",
      example:
        "Executar o fluxo completo entre requisitos, Stage Gate e relatório.",
      icon: Server,
    },
    {
      name: "Teste de Aceitação (UAT)",
      level: "Nível de teste",
      scope: "Regras de negócio e expectativas",
      owner: "Cliente / Product Owner",
      tool: "Roteiros Alfa e Beta",
      kind: "Caixa-preta",
      description:
        "Confirma que o sistema resolve a necessidade de negócio antes da liberação para produção.",
      example:
        "Gestor aprova uma fase somente com todos os critérios atendidos.",
      icon: Users,
    },
    {
      name: "Teste de Regressão",
      level: "Funcional",
      scope: "Funcionalidades já estabilizadas",
      owner: "QA / Automação",
      tool: "Suíte automatizada",
      kind: "Caixa-preta",
      description:
        "É executado após mudanças para provar que comportamentos existentes continuam corretos.",
      example: "Reexecutar aprovações após alterar o fluxo de revisão.",
      icon: Activity,
    },
    {
      name: "Desempenho e Carga",
      level: "Não funcional",
      scope: "Tempo de resposta e capacidade",
      owner: "QA de performance",
      tool: "JMeter / k6",
      kind: "Caixa-preta",
      description:
        "Mede latência, throughput, escalabilidade e estabilidade sob carga esperada ou de pico.",
      example: "Manter respostas abaixo de 2s com 500 usuários simultâneos.",
      icon: TrendingUp,
    },
    {
      name: "Teste de Estresse",
      level: "Não funcional",
      scope: "Limites e recuperação",
      owner: "QA / SRE",
      tool: "k6 / JMeter",
      kind: "Caixa-preta",
      description:
        "Ultrapassa a capacidade operacional para identificar o ponto de falha e validar a recuperação.",
      example: "Elevar a carga até a degradação e medir o restabelecimento.",
      icon: AlertTriangle,
    },
    {
      name: "Teste de Usabilidade",
      level: "Não funcional",
      scope: "Facilidade de uso e experiência",
      owner: "UX / Usuários",
      tool: "Roteiro moderado",
      kind: "Caixa-preta",
      description:
        "Avalia eficiência, clareza, aprendizado e satisfação conforme características da ISO/IEC 25010.",
      example: "Usuário localiza e aprova um requisito sem assistência.",
      icon: Users,
    },
    {
      name: "Teste de Segurança",
      level: "Não funcional",
      scope: "Autorização e vulnerabilidades",
      owner: "AppSec / QA",
      tool: "OWASP ZAP",
      kind: "Híbrida",
      description:
        "Identifica falhas de autenticação, autorização, injeção, exposição de dados e configurações inseguras.",
      example: "Impedir que um perfil sem permissão aprove o Stage Gate.",
      icon: ShieldCheck,
    },
    {
      name: "Smoke Testing",
      level: "Funcional",
      scope: "Caminhos críticos da build",
      owner: "QA",
      tool: "Checklist automatizado",
      kind: "Caixa-preta",
      description:
        "Bateria curta executada primeiro para decidir se a versão está estável o suficiente para testes profundos.",
      example: "Login, abertura do projeto e consulta ao ciclo de vida.",
      icon: CheckCircle2,
    },
  ];
  const visibleTypes = testTypes.filter(
    (test) => testLevel === "Todos" || test.level === testLevel,
  );
  return (
    <>
      <PageHeader
        title="Testes e Qualidade"
        description="Planejamento, execução e evidências para garantia da qualidade do software."
        action={
          <Button>
            <Plus size={16} /> Novo caso de teste
          </Button>
        }
      />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard
          label="Casos de teste"
          value="186"
          detail="42 neste ciclo"
          icon={TestTube2}
        />
        <MetricCard
          label="Executados"
          value="148"
          detail="79,5% do plano"
          icon={Activity}
        />
        <MetricCard
          label="Taxa de aprovação"
          value="92,4%"
          detail="137 aprovados"
          icon={ShieldCheck}
          tone="green"
        />
        <MetricCard
          label="Defeitos abertos"
          value="11"
          detail="2 críticos"
          icon={Bug}
          tone="red"
        />
      </div>
      <div className="mt-5 flex gap-1 overflow-x-auto border-b border-line">
        {[
          "Catálogo de testes",
          "Indicadores de qualidade",
          "Cronograma QA",
          "Plano de testes",
          "Casos de teste",
          "Defeitos",
        ].map((t) => (
          <Button
            key={t}
            variant="ghost"
            onClick={() => setTab(t)}
            className={`whitespace-nowrap rounded-b-none border-b-2 ${tab === t ? "border-primary text-primary" : "border-transparent"}`}
          >
            {t}
          </Button>
        ))}
      </div>
      {tab === "Catálogo de testes" ? (
        <div className="mt-5">
          <Card className="mb-5 p-5">
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
              <div>
                <Title level={2}>Matriz de classificação dos testes</Title>
                <div className="mt-1 max-w-2xl text-sm text-ink-muted">
                  Cada teste é identificado pelo seu nível, objetivo, escopo,
                  responsável e abordagem. Essa taxonomia evita lacunas no plano
                  de qualidade e facilita a rastreabilidade.
                </div>
              </div>
              <Select
                value={testLevel}
                onChange={(e) => setTestLevel(e.target.value)}
              >
                <option>Todos</option>
                <option>Nível de teste</option>
                <option>Funcional</option>
                <option>Não funcional</option>
              </Select>
            </div>
          </Card>
          <div className="grid gap-4 lg:grid-cols-2">
            {visibleTypes.map((test) => (
              <Card key={test.name} className="p-5">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-primary-soft p-2.5 text-primary">
                    <test.icon size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Title level={2}>{test.name}</Title>
                      <Badge
                        tone={
                          test.level === "Não funcional"
                            ? "purple"
                            : test.level === "Funcional"
                              ? "success"
                              : "info"
                        }
                      >
                        {test.level}
                      </Badge>
                    </div>
                    <div className="mt-2 text-sm leading-6 text-ink-muted">
                      {test.description}
                    </div>
                  </div>
                </div>
                <div className="mt-4 grid gap-3 rounded-lg bg-surface-subtle p-4 text-xs sm:grid-cols-3">
                  <div>
                    <div className="font-bold uppercase tracking-wide text-ink-faint">
                      Escopo
                    </div>
                    <div className="mt-1 font-medium text-ink">
                      {test.scope}
                    </div>
                  </div>
                  <div>
                    <div className="font-bold uppercase tracking-wide text-ink-faint">
                      Responsável
                    </div>
                    <div className="mt-1 font-medium text-ink">
                      {test.owner}
                    </div>
                  </div>
                  <div>
                    <div className="font-bold uppercase tracking-wide text-ink-faint">
                      Abordagem
                    </div>
                    <div className="mt-1 font-medium text-ink">{test.kind}</div>
                  </div>
                </div>
                <div className="mt-3 flex items-start gap-2 text-xs text-ink-muted">
                  <CircleDot
                    size={14}
                    className="mt-0.5 shrink-0 text-primary"
                  />
                  <span>
                    <strong className="text-ink">Exemplo WaterfallLab:</strong>{" "}
                    {test.example}
                  </span>
                </div>
                <div className="mt-3 text-[11px] font-semibold text-ink-faint">
                  Ferramenta sugerida: {test.tool}
                </div>
              </Card>
            ))}
          </div>
          <Card className="mt-5 p-5">
            <Title level={2}>Abordagens de execução</Title>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-line p-4">
                <div className="flex items-center gap-2 font-bold">
                  <Code2 size={17} className="text-primary" />
                  Caixa-Branca
                </div>
                <div className="mt-2 text-sm text-ink-muted">
                  O testador conhece código, fluxo de controle e estrutura
                  interna. É indicada para testes unitários, cobertura de
                  branches e complexidade ciclomática.
                </div>
              </div>
              <div className="rounded-lg border border-line p-4">
                <div className="flex items-center gap-2 font-bold">
                  <Box size={17} className="text-purple" />
                  Caixa-Preta
                </div>
                <div className="mt-2 text-sm text-ink-muted">
                  O comportamento é validado por entradas e saídas, sem depender
                  da implementação. É indicada para sistema, aceitação e
                  requisitos funcionais.
                </div>
              </div>
            </div>
          </Card>
        </div>
      ) : tab === "Indicadores de qualidade" ? (
        <div className="mt-5">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {[
              [
                "Cobertura de testes",
                "84%",
                "Linhas, funções e ramificações executadas pela automação.",
                "Meta ≥ 80%",
                TestTube2,
                "success",
              ],
              [
                "Densidade de defeitos",
                "0,72/KLOC",
                "Falhas confirmadas por mil linhas de código.",
                "Meta ≤ 1,0",
                Bug,
                "success",
              ],
              [
                "Complexidade ciclomática",
                "8,4",
                "Média de caminhos independentes por módulo.",
                "Atenção acima de 10",
                GitBranch,
                "warning",
              ],
              [
                "MTBF",
                "18,6 dias",
                "Tempo médio de operação entre falhas.",
                "Meta ≥ 15 dias",
                Clock3,
                "success",
              ],
              [
                "MTTR",
                "2h 14min",
                "Tempo médio entre identificação e reparo.",
                "Meta ≤ 4 horas",
                Wrench,
                "success",
              ],
              [
                "Pass rate",
                "92,4%",
                "Casos aprovados sobre o total executado no ciclo.",
                "Meta ≥ 90%",
                CheckCircle2,
                "success",
              ],
            ].map(([name, value, description, target, Icon, tone]) => (
              <Card key={name as string} className="p-5">
                <div className="flex items-center justify-between">
                  <div className="rounded-lg bg-primary-soft p-2 text-primary">
                    <Icon size={18} />
                  </div>
                  <Badge tone={tone as "success" | "warning"}>
                    {target as string}
                  </Badge>
                </div>
                <div className="mt-4 text-2xl font-bold">{value as string}</div>
                <div className="text-sm font-semibold">{name as string}</div>
                <div className="mt-2 text-xs leading-5 text-ink-muted">
                  {description as string}
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <Card className="p-5">
              <Title level={2}>Evolução das execuções</Title>
              <div className="text-xs text-ink-muted">
                Aprovados e reprovados por semana
              </div>
              <div className="mt-4 h-64">
                <LineChart
                  data={qaData}
                  xKey="week"
                  legend
                  series={[
                    {
                      key: "aprovados",
                      label: "Aprovados",
                      color: "var(--color-success)",
                    },
                    {
                      key: "reprovados",
                      label: "Reprovados",
                      color: "var(--color-danger)",
                    },
                  ]}
                />
              </div>
            </Card>
            <Card className="p-5">
              <Title level={2}>Modelo de qualidade</Title>
              <div className="mt-1 text-xs text-ink-muted">
                Características acompanhadas com base na ISO/IEC 25010
              </div>
              <div className="mt-5 space-y-4">
                {[
                  ["Adequação funcional", 96, "green"],
                  ["Confiabilidade", 88, "blue"],
                  ["Usabilidade", 91, "green"],
                  ["Eficiência de desempenho", 82, "amber"],
                  ["Manutenibilidade", 86, "blue"],
                  ["Segurança", 79, "amber"],
                ].map(([n, v, t]) => (
                  <div key={n as string}>
                    <div className="mb-2 flex justify-between text-sm">
                      <span>{n}</span>
                      <strong>{v}%</strong>
                    </div>
                    <Progress
                      value={v as number}
                      tone={t as "green" | "blue" | "amber"}
                    />
                  </div>
                ))}
              </div>
            </Card>
          </div>
          <Card className="mt-5 p-5">
            <div className="flex items-start gap-3">
              <BookOpen className="mt-0.5 text-primary" size={20} />
              <div>
                <Title level={2}>Maturidade do processo</Title>
                <div className="mt-1 text-sm text-ink-muted">
                  O WaterfallLab está demonstrativamente no nível{" "}
                  <strong className="text-ink">CMMI 2 — Gerenciado</strong>:
                  planejamento, requisitos, medição e garantia da qualidade são
                  acompanhados e documentados. A próxima evolução é padronizar
                  esses processos em toda a organização.
                </div>
              </div>
            </div>
          </Card>
        </div>
      ) : tab === "Cronograma QA" ? (
        <div className="mt-5">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Testes pendentes", "38", Clock3, "warning"],
              ["Testes atrasados", "7", AlertTriangle, "danger"],
              ["Defeitos críticos", "2", Bug, "danger"],
              ["Aprovações pendentes", "4", ShieldCheck, "warning"],
            ].map(([label, value, Icon, tone]) => (
              <Card key={label as string} className="p-4">
                <div className="flex items-center justify-between">
                  <Icon
                    size={18}
                    className={
                      tone === "danger" ? "text-danger" : "text-warning"
                    }
                  />
                  <Badge tone={tone as "danger" | "warning"}>Atenção</Badge>
                </div>
                <div className="mt-3 text-2xl font-bold">{value as string}</div>
                <div className="text-xs text-ink-muted">{label as string}</div>
              </Card>
            ))}
          </div>
          <ContextDeadlinePanel
            title="Execução de testes e resolução de defeitos"
            activities={allActivities.filter((item) => item.phase.startsWith("F05"))}
            onView={(activity) => setActivityEditor({ open: true, activity })}
            onCreate={() => setActivityEditor({ open: true, activity: null })}
          />
          <ActivityEditorModal
            open={activityEditor.open}
            activity={activityEditor.activity}
            onClose={() => setActivityEditor({ open: false, activity: null })}
          />
        </div>
      ) : (
        <Card className="mt-5 overflow-hidden">
          <div className="flex items-center justify-between border-b border-line p-4">
            <div>
              <Title level={2}>{tab}</Title>
              <div className="text-xs text-ink-muted">
                {tab === "Defeitos"
                  ? "Registro e priorização de não conformidades"
                  : "Execuções vinculadas aos requisitos do projeto"}
              </div>
            </div>
            <Button variant="secondary">
              <Filter size={15} /> Filtrar
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] text-left text-sm">
              <thead className="bg-surface-muted text-xs text-ink-muted">
                <tr>
                  {[
                    "ID",
                    "Descrição",
                    "Vínculo",
                    "Responsável",
                    "Prioridade",
                    "Status",
                    "Última execução",
                  ].map((x) => (
                    <th key={x} className="px-5 py-3">
                      {x}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {[
                  [
                    "CT-042",
                    "Aprovar fase com critérios atendidos",
                    "RF-002",
                    "Bruno Alves",
                    "Crítica",
                    "Aprovado",
                    "Hoje, 10:32",
                  ],
                  [
                    "CT-043",
                    "Bloquear avanço sem Stage Gate",
                    "RF-002",
                    "Bruno Alves",
                    "Alta",
                    "Aprovado",
                    "Hoje, 10:28",
                  ],
                  [
                    "CT-051",
                    "Exportar relatório de rastreabilidade",
                    "RF-004",
                    "Carla Dias",
                    "Média",
                    "Reprovado",
                    "Ontem, 16:45",
                  ],
                  [
                    "CT-064",
                    "Validar tempo de resposta",
                    "RNF-001",
                    "Carla Dias",
                    "Alta",
                    "Pendente",
                    "—",
                  ],
                ].map((r) => (
                  <tr key={r[0]}>
                    <td className="px-5 py-4 font-mono text-xs font-bold text-primary">
                      {r[0]}
                    </td>
                    <td className="px-5 py-4 font-semibold">{r[1]}</td>
                    <td className="px-5 py-4 text-primary">{r[2]}</td>
                    <td className="px-5 py-4">{r[3]}</td>
                    <td className="px-5 py-4">
                      <Badge tone={r[4] === "Crítica" ? "danger" : "warning"}>
                        {r[4]}
                      </Badge>
                    </td>
                    <td className="px-5 py-4">
                      <Badge
                        tone={
                          r[5] === "Aprovado"
                            ? "success"
                            : r[5] === "Reprovado"
                              ? "danger"
                              : "neutral"
                        }
                      >
                        {r[5]}
                      </Badge>
                    </td>
                    <td className="px-5 py-4 text-ink-muted">{r[6]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </>
  );
}
