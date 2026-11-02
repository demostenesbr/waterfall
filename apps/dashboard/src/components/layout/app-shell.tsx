"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Menu,
  Search,
  X,
} from "@/components/ui/icons";
import { Button, Input } from "@/components/ui";
import { navigation } from "@/constants/navigation";
import { useActivities } from "@/hooks/useActivities";

export function AppShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(`${path}/`);
  const current =
    navigation.find((item) => isActive(item.path))?.label || "Dashboard";
  const activities = useActivities();
  const overdueCount = activities.filter(
    (item) => item.status === "Em atraso",
  ).length;

  const sidebar = (
    <div className="flex h-full flex-col bg-sidebar text-white">
      <div className="flex h-16 items-center gap-3 border-b border-sidebar-line px-4">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-white">
          <span className="font-black">W</span>
        </div>
        {!collapsed && (
          <div>
            <div className="text-sm font-extrabold tracking-wide">
              WATERFALLLAB
            </div>
            <div className="text-[10px] text-sidebar-muted">SDLC & QUALITY</div>
          </div>
        )}
        <Button
          variant="ghost"
          className="ml-auto hidden p-1.5 text-sidebar-muted hover:bg-sidebar-hover hover:text-white lg:inline-flex"
          onClick={() => setCollapsed(!collapsed)}
          aria-label="Recolher menu"
        >
          {collapsed ? <ChevronRight size={17} /> : <ChevronLeft size={17} />}
        </Button>
        <Button
          variant="ghost"
          className="ml-auto p-1.5 text-sidebar-muted hover:bg-sidebar-hover hover:text-white lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-label="Fechar menu"
        >
          <X size={18} />
        </Button>
      </div>
      <div className="flex-1 space-y-1 overflow-y-auto p-3">
        {!collapsed && (
          <div className="mb-2 px-3 pt-2 text-[10px] font-bold uppercase tracking-widest text-sidebar-muted">
            Workspace
          </div>
        )}
        {navigation.map(({ label, path, icon: Icon }) => (
          <Link
            key={path}
            href={path}
            onClick={() => setMobileOpen(false)}
            title={collapsed ? label : undefined}
            aria-current={isActive(path) ? "page" : undefined}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive(path) ? "bg-primary text-white shadow-sm" : "text-sidebar-text hover:bg-sidebar-hover hover:text-white"}`}
          >
            <Icon size={18} className="shrink-0" />
            {!collapsed && <span>{label}</span>}
          </Link>
        ))}
      </div>
      {!collapsed && (
        <div className="m-3 rounded-xl border border-sidebar-line bg-sidebar-hover p-3">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="size-2 rounded-full bg-success" />
            Projeto ativo
          </div>
          <div className="mt-2 truncate text-xs text-sidebar-muted">
            WFL-001 · WaterfallLab
          </div>
          <div className="mt-2 h-1 rounded-full bg-sidebar-line">
            <div className="h-full w-2/3 rounded-full bg-primary-light" />
          </div>
          <div className="mt-1.5 text-right text-[10px] text-sidebar-muted">
            68% concluído
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <aside
        className={`fixed inset-y-0 left-0 z-40 hidden transition-all lg:block ${collapsed ? "w-20" : "w-64"}`}
      >
        {sidebar}
      </aside>
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-overlay"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative h-full w-72">{sidebar}</aside>
        </div>
      )}
      <div className={`transition-all ${collapsed ? "lg:pl-20" : "lg:pl-64"}`}>
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-line bg-white/95 px-4 backdrop-blur md:px-6">
          <Button
            variant="ghost"
            className="p-2 lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu size={20} />
          </Button>
          <div className="min-w-0">
            <div className="text-xs text-ink-muted">
              WaterfallLab / <span className="text-ink">{current}</span>
            </div>
            <div className="hidden truncate text-sm font-semibold sm:block">
              WFL-001 · Sistema de Gestão do Ciclo de Vida
            </div>
          </div>
          <div className="ml-auto hidden w-64 md:block">
            <div className="relative">
              <Search
                className="absolute left-3 top-2.5 text-ink-faint"
                size={16}
              />
              <Input
                className="pl-9"
                placeholder="Buscar no projeto..."
                aria-label="Buscar"
              />
            </div>
          </div>
          <Button
            variant="ghost"
            className="relative p-2"
            aria-label={`${overdueCount} alertas de atraso`}
          >
            <Bell size={19} />
            <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-danger text-[9px] font-bold text-white ring-2 ring-white">
              {overdueCount}
            </span>
          </Button>
          <div className="h-6 w-px bg-line" />
          <Button variant="ghost" className="p-1.5">
            <span className="flex size-8 items-center justify-center rounded-full bg-primary-soft text-xs font-bold text-primary">
              MC
            </span>
            <span className="hidden text-left md:block">
              <span className="block text-xs font-semibold">Marina Costa</span>
              <span className="block text-[10px] text-ink-muted">
                Gerente de projeto
              </span>
            </span>
            <ChevronDown className="hidden md:block" size={14} />
          </Button>
        </header>
        <main className="p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
