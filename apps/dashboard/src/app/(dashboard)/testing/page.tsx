import type { Metadata } from "next";
import { TestingPage } from "@/modules/quality/testing-page";

export const metadata: Metadata = { title: "Testes e Qualidade" };

export default function Page() {
  return <TestingPage />;
}
