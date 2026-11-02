export type ActivityStatus =
  | "Não iniciada"
  | "Em andamento"
  | "Em atraso"
  | "Entregue";
export type ActivityAlert =
  | "Atraso"
  | "Vencimento crítico"
  | "Vencimento iminente"
  | "Atenção"
  | "No prazo"
  | "Entregue";

export interface Activity {
  id: string;
  name: string;
  description: string;
  project: string;
  phase: string;
  category: string;
  plannedStart: string;
  dueDate: string;
  actualStart?: string;
  actualEnd?: string;
  progress: number;
  owner: string;
  notes?: string;
  dependencies: string[];
  blocked?: boolean;
  history: { date: string; description: string }[];
}

export interface ActivitySchedule extends Activity {
  status: ActivityStatus;
  alert: ActivityAlert;
  daysRemaining: number;
  daysLate: number;
  deliveredLate: boolean;
}
