"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-3 p-6 text-center">
      <h1 className="text-2xl font-bold">Algo deu errado</h1>
      <p className="text-sm text-ink-muted">
        Não foi possível carregar esta tela. Tente novamente.
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-strong"
      >
        Tentar novamente
      </button>
    </main>
  );
}
