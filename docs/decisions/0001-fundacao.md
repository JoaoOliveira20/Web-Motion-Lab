# Decisão 0001 — Fundação do projeto

## Contexto

A pasta continha apenas os documentos de planejamento (`CLAUDE.md`,
`CLAUDE_TASKS.md`, `docs/`), sem projeto Next.js inicializado. Havia
conflito entre o modo tutor descrito nesses documentos e o modo execução
pedido no Prompt Mestre de 2026-08-24 — resolvido com o usuário, que
escolheu modo execução.

## Decisões tomadas

**Gerenciador de pacotes:** pnpm (já disponível no ambiente, mais rápido
que npm, instalação determinística).

**Next.js 16 + React 19 + TypeScript + Tailwind v4:** versões estáveis
mais recentes no momento (verificadas via `npm view <pacote> dist-tags`
antes da instalação). App Router, sem `src/` — estrutura sugerida em
`docs/PROJECT_PLAN.md` já assume `app/` na raiz.

**Tipografia:** Fraunces (serifada editorial, títulos) + Geist Sans
(texto corrido) + Geist Mono (labels técnicos, status, dados). A
combinação serifada + grotesk + mono cria hierarquia forte sem recorrer à
estética genérica de SaaS (que tipicamente usa só uma sans-serif
geométrica).

**Paleta:** neutra quase-preta como base (`--background: #0b0b0c`), com
um único acento em laranja-sinal (`--accent: #ff4d1c`) usado com
moderação — evita deliberadamente gradientes purple/neon. Tema claro
disponível via `prefers-color-scheme: light`.

**`motion` em vez de `framer-motion`:** mesmo pacote, mesma versão no
registro do npm; `motion` é o nome atual mantido pelos autores.

**`@tsparticles/react` em vez de `react-tsparticles`:** o pacote antigo
está em modo de manutenção; a reescrita v3 (`@tsparticles/*`) é a atual
(decisão registrada aqui para quando a Fase 4 chegar em tsParticles).

## Impacto

Define o design system e a arquitetura de dados (`data/experiments.ts`,
`data/libraries.ts`) que todas as fases seguintes vão consumir.
