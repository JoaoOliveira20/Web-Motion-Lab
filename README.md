# Web Motion Lab

Laboratório experimental de front-end construído em Next.js + TypeScript
para estudar, comparar e combinar bibliotecas modernas de animação, UI,
scroll, partículas e 3D.

Ver `docs/PROJECT_PLAN.md` para a visão completa, `CLAUDE_TASKS.md` para
o checklist de execução, `docs/LEARNINGS.md` para a síntese final de
qual biblioteca escolher em cada situação, e `docs/EXPERIMENT_IDEAS.md`
para o backlog de próximos experimentos.

`/showcase` é a peça final do laboratório: uma narrativa de rolagem
única que reaproveita experimentos e composições já construídos.
`/lab` é o índice completo, filtrável por biblioteca: 16 bibliotecas
(a maioria dividida em 2 exemplos focados, cada um com preview próprio
no card) e 7 composições.

## Stack

- Next.js 16 (App Router, Turbopack)
- React 19
- TypeScript
- Tailwind CSS v4

## Desenvolvimento

```bash
pnpm install
pnpm dev
```

- `pnpm build` — build de produção
- `pnpm lint` — ESLint
- `pnpm exec tsc --noEmit` — checagem de tipos

## Deploy

Favicon, ícone de tela inicial e imagem de Open Graph/Twitter Card são
gerados em build (`app/icon.tsx`, `app/apple-icon.tsx`,
`app/opengraph-image.tsx`, via `next/og`). Antes de publicar em um
domínio real, defina `metadataBase` em `app/layout.tsx` — sem isso, as
imagens de compartilhamento social resolvem para `localhost`.

## Estrutura

```text
app/
  page.tsx           Homepage
  showcase/          Peça final (Fase 6) — narrativa única de rolagem
  lab/               Índice e experimentos isolados
    <slug>/           Um experimento por biblioteca
    compose/<slug>/   Composições de duas bibliotecas (Fase 5)
components/
  home/              Seções da homepage
  showcase/          Componentes exclusivos da peça final
  lab/               Demonstrações específicas de cada experimento
    compose/          Demonstrações das composições
  layout/            Primitivas de layout (Container)
  navigation/         Header, footer, breadcrumbs
data/
  experiments.ts     Catálogo de experimentos isolados
  compositions.ts    Catálogo de composições
  libraries.ts       Matriz de bibliotecas
hooks/
  use-reduced-motion.ts
  use-typed.ts
  use-css-variable.ts
docs/
  experiments/       Um .md por experimento/composição — o que foi
                      aprendido, bugs encontrados, quando usar
  decisions/         Decisões de arquitetura registradas (ADR-like)
  LEARNINGS.md       Síntese final: qual biblioteca escolher em cada caso
```
