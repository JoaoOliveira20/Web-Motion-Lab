# Experimento — Three.js (Cena WebGL Programável)

## Objetivo

Fechar a comparação com o Vanta: a mesma camada de baixo nível (WebGL
via Three.js), sem nenhuma abstração — cada objeto da cena, o loop de
render e a limpeza de memória escritos à mão.

## Biblioteca

`three` 0.185. Sem `OrbitControls` (`three/examples/jsm/controls/`):
nem `@types/three` nem o pacote `three` publicam tipos para os módulos
de `examples/jsm` (só a API core tem tipos oficiais) — em vez de
importar sem tipo (`any` implícito) ou escrever mais um `.d.ts` local
como fiz para o Vanta, optei por implementar a interação de câmera à
mão com `pointermove`, o que também deixa mais explícito o que estava
acontecendo por trás da conveniência de uma lib de controles.

## Componentes construídos

- **WireframeScene**: um icosaedro em wireframe com auto-rotação
  contínua — a cena mais simples possível que ainda exercita o ciclo
  completo (geometria, material, mesh, loop, resize, dispose).
- **PointWaveScene**: uma grade de `THREE.Points` (32×32) com
  deslocamento de altura por seno/cosseno recalculado a cada frame
  direto no `Float32Array` da geometria, mais uma câmera que segue a
  posição do ponteiro com interpolação (`lerp` manual).

## Conceitos utilizados

- `Scene`, `PerspectiveCamera`, `WebGLRenderer`: nenhum é criado
  implicitamente — cada cena os instancia explicitamente, ao contrário
  do Vanta, que os esconde dentro da classe de efeito.
- `requestAnimationFrame` com `cancelAnimationFrame` no cleanup: sem
  isso, o loop de render continua rodando indefinidamente após o
  componente desmontar, consumindo GPU e CPU sem necessidade.
- `ResizeObserver` no contêiner (não em `window`): atualiza
  `camera.aspect` e `renderer.setSize()` quando o próprio elemento muda
  de tamanho, incluindo mudanças de layout que não vêm de resize da
  janela (ex: mudança de breakpoint dentro de um grid).
- `geometry.dispose()`, `material.dispose()`, `renderer.dispose()`:
  três limpezas independentes — nenhuma delas libera as outras
  automaticamente.
- `BufferAttribute.setY()` + `needsUpdate = true`: a forma direta de
  mutar posições de vértice existentes sem recriar a geometria a cada
  frame.

## O que foi aprendido

- Todo objeto pesado do Three.js (geometria, material, renderer,
  texturas) tem seu próprio ciclo de vida e seu próprio `.dispose()` —
  bibliotecas de conveniência como o Vanta escondem essa contabilidade
  inteira atrás de um único `effect.destroy()`.
- `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))` é um
  detalhe fácil de esquecer e caro de esquecer: sem o teto em 2,
  telas com `devicePixelRatio` de 3 (comum em alguns Android) rendeririam
  9x mais pixels do que o necessário por frame.
- Câmera seguindo o ponteiro com `lerp` manual
  (`camera.position.x += (alvo - atual) * fator`) é a mesma ideia de
  interpolação usada em `useSpring` da Motion (Fase 1/2) e no scroll
  suave do Lenis — só que implementada à mão, sem biblioteca.

## Limitações observadas

- Sem `OrbitControls`, não há zoom nem rotação livre por arraste nos
  experimentos — só o parallax de câmera do segundo demo. Para uma cena
  que realmente precise de controles de câmera completos, valeria a
  pena investigar tipos da comunidade ou aceitar `any` pontualmente.
- Cada cena cria seu próprio `WebGLRenderer`; múltiplas cenas na mesma
  página (como aqui, duas) significam múltiplos contextos WebGL — a
  maioria dos navegadores limita quantos contextos WebGL simultâneos
  uma página pode ter.

## Alternativas

Ver `docs/experiments/vanta.md` para o mesmo problema resolvido com uma
camada de conveniência pronta.

## Quando usar

- Quando a cena precisa de geometria, interação ou lógica que nenhuma
  biblioteca de conveniência cobre — ou quando o objetivo é aprender o
  que está de fato acontecendo por baixo dessas bibliotecas.

## Quando evitar

- Protótipos rápidos de fundo decorativo, onde Vanta entrega o mesmo
  resultado visual com uma fração do código e sem precisar gerenciar
  ciclo de vida manualmente.
