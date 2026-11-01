# Limites dos módulos de domínio

Os diretórios reservados a projetos, requisitos, ciclo de vida, arquitetura,
implementação, qualidade, implantação e manutenção organizam a evolução do
monólito modular. Um módulo só deve receber controller, service, DTOs e testes
quando seus contratos e regras estiverem definidos.

No backend inspecionado havia apenas o módulo de aplicação inicial. O módulo
`health` criado nesta etapa é infraestrutura, não domínio. Os demais diretórios
mantêm apenas o ponto de extensão para evitar controllers vazios ou regras de
negócio inventadas.
