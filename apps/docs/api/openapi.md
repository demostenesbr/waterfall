# API e OpenAPI

- `GET /`: endpoint inicial legado, preservado.
- `GET /api/v1/health`: health check HTTP que retorna `{ "status": "ok" }`.
- `/api/docs`: interface Swagger/OpenAPI gerada a partir dos decorators NestJS.

O prefixo `/api/v1` é aplicado no bootstrap da aplicação. O health check não
consulta o banco e não deve ser interpretado como verificação de dependências.

O NestJS mantém o formato padrão de erros e status HTTP. O dashboard trata 400,
401, 403, 404, 409, 422 e 500 sem esconder o status retornado. Novos endpoints
devem documentar DTOs, códigos de sucesso e erros no Swagger.
