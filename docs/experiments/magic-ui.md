# Experimento — Magic UI (Componentes Visuais)

## Objetivo

Comparar um efeito que depende de uma biblioteca de animação (BorderBeam,
via Motion) com um efeito que é CSS puro (Marquee) — e entender por que a
regra global de `prefers-reduced-motion` já criada na Fase 0 cobre um
caso, mas não o outro.

## Biblioteca

Magic UI (`github.com/magicuidesign/magicui`). Sem instalação — mesma
decisão de `docs/decisions/0002-bibliotecas-de-copia.md`. O repositório
já usa sintaxe Tailwind v4 nativa (`bg-linear-to-l`, `border-(length:...)`,
`mask-intersect`), o que combinou diretamente com a versão instalada
neste projeto.

## Componentes adaptados

- **BorderBeam** (`components/lab/magic-ui/border-beam.tsx`): adaptado de
  `apps/www/registry/magicui/border-beam.tsx`. Mudanças: cores padrão
  trocadas de laranja→roxo (`#ffaa40` → `#9c40ff`, o gradiente neon que a
  direção visual do projeto pede para evitar) para `var(--accent)` →
  `transparent`; import de `cn` redirecionado para `@/lib/cn`; adicionado
  fallback estático para `prefers-reduced-motion` (o original não tinha
  nenhum tratamento de acessibilidade a movimento).
- **Marquee** (`components/lab/magic-ui/marquee.tsx`): adaptado de
  `apps/www/registry/magicui/marquee.tsx`. Removida a prop `vertical`
  (sem uso no experimento); os keyframes `marquee`/`marquee-vertical`,
  que no original vinham de configuração do Tailwind v3
  (`tailwind.config.js`), foram portados para `app/globals.css` como
  tokens `--animate-marquee` dentro de `@theme` — a forma como Tailwind
  v4 registra animações customizadas.

## Conceitos utilizados

- `offset-path` / `offset-distance`: a mesma API de motion path do CSS,
  aqui usada para mover um gradiente ao longo do contorno de um
  elemento com bordas arredondadas.
- `mask-intersect` com duas máscaras: uma técnica para revelar só o
  contorno de um elemento (não o preenchimento), respeitando
  `border-radius` herdado (`rounded-[inherit]`).
- Duplicação de conteúdo (`repeat`) + `translateX` em loop: o truque
  clássico de marquee infinito sem salto perceptível no fim do ciclo.
- `[mask-image:linear-gradient(...)]`: esmaece as bordas do ticker para
  que o texto não corte abruptamente.

## O que foi aprendido

- A regra global `@media (prefers-reduced-motion: reduce)` de
  `app/globals.css` (criada na Fase 0) já reduz qualquer `@keyframes`
  CSS a uma única iteração quase instantânea — o Marquee herda essa
  proteção de graça, sem nenhum código extra no componente.
- Essa mesma regra global **não** alcança animações da Motion, porque
  `motion.div`'s `animate` prop não usa `animation` do CSS — usa a Web
  Animations API diretamente. Por isso o BorderBeam precisou do próprio
  check de `useReducedMotion`. Essa diferença (CSS `@keyframes` vs. WAAPI
  via JS) não estava documentada em nenhum experimento anterior.
- Cores de exemplo de bibliotecas de terceiros carregam a estética que a
  biblioteca escolheu (aqui, laranja→roxo) — adaptar para os tokens do
  projeto é obrigatório, não cosmético, para não reintroduzir o
  "purple gradient genérico" que `docs/DESIGN_DIRECTION.md` pede para
  evitar.

## Limitações observadas

- `offset-path: rect(...)` depende do tamanho do elemento ser conhecido
  (`size` fixo); redimensionar o cartão dinamicamente exigiria recalcular
  a prop, não é responsivo por conta própria.
- O Marquee duplica o conteúdo `repeat` vezes no DOM — cada item real
  (aqui, o nome de cada biblioteca) existe fisicamente `repeat` vezes na
  árvore, o que é aceitável para texto curto mas custa mais para conteúdo
  pesado (imagens, componentes complexos).

## Alternativas

BorderBeam poderia ser feito com um `@property` + `@keyframes` de CSS
puro (animando um ângulo de `conic-gradient`), sem depender da Motion —
mais barato, porém sem a curva de easing configurável que a Motion
oferece.

## Quando usar

- BorderBeam: destaque pontual em 1 elemento por vez (card em foco,
  CTA principal) — o custo de uma instância de Motion é aceitável.
- Marquee: tickers de logos, texto ou tags onde CSS puro já resolve sem
  nenhuma dependência de JavaScript.

## Quando evitar

- BorderBeam em múltiplos cartões simultâneos na mesma tela — cada
  instância roda sua própria animação Motion continuamente.
