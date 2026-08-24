# Composição — Rough Notation + GSAP (Anotações no Tempo da Timeline)

## Objetivo

Fechar a Fase 5 trocando o gatilho do experimento Rough Notation
original: de `IntersectionObserver` puro para `ScrollTrigger` do GSAP —
a mesma engine de scroll que já aparece em outras três composições desta
fase.

## Bibliotecas

`rough-notation` (`annotate()`) + `gsap`/`ScrollTrigger` (via `@gsap/react`).

## Conceitos utilizados

- `ScrollTrigger.create({ onEnter, onLeaveBack })`: usado sem nenhum
  tween — só como fonte de eventos de scroll com direção. `onEnter`
  dispara ao entrar rolando para baixo; `onLeaveBack` ao sair rolando
  para cima. Juntos reproduzem show/hide direcional que o
  `IntersectionObserver` sozinho não distinguia (ele só reporta
  "está visível" ou "não está", sem direção).
- `annotate()` sem nenhuma mudança de API: o mesmo `annotate(el, config)`
  do experimento original, só que agora `.show()`/`.hide()` são
  chamados de dentro de callbacks do ScrollTrigger em vez de dentro do
  callback do `IntersectionObserver`.

## O que foi aprendido

- Essa composição confirma uma tese que já apareceu na composição
  GSAP + Three.js: GSAP entrega valor mesmo quando usado só como fonte
  de eventos de scroll, sem nenhum tween — `ScrollTrigger.create()` sem
  `scrollTrigger.animation` associado é uma forma completamente válida
  de usá-lo.
- Comparado ao `IntersectionObserver` original, o ganho real de usar
  ScrollTrigger aqui é a possibilidade de compartilhar o mesmo scroller
  e a mesma escala de tempo com outras animações GSAP da mesma página —
  em uma composição maior (Fase 6), essas anotações poderiam se
  encaixar na mesma timeline que anima outros elementos, coisa que um
  `IntersectionObserver` isolado não ofereceria.

## Limitações observadas

- `onLeaveBack` só dispara ao cruzar o `start` rolando para cima — se o
  usuário pular direto para o fim do scroller (âncora, `scrollTo`), o
  callback de entrada nunca dispara e a anotação correspondente nunca
  aparece. O `IntersectionObserver` original tinha a mesma limitação
  (threshold-based, não cobre saltos).

## Quando usar

- Quando anotações precisam se sincronizar com outras animações GSAP já
  presentes na página — nesse caso, reaproveitar o ScrollTrigger
  existente é mais simples do que manter um `IntersectionObserver`
  paralelo.

## Fechamento da Fase 5

As sete composições cobrem os padrões de integração mais comuns entre
bibliotecas de animação:

1. **Sincronização de loop** (Lenis + GSAP) — duas bibliotecas que
   competiam pelo mesmo `requestAnimationFrame`.
2. **Motor animando objeto não-DOM** (GSAP + Three.js) — GSAP tween em
   propriedades de câmera/mesh.
3. **Orquestração de lista + interação de item** (Motion + React Bits) —
   preocupações ortogonais no mesmo componente.
4. **Comunicação por valor único** (Swiper + Motion) — um índice
   saindo de uma biblioteca, entrando em outra.
5. **Gesture comandando API imperativa** (Lottie + Motion) — callbacks
   de gesture disparando `play()`/`pause()`.
6. **Camadas de DOM sincronizadas por scroll** (tsParticles + Lenis) —
   parallax sem nenhuma API de integração entre as duas.
7. **Troca de fonte de eventos** (Rough Notation + GSAP) — a mesma API
   imperativa, gatilho diferente.

Nenhuma das sete exigiu modificar o código dos experimentos isolados
(Fases 1-4) — todas reaproveitaram componentes ou padrões já existentes,
só mudando como e quando são acionados.
