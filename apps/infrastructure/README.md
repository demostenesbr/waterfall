# Infraestrutura

Os Dockerfiles independentes e a configuração opcional do reverse proxy ficam
em `docker/`. O `docker-compose.yml` da raiz inicia dashboard, backend e
PostgreSQL; o Nginx não faz parte do perfil padrão.

O diretório `database/` é reservado a artefatos operacionais do banco e
`scripts/` a automações de infraestrutura. Credenciais locais devem vir do
`.env` ignorado pelo Git, nunca de imagens ou arquivos versionados.

Consulte [execução com Docker](../docs/deployment/docker.md).
