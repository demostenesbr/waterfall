import type { Metadata } from "next";
import { SettingsPage } from "@/modules/settings/settings-page";

export const metadata: Metadata = { title: "Configurações" };

export default function Page() {
  return <SettingsPage />;
}
