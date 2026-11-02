"use client";

import { BookOpen, Clock3, FileCheck2, FileText, GitBranch, Layers3, ListChecks, ShieldCheck } from "@/components/ui/icons";
import { StandardPage } from "@/components/shared/standard-page";

export const AnalysisPage = () => (
  <StandardPage
    title="Análise"
    description="Especificação funcional, regras de negócio e restrições do projeto."
    deadlinePhase="F02"
    deadlineTitle="Prazos dos artefatos de análise"
    metrics={[
      ["Analisados", "31", FileCheck2],
      ["Pendentes", "7", Clock3],
      ["Regras de negócio", "24", ListChecks],
      ["Dependências", "6", GitBranch],
    ]}
    cards={[
      [
        "Regras de negócio",
        "Regras validadas e critérios associados.",
        ListChecks,
      ],
      [
        "Restrições do sistema",
        "Limites técnicos e regulatórios.",
        ShieldCheck,
      ],
      ["Premissas do projeto", "Hipóteses formais da análise.", BookOpen],
      [
        "Dependências externas",
        "Serviços e integrações necessárias.",
        GitBranch,
      ],
      ["Análise funcional", "Especificação dos fluxos do produto.", FileText],
      ["Matriz de impacto", "Relações e impactos entre requisitos.", Layers3],
    ]}
  />
);
