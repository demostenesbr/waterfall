# Arquitetura do dashboard

O dashboard usa Next.js App Router em `src/app`; `public/` permanece na raiz
conforme a convenção do Next.js. As pastas de `src/components`, `modules`,
`services`, `hooks`, `lib`, `types`, `schemas` e `constants` separam UI,
domínios e integração.

`src/services/api/client.ts` centraliza a URL da API, a leitura de respostas,
os erros HTTP e a validação de payloads com Zod. O cliente é independente de
framework visual e não coloca regras de negócio nos componentes. O helper
`src/lib/utils.ts` reúne classes Tailwind.

Tailwind CSS v4 já existia. `components.json` configura os aliases para adoção
gradual de Shadcn/UI e Lucide; Recharts e React Hook Form com Zod estão
disponíveis para telas que vierem a utilizá-los. Nenhuma tela do protótipo foi
substituída por componentes novos.

`tests/` contém testes unitários com Vitest e smoke E2E com Playwright. A
implementação de autenticação, navegação administrativa e módulos funcionais
permanece pendente.
