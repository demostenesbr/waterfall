# Decisões de arquitetura

| Decisão | Estado | Motivo |
|---|---|---|
| NestJS em monólito modular | Adotada | Preserva o backend existente e mantém módulos de domínio coesos. |
| Next.js com App Router | Adotada | Preserva o dashboard existente e atende à estrutura definida. |
| Aplicações independentes na raiz | Adotada | Mantém dependências e ciclos de build separados, sem ferramenta de monorepo. |
| REST com prefixo `/api/v1` | Adotada | Estabelece versionamento sem remover o endpoint raiz existente. |
| PostgreSQL em Compose | Preparada | Oferece banco local persistente para etapas futuras. |
| Prisma | Adiada | Não estava instalado nem configurado; não foi introduzido sem decisão sobre o modelo de dados. |
| Nginx | Opcional | A configuração existe, mas o proxy direto do Compose é suficiente para desenvolvimento. |
| Figma Make | Preservado | Nenhum arquivo exportado foi encontrado; a tela existente não foi substituída. |
| Contratos compartilhados | OpenAPI | Evita pacote comum obrigatório entre aplicações independentes. |

As decisões pendentes de ORM, autenticação e modelo de dados devem ser
registradas e aprovadas antes de introduzir migrações ou persistência.
