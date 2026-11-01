# Persistência

O backend inspecionado não possuía camada de banco nem Prisma. PostgreSQL está
disponível via Compose, mas conexão, schema e migrações devem ser acrescentados
após revisão do modelo em `docs/database/data-model.md`.
