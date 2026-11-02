"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

const CHANGE_EVENT = "waterfalllab:storage";

function readRaw(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function parse<T>(raw: string | null, fallback: T): T {
  if (raw === null) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function useStoredState<T>(key: string, initialValue: T) {
  const subscribe = useCallback((listener: () => void) => {
    window.addEventListener("storage", listener);
    window.addEventListener(CHANGE_EVENT, listener);
    return () => {
      window.removeEventListener("storage", listener);
      window.removeEventListener(CHANGE_EVENT, listener);
    };
  }, []);

  // O servidor sempre renderiza o valor inicial, evitando divergência na hidratação.
  const raw = useSyncExternalStore(
    subscribe,
    () => readRaw(key),
    () => null,
  );

  const value = useMemo(() => parse(raw, initialValue), [raw, initialValue]);

  const setValue = useCallback(
    (next: T | ((previous: T) => T)) => {
      const previous = parse(readRaw(key), initialValue);
      const resolved =
        typeof next === "function"
          ? (next as (previous: T) => T)(previous)
          : next;
      try {
        localStorage.setItem(key, JSON.stringify(resolved));
      } catch {
        return;
      }
      window.dispatchEvent(new Event(CHANGE_EVENT));
    },
    [key, initialValue],
  );

  return [value, setValue] as const;
}
