"use client";

import { Activity, AlertTriangle, CheckCircle2, Clock3, GitBranch, Search, ShieldCheck, TrendingUp, Wrench } from "@/components/ui/icons";
import { StandardPage } from "@/components/shared/standard-page";

export const MaintenancePage = () => (
  <StandardPage
    title="Manutenção"
    description="Incidentes, correções e evolução após a implantação."
    deadlinePhase="F07"
    deadlineTitle="Prazos de atendimento e resolução"
    metrics={[
      ["Solicitações", "24", Wrench],
      ["Em atendimento", "7", Clock3],
      ["Resolvidas", "15", CheckCircle2],
      ["SLA atendido", "94%", ShieldCheck],
    ]}
    cards={[
      ["Incidentes", "3 registros · 1 de alta prioridade", AlertTriangle],
      ["Manutenção corretiva", "8 correções registradas.", Wrench],
      ["Melhorias", "11 solicitações de evolução.", TrendingUp],
      ["Controle de versões", "Versões e pacotes de manutenção.", GitBranch],
      ["Histórico de intervenções", "Linha do tempo auditável.", Activity],
      ["Análise de impacto", "Avaliação antes da alteração.", Search],
    ]}
  />
);
