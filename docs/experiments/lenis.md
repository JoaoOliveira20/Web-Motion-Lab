# Experimento — Lenis (Scroll Suave)

## Objetivo

Entender o que Lenis faz de fato — interpolar o valor de scroll ao longo
do tempo — e como isolar esse comportamento em um contêiner específico
antes de considerar aplicá-lo à página inteira (o que só acontece na Fase
5, em composição com GSAP).

## Biblioteca

`lenis`, usando o subpath `lenis/react` (`ReactLenis`, `useLenis`), que
substitui o antigo pacote separado `@studio-freight/react-lenis` — hoje
consolidado dentro do próprio `lenis`.

## Conceitos utilizados

- `<ReactLenis root={false}>`: em vez de controlar `window`, cria seu
  próprio par `wrapper`/`content` e assume o scroll só dentro deles.
  Isso é o que permite manter o experimento isolado.
- `useLenis(callback)`: assina o evento de scroll e dá acesso à instância
  (`lenis.progress`, `lenis.isScrolling`) a partir de qualquer componente
  descendente do provider.
- `lenis.scrollTo(seletor, { offset })`: navegação programática suave,
  usada nos botões de atalho para as seções A/B/C.
- `position: sticky` dentro do próprio contêiner com scroll: como
  `useLenis` só funciona dentro da árvore React do provider, os controles
  precisam estar dentro dele — `sticky` os mantém visíveis mesmo assim.

## O que foi aprendido

- Lenis não define `overflow` no wrapper sozinho: é responsabilidade do
  CSS da aplicação (`h-56 overflow-y-auto` neste experimento). Sem isso,
  o Lenis não detecta a área como rolável.
- Cada `<ReactLenis>` não-root cria uma instância independente. Colocar
  controles de `scrollTo` fora do provider que envolve o conteúdo alvo
  resulta em duas instâncias desconectadas — o `scrollTo` não teria
  nenhum efeito. Os controles precisam estar dentro do mesmo provider.
- Para um leitor de tela ou usuário com `prefers-reduced-motion`, a
  interpolação de scroll pode causar desconforto (efeito de inércia é uma
  forma de parallax). A decisão aqui foi desligar o Lenis por completo
  nesse caso, não apenas encurtar a duração — o fallback é rolagem nativa
  simples.

## Limitações observadas

- Por padrão, `autoRaf: true` já cuida do loop de `requestAnimationFrame`
  — bom para uso isolado, mas em composição com GSAP (Fase 5) esse loop
  precisa ser desligado e sincronizado manualmente com `gsap.ticker` para
  evitar dois loops de RAF competindo.
- `useLenis` dispara o callback a cada frame de scroll; callbacks pesados
  (como no `ProgressReadout`) precisam ficar baratos o suficiente para
  não competir com a interpolação em si.

## Alternativas

Scroll nativo com `scroll-behavior: smooth` do CSS resolve casos simples
de âncora sem nenhuma dependência, mas não oferece o efeito de inércia
contínua nem uma API de progresso (`lenis.progress`) para amarrar outras
animações ao scroll.

## Quando usar

- Quando o efeito de inércia no scroll é parte deliberada da identidade
  visual do produto.
- Como base de sincronização para animações ligadas ao scroll (GSAP
  ScrollTrigger, Motion `useScroll`) que precisam de um valor de
  progresso suavizado.

## Quando evitar

- Sites de conteúdo/leitura, onde scroll instantâneo e prevísivel é mais
  importante que qualquer efeito visual.
- Quando acessibilidade a movimento é prioridade e não há orçamento para
  implementar o fallback de `prefers-reduced-motion` corretamente.
