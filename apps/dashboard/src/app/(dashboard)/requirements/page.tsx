import type { Metadata } from "next";
import { RequirementsPage } from "@/modules/requirements/requirements-page";

export const metadata: Metadata = { title: "Requisitos" };

export default function Page() {
  return <RequirementsPage />;
}
