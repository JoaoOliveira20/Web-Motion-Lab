# Aprendizados — Fase 6 (fechamento)

`docs/PROJECT_PLAN.md` definiu, antes de qualquer código, o que o
laboratório deveria deixar claro ao terminar. Este documento responde
a cada ponto, com base no que os 16 experimentos e as 7 composições
realmente mostraram — não no que era esperado teoricamente. Detalhes
completos de cada decisão estão em `docs/experiments/*.md`.

## Qual biblioteca escolher para cada problema

| Problema | Escolha | Por quê |
| --- | --- | --- |
| Microinteração de componente (hover, abrir/fechar) | Motion | Já integrada ao ciclo de vida do React; menos código que GSAP para o mesmo resultado. |
| Timeline com muitos elementos e timing relativo | GSAP | `gsap.timeline()` + `ScrollTrigger` cobre coreografia que Motion resolveria com mais gambiarra de estado. |
| Scroll com inércia como identidade visual | Lenis | Ver `docs/experiments/lenis.md`. |
| Fundo decorativo genérico | Vanta ou tsParticles | Camada de conveniência sobre Three.js/Canvas — menos código, menos controle. |
| Cena 3D com lógica/interação específica | Three.js puro | Vanta e Spline atrapalham quando a cena foge do que a camada de conveniência cobre. |
| Cena 3D desenhada visualmente por um designer | Spline | Depende de aceitar uma cena hospedada externamente (`prod.spline.design`). |
| Carrossel com efeitos prontos (cards, coverflow) | Swiper | Módulos cobrem o caso sem CSS customizado. |
| Carrossel com design muito específico | Embla | Primitivas de baixo nível, sem peso de módulos não usados. |
| Texto digitado / anotação manuscrita | Typed.js / Rough Notation | Uso pontual, baixa complexidade, efeito específico que nenhuma das bibliotecas de animação genéricas replica bem. |

## GSAP vs. Motion

Não existe vencedor absoluto — são dois modelos mentais diferentes.
Motion é declarativo e vive dentro do ciclo de vida de componentes
(`AnimatePresence`, `variants`); GSAP é imperativo e vive fora dele
(`gsap.timeline()`, `ScrollTrigger`). A composição Lenis + GSAP e o
showcase mostraram o ponto prático: GSAP entrega mais controle sobre
*quando* e *como* algo acontece no scroll; Motion entrega menos código
para *o que* acontece quando um componente monta, desmonta ou reage a
gesture. Ver `docs/experiments/motion.md` e `docs/experiments/gsap.md`.

## Quando usar Lenis

Só quando a inércia do scroll é uma decisão de identidade visual
deliberada, ou como base de um valor de progresso suavizado para outras
animações (`docs/experiments/lenis.md`). Nunca em sites de
conteúdo/leitura, onde scroll previsível importa mais que efeito.

## Quando Three.js é necessário

Quando a cena precisa de geometria, câmera ou interação que nenhuma
biblioteca de conveniência cobre — ou quando o objetivo é entender o
que Vanta/Spline escondem por baixo. A composição GSAP + Three.js e o
showcase reaproveitando-a são o exemplo mais completo disso no
laboratório: GSAP não sabe que está animando uma câmera 3D, só vê
propriedades numéricas.

## Quando Spline é suficiente

Quando há uma cena desenhada visualmente (por um designer ou pelo
próprio time) e o código só precisa reagir a eventos ou mover objetos
já definidos no editor — aceitando a dependência de uma cena hospedada
externamente. `@splinetool/runtime` também exigiu fixar a versão em
`1.12.98` por um bug real de empacotamento na 2.x
(`docs/decisions/0003-spline-runtime-pin.md`) — vale checar o changelog
antes de atualizar essa dependência no futuro.

## Quando um componente pronto deve ser evitado

Quando o design final é específico o suficiente para que adaptar o
componente pronto exija mais sobrescrita de CSS/comportamento do que
construir do zero sobre primitivas — o mesmo raciocínio comparado entre
Swiper/Embla se aplica às bibliotecas "de cópia" da Fase 2 (React Bits,
Motion Primitives, Magic UI, Aceternity): nenhuma delas é pacote npm,
todas exigem ler e adaptar o código-fonte, então o "custo de ter" já é
mais alto que uma dependência instalada — só compensa quando o
componente economiza tempo real de implementação visual.

## Diferenças entre Swiper e Embla

Swiper resolve com módulos prontos (Navigation, Pagination, EffectCards)
sem escrever CSS/JS customizado, ao custo de bundle maior e menos
controle fino. Embla dá controle total construindo sobre primitivas de
baixo nível, ao custo de escrever setas, pontos e qualquer efeito à mão.
Ver `docs/experiments/swiper.md` e `docs/experiments/embla.md`.

## Impactos de animação no desempenho

- WebGL/Canvas (Three.js, Vanta, tsParticles, Spline) só carrega via
  `next/dynamic(..., { ssr: false })` — nenhum desses pacotes entra no
  bundle inicial de nenhuma rota que não os usa.
- `fullScreen.enable` do tsParticles é `true` por padrão — sem
  `fullScreen: { enable: false }` explícito, o Canvas vaza para a
  viewport inteira em vez de ficar confinado ao contêiner.
- Toda animação do laboratório verifica `prefers-reduced-motion` via
  `useReducedMotion()` — reduzir/desativar motion nunca depende de o
  usuário mudar configuração dentro do site.
- O bug mais recorrente do laboratório (apareceu em duas composições
  distintas — Lenis + GSAP e GSAP + Three.js) não foi de biblioteca, foi
  de **ordem de execução do React**: popular um `ref` num `useEffect`
  passivo para consumi-lo num `useGSAP`/`useLayoutEffect` falha
  silenciosamente, porque layout effects da árvore inteira rodam antes
  de qualquer effect passivo. A correção nos dois casos foi consolidar
  criação de estado e setup do GSAP num único efeito.

## Como integrar bibliotecas client-side ao modelo Server/Client do Next.js

Todo componente que usa hooks de biblioteca, canvas/WebGL ou APIs do
navegador é `"use client"` e, quando pesado (Three.js, Vanta, Spline,
tsParticles), entra na árvore via `next/dynamic(..., { ssr: false })` a
partir de uma página que continua Server Component. Nenhuma página do
laboratório precisou virar Client Component inteira por causa de um
único widget animado — o padrão sempre foi isolar o widget, não a
página.

## O padrão que mais valeu a pena repetir

Reaproveitar em vez de recriar. O showcase (`/showcase`, Fase 6) importa
`LazyScrollCameraScene` da composição GSAP + Three.js e o `Marquee` da
Fase 2 sem alterar uma linha de nenhum dos dois — a prova de que os
componentes construídos nas fases anteriores eram, de fato,
reutilizáveis, e não demos de uso único.
