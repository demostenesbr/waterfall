import type { Metadata } from "next";
import { DeploymentPage } from "@/modules/deployment/deployment-page";

export const metadata: Metadata = { title: "Implantação" };

export default function Page() {
  return <DeploymentPage />;
}
