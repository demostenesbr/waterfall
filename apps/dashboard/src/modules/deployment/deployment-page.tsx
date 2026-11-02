"use client";

import { ArrowDownRight, Code2, ListChecks, PackageCheck, Rocket, Server, ShieldCheck, TestTube2 } from "@/components/ui/icons";
import { StandardPage } from "@/components/shared/standard-page";

export const DeploymentPage = () => (
  <StandardPage
    title="Implantação"
    description="Ambientes, checklist de publicação e plano de reversão."
    deadlinePhase="F06"
    deadlineTitle="Prazos de implantação"
    metrics={[
      ["Versão candidata", "v1.0.0", PackageCheck],
      ["Checklist", "8/12", ListChecks],
      ["Ambientes prontos", "2/3", Server],
      ["Aprovações", "3/4", ShieldCheck],
    ]}
    cards={[
      ["Desenvolvimento", "Operacional · v0.9.4", Code2],
      ["Homologação", "Operacional · v0.9.2-rc", TestTube2],
      ["Produção", "Aguardando Stage Gate", Rocket],
      [
        "Checklist de implantação",
        "8 de 12 atividades concluídas.",
        ListChecks,
      ],
      ["Plano de rollback", "Procedimento revisado em 28/05.", ArrowDownRight],
      [
        "Aprovação para publicação",
        "Pendente: responsável do negócio.",
        ShieldCheck,
      ],
    ]}
  />
);
