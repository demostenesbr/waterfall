export type Parser<T> = (value: unknown) => T;

export class SchemaError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SchemaError";
  }
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function parseRecord(value: unknown, label = "objeto"): Record<string, unknown> {
  if (!isRecord(value)) throw new SchemaError(`Esperado ${label}.`);
  return value;
}

export function parseString(value: unknown, field: string): string {
  if (typeof value !== "string") {
    throw new SchemaError(`O campo "${field}" deve ser um texto.`);
  }
  return value;
}

export function parseArray<T>(parseItem: Parser<T>): Parser<T[]> {
  return (value) => {
    if (!Array.isArray(value)) throw new SchemaError("Esperada uma lista.");
    return value.map(parseItem);
  };
}

export const parseUnknown: Parser<unknown> = (value) => value;
