export const statusTone = (status: string) =>
  status.includes("Aprov") || status === "Concluído"
    ? "success"
    : status.includes("andamento") || status.includes("análise")
      ? "info"
      : status.includes("revisão")
        ? "warning"
        : status === "Bloqueada"
          ? "danger"
          : "neutral";
