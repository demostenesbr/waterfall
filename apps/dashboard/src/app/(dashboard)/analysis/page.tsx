import type { Metadata } from "next";
import { AnalysisPage } from "@/modules/analysis/analysis-page";

export const metadata: Metadata = { title: "Análise" };

export default function Page() {
  return <AnalysisPage />;
}
