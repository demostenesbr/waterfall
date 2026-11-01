# Execução e implantação com Docker

## Ambiente local

1. Copie `.env.example` para `.env`.
2. Valide e inicie os serviços com os valores locais de exemplo:

```powershell
docker compose config --quiet
docker compose up --build
```

O dashboard é publicado em `http://localhost:3000`, a API em
`http://localhost:3001` e PostgreSQL em `localhost:5432`. O volume
`postgres_data` persiste os dados. Health checks verificam o banco, a API e o
dashboard; a API espera o PostgreSQL saudável.

O exemplo `.env.example` é exclusivamente para desenvolvimento. Não o use como
segredo de produção nem versione `.env`. Em produção, use um gerenciador de
segredos e valores próprios do ambiente.

O volume mantém as credenciais inicializadas pelo PostgreSQL. Se a senha for
alterada depois da primeira inicialização, atualize também a senha do usuário
no banco; mudar apenas o `.env` não altera um volume já existente.

Os Dockerfiles independentes ficam em `infrastructure/docker/`. O Nginx em
`infrastructure/docker/nginx/default.conf` é opcional e não está incluído no
Compose padrão. PostgreSQL está provisionado, mas o backend ainda não conecta
nem executa migrações.

## Execução sem Docker

Cada aplicação pode ser instalada e executada de forma independente com `npm
ci` e seus scripts documentados em seus READMEs. Para desenvolvimento com banco
local, inicie somente o serviço PostgreSQL com `docker compose up postgres -d`.
