"use client";

import { useState, type ReactNode } from "react";
import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Eye,
  Link2,
  Lock,
  Plus,
  UserRound,
} from "@/components/ui/icons";
import { formatDate, todayIso } from "@/lib/dates";
import { toEditableActivity } from "@/lib/schedule";
import { validateActivityDraft } from "@/schemas/activity";
import { activityService } from "@/services/activities/activity-service";
import type { Activity, ActivitySchedule } from "@/types/activity";
import {
  Badge,
  Button,
  Card,
  Input,
  Modal,
  Progress,
  Select,
  Title,
} from "@/components/ui";

const statusConfig = {
  "Não iniciada": {
    tone: "neutral" as const,
    icon: Clock3,
    border: "border-line",
  },
  "Em andamento": {
    tone: "info" as const,
    icon: Clock3,
    border: "border-primary/30",
  },
  "Em atraso": {
    tone: "danger" as const,
    icon: AlertTriangle,
    border: "border-danger/40",
  },
  Entregue: {
    tone: "success" as const,
    icon: CheckCircle2,
    border: "border-success/30",
  },
};

export function DeadlineLabel({ activity }: { activity: ActivitySchedule }) {
  if (activity.status === "Entregue")
    return (
      <Badge tone={activity.deliveredLate ? "warning" : "success"}>
        {activity.deliveredLate ? "Entrega com atraso" : "Entregue no prazo"}
      </Badge>
    );
  if (activity.daysLate)
    return (
      <Badge tone="danger">
        {activity.daysLate} {activity.daysLate === 1 ? "dia" : "dias"} em atraso
      </Badge>
    );
  if (activity.daysRemaining === 0)
    return <Badge tone="danger">Vence hoje</Badge>;
  return (
    <Badge
      tone={
        activity.daysRemaining <= 3
          ? "warning"
          : activity.daysRemaining <= 7
            ? "warning"
            : "info"
      }
    >
      {activity.daysRemaining} dias restantes
    </Badge>
  );
}

