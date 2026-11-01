import { afterEach, describe, expect, it, vi } from "vitest";
import { z } from "zod";
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

    await expect(
      apiRequest("health", z.object({ status: z.literal("ok") })),
    ).resolves.toEqual({ status: "ok" });
    expect(fetchMock).toHaveBeenCalledWith(
      "http://localhost:3001/api/v1/health",
      undefined,
    );
  });

  it("preserves API status and message for errors", async () => {
    vi.stubEnv("NEXT_PUBLIC_API_URL", "http://localhost:3001/api/v1");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ message: "Acesso negado." }), { status: 403 }),
      ),
    );

    await expect(apiRequest("projects", z.unknown())).rejects.toMatchObject({
      name: "ApiError",
      status: 403,
      message: "Acesso negado.",
    } satisfies Partial<ApiError>);
  });
});
