"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// Retorna vazio no servidor para não divergir da data local do navegador.
export function useCurrentDate(locale = "pt-BR") {
  return useSyncExternalStore(
    subscribe,
    () => new Intl.DateTimeFormat(locale).format(new Date()),
    () => "",
  );
}
