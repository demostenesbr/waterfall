"use client";

import { AlertTriangle, Box, CheckCircle2, Code2, FileCheck2, GitBranch, Layers3, PackageCheck, TestTube2 } from "@/components/ui/icons";
import { StandardPage } from "@/components/shared/standard-page";

export const ImplementationPage = () => (
  <StandardPage
    title="Implementação"
    description="Acompanhe módulos, versões e construção das funcionalidades."
    deadlinePhase="F04"
    deadlineTitle="Cronograma de codificação e integrações"
    metrics={[
      ["Módulos planejados", "14", Box],
      ["Concluídos", "8", CheckCircle2],
      ["Em desenvolvimento", "5", Code2],
      ["Pendências técnicas", "9", AlertTriangle],
    ]}
    cards={[
      ["Gestão de projetos", "Versão 0.8.2 · 18 funcionalidades", Box],
      ["Ciclo de vida", "Versão 0.7.0 · 14 funcionalidades", Layers3],
      ["Requisitos", "Versão 0.9.1 · 22 funcionalidades", FileCheck2],
      ["Testes e qualidade", "Versão 0.6.4 · 16 funcionalidades", TestTube2],
      ["Integração GitHub", "waterfalllab/platform · main", GitBranch],
      ["Histórico de versões", "12 versões e 186 commits.", PackageCheck],
    ]}
  />
);
