# Web Motion Lab

Laboratório experimental de front-end construído em Next.js + TypeScript
para estudar, comparar e combinar bibliotecas modernas de animação, UI,
scroll, partículas e 3D.

Ver `docs/PROJECT_PLAN.md` para a visão completa e `CLAUDE_TASKS.md` para
o checklist de execução.

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

## Estrutura

```text
app/
  page.tsx          Homepage
  lab/               Índice e experimentos isolados
    motion/          Primeiro experimento (Motion)
components/
  home/              Seções da homepage
  lab/               Demonstrações específicas de cada experimento
  layout/            Primitivas de layout (Container)
  navigation/         Header, footer, breadcrumbs
data/
  experiments.ts     Catálogo de experimentos
  libraries.ts       Matriz de bibliotecas
hooks/
  use-reduced-motion.ts
docs/                Documentação do laboratório
```
