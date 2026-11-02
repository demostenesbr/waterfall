"use client";

import { useState } from "react";
import { Settings2 } from "@/components/ui/icons";
import { Badge, Button, Card, Input, Select, Title } from "@/components/ui";
import { PageHeader } from "@/components/shared/page-header";
import { Field } from "@/components/shared/field";

export function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [section, setSection] = useState("Dados do projeto");
  return (
    <>
      <PageHeader
        title="Configurações"
        description="Preferências, parâmetros e informações do workspace."
      />
      <div className="grid gap-5 lg:grid-cols-[220px_1fr]">
        <Card className="h-fit p-2">
          {[
            "Dados do projeto",
            "Organização",
            "Perfil do usuário",
            "Preferências",
            "Calendário e alertas",
            "Categorias e status",
            "Parâmetros de qualidade",
          ].map((x) => (
            <Button
              key={x}
              variant="ghost"
              onClick={() => setSection(x)}
              className={`w-full justify-start ${section === x ? "bg-primary-soft text-primary" : ""}`}
            >
              <Settings2 size={15} />
              {x}
            </Button>
          ))}
        </Card>
        <Card className="p-5">
          {section === "Calendário e alertas" ? (
            <>
              <Title level={2}>Calendário de trabalho e alertas</Title>
              <div className="mt-1 text-sm text-ink-muted">
                Defina o fuso horário, dias úteis e antecedência das
                notificações de prazo.
              </div>
              {saved && (
                <div className="mt-4 rounded-lg bg-success-soft p-3 text-sm font-semibold text-success">
                  Preferências de prazo salvas com sucesso.
                </div>
              )}
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Field label="Fuso horário">
                  <Select className="w-full">
                    <option>América/São Paulo (UTC−03:00)</option>
                    <option>UTC</option>
                  </Select>
                </Field>
                <Field label="Calendário">
                  <Select className="w-full">
                    <option>Brasil · Nacional</option>
                    <option>Personalizado</option>
                  </Select>
                </Field>
                <Field label="Dias úteis">
                  <Input defaultValue="Segunda a sexta-feira" />
                </Field>
                <Field label="Jornada padrão">
                  <Input defaultValue="08:00 às 18:00" />
                </Field>
              </div>
              <div className="mt-6">
                <div className="mb-3 text-xs font-bold uppercase tracking-wide text-ink-muted">
                  Antecedência dos alertas
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    ["7 dias", "Atenção", "warning"],
                    ["3 dias", "Vencimento iminente", "warning"],
                    ["1 dia", "Vencimento crítico", "danger"],
                    ["Prazo ultrapassado", "Em atraso", "danger"],
                  ].map(([days, label, tone]) => (
                    <div
                      key={days}
                      className="flex items-center justify-between rounded-lg border border-line p-3"
                    >
                      <div>
                        <div className="text-sm font-semibold">{days}</div>
                        <div className="text-xs text-ink-muted">{label}</div>
                      </div>
                      <Badge tone={tone as "warning" | "danger"}>Ativo</Badge>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <label className="flex items-center gap-3 rounded-lg bg-surface-subtle p-3 text-sm">
                  <Input type="checkbox" defaultChecked className="w-auto" />
                  Notificações no aplicativo
                </label>
                <label className="flex items-center gap-3 rounded-lg bg-surface-subtle p-3 text-sm">
                  <Input type="checkbox" defaultChecked className="w-auto" />
                  Resumo semanal por e-mail
                </label>
              </div>
            </>
          ) : (
            <>
              <Title level={2}>Dados do projeto</Title>
              <div className="mt-1 text-sm text-ink-muted">
                Informações gerais utilizadas nos documentos e relatórios.
              </div>
              {saved && (
                <div className="mt-4 rounded-lg bg-success-soft p-3 text-sm font-semibold text-success">
                  Configurações salvas com sucesso.
                </div>
              )}
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Field label="Nome do projeto">
                  <Input defaultValue="WaterfallLab — Sistema de Gestão do Ciclo de Vida" />
                </Field>
                <Field label="Código">
                  <Input defaultValue="WFL-001" />
                </Field>
                <Field label="Metodologia">
                  <Input defaultValue="Modelo Cascata" readOnly />
                </Field>
                <Field label="Responsável">
                  <Input defaultValue="Marina Costa" />
                </Field>
                <Field label="Organização">
                  <Input defaultValue="Centro Universitário" />
                </Field>
                <Field label="Taxa mínima de aprovação QA">
                  <Input defaultValue="90%" />
                </Field>
              </div>
            </>
          )}
          <div className="mt-6 flex justify-end">
            <Button onClick={() => setSaved(true)}>Salvar alterações</Button>
          </div>
        </Card>
      </div>
    </>
  );
}
