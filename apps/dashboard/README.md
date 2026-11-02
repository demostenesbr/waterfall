# Dashboard

Interface WaterfallLab em Next.js 16 (App Router), React, TypeScript e Tailwind
CSS v4. As telas vieram do protótipo do Figma Make (React + Vite) e foram
reescritas apenas com recursos nativos do Next.js e do React: roteamento por
arquivos (`next/link`, `next/navigation`, `redirects`), fontes (`next/font`),
metadados (`Metadata`) e estado externo (`useSyncExternalStore`). Ícones e
gráficos são SVG próprios, sem bibliotecas adicionais.

## Estrutura

| Pasta | Conteúdo |
| --- | --- |
| `src/app` | Rotas: grupo `(dashboard)` com layout (`AppShell`) e uma página por módulo |
| `src/modules` | Telas por domínio (`dashboard`, `projects`, `lifecycle`, `requirements`, `analysis`, `architecture`, `implementation`, `quality`, `deployment`, `maintenance`, `reports`, `settings`) |
| `src/components` | `ui` (primitivos e ícones), `charts`, `layout`, `shared`, `dashboard` |
| `src/constants` | Navegação e dados de demonstração |
| `src/hooks` | `useStoredState`, `useActivities`, `useCurrentDate` |
| `src/lib` | Utilitários puros (datas, cálculo de prazos, status) |
| `src/schemas` | Validadores nativos de contratos e formulários |
| `src/services` | Cliente REST (`api`) e armazenamento de atividades |
| `src/types` | Tipos compartilhados |

`/` redireciona para `/dashboard` (`next.config.ts`).

## Executar

```powershell
npm ci
npm run dev
```

Configure `NEXT_PUBLIC_API_URL` em `.env.local` (padrão:
`http://localhost:3001/api/v1`). O cliente de `src/services/api` valida as
respostas com os parsers de `src/schemas` e centraliza os erros HTTP.

## Verificações

```powershell
npm run lint
npm run typecheck
npm test
npm run test:e2e
npm run build
```

Os dados de demonstração (projetos, requisitos, atividades) são persistidos no
`localStorage` até a integração com a API; o servidor sempre renderiza o estado
inicial para evitar divergência na hidratação.
