"use client";

import { useState } from "react";
import { Activity, AlertTriangle, ArrowRight, BookOpen, Box, Boxes, CheckCircle2, CircleDot, Code2, FileText, GitBranch, Layers3, Plus, Server } from "@/components/ui/icons";
import { Badge, Button, Card, Title } from "@/components/ui";
import { ModuleDeadlineSection } from "@/components/dashboard/module-deadline-section";
import { PageHeader } from "@/components/shared/page-header";
import { MetricCard } from "@/components/shared/metric-card";

export function DesignPage() {
  const architectures = [
    {
      name: "Monolítica",
      short: "Uma única unidade de implantação",
      icon: Box,
      fit: "MVPs e projetos pequenos",
      complexity: "Baixa",
      description:
        "Aplicação construída, versionada e implantada como uma única unidade. É simples no início, mas exige disciplina modular para não se tornar difícil de manter.",
      advantages: [
        "Desenvolvimento inicial rápido",
        "Testes e deploy simplificados",
        "Baixa complexidade operacional",
      ],
      risks: [
        "Escala somente o conjunto",
        "Maior acoplamento ao crescer",
        "Risco de “big ball of mud”",
      ],
    },
    {
      name: "Em Camadas",
      short: "UI, negócio e dados separados",
      icon: Layers3,
      fit: "Sistemas corporativos",
      complexity: "Média",
      description:
        "Organiza responsabilidades em camadas horizontais, normalmente apresentação, aplicação, domínio e infraestrutura, com dependências controladas.",
      advantages: [
        "Boa separação de responsabilidades",
        "Facilita manutenção e testes",
        "Modelo conhecido pelas equipes",
      ],
      risks: [
        "Chamadas atravessam várias camadas",
        "Possíveis gargalos intermediários",
        "Risco de domínio anêmico",
      ],
    },
    {
      name: "MVC",
      short: "Model, View e Controller",
      icon: Boxes,
      fit: "Aplicações web tradicionais",
      complexity: "Baixa",
      description:
        "Separa dados e regras no Model, apresentação na View e coordenação das entradas no Controller.",
      advantages: [
        "Reutilização de código",
        "Trabalho paralelo entre equipes",
        "Amplo suporte de frameworks",
      ],
      risks: [
        "Controllers podem crescer demais",
        "Limites variam por framework",
        "Acoplamento entre View e Controller",
      ],
    },
    {
      name: "Microsserviços",
      short: "Serviços autônomos por domínio",
      icon: Server,
      fit: "Escala e equipes grandes",
      complexity: "Alta",
      description:
        "Divide o sistema em serviços independentes, implantáveis separadamente e integrados por APIs ou mensageria.",
      advantages: [
        "Escala e deploy independentes",
        "Autonomia tecnológica",
        "Isolamento por domínio",
      ],
      risks: [
        "Operação e observabilidade complexas",
        "Consistência distribuída",
        "Maior custo de infraestrutura",
      ],
    },
    {
      name: "Orientada a Eventos",
      short: "Produção e consumo assíncrono",
      icon: Activity,
      fit: "Tempo real e alto volume",
      complexity: "Alta",
      description:
        "Componentes publicam eventos e consumidores reagem sem acoplamento direto, favorecendo assincronicidade e resiliência.",
      advantages: [
        "Baixo acoplamento temporal",
        "Alta escalabilidade",
        "Boa tolerância a falhas",
      ],
      risks: [
        "Rastreamento mais difícil",
        "Consistência eventual",
        "Controle de duplicidade e ordem",
      ],
    },
    {
      name: "Cliente-Servidor",
      short: "Clientes consomem servidor central",
      icon: Server,
      fit: "Aplicações web e internas",
      complexity: "Média",
      description:
        "Clientes solicitam serviços enquanto o servidor centraliza processamento, regras, segurança e persistência.",
      advantages: [
        "Dados e controle centralizados",
        "Clientes mais leves",
        "Administração simplificada",
      ],
      risks: [
        "Servidor pode ser gargalo",
        "Dependência de conectividade",
        "Ponto central de falha sem redundância",
      ],
    },
    {
      name: "SOA",
      short: "Serviços corporativos via integração",
      icon: GitBranch,
      fit: "Grandes corporações e legado",
      complexity: "Alta",
      description:
        "Estrutura capacidades empresariais como serviços reutilizáveis, frequentemente mediados por um barramento corporativo.",
      advantages: [
        "Reuso entre sistemas",
        "Integração de legados",
        "Governança centralizada",
      ],
      risks: [
        "ESB pode virar gargalo",
        "Governança pesada",
        "Contratos amplos e complexos",
      ],
    },
    {
      name: "Pub/Sub",
      short: "Mensagens distribuídas por tópicos",
      icon: Activity,
      fit: "Notificações e integrações",
      complexity: "Média",
      description:
        "Publicadores enviam mensagens para tópicos e assinantes interessados as consomem sem conhecer os emissores.",
      advantages: [
        "Produtores e consumidores desacoplados",
        "Escala de consumidores",
        "Novos assinantes sem alterar produtor",
      ],
      risks: [
        "Entrega e reprocessamento",
        "Observabilidade distribuída",
        "Gerência de tópicos e schemas",
      ],
    },
  ];
  const [selected, setSelected] = useState(architectures[1]);
  return (
    <>
      <PageHeader
        title="Arquitetura e Projeto"
        description="Estrutura de alto nível, estilos arquiteturais, artefatos técnicos e decisões do projeto."
        action={
          <Button>
            <Plus size={16} /> Registrar decisão
          </Button>
        }
      />
      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard
          label="Artefatos técnicos"
          value="18"
          detail="12 aprovados"
          icon={FileText}
        />
        <MetricCard
          label="Decisões arquiteturais"
          value="9"
          detail="2 aguardam revisão"
          icon={CircleDot}
        />
        <MetricCard
          label="Diagramas"
          value="7"
          detail="UML e componentes"
          icon={Layers3}
        />
        <MetricCard
          label="Cobertura documental"
          value="92%"
          detail="+8% neste ciclo"
          icon={BookOpen}
          tone="green"
        />
      </div>
      <Card className="mb-5 overflow-hidden">
        <div className="border-b border-line p-5">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <div>
              <Title level={2}>Estilos de arquitetura de software</Title>
              <div className="mt-1 text-sm text-ink-muted">
                Selecione um estilo para avaliar funcionamento, aplicação,
                benefícios e riscos.
              </div>
            </div>
            <Badge tone="info">8 estilos documentados</Badge>
          </div>
        </div>
        <div className="grid xl:grid-cols-[1fr_420px]">
          <div className="grid gap-3 p-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2">
            {architectures.map((item) => (
              <div
                key={item.name}
                onClick={() => setSelected(item)}
                className={`cursor-pointer rounded-xl border p-4 transition-all ${selected.name === item.name ? "border-primary bg-primary-soft ring-2 ring-primary-soft" : "border-line hover:border-primary/40 hover:bg-surface-subtle"}`}
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`rounded-lg p-2 ${selected.name === item.name ? "bg-primary text-white" : "bg-surface-muted text-ink-muted"}`}
                  >
                    <item.icon size={18} />
                  </div>
                  <Badge
                    tone={
                      item.complexity === "Alta"
                        ? "warning"
                        : item.complexity === "Baixa"
                          ? "success"
                          : "neutral"
                    }
                  >
                    {item.complexity}
                  </Badge>
                </div>
                <div className="mt-3 font-bold">{item.name}</div>
                <div className="mt-1 text-xs text-ink-muted">{item.short}</div>
                <div className="mt-3 text-[11px] font-semibold text-primary">
                  {item.fit}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-line bg-surface-subtle p-5 xl:border-l xl:border-t-0">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary p-2.5 text-white">
                <selected.icon size={21} />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-primary">
                  Arquitetura selecionada
                </div>
                <Title level={2}>{selected.name}</Title>
              </div>
            </div>
            <div className="mt-4 text-sm leading-6 text-ink-muted">
              {selected.description}
            </div>
            <div className="mt-5">
              <div className="text-xs font-bold uppercase tracking-wide text-success">
                Vantagens
              </div>
              <div className="mt-2 space-y-2">
                {selected.advantages.map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm">
                    <CheckCircle2
                      size={15}
                      className="mt-0.5 shrink-0 text-success"
                    />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-5">
              <div className="text-xs font-bold uppercase tracking-wide text-warning-strong">
                Pontos de atenção
              </div>
              <div className="mt-2 space-y-2">
                {selected.risks.map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm">
                    <AlertTriangle
                      size={15}
                      className="mt-0.5 shrink-0 text-warning"
                    />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <Button className="mt-6 w-full">
              <CircleDot size={15} /> Adotar no projeto
            </Button>
          </div>
        </div>
      </Card>
      <div className="grid gap-5 xl:grid-cols-3">
        <Card className="p-5 xl:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <Title level={2}>Arquitetura adotada no WaterfallLab</Title>
              <div className="text-xs text-ink-muted">
                Decisão ADR-003 · Aprovada em 19/02/2025
              </div>
            </div>
            <Badge tone="success">Aprovada</Badge>
          </div>
          <div className="mt-5 flex flex-col items-center gap-2 rounded-xl bg-surface-subtle p-5 sm:flex-row sm:justify-center">
            <div className="rounded-lg border border-line bg-white p-3 text-center text-xs font-semibold">
              React UI
              <br />
              <span className="text-ink-muted">Apresentação</span>
            </div>
            <ArrowRight
              className="rotate-90 text-ink-faint sm:rotate-0"
              size={17}
            />
            <div className="rounded-lg border border-primary bg-primary-soft p-3 text-center text-xs font-semibold text-primary">
              Serviços
              <br />
              <span className="text-ink-muted">Aplicação</span>
            </div>
            <ArrowRight
              className="rotate-90 text-ink-faint sm:rotate-0"
              size={17}
            />
            <div className="rounded-lg border border-line bg-white p-3 text-center text-xs font-semibold">
              Domínio
              <br />
              <span className="text-ink-muted">Regras</span>
            </div>
            <ArrowRight
              className="rotate-90 text-ink-faint sm:rotate-0"
              size={17}
            />
            <div className="rounded-lg border border-line bg-white p-3 text-center text-xs font-semibold">
              API / Dados
              <br />
              <span className="text-ink-muted">Infraestrutura</span>
            </div>
          </div>
          <div className="mt-4 text-sm text-ink-muted">
            Foi adotada uma{" "}
            <strong className="text-ink">
              arquitetura em camadas com frontend cliente-servidor
            </strong>
            . Ela equilibra simplicidade para o TCC, separação de
            responsabilidades e preparação para a futura API NestJS e banco
            PostgreSQL.
          </div>
        </Card>
        <Card className="p-5">
          <Title level={2}>Como escolher?</Title>
          <div className="mt-4 space-y-4">
            <div className="border-l-2 border-success pl-3">
              <div className="text-sm font-bold">MVP ou equipe pequena</div>
              <div className="text-xs text-ink-muted">
                Monolítica, MVC ou Em Camadas.
              </div>
            </div>
            <div className="border-l-2 border-primary pl-3">
              <div className="text-sm font-bold">Grande escala</div>
              <div className="text-xs text-ink-muted">
                Microsserviços com maturidade DevOps.
              </div>
            </div>
            <div className="border-l-2 border-purple pl-3">
              <div className="text-sm font-bold">Tempo real e alto volume</div>
              <div className="text-xs text-ink-muted">Eventos ou Pub/Sub.</div>
            </div>
            <div className="border-l-2 border-warning pl-3">
              <div className="text-sm font-bold">Integração corporativa</div>
              <div className="text-xs text-ink-muted">
                SOA para serviços e legados.
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {[
          [
            "Diagramas UML",
            "Casos de uso, classes e sequência.",
            Layers3,
            "v2.1",
          ],
          [
            "Modelo de dados",
            "Entidades, relações e dicionário.",
            Boxes,
            "v1.8",
          ],
          [
            "Especificação de APIs",
            "Contratos REST e versionamento.",
            Code2,
            "v1.4",
          ],
          [
            "Diagrama de componentes",
            "Módulos e dependências internas.",
            Box,
            "v2.0",
          ],
          [
            "Registro de decisões",
            "ADRs com contexto e consequências.",
            CircleDot,
            "9 registros",
          ],
          [
            "Tecnologias utilizadas",
            "Stack, versões e justificativas.",
            Server,
            "12 itens",
          ],
        ].map(([title, description, Icon, version]) => (
          <Card key={title as string} className="p-4">
            <div className="flex items-start justify-between">
              <div className="rounded-lg bg-primary-soft p-2 text-primary">
                <Icon size={18} />
              </div>
              <Badge tone="neutral">{version as string}</Badge>
            </div>
            <div className="mt-3 font-bold">{title as string}</div>
            <div className="mt-1 text-xs text-ink-muted">
              {description as string}
            </div>
            <Button variant="ghost" className="mt-3 px-0 text-primary">
              Visualizar artefato <ArrowRight size={13} />
            </Button>
          </Card>
        ))}
      </div>
      <ModuleDeadlineSection
        phase="F03"
        title="Prazos dos artefatos de arquitetura"
      />
    </>
  );
}
