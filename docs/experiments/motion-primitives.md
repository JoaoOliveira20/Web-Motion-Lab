# Experimento — Motion Primitives (Padrões Reutilizáveis)

## Objetivo

Comparar uma biblioteca "de cópia" que já nasce em TypeScript e já usa a
Motion (nossa biblioteca da Fase 1) com o React Bits, que exigiu tradução
de JSX solto para TypeScript. E entender dois primitivos genuinamente
reutilizáveis: um botão magnético e um wrapper de revelação por
viewport.

## Biblioteca

Motion Primitives (`github.com/ibelick/motion-primitives`, MIT). Sem
instalação — mesma decisão de `docs/decisions/0002-bibliotecas-de-copia.md`.
Diferente do React Bits, o repositório expõe o código já em `.tsx`.

## Componentes adaptados

- **Magnetic** (`components/lab/motion-primitives/magnetic.tsx`):
  adaptado de `components/core/magnetic.tsx`. Mudança principal: removida
  a prop `actionArea` ('self' | 'parent' | 'global') — o experimento só
  precisa do modo `'self'`, e manter as três ramificações teria sido
  código morto sem uso real no laboratório.
- **InView** (`components/lab/motion-primitives/in-view.tsx`): adaptado
  de `components/core/in-view.tsx`. Simplificação: o original mantém um
  estado `isViewed` manual só para não reverter a animação depois de
  `once`; isso já é exatamente o que a opção `viewOptions.once` do
  próprio `useInView` faz — o estado extra era redundante. Também removi
  a prop `as` (elemento polimórfico via `motion[as]`), sem uso aqui.

## Conceitos utilizados

- `document.addEventListener('mousemove', ...)` global, com o cálculo de
  distância feito a cada movimento do mouse na página inteira — só reage
  quando `isHovered` é verdadeiro, mas o listener em si nunca é removido
  enquanto o componente existe.
- `useInView(ref, options)`: hook nativo da Motion que encapsula
  `IntersectionObserver`, com `margin` no mesmo formato de
  `rootMargin` do CSS (`"-10%"` antecipa a revelação).
- Física de mola (`useSpring`) aplicada à distância entre ponteiro e
  centro do elemento, com `scale` proporcional à distância — quanto mais
  perto da borda do `range`, menor o deslocamento.

## O que foi aprendido

- Bibliotecas de cópia variam muito em "prontidão": Motion Primitives já
  usa a mesma stack do projeto (TS + Motion), então adaptar foi mais
  sobre remover excesso de flexibilidade do que traduzir linguagem.
- Um componente com generalidade demais (como o `Magnetic` original com
  três `actionArea`) pode ser pior para aprendizado do que uma versão
  enxuta — a versão com uma responsabilidade só deixa mais claro o que
  o efeito realmente faz.
- `useInView` com `once: true` é suficiente para a maioria dos casos de
  "revelar uma vez e não repetir" — não precisa de estado adicional no
  componente que o usa.

## Limitações observadas

- O listener de `mousemove` do `Magnetic` roda no `document` inteiro
  mesmo quando o cursor está longe do elemento — barato para 1-3
  instâncias, mas escalaria mal com muitas ao mesmo tempo (mesma
  ressalva do experimento React Bits).
- `useInView` depende de layout estável; conteúdo que muda de altura
  depois da montagem pode disparar a revelação cedo ou tarde demais.

## Alternativas

Para o magnetismo, GSAP `Draggable`/`quickTo` resolveria o mesmo efeito
de forma imperativa. Para revelação por viewport, `IntersectionObserver`
puro (como no experimento Rough Notation) evita a dependência da Motion
inteira quando só se precisa de um booleano de visibilidade.

## Quando usar

- `Magnetic`: call-to-actions isolados onde um pequeno "puxão" reforça a
  interatividade sem exigir clique.
- `InView`: revelação de conteúdo em listas/seções onde a Motion já está
  presente na página por outro motivo.

## Quando evitar

- `InView` em páginas que não usam Motion para mais nada — nesse caso, o
  padrão do experimento Rough Notation (IntersectionObserver puro) evita
  carregar a biblioteca só para isso.
