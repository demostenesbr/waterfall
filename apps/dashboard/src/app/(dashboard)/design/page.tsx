import type { Metadata } from "next";
import { DesignPage } from "@/modules/architecture/design-page";

export const metadata: Metadata = { title: "Arquitetura e Projeto" };

export default function Page() {
  return <DesignPage />;
}
