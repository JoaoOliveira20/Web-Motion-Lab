# Composição — GSAP + Three.js (Câmera Guiada por Timeline)

## Objetivo

No experimento Three.js isolado (Fase 4), a única animação era um loop
próprio (`requestAnimationFrame` incrementando rotação a cada frame).
Aqui a câmera e a rotação do objeto passam a ser controladas por uma
timeline do GSAP amarrada à posição de scroll — o loop de render do
Three.js continua existindo, mas só para desenhar; quem decide os
valores é o GSAP.

## Bibliotecas

`three` + `gsap` (sem `ScrollTrigger` — ver a segunda correção abaixo
para o motivo).

## Conceitos utilizados

- GSAP tween em objetos que não são DOM: `camera.position` é um
  `THREE.Vector3`, `mesh.rotation` é um `THREE.Euler` — o GSAP não faz
  ideia do que são, só vê propriedades numéricas (`x`, `y`, `z`) e as
  anima como animaria `left`/`top` de um elemento HTML.
- `gsap.timeline({ paused: true })` + `.progress(valor)`: a timeline
  nasce pausada; o progresso dela (`0` a `1`) é setado manualmente a
  cada evento `scroll` do contêiner, calculado como
  `scrollTop / (scrollHeight - clientHeight)`.
- Dois sistemas independentes: o `requestAnimationFrame` do Three.js
  chama `renderer.render(scene, camera)` a cada frame, sem saber que um
  listener de `scroll` está mudando `camera.position.z` por baixo dele.
  É só por isso que a mudança aparece na tela — sem o loop de render, os
  valores mudariam mas nada seria redesenhado.
- Um único cálculo, dois efeitos: a mesma variável `progress` move a
  câmera (via `timeline.progress()`) e atualiza qual waypoint aparece
  destacado na lista (`setActiveWaypoint`, estado React).

## Bug 1: a câmera não trocava de plano (ordem de efeitos)

Ao testar no navegador (2026-08-24), rolar a lista de waypoints não
movia a câmera nem girava o objeto. Causa: a criação da cena Three.js
(que populava `meshRef.current`/`cameraRef.current`) estava num
`useEffect` comum (passivo), enquanto o `useGSAP` que lia esses refs
para montar a timeline roda num `useLayoutEffect`. Layout effects da
árvore inteira rodam **antes** de qualquer effect passivo — no primeiro
render, os refs ainda eram `null` quando `useGSAP` executava, a função
retornava cedo, e a timeline nunca era criada. Mesmo bug de ordenação já
documentado na composição Lenis + GSAP. Primeira correção: consolidar
tudo (cena, câmera, mesh, timeline) num único `useEffect`, com variáveis
locais em vez de refs.

## Bug 2: ainda não funcionava depois da primeira correção (ScrollTrigger auto-referenciado)

Mesmo com os dois efeitos consolidados, a câmera continuou sem reagir ao
scroll. A configuração usava `ScrollTrigger` com
`trigger: scroller, scroller: scroller, start: "top top", end: "bottom bottom"`
— o **mesmo elemento como trigger e como scroller**, o mesmo padrão já
usado na barra de progresso do experimento GSAP isolado (Fase 1) e na
composição Lenis + GSAP. Não foi possível confirmar com certeza a causa
exata sem inspecionar o DOM ao vivo (não há acesso a navegador nesta
sessão), mas esse padrão de auto-referência depende de como o
ScrollTrigger mede a posição do `trigger` dentro do próprio `scroller`
que ele também é — uma medição mais ambígua do que o padrão documentado
(trigger = um elemento de conteúdo, scroller = o contêiner que o
recorta).

**Correção**: abandonar `ScrollTrigger` para este caso e amarrar o
progresso da timeline diretamente a um listener nativo de `scroll` no
contêiner, sem nenhuma camada de medição de posição:

```js
const timeline = gsap.timeline({ paused: true })
  .to(camera.position, { z: 3 }, 0)
  .to(mesh.rotation, { y: Math.PI * 2 }, 0);

scroller.addEventListener("scroll", () => {
  const progress = scroller.scrollTop / (scroller.scrollHeight - scroller.clientHeight);
  timeline.progress(progress);
});
```

Isso remove qualquer ambiguidade: `scrollTop`/`scrollHeight`/`clientHeight`
são propriedades diretas do elemento, sem nenhuma camada de
interpretação por cima.

## O que foi aprendido

- Compor GSAP com Three.js não exige nenhuma integração especial para o
  tween em si — é a mesma API de sempre. Onde este experimento
  tropeçou duas vezes foi em **quando** o código roda (ordem de
  efeitos) e em **como medir** o progresso do scroll, não em como
  animar propriedades de um objeto 3D.
- `timeline.progress(valor)` é uma alternativa legítima e mais simples
  ao `ScrollTrigger` para o caso específico de "amarrar uma timeline ao
  progresso de scroll de um contêiner conhecido" — sem pin, sem
  markers, sem media queries de scroller, é só aritmética.
- Ainda não há confirmação visual definitiva de que a causa do Bug 2 era
  de fato a auto-referência trigger=scroller (a correção elimina a
  ambiguidade em vez de provar a causa) — se a barra de progresso do
  experimento GSAP isolado (Fase 1) ou da composição Lenis + GSAP também
  se mostrarem inertes num teste futuro, é o mesmo padrão e merece a
  mesma correção.
- Igual à Fase 4, todo o experimento é lazy-carregado via
  `next/dynamic(..., { ssr: false })` — a regra de performance do
  projeto para WebGL vale também nas composições, não só nos
  experimentos isolados.

## Limitações observadas

- O cálculo de progresso não tem suavização (`scrub`) — o movimento da
  câmera segue o scroll 1:1, sem o atraso amortecido que
  `scrollTrigger.scrub: 1` oferecia. Adicionar suavização exigiria
  interpolar o valor de progresso antes de aplicá-lo (ex: `gsap.quickTo`
  ou um `lerp` manual, como no experimento Three.js isolado).
- Sem pin, a cena 3D e a lista de waypoints ficam lado a lado em vez da
  cena "grudar" na tela enquanto o texto rola por cima — um showcase
  final com scroll de página inteira poderia reconsiderar isso.

## Quando usar

- Quando o progresso de scroll de um contêiner conhecido precisa
  controlar uma timeline e o comportamento de `ScrollTrigger` (pin,
  markers, múltiplos triggers) não é necessário — `timeline.progress()`
  com um listener de scroll é mais simples e mais fácil de depurar.

## O GSAP era mesmo necessário aqui?

Chegamos a montar uma composição Lenis + Three.js só pra testar: em vez
de `timeline.progress(scroll)`, usar `lenis.progress` (a própria
instância do Lenis já expõe o progresso normalizado de 0 a 1) direto em
`camera.position`/`mesh.rotation`. Funcionava, e o código era um pouco
mais curto — mas o resultado final, pra quem visita o site, era
visualmente idêntico a este experimento: mesma cena, mesmo mecanismo de
"um valor de 0 a 1 move a câmera", só trocando de onde vem o valor. Não
justificava uma composição própria, então foi descartada (registrado em
`docs/EXPERIMENT_IDEAS.md`) — mas a resposta fica registrada aqui: para
mover uma única propriedade com um único valor, o GSAP não é
estritamente necessário. Ele volta a valer a pena quando entra `scrub`
pronto (suavização) ou coreografia de múltiplos alvos em tempos
diferentes — nenhum dos dois é o caso deste experimento.
