import type { Metadata } from "next";
import { ReportsPage } from "@/modules/reports/reports-page";

export const metadata: Metadata = { title: "Relatórios" };

export default function Page() {
  return <ReportsPage />;
}
