# Dashboard

Interface WaterfallLab em Next.js 16, React, TypeScript e Tailwind CSS v4,
usando App Router em `src/app`. O protótipo existente foi mantido; não foram
encontrados arquivos exportados do Figma Make neste repositório.

## Executar

```powershell
npm ci
npm run dev
```

Configure `NEXT_PUBLIC_API_URL` em `.env.local` para apontar à API (padrão:
`http://localhost:3001/api/v1`). O cliente de `src/services/api` valida os
contratos recebidos com Zod e centraliza os erros HTTP.

## Verificações

```powershell
npm run lint
npm run typecheck
npm test
npm run test:e2e
npm run build
```

Shadcn/UI está configurado em `components.json`; componentes ainda devem ser
incorporados em `src/components/ui` conforme o protótipo e as telas forem
aprovados.
