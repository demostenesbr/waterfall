# Arquitetura do backend

O backend existente usa NestJS 11, TypeScript e Jest. Sua composição mantém o
`AppModule`, controller e service originais e inclui um módulo de health
independente. A estrutura reserva `common/`, `config/`, `database/` e
`modules/` para preocupações transversais e domínios.

O bootstrap aplica Helmet, CORS configurável, `ValidationPipe` com whitelist e
transformação, prefixo `/api/v1` e Swagger em `/api/docs`. A rota raiz antiga
permanece fora do prefixo para preservar seu comportamento. O health check
indica disponibilidade HTTP, não valida conexão com PostgreSQL.

O NestJS já retorna os status HTTP padrão para exceções. DTOs com
`class-validator`, guards de autenticação/RBAC, rate limiting, logs estruturados
e módulos de negócio devem ser adicionados quando os respectivos contratos e
regras forem especificados. Prisma não foi instalado porque não fazia parte do
backend inspecionado.
