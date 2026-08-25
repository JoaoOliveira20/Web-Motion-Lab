# Composição — Lenis + Three.js (Câmera por Scroll Direto)

## Objetivo

A composição GSAP + Three.js (Fase 5) usa `gsap.timeline().progress()`
como intermediário entre o scroll e a câmera 3D. Esta composição existe
pra responder uma pergunta que aquela não respondeu: **o intermediário
era necessário?** Aqui, `lenis.progress` move `camera.position` e
`mesh.rotation` diretamente — sem timeline, sem tween, sem
ScrollTrigger.

## Bibliotecas

`lenis` (via `lenis/react`) + `three`. Nenhum GSAP.

## Conceitos utilizados

- `lenis.progress`: getter da própria instância do Lenis — o progresso
  de scroll relativo ao limite do contêiner, já normalizado entre `0` e
  `1`. Substitui o cálculo manual
  `scrollTop / (scrollHeight - clientHeight)` que a composição GSAP +
  Three.js precisou fazer sozinha (o Lenis já mede isso).
- `lenis.on("scroll", callback)`: o callback recebe a própria instância
  do Lenis a cada frame interpolado — dispensa qualquer engine de
  animação para simplesmente "reagir a um valor que muda". Retorna uma
  função de unsubscribe, usada no cleanup do efeito.
- `ReactLenis root={false}`: mesmo padrão contido (não a página
  inteira) já usado na composição Lenis + GSAP — o scroller é uma `div`
  interna, não o `document`.
- Dois sistemas independentes: o `requestAnimationFrame` do Three.js só
  desenha (`renderer.render`); o callback do Lenis só muda valores.
  Igual à composição GSAP + Three.js — só troca quem fornece o valor.

## Resposta à pergunta do objetivo

Para este caso específico (mover uma câmera com um valor de 0 a 1),
**não, o GSAP não era estritamente necessário**. `lenis.progress` já
entrega o mesmo número que a composição anterior calculava manualmente,
e escrever `camera.position.z = 6 - progress * 3` é tão direto quanto
configurar uma timeline. O código aqui é mais curto e tem uma classe de
bug a menos — não existe risco de trigger/scroller auto-referenciado
porque não existe `ScrollTrigger` nenhum.

Onde o GSAP continuaria a valer a pena, mesmo para este caso:

- **Suavização (`scrub`)**: aqui o movimento da câmera segue o scroll
  1:1. A composição GSAP + Three.js tinha o mesmo problema depois da
  correção (perdeu o `scrub` ao abandonar `ScrollTrigger`) — então essa
  diferença não é exclusiva do GSAP, mas ele oferece esse recurso
  pronto (`scrub: true`), enquanto aqui exigiria interpolar
  manualmente (`lerp`) entre o valor antigo e o novo a cada callback.
- **Coreografia com múltiplos alvos e tempos relativos**: um único
  valor de progresso movendo uma única propriedade é o caso mais
  simples possível. Assim que a cena precisar de vários elementos
  entrando/saindo em momentos diferentes da rolagem (como a composição
  Rough Notation + GSAP), uma timeline volta a valer o código extra.

## O que foi aprendido

- "Duas bibliotecas resolvem scroll-driven animation, quando usar
  qual" tem uma resposta mais afiada depois desta composição: GSAP
  ganha quando existe *orquestração* (vários alvos, tempos relativos,
  pin, scrub pronto); um valor de progresso vindo direto de
  `lenis.progress` ganha quando existe só *um* valor movendo *uma*
  coisa.
- Reaproveitar a mesma geometria/render loop da composição GSAP +
  Three.js (torus knot em wireframe, mesmo `ResizeObserver`, mesmo
  padrão de cleanup) e trocar só a fonte do valor de progresso deixou
  bem visível, lado a lado, qual parte do código muda entre as duas
  abordagens e qual parte é sempre a mesma (a cena 3D em si).

## Limitações observadas

- Sem suavização: o movimento da câmera acompanha o scroll sem nenhum
  atraso amortecido — ver "Resposta à pergunta do objetivo" acima.
- `lenis.progress` é relativo ao contêiner do próprio `ReactLenis`
  (`root={false}`), não à página inteira — para controlar uma cena a
  partir do scroll do documento inteiro, o mesmo valor estaria
  disponível trocando para `root={true}` (ou omitindo `root`).

## Quando usar

- Quando um valor de progresso de scroll (0 a 1) precisa mover uma
  única propriedade (ou um pequeno grupo delas, todas em função do
  mesmo valor) e não há necessidade de coreografia entre múltiplos
  elementos — ler `lenis.progress` direto é mais simples do que montar
  uma timeline só para isso.

## Alternativas

Ver `docs/experiments/compose-gsap-three.md` para a mesma cena 3D
controlada por uma timeline do GSAP em vez do valor direto do Lenis.
