# Estratégia de testes

## Backend

- Unitários: Jest, junto ao código em `src/**/*.spec.ts`.
- E2E: Jest e Supertest em `test/`.
- Qualidade: ESLint, TypeScript e build NestJS.

Comandos: `npm run lint`, `npm run typecheck`, `npm test`,
`npm run test:e2e` e `npm run build`.

## Dashboard

- Unitários: Vitest em `tests/**/*.test.ts`.
- E2E: Playwright em `tests/e2e/`.
- Qualidade: ESLint, TypeScript e build Next.js.

Comandos: `npm run lint`, `npm run typecheck`, `npm test`,
`npm run test:e2e` e `npm run build`. Playwright requer Chromium instalado
(`npx playwright install chromium`).

Os workflows independentes do GitHub Actions executam essas verificações. A
cobertura atual é de smoke e integração do cliente HTTP; testes de componentes
e fluxos de negócio serão adicionados com a interface funcional.
