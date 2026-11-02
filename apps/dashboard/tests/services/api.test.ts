import { afterEach, describe, expect, it, vi } from "vitest";
import { parseHealthResponse } from "../../src/schemas/health";
import { parseUnknown } from "../../src/schemas/parsers";
import { ApiError, apiRequest } from "../../src/services/api/client";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("apiRequest", () => {
  it("uses the configured API URL and validates successful responses", async () => {
    vi.stubEnv("NEXT_PUBLIC_API_URL", "http://localhost:3001/api/v1/");
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ status: "ok" }), { status: 200 }),
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(apiRequest("health", parseHealthResponse)).resolves.toEqual({
      status: "ok",
    });
    expect(fetchMock).toHaveBeenCalledWith(
      "http://localhost:3001/api/v1/health",
      undefined,
    );
  });

  it("rejects responses that do not match the expected contract", async () => {
    vi.stubEnv("NEXT_PUBLIC_API_URL", "http://localhost:3001/api/v1");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ status: "down" }), { status: 200 }),
      ),
    );

    await expect(apiRequest("health", parseHealthResponse)).rejects.toMatchObject({
      name: "SchemaError",
    });
  });

  it("preserves API status and message for errors", async () => {
    vi.stubEnv("NEXT_PUBLIC_API_URL", "http://localhost:3001/api/v1");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ message: "Acesso negado." }), { status: 403 }),
      ),
    );

    await expect(apiRequest("projects", parseUnknown)).rejects.toMatchObject({
      name: "ApiError",
      status: 403,
      message: "Acesso negado.",
    } satisfies Partial<ApiError>);
  });

  it("requires NEXT_PUBLIC_API_URL", async () => {
    vi.stubEnv("NEXT_PUBLIC_API_URL", "");
    await expect(apiRequest("health", parseUnknown)).rejects.toThrow(
      "NEXT_PUBLIC_API_URL",
    );
  });
});
