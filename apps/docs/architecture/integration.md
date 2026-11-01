# Integração entre dashboard e API

O endereço público configurável do dashboard é
`NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1`. O backend escuta na porta
`3001`, permite por padrão a origem local `http://localhost:3000` e publica
Swagger em `/api/docs`.

O cliente HTTP do dashboard usa Zod para validar a resposta esperada e expõe
`ApiError` com o status HTTP original. Mensagens padrão cobrem 400, 401, 403,
404, 409, 422 e 500; mensagens informadas pelo backend têm precedência.
Respostas bem-sucedidas, inclusive 201, são validadas pelo schema fornecido.

Os contratos devem ser documentados no OpenAPI do backend. A geração automática
de tipos pode ser adotada depois; não há pacote de tipos compartilhado.
Credenciais ou tokens não são injetados pelo cliente nesta etapa.
