# Decisão 0002 — Como tratar bibliotecas "de cópia" (Fase 2)

## Contexto

React Bits, Motion Primitives, Magic UI e Aceternity não são pacotes npm
tradicionais. Todas distribuem componentes via CLI do shadcn/ui ou cópia
manual — o código-fonte do componente é copiado para dentro do projeto,
não instalado como dependência versionada.

Pesquisei o mecanismo atual de cada uma antes de decidir a abordagem:

- React Bits: CLI própria (Pro) ou registry do shadcn.
- Magic UI: registry do shadcn (`@magicuidesign`) ou URL remota
  (`npx shadcn add "https://magicui.design/r/<componente>"`).
- Aceternity: registry do shadcn, também com cópia manual documentada
  como alternativa oficial.
- Motion Primitives: registry do shadcn, mas com um bug reportado em
  2026 no `shadcn-ui/ui` (issue #9370) — a URL do registry
  (`https://motion-primitives.com/c/registry.json`) está sem o
  placeholder `{name}`, quebrando a resolução de componentes individuais
  via CLI.

## Decisão

Não rodar `npx shadcn@latest init`. O init do shadcn reescreveria
`app/globals.css` com o palette padrão dele (zinc/neutral, tokens
`--primary`/`--ring`/etc.), colidindo com o design system já construído
na Fase 0 (Fraunces + Geist, paleta neutra + acento laranja-sinal).

Em vez disso: buscar o código-fonte real de cada componente (via GitHub,
já que os sites de documentação são SPAs que não expõem HTML estático) e
adaptá-lo manualmente — mesma cor, mesmos tokens (`lib/cn.ts`, variáveis
de `app/globals.css`), TypeScript em vez de JSX solto. Isso é consistente
com a licença dessas bibliotecas (MIT + Commons Clause no caso do React
Bits — cópia e modificação são exatamente o modelo de distribuição
pretendido) e com a regra do projeto de não copiar exemplos cegamente.

## Impacto

Cada experimento da Fase 2 documenta, no seu `docs/experiments/*.md`, de
qual componente original ele partiu e o que foi adaptado — para manter
rastreabilidade sem depender de um registry externo que pode mudar ou
quebrar (como já aconteceu com o do Motion Primitives).
