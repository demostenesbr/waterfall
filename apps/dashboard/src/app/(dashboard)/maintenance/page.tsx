import type { Metadata } from "next";
import { MaintenancePage } from "@/modules/maintenance/maintenance-page";

export const metadata: Metadata = { title: "Manutenção" };

export default function Page() {
  return <MaintenancePage />;
}
