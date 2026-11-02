import type { Parser } from "@/schemas/parsers";

const defaultErrorMessages: Record<number, string> = {
  400: "A solicitação contém dados inválidos.",
  401: "É necessário autenticar para continuar.",
  403: "Você não tem permissão para realizar esta ação.",
  404: "O recurso solicitado não foi encontrado.",
  409: "A solicitação conflita com o estado atual do recurso.",
  422: "A solicitação não passou pela validação.",
  500: "Ocorreu um erro interno. Tente novamente mais tarde.",
};

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.name = "ApiError";
  }
}

function getErrorMessage(body: unknown, status: number): string {
  if (typeof body === "object" && body !== null && "message" in body) {
    const message = body.message;
    if (typeof message === "string") return message;
    if (Array.isArray(message) && message.every((item) => typeof item === "string")) {
      return message.join("; ");
    }
  }

  return defaultErrorMessages[status] ?? `A solicitação falhou (HTTP ${status}).`;
}

export async function apiRequest<T>(
  path: string,
  parse: Parser<T>,
  init?: RequestInit,
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) {
    throw new Error("A variável NEXT_PUBLIC_API_URL não está configurada.");
  }

  const url = `${baseUrl.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
  const response = await fetch(url, init);
  const responseText = await response.text();
  let body: unknown;

  if (responseText) {
    try {
      body = JSON.parse(responseText);
    } catch (error) {
      if (response.ok) {
        throw new ApiError(response.status, "A API retornou uma resposta JSON inválida.", {
          cause: error,
        });
      }
      body = responseText;
    }
  }

  if (!response.ok) {
    throw new ApiError(response.status, getErrorMessage(body, response.status));
  }

  return parse(body);
}