export function ActivityTimelineCard({
  activity,
  onView,
  compact = false,
}: {
  activity: ActivitySchedule;
  onView?: (activity: ActivitySchedule) => void;
  compact?: boolean;
}) {
  const config = statusConfig[activity.status];
  const Icon = config.icon;
  return (
    <Card
      className={`relative overflow-hidden border-l-4 ${config.border} ${compact ? "p-4" : "p-5"}`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div
          className={`rounded-lg p-2 ${activity.status === "Em atraso" ? "bg-danger-soft text-danger" : activity.status === "Entregue" ? "bg-success-soft text-success" : activity.status === "Em andamento" ? "bg-primary-soft text-primary" : "bg-surface-muted text-ink-muted"}`}
        >
          <Icon size={18} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[11px] font-bold text-primary">
              {activity.id}
            </span>
            <Badge tone={config.tone}>{activity.status}</Badge>
            {activity.blocked && (
              <Badge tone="warning">
                <Lock size={11} className="mr-1" />
                Bloqueada
              </Badge>
            )}
            <DeadlineLabel activity={activity} />
          </div>
          <Title level={3} className="mt-2">
            {activity.name}
          </Title>
          {!compact && (
            <div className="mt-1 text-sm text-ink-muted">
              {activity.description}
            </div>
          )}
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-ink-muted">
            <span>
              <CalendarDays size={13} className="mr-1 inline" />
              Prazo {formatDate(activity.dueDate)}
            </span>
            <span>
              <UserRound size={13} className="mr-1 inline" />
              {activity.owner}
            </span>
            <span>
              <Link2 size={13} className="mr-1 inline" />
              {activity.phase}
            </span>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <div className="flex-1">
              <Progress
                value={activity.progress}
                tone={
                  activity.status === "Entregue"
                    ? "green"
                    : activity.status === "Em atraso"
                      ? "amber"
                      : "blue"
                }
              />
            </div>
            <span className="text-xs font-bold">{activity.progress}%</span>
          </div>
        </div>
        {onView && (
          <Button
            variant="ghost"
            className="shrink-0"
            onClick={() => onView(activity)}
          >
            <Eye size={15} />
            Detalhes
          </Button>
        )}
      </div>
    </Card>
  );
}

export function TimelineStrip({
  activities,
}: {
  activities: ActivitySchedule[];
}) {
  return (
    <Card className="overflow-hidden p-5">
      <div className="flex items-center justify-between">
        <div>
          <Title level={2}>Timeline resumida</Title>
          <div className="text-xs text-ink-muted">
            Próximas entregas dos projetos ativos
          </div>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-ink-muted">
          <span className="size-2 rounded-full bg-danger" />
          Hoje
        </div>
      </div>
      <div className="mt-5 overflow-x-auto pb-2">
        <div className="relative flex min-w-[720px] gap-3 before:absolute before:left-5 before:right-5 before:top-4 before:h-px before:bg-line">
          {activities.slice(0, 7).map((activity) => (
            <div key={activity.id} className="relative z-10 w-36 shrink-0">
              <div
                className={`size-8 rounded-full border-4 border-white ${activity.status === "Em atraso" ? "bg-danger" : activity.status === "Entregue" ? "bg-success" : activity.daysRemaining <= 3 ? "bg-warning" : "bg-primary"}`}
              />
              <div className="mt-3 text-[10px] font-bold uppercase text-ink-faint">
                {formatDate(activity.dueDate)}
              </div>
              <div className="mt-1 line-clamp-2 text-xs font-semibold">
                {activity.name}
              </div>
              <div className="mt-1 text-[10px] text-ink-muted">
                {activity.phase.split(" · ")[0]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

const emptyActivity = (): Activity => {
  const today = todayIso();
  return {
    id: `ATV-${String(Date.now()).slice(-4)}`,
    name: "",
    description: "",
    project: "WFL-001 · WaterfallLab",
    phase: "F04 · Implementação",
    category: "Atividade",
    plannedStart: today,
    dueDate: today,
    progress: 0,
    owner: "Marina Costa",
    dependencies: [],
    history: [],
  };
};

function EditorField({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold">{label}</span>
      {children}
    </label>
  );
}

export function ActivityEditorModal(props: {
  activity?: ActivitySchedule | null;
  open: boolean;
  onClose: () => void;
  onSaved?: (activity: ActivitySchedule) => void;
}) {
  if (!props.open) return null;
  return (
    <ActivityEditorDialog
      activity={props.activity}
      onClose={props.onClose}
      onSaved={props.onSaved}
    />
  );
}

function ActivityEditorDialog({
  activity,
  onClose,
  onSaved,
}: {
  activity?: ActivitySchedule | null;
  onClose: () => void;
  onSaved?: (activity: ActivitySchedule) => void;
}) {
  const [draft, setDraft] = useState<Activity>(() =>
    activity ? toEditableActivity(activity) : emptyActivity(),
  );
  const update = <K extends keyof Activity>(key: K, value: Activity[K]) =>
    setDraft((current) => ({ ...current, [key]: value }));
  const save = () => {
    const next = {
      ...draft,
      history: [
        ...draft.history,
        {
          date: todayIso(),
          description: activity
            ? "Planejamento ou progresso atualizado"
            : "Atividade cadastrada",
        },
      ],
    };
    onSaved?.(activityService.save(next));
    onClose();
  };
  return (
    <Modal
      open
      onClose={onClose}
      title={
        activity
          ? `${activity.id} · Detalhes da atividade`
          : "Cadastrar atividade"
      }
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            onClick={save}
            disabled={validateActivityDraft(draft).length > 0}
          >
            Salvar atividade
          </Button>
        </>
      }
    >
      {activity && (
        <div className="mb-5 flex flex-wrap items-center gap-2 rounded-lg bg-surface-subtle p-3">
          <Badge tone={statusConfig[activity.status].tone}>
            {activity.status}
          </Badge>
          <DeadlineLabel activity={activity} />
          {activity.blocked && (
            <Badge tone="warning">Bloqueada por dependência</Badge>
          )}
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <EditorField label="Código">
          <Input
            value={draft.id}
            onChange={(e) => update("id", e.target.value)}
            readOnly={Boolean(activity)}
          />
        </EditorField>
        <EditorField label="Categoria">
          <Select
            className="w-full"
            value={draft.category}
            onChange={(e) => update("category", e.target.value)}
          >
            <option>Atividade</option>
            <option>Documento</option>
            <option>Desenvolvimento</option>
            <option>Teste</option>
            <option>Defeito</option>
            <option>Stage Gate</option>
            <option>Manutenção</option>
          </Select>
        </EditorField>
        <div className="sm:col-span-2">
          <EditorField label="Nome da atividade">
            <Input
              value={draft.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Descreva a entrega esperada"
            />
          </EditorField>
        </div>
        <EditorField label="Fase">
          <Select
            className="w-full"
            value={draft.phase}
            onChange={(e) => update("phase", e.target.value)}
          >
            {[
              "F01 · Levantamento de Requisitos",
              "F02 · Análise",
              "F03 · Projeto e Arquitetura",
              "F04 · Implementação",
              "F05 · Testes e Validação",
              "F06 · Implantação",
              "F07 · Operação e Manutenção",
            ].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </Select>
        </EditorField>
        <EditorField label="Responsável">
          <Select
            className="w-full"
            value={draft.owner}
            onChange={(e) => update("owner", e.target.value)}
          >
            {[
              "Marina Costa",
              "Lucas Mendes",
              "Rafael Lima",
              "Ana Souza",
              "Bruno Alves",
              "Camila Rocha",
              "Diego Martins",
            ].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </Select>
        </EditorField>
        <EditorField label="Início previsto">
          <Input
            type="date"
            value={draft.plannedStart}
            onChange={(e) => update("plannedStart", e.target.value)}
          />
        </EditorField>
        <EditorField label="Prazo final">
          <Input
            type="date"
            value={draft.dueDate}
            onChange={(e) => update("dueDate", e.target.value)}
          />
        </EditorField>
        <EditorField label="Início efetivo">
          <Input
            type="date"
            value={draft.actualStart || ""}
            onChange={(e) => update("actualStart", e.target.value || undefined)}
          />
        </EditorField>
        <EditorField label="Conclusão efetiva">
          <Input
            type="date"
            value={draft.actualEnd || ""}
            onChange={(e) => update("actualEnd", e.target.value || undefined)}
          />
        </EditorField>
        <div className="sm:col-span-2">
          <EditorField label={`Progresso · ${draft.progress}%`}>
            <Input
              type="range"
              min="0"
              max="100"
              step="5"
              value={draft.progress}
              onChange={(e) => update("progress", Number(e.target.value))}
            />
          </EditorField>
        </div>
      </div>
      {activity && (
        <div className="mt-5 border-t border-line pt-4">
          <div className="mb-3 text-xs font-bold uppercase tracking-wide text-ink-muted">
            Histórico de alterações
          </div>
          <div className="space-y-3">
            {draft.history.length ? (
              draft.history.map((item, index) => (
                <div
                  key={`${item.date}-${index}`}
                  className="flex gap-3 text-xs"
                >
                  <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" />
                  <div>
                    <div className="font-semibold">{item.description}</div>
                    <div className="text-ink-muted">
                      {formatDate(item.date)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-xs text-ink-muted">
                Nenhuma alteração registrada.
              </div>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}

export function ContextDeadlinePanel({
  title,
  activities,
  onView,
  onCreate,
}: {
  title: string;
  activities: ActivitySchedule[];
  onView?: (activity: ActivitySchedule) => void;
  onCreate?: () => void;
}) {
  return (
    <div className="mt-5">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <Title level={2}>{title}</Title>
          <div className="text-xs text-ink-muted">
            Prazos e atividades vinculados a este módulo
          </div>
        </div>
        {onCreate && (
          <Button variant="secondary" onClick={onCreate}>
            <Plus size={15} />
            Nova atividade
          </Button>
        )}
      </div>
      <div className="grid gap-3 lg:grid-cols-2">
        {activities.length ? (
          activities.map((activity) => (
            <ActivityTimelineCard
              key={activity.id}
              activity={activity}
              onView={onView}
              compact
            />
          ))
        ) : (
          <Card className="p-8 text-center text-sm text-ink-muted lg:col-span-2">
            Nenhuma atividade vinculada a este contexto.
          </Card>
        )}
      </div>
    </div>
  );
}
