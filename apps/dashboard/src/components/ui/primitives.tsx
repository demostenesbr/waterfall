import {
  createElement,
  type ButtonHTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
} from "react";
import { X } from "./icons";

export function Button({
  className = "",
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
}) {
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-strong shadow-sm",
    secondary: "bg-white text-ink border border-line hover:bg-surface-muted",
    ghost: "text-ink-muted hover:bg-surface-muted hover:text-ink",
    danger: "bg-danger text-white hover:opacity-90",
  };
  return createElement("button", {
    ...props,
    className: `inline-flex items-center justify-center gap-2 rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`,
  });
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return createElement("input", {
    ...props,
    className: `w-full rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink outline-none placeholder:text-ink-faint focus:border-primary focus:ring-2 focus:ring-primary-soft ${props.className || ""}`,
  });
}

export function Select(
  props: SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode },
) {
  return createElement("select", {
    ...props,
    className: `rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink outline-none focus:border-primary ${props.className || ""}`,
  });
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-line bg-white shadow-card ${className}`}
    >
      {children}
    </div>
  );
}

export function Title({
  children,
  level = 1,
  className = "",
}: {
  children: ReactNode;
  level?: 1 | 2 | 3;
  className?: string;
}) {
  const sizes = {
    1: "text-2xl font-bold tracking-tight",
    2: "text-lg font-bold",
    3: "text-sm font-bold",
  };
  return (
    <div
      role="heading"
      aria-level={level}
      className={`${sizes[level]} text-ink ${className}`}
    >
      {children}
    </div>
  );
}

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "success" | "warning" | "danger" | "info" | "neutral" | "purple";
}) {
  const tones = {
    success: "bg-success-soft text-success",
    warning: "bg-warning-soft text-warning-strong",
    danger: "bg-danger-soft text-danger",
    info: "bg-primary-soft text-primary",
    neutral: "bg-surface-muted text-ink-muted",
    purple: "bg-purple-soft text-purple",
  };
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-overlay p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <Card className="max-h-[90vh] w-full max-w-xl overflow-auto shadow-modal">
        <div className="flex items-center justify-between border-b border-line p-5">
          <Title level={2}>{title}</Title>
          <Button
            variant="ghost"
            onClick={onClose}
            aria-label="Fechar modal"
            className="p-2"
          >
            <X size={18} />
          </Button>
        </div>
        <div className="p-5">{children}</div>
        {footer && (
          <div className="flex justify-end gap-2 border-t border-line p-4">
            {footer}
          </div>
        )}
      </Card>
    </div>
  );
}

export function Progress({
  value,
  tone = "blue",
}: {
  value: number;
  tone?: "blue" | "green" | "amber";
}) {
  const colors = {
    blue: "bg-primary",
    green: "bg-success",
    amber: "bg-warning",
  };
  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-surface-muted">
      <div
        className={`h-full rounded-full ${colors[tone]}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export function EmptyState({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center py-12 text-center">
      <div className="mb-3 text-ink-faint">{icon}</div>
      <Title level={3}>{title}</Title>
      <div className="mt-1 max-w-sm text-sm text-ink-muted">{description}</div>
    </div>
  );
}
