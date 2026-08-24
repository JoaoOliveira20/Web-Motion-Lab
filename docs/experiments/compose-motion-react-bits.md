# Composição — Motion + React Bits (Galeria Filtrável)

## Objetivo

Mostrar que os experimentos anteriores não são descartáveis: o
`SpotlightCard` construído na Fase 2 é reaproveitado aqui sem nenhuma
modificação, só importado — e ganha uma camada de animação de
entrada/saída da Motion (Fase 1) que ele nunca teve sozinho.

## Bibliotecas

`motion` (`AnimatePresence`, `layout`) + o componente `SpotlightCard` do
experimento React Bits (`components/lab/react-bits/spotlight-card.tsx`).

## Conceitos utilizados

- `<AnimatePresence mode="popLayout">`: ao trocar o filtro, os cartões
  que saem do critério são animados para fora antes de sumir do DOM;
  `popLayout` tira o item do fluxo de layout assim que a saída começa,
  para os cartões restantes já se reorganizarem em vez de esperar a
  animação de saída terminar.
- `layout` no `motion.div`: anima a mudança de posição dos cartões que
  permanecem visíveis quando a grade reflui (de 8 para 2 itens, por
  exemplo).
- Duas camadas de interação independentes: a Motion anima
  entrada/saída/posição do `motion.div` que **envolve** o cartão; o
  próprio `SpotlightCard` continua reagindo ao `pointermove` internamente
  via CSS custom properties, exatamente como no experimento original —
  nenhum dos dois sabe da existência do outro.

## O que foi aprendido

- Compor não exigiu nenhuma mudança no `SpotlightCard` original — a
  prova de que ele foi bem desenhado na Fase 2 (children genérico, sem
  estado próprio de visibilidade) é conseguir encaixá-lo aqui sem abrir
  o arquivo.
- `mode="popLayout"` existe especificamente para este caso (filtro que
  muda a lista de itens visíveis); o modo padrão do `AnimatePresence`
  (`"sync"`) esperaria a animação de saída terminar antes de mover os
  itens restantes, criando um instante de layout "furado".

## Limitações observadas

- Com muitos itens simultâneos, cada `SpotlightCard` mantém seu próprio
  listener de `pointermove` (mesma ressalva já documentada no
  experimento React Bits original) — a composição com Motion não muda
  esse custo, só adiciona a orquestração de entrada/saída por cima.

## Quando usar

- Qualquer grade filtrável/reordenável onde os itens já são componentes
  interativos por conta própria — a composição prova que animação de
  lista (Motion) e interação de item (React Bits) são preocupações
  ortogonais, que não precisam ser resolvidas pela mesma biblioteca.
