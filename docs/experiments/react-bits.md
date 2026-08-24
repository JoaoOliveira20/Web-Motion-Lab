# Experimento — React Bits (Efeitos de Componente)

## Objetivo

Entender o modelo de distribuição "copiar e adaptar" e comparar duas
técnicas de interação por ponteiro: uma via CSS custom properties puras
(sem biblioteca de animação) e outra via spring physics da Motion.

## Biblioteca

React Bits (`github.com/DavidHDev/react-bits`, MIT + Commons Clause). Sem
instalação — ver `docs/decisions/0002-bibliotecas-de-copia.md` para a
decisão de buscar o código-fonte real e adaptar manualmente em vez de
usar a CLI/registry.

## Componentes adaptados

- **SpotlightCard** (`components/lab/react-bits/spotlight-card.tsx`):
  adaptado de `src/content/Components/SpotlightCard/SpotlightCard.jsx`
  no repositório original. Mudanças: TypeScript, `cn()` do projeto em
  vez de className concatenado, gradiente radial via utilitário
  arbitrário do Tailwind em vez de arquivo `.css` separado, cor padrão
  usando `color-mix(in srgb, var(--accent) 40%, transparent)` em vez de
  um `rgba()` fixo.
- **TiltedCard** (`components/lab/react-bits/tilted-card.tsx`): adaptado
  de `src/content/Components/TiltedCard/TiltedCard.jsx`. Mudanças:
  generalizado para aceitar `children` (conteúdo qualquer) em vez de só
  `imageSrc`, removidas as props de aviso mobile, respeita
  `prefers-reduced-motion` desligando os listeners de ponteiro por
  completo.

## Conceitos utilizados

- Atualização de CSS custom properties via `element.style.setProperty()`
  dentro do handler de `pointermove`, sem passar pelo estado do React —
  evita re-render a cada frame de movimento do mouse.
- `useMotionValue` + `useSpring` (Motion, já usada na Fase 1) para
  interpolar rotação com física de mola em vez de `transition` de CSS.
- `perspective` em CSS para dar profundidade à rotação 3D de
  `rotateX`/`rotateY`.

## O que foi aprendido

- As duas técnicas resolvem "reagir à posição do ponteiro" de formas
  fundamentalmente diferentes: SpotlightCard evita o React por completo
  (mutação direta do DOM), TiltedCard usa o sistema de valores da Motion
  para obter interpolação suave sem re-render também — `useMotionValue`
  não dispara re-render do componente ao mudar.
- `color-mix()` permitiu que o spotlight herdasse o token `--accent` do
  projeto automaticamente em vez de precisar de uma cor hardcoded — o
  efeito já nasce coerente com o tema claro/escuro.
- Sites de documentação "de cópia" como o React Bits são SPAs sem
  conteúdo estático — o código-fonte real só ficou acessível via GitHub,
  não via fetch da página de documentação.

## Limitações observadas

- Ambas as técnicas dependem de eventos de ponteiro (`pointermove`) e não
  têm equivalente natural em touch — em mobile, o efeito simplesmente não
  aparece, o que é aceitável aqui porque nenhuma informação depende dele.
- `TiltedCard` desliga completamente com `prefers-reduced-motion`; não há
  um meio-termo (como reduzir a amplitude) porque a rotação 3D é
  exatamente o tipo de efeito que motion sickness guidelines recomendam
  eliminar, não apenas atenuar.

## Alternativas

Os mesmos efeitos poderiam ser implementados com GSAP (`quickTo` para o
tilt) ou com apenas CSS `:hover` sem JavaScript para uma versão mais
simples do spotlight (gradiente fixo em vez de seguir o ponteiro).

## Quando usar

- Cartões de destaque (feature, produto, link) em número pequeno, onde o
  custo de um listener de pointermove por cartão é aceitável.

## Quando evitar

- Grades com muitos cartões simultâneos — cada `SpotlightCard`/
  `TiltedCard` adiciona um listener de pointermove; em uma grade de
  dezenas de itens isso pode custar mais do que vale visualmente.
