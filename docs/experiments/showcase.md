# Showcase — A peça final da Fase 6

## Objetivo

As Fases 1-5 produziram 16 experimentos isolados e 7 composições, cada
um numa página própria. O showcase (`/showcase`) é a peça que faltava:
uma narrativa de rolagem única, editorial, que resume o laboratório sem
duplicar nenhum experimento — reaproveitando componentes já testados em
vez de recriá-los.

## Bibliotecas

`typed.js` (headline), `rough-notation` (destaque de tese), `gsap` +
`@gsap/react` (revelação de seções ao rolar) e, reaproveitado sem
alteração, o par `three` + `gsap` da composição Fase 5
(`LazyScrollCameraScene`). Nenhuma biblioteca nova foi adicionada.

## Decisões de arquitetura

- **Sem Lenis na página inteira.** Envolver o layout inteiro (header +
  footer + conteúdo) num `ReactLenis` exigiria alterar o layout raiz
  compartilhado por todas as rotas — risco desproporcional para uma
  única página. O showcase usa o scroll nativo do documento, o mesmo
  `scroll-behavior: smooth` já global no projeto.
- **ScrollTrigger sem `scroller` customizado.** Todas as demonstrações
  de ScrollTrigger das Fases 1 e 5 usam um contêiner próprio
  (`overflow-y-auto`) como `scroller`. Aqui, `scroller` fica no valor
  padrão (a janela/documento) — o padrão mais comum de uso real de
  ScrollTrigger, e que nunca tinha sido demonstrado no laboratório.
  Como `trigger` (a seção) e `scroller` (a janela) nunca são o mesmo
  elemento, o bug de auto-referência documentado em
  `compose-gsap-three.md` não se aplica aqui.
- **A cena 3D é importada, não recriada.** `LazyScrollCameraScene` é o
  componente exato da composição GSAP + Three.js (Fase 5), com seu
  próprio scroller interno contido — reaproveitado como está, sem
  nenhuma modificação, para provar que a composição funciona fora do
  contexto onde foi construída.
- **`Marquee` (Magic UI, Fase 2) reaproveitado como está** para o reel
  de bibliotecas — é um componente puro (sem estado, sem hooks),
  renderizado inteiramente no servidor.

## Acessibilidade

- Toda animação (`RevealOnScroll`, `ShowcaseHero`, `ShowcaseThesis`)
  verifica `prefers-reduced-motion` via `useReducedMotion()` e pula a
  transição quando o usuário pede menos movimento — o conteúdo
  permanece visível e legível, só a entrada anima diferente.
- Hierarquia semântica: um único `h1` na página (`ShowcaseHero`),
  `h2` por seção subsequente.
- `LazyScrollCameraScene`, reaproveitada, já respeita
  `prefers-reduced-motion` (posição fixa de câmera em vez de timeline).

## O que foi aprendido

- Compor uma "peça final" não exigiu nenhuma biblioteca nova nem
  nenhum componente de experimento reescrito — só orquestração. Isso
  confirma, na prática, a promessa da Fase 5: os padrões de integração
  descobertos lá (timeline controlada por scroll, `Marquee` como
  primitivo puro) generalizam para fora do contexto onde nasceram.
- Usar `scroller` no valor padrão do ScrollTrigger (documento) em vez
  de um contêiner customizado eliminou de saída a classe de bug
  encontrada na composição GSAP + Three.js — vale considerar como
  primeira escolha em qualquer ScrollTrigger futuro que não precise de
  um scroller isolado.

## Limitações observadas

- Sem `pin`: a cena 3D não gruda na tela enquanto o texto rola por
  cima, ela só aparece e sai como qualquer outra seção. Pin exigiria
  reservar altura extra de scroll e testar cuidadosamente contra o
  header `sticky` do site — não fazia sentido arriscar sem validação
  visual disponível nesta sessão.
- Validação visual real (mobile, teclado, contraste, comportamento do
  Typed.js e do Rough Notation no navegador) ainda não foi feita nesta
  sessão — a extensão do Chrome não conectou. `tsc`, `lint`, `build` de
  produção e checagem HTTP de todas as rotas via `next dev` passaram
  sem erros, mas isso verifica compilação e ausência de erro de
  servidor, não comportamento visual.

## Quando usar este padrão

- Quando o objetivo é uma página de destino/portfólio que resuma um
  conjunto maior de trabalho sem duplicar código — reaproveitar
  componentes prontos como blocos de uma narrativa nova é mais barato
  e mais confiável do que reconstruir versões "resumidas" deles.
