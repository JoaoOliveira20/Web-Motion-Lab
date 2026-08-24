# Composição — Swiper + Motion (Legenda Sincronizada ao Slide)

## Objetivo

Mostrar a forma mais simples de composição possível: um número saindo de
uma biblioteca e entrando em outra, sem nenhum acoplamento além disso.

## Bibliotecas

`swiper` (`onSlideChange`) + `motion` (`AnimatePresence`).

## Conceitos utilizados

- `onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}`: o
  único ponto de contato entre as duas bibliotecas. O Swiper não sabe
  que existe uma legenda; a legenda não sabe que existe um Swiper — só
  compartilham um índice.
- `<AnimatePresence mode="wait">` + `key={activeIndex}`: trocar a `key`
  faz a Motion tratar cada legenda como um elemento novo, o que dispara
  `exit` no antigo e `initial`→`animate` no novo. `mode="wait"` garante
  que o antigo termine de sair antes do novo montar — sem isso, as duas
  legendas ficariam sobrepostas brevemente.
- A legenda **não é uma `SwiperSlide`**: vive como um componente
  irmão, fora da árvore de DOM que o Swiper controla — prova de que
  reagir ao estado de um carrossel não exige estar dentro dele.

## O que foi aprendido

- Essa é a composição mais simples das sete: nenhuma das duas
  bibliotecas precisou de configuração especial para conviver — o
  desacoplamento veio de graça porque `onSlideChange` já existia no
  Swiper para exatamente esse propósito (notificar mudanças de estado
  para fora).
- É o padrão mais reutilizável do laboratório até agora: qualquer
  biblioteca com um callback de mudança de estado (Embla também tem,
  via `on('select', ...)` — ver experimento Embla da Fase 3) pode
  alimentar uma legenda/indicador animado da mesma forma.

## Limitações observadas

- `activeIndex` vem de `swiper.activeIndex`, que conta slides
  duplicados quando `loop: true` está ativo (não usado aqui) — nesse
  caso seria necessário `swiper.realIndex` em vez de `activeIndex` para
  a legenda não "pular" índices.

## Quando usar

- Qualquer carrossel/lista onde outro elemento da interface (legenda,
  contador, indicador, breadcrumb) precisa refletir o item ativo sem
  estar fisicamente dentro do componente de carrossel.
