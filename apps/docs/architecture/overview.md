# Visão geral da arquitetura

## Contexto

O WaterfallLab é uma plataforma acadêmica para gerenciamento de projetos,
artefatos e qualidade segundo o modelo Cascata. O sistema é estruturado como
duas aplicações independentes no mesmo repositório: um dashboard web e uma API
REST.

## Componentes

- **Dashboard:** Next.js App Router, React, TypeScript e Tailwind CSS.
- **Backend:** NestJS 11 e TypeScript, estruturado como monólito modular.
- **Persistência:** PostgreSQL disponibilizado pelo Docker Compose. O backend
  ainda não possui driver, ORM ou modelo persistente.
- **Documentação da API:** Swagger em `/api/docs`.
- **Infraestrutura:** Docker Compose; Nginx é uma configuração opcional.

## Organização

Cada aplicação mantém seu próprio `package.json`, lockfile, comandos e testes.
Não há Nx, Turborepo ou pacote compartilhado obrigatório. Tipos de resposta do
frontend são validados localmente com Zod; contratos entre aplicações são
documentados em OpenAPI.

## Estado e evolução

A base existente do NestJS foi preservada, incluindo o endpoint raiz. Foram
adicionados versionamento HTTP, health check e configuração de validação e
Swagger. O dashboard preserva a tela starter existente e ganhou a estrutura de
integração e testes.

Autenticação, módulos de domínio, persistência, autorização, regras de Stage
Gate e telas finais continuam fora do escopo de estruturação.
