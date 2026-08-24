# Experimento — GSAP (Timelines Sequenciadas)

## Objetivo

Comparar o modelo imperativo de animação do GSAP com o modelo declarativo
da Motion (`docs/experiments/motion.md`): coreografar múltiplos elementos
em sequência com controle preciso de tempo, e ligar uma animação à
posição de scroll com ScrollTrigger.

## Biblioteca

`gsap` (todos os plugins, incluindo `ScrollTrigger`, vêm inclusos no
pacote principal desde a aquisição pela Webflow em 2024 — não existe mais
"Club GreenSock" nem registro pago separado). Integração com React via
`@gsap/react` (`useGSAP`).

## Conceitos utilizados

- `gsap.timeline()` para sequenciar tweens com `stagger`, em vez de
  animar cada elemento isoladamente.
- `useGSAP()` como substituto de `useLayoutEffect` que automaticamente
  reverte (`gsap.context().revert()`) todas as animações e ScrollTriggers
  criados dentro do escopo quando o componente desmonta — sem isso, seria
  necessário matar cada tween e ScrollTrigger manualmente.
- `ScrollTrigger` com `scroller` apontando para um elemento com scroll
  próprio (não a `window`), demonstrando que o plugin funciona em
  qualquer contêiner com overflow, não só na página inteira.
- `scrub: true` para sincronizar uma barra de progresso diretamente à
  posição de scroll, sem easing de tempo — a barra "é" o scroll.
- `toggleActions` para controlar o que acontece ao entrar/sair da
  viewport em cada direção (`"play none none reverse"`).

## O que foi aprendido

- GSAP não depende de Client Component para existir como biblioteca (é
  agnóstica de framework), mas qualquer uso com `useGSAP`/refs exige
  `"use client"`, assim como a Motion.
- `useGSAP` com `scope` permite usar seletores de string (`"[data-panel]"`)
  em vez de um `ref` por elemento — reduz boilerplate quando há vários
  elementos do mesmo tipo.
- Quando `ScrollTrigger` é registrado antes de `useGSAP` criar as
  instâncias, o `revert()` do contexto também mata os ScrollTriggers —
  comportamento documentado, mas fácil de esquecer de verificar.

## Limitações observadas

- `ScrollTrigger` recalcula posições com base em medições do DOM; em um
  contêiner com `overflow-y-auto` aninhado (como o desta demo), é preciso
  declarar `scroller` explicitamente — o padrão assume a `window`.
- O timeline da primeira demo é reiniciável (`restart()`), mas não há
  proteção contra cliques repetidos durante a execução além de desabilitar
  o botão via estado React — GSAP não gerencia esse estado de UI sozinho.

## Alternativas

Motion resolve animações de entrada/saída amarradas ao ciclo de vida de
componentes com menos código (ver `docs/experiments/motion.md`). GSAP
compensa com mais controle sobre ordem, offset relativo entre tweens
(`"-=0.2"`, labels) e nativamente cobre casos como MorphSVG, Draggable e
Flip que a Motion não cobre.

## Quando usar

- Sequências coreografadas com muitos elementos e timing relativo entre
  eles.
- Qualquer animação amarrada à posição de scroll, inclusive fora da
  janela principal (contêineres com scroll próprio, carrosséis).

## Quando evitar

- Microinterações simples de componente (hover, abrir/fechar) — a Motion
  resolve com menos código e já se integra ao modelo de estado do React.
