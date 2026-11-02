import { parseRecord, SchemaError } from "./parsers";

export type HealthResponse = { status: "ok" };

export function parseHealthResponse(value: unknown): HealthResponse {
  const record = parseRecord(value, "resposta de saúde");
  if (record.status !== "ok") {
    throw new SchemaError('O campo "status" deve ser "ok".');
  }
  return { status: "ok" };
}
