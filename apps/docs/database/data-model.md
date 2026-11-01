# Modelo de dados e estado da persistência

## Estado atual

O repositório não continha PostgreSQL, Prisma, schema, migrations ou integração
de banco no NestJS. O Compose agora inicia PostgreSQL 17 com volume persistente,
mas a API permanece sem persistência. `DATABASE_URL` é apenas a configuração
reservada para essa integração.

## Entidades a especificar

O modelo futuro deve avaliar usuários, organizações, projetos, fases, critérios
de aceitação, entregáveis, requisitos, decisões arquiteturais, artefatos,
módulos implementados, casos e execuções de teste, defeitos, mudanças,
implantações, manutenção e auditoria. As relações e restrições devem preservar
integridade referencial e o histórico de aprovações de Stage Gate.

## Próximos passos

Antes de escolher Prisma ou outra camada de persistência, documentar o modelo
conceitual e revisar cardinalidades, retenção de histórico, autorização e
estratégia de migração. Nenhuma migração foi gerada ou executada nesta etapa.
