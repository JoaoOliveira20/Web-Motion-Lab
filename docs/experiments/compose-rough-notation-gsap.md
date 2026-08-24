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

## Bug encontrado na revisão visual: anotação "fica no nada" ao rolar

Ao testar no navegador (2026-08-24), rolar o contêiner para baixo fazia
a anotação (o traço/círculo desenhado) ficar parada no lugar onde
apareceu pela primeira vez, enquanto o texto anotado rolava para longe
dela — os dois se desconectavam visualmente.

Causa: o `attach()` do Rough Notation
(`node_modules/rough-notation/lib/rough-notation.js`) insere o `<svg>`
da anotação como **irmão** do elemento anotado
(`insertAdjacentElement('afterend', svg)`), com
`style.position = 'absolute'; top: 0; left: 0`. Um elemento
`position: absolute` sem nenhum ancestral com `position` diferente de
`static` é posicionado relativo ao *initial containing block* — na
prática, a página inteira, não o contêiner com `overflow-y-auto`. As
coordenadas do traço são calculadas uma única vez, em
`getBoundingClientRect()` (relativas à viewport, no momento de
`.show()`), então quando o **contêiner** rola, o texto se move dentro
dele, mas o SVG — posicionado relativo a um ancestral fora do contexto
de rolagem — não acompanha.

**Correção**: adicionar `position: relative` ao próprio contêiner
rolável (`className="relative ..."` no `scrollerRef`). Isso faz o
contêiner virar o *containing block* dos SVGs de anotação — e, como
eles passam a fazer parte da área de conteúdo rolável desse contêiner
(não apenas da sua janela visível), voltam a se mover junto com o texto
ao rolar. O experimento Rough Notation original (Fase 1) nunca expôs
esse bug porque não usava nenhum contêiner com scroll interno — as
anotações lá reagiam ao scroll da página inteira, sem essa camada
extra de posicionamento.

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
- Rough Notation exige `position: relative` (ou outro valor não-`static`)
  em algum ancestral entre o elemento anotado e o contêiner com scroll
  — sem isso, qualquer anotação dentro de um contêiner rolável
  internamente (não a página inteira) se desconecta visualmente do
  texto ao rolar. Vale para qualquer uso futuro da biblioteca dentro de
  um scroller customizado, não só nesta composição.

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
