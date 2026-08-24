# Composição — Lottie + Motion (Ícone Reativo a Gestures)

## Objetivo

Trocar o gatilho do controle imperativo do Lottie: no experimento
isolado (Fase 3), era um clique de botão; aqui é um gesture de ponteiro
capturado pela Motion.

## Bibliotecas

`motion` (`onHoverStart`/`onHoverEnd`/`whileHover`/`whileTap`) + `lottie-react`
(`lottieRef`).

## Conceitos utilizados

- `onHoverStart`/`onHoverEnd`: callbacks de gesture da Motion,
  independentes de `whileHover` — `whileHover` só descreve um estado
  visual (`scale`), os callbacks disparam efeitos colaterais
  (`lottieRef.current?.play()`).
- Dois motores de animação no mesmo elemento: a Motion anima o `scale`
  do `motion.div` via WAAPI; o Lottie anima os quadros do SVG por dentro
  dele. Nenhum interfere no outro porque animam propriedades diferentes
  em elementos diferentes (o wrapper vs. o SVG interno).

## O que foi aprendido

- `whileHover` sozinho não seria suficiente aqui — ele só produz uma
  animação declarativa de estado, não um ponto de código onde chamar
  `lottieRef.current?.play()`. Foi necessário o par
  `onHoverStart`/`onHoverEnd`, que existe exatamente para efeitos
  colaterais imperativos disparados por gesture.
- Diferente da maioria das composições anteriores (onde uma biblioteca
  alimenta um valor que a outra consome), aqui a Motion **comanda**
  diretamente a API do Lottie — mais parecido com o padrão de controle
  remoto (`lottieRef`) já usado no experimento Lottie isolado, só que
  content agora vem de um gesture em vez de `onClick`.

## Limitações observadas

- `onHoverEnd` não dispara em touch (não existe "sair do hover" em
  telas sensíveis ao toque) — em mobile, o ícone tocaria e nunca
  pausaria sozinho até outro toque acontecer em outro lugar.

## Quando usar

- Ícones ou ilustrações pequenas onde o hover deve comunicar
  "interativo" através de duas camadas de movimento (escala do
  container + animação do conteúdo), sem que uma precise saber da
  implementação da outra.
