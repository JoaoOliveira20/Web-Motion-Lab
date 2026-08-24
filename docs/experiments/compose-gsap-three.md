# Composição — GSAP + Three.js (Câmera Guiada por Timeline)

## Objetivo

No experimento Three.js isolado (Fase 4), a única animação era um loop
próprio (`requestAnimationFrame` incrementando rotação a cada frame).
Aqui a câmera e a rotação do objeto passam a ser controladas por uma
timeline do GSAP amarrada à posição de scroll — o loop de render do
Three.js continua existindo, mas só para desenhar; quem decide os
valores é o GSAP.

## Bibliotecas

`three` + `gsap`/`ScrollTrigger` (via `@gsap/react`).

## Conceitos utilizados

- GSAP tween em objetos que não são DOM: `camera.position` é um
  `THREE.Vector3`, `mesh.rotation` é um `THREE.Euler` — o GSAP não faz
  ideia do que são, só vê propriedades numéricas (`x`, `y`, `z`) e as
  anima como animaria `left`/`top` de um elemento HTML.
- `gsap.timeline({ scrollTrigger: { scrub: 1 } })`: a timeline não toca
  sozinha — o progresso dela é controlado diretamente pela posição de
  scroll do `scroller`, com `1` segundo de suavização entre o valor real
  do scroll e o valor aplicado à timeline.
- Dois loops independentes: o `requestAnimationFrame` do Three.js chama
  `renderer.render(scene, camera)` a cada frame, sem saber que o GSAP
  está mudando `camera.position.z` por baixo dele. É só por isso que a
  mudança aparece na tela — sem o loop de render, os valores mudariam
  mas nada seria redesenhado.
- `onUpdate` do ScrollTrigger: usado para sincronizar um terceiro
  sistema (estado React, `activeWaypoint`) com o mesmo progresso que
  move a câmera — três sistemas (Three.js, GSAP, React) lendo o mesmo
  número de formas diferentes.

## Bug encontrado na revisão visual: a câmera não trocava de plano

Ao testar no navegador (2026-08-24), rolar a lista de waypoints não
movia a câmera nem girava o objeto — a cena ficava estática. Causa: a
criação da cena Three.js (que popula `meshRef.current`/`cameraRef.current`)
estava num `useEffect` comum (passivo), enquanto o `useGSAP` que lia
esses refs para montar a timeline roda num `useLayoutEffect`. Layout
effects da árvore inteira rodam **antes** de qualquer effect passivo —
ou seja, no primeiro render, `meshRef.current` e `cameraRef.current`
ainda eram `null` quando o `useGSAP` executava, o `if (!mesh || !camera)
return` interrompia a função, e a timeline/ScrollTrigger nunca era
criada. Como as dependências do `useGSAP` não mudam depois disso, o
problema nunca se corrigia sozinho.

Esse é exatamente o mesmo bug de ordenação já documentado na composição
Lenis + GSAP — só que lá a correção foi ler a instância via um hook
reativo (`useLenis()`). Aqui não existe hook equivalente para "a cena
Three.js está pronta", então a correção foi **consolidar os dois
efeitos em um só**: a cena, a câmera, o mesh e a timeline do GSAP (via
`gsap.context()` direto, não `useGSAP`) são todos criados na mesma
função de efeito, na ordem certa, usando variáveis locais em vez de
refs — eliminando a possibilidade de uma correr antes da outra estar
pronta.

## O que foi aprendido

- Compor GSAP com Three.js não exige nenhuma integração especial — é a
  mesma API de sempre (`gsap.to(objeto, propriedades)`), porque o GSAP
  foi desenhado desde o início para animar propriedades de qualquer
  objeto JavaScript, não só CSS. A "composição" aqui é inteiramente
  sobre organizar responsabilidades (quem desenha vs. quem decide os
  valores), não sobre uma API de integração.
- Igual à Fase 4, todo o experimento é lazy-carregado via
  `next/dynamic(..., { ssr: false })` — a regra de performance do
  projeto para WebGL vale também nas composições, não só nos
  experimentos isolados.

## Limitações observadas

- Sem `pin: true` no ScrollTrigger (evitado aqui por simplicidade dentro
  de um cartão pequeno), a cena 3D e a lista de waypoints ficam lado a
  lado em vez da cena "grudar" na tela enquanto o texto rola por cima —
  um showcase final com scroll de página inteira se beneficiaria de pin.

## Quando usar

- Qualquer cena 3D onde a câmera ou objetos devem reagir à narrativa de
  uma página — GSAP timelines dão controle fino de sequenciamento que um
  cálculo manual de progresso de scroll não ofereceria com a mesma
  facilidade (labels, offsets relativos, eases por segmento).
