import type { Metadata } from "next";
import { LifecyclePage } from "@/modules/lifecycle/lifecycle-page";

export const metadata: Metadata = { title: "Ciclo de Vida" };

export default function Page() {
  return <LifecyclePage />;
}
