# Backend

API REST WaterfallLab construída com NestJS 11 e TypeScript. O backend é uma
aplicação independente e segue a organização de monólito modular do NestJS.

## Executar

```powershell
npm ci
npm run start:dev
```

A API usa a porta `3001` por padrão. O endpoint existente `GET /` continua
disponível; a API versionada fica em `/api/v1`, com verificação em
`GET /api/v1/health` e Swagger em `/api/docs`.

Configure `PORT` e `CORS_ORIGIN` conforme necessário. Para executar migrações
Prisma, configure `DATABASE_URL` no arquivo `.env` do backend usando
`.env.example` como referência. Execute os comandos a partir de `apps/backend`:

```powershell
npx prisma migrate dev
```

O arquivo `prisma.config.ts` carrega `.env` e fornece a URL exigida pelo Prisma
7; a URL não deve ser declarada no `schema.prisma`.

## Verificações

```powershell
npm run lint
npm run typecheck
npm test
npm run test:e2e
npm run build
```

Consulte [a arquitetura do backend](../docs/architecture/backend.md) e
[a documentação da API](../docs/api/openapi.md).
