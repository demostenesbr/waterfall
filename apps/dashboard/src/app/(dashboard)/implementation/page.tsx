import type { Metadata } from "next";
import { ImplementationPage } from "@/modules/implementation/implementation-page";

export const metadata: Metadata = { title: "Implementação" };

export default function Page() {
  return <ImplementationPage />;
}
