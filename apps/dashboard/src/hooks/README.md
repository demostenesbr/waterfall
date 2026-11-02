# Hooks

Hooks de cliente compartilhados. `useStoredState` e `useActivities` usam
`useSyncExternalStore`, com snapshot de servidor estável para hidratar sem
divergência.
