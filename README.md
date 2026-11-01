# WaterfallLab

Plataforma acadêmica para apoiar a gestão e a demonstração do ciclo de vida de
desenvolvimento de software pelo modelo Cascata. O projeto é composto por duas
aplicações independentes no mesmo repositório, sem gerenciador adicional de
monorepo.

## Estrutura

- `dashboard/`: interface Next.js com App Router, TypeScript e Tailwind CSS.
- `backend/`: API REST NestJS em arquitetura de monólito modular.
- `infrastructure/`: Dockerfiles, configuração opcional de Nginx e material de
  infraestrutura.
- `docs/`: documentação técnica, acadêmica, de arquitetura, testes e operação.
- `docker-compose.yml`: ambiente local com dashboard, API e PostgreSQL.

## Requisitos

- Node.js 24 e npm.
- Docker Desktop com Docker Compose v2, para executar o ambiente completo.

## Desenvolvimento local

Instale as dependências em cada aplicação separadamente:

```powershell
cd backend
npm ci
npm run start:dev
```

```powershell
cd dashboard
npm ci
npm run dev
```

A API fica em `http://localhost:3001/api/v1`, a documentação OpenAPI em
`http://localhost:3001/api/docs` e o dashboard em `http://localhost:3000`.
Configure `NEXT_PUBLIC_API_URL` em `dashboard/.env.local` quando necessário.

## Docker Compose

Copie `.env.example` para `.env` e inicie os serviços com os valores de
desenvolvimento:

```powershell
Copy-Item .env.example .env
docker compose up --build
```

O PostgreSQL persiste os dados no volume `postgres_data`. A senha do exemplo é
fictícia, restrita ao desenvolvimento local e não deve ser usada em produção.
O Nginx está configurado como proxy opcional em
`infrastructure/docker/nginx/default.conf`; ele não é iniciado pelo Compose
padrão.

## Qualidade

Execute lint, verificação de tipos, testes e build dentro de cada aplicação:

```powershell
cd backend
npm run lint
npm run typecheck
npm test
npm run test:e2e
npm run build
```

```powershell
cd dashboard
npm run lint
npm run typecheck
npm test
npm run test:e2e
npm run build
```

Consulte [a visão geral da arquitetura](docs/architecture/overview.md),
[a estratégia de testes](docs/testing/test-strategy.md) e
[a documentação Docker](docs/deployment/docker.md) para detalhes e limitações
atuais.
