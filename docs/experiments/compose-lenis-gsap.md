# Composição — Lenis + GSAP (Scroll Suave Sincronizado)

## Objetivo

No experimento isolado do Lenis (Fase 1), o scroll suave rodava sem
nenhuma animação amarrada a ele. No do GSAP, o ScrollTrigger reagia ao
scroll nativo do navegador. Esta composição faz as duas coisas
coexistirem: o ScrollTrigger passa a animar com base na posição que o
Lenis está interpolando — o problema clássico de integrar duas
bibliotecas que, cada uma, quer "ser dona" do loop de scroll.

## Bibliotecas

`lenis` (via `lenis/react`) + `gsap`/`ScrollTrigger` (via `@gsap/react`).

## Conceitos utilizados

- `options={{ autoRaf: false }}` no `<ReactLenis>`: desliga o loop de
  `requestAnimationFrame` que o Lenis roda sozinho por padrão.
- `gsap.ticker.add((time) => lenis.raf(time * 1000))`: o ticker do GSAP
  (que já está rodando para qualquer animação GSAP na página) assume o
  papel de avançar o Lenis a cada frame. O `* 1000` converte segundos
  (unidade do `gsap.ticker`) para milissegundos (unidade que
  `lenis.raf()` espera).
- `gsap.ticker.lagSmoothing(0)`: desliga a compensação de lag do GSAP
  para esse ticker — necessário porque o Lenis já tem sua própria lógica
  de suavização; as duas competindo produziriam soluços.
- `lenis.on('scroll', ScrollTrigger.update)`: avisa o ScrollTrigger toda
  vez que o Lenis recalcula a posição — sem isso, o ScrollTrigger fica
  esperando o evento de `scroll` nativo, que o Lenis não dispara da
  mesma forma.
- `lenis.rootElement`: propriedade pública que aponta para o elemento
  wrapper — usada como `scroller` do ScrollTrigger, a mesma API de
  scroller customizado já usada no experimento GSAP isolado.

## O que foi aprendido

- A ordem de montagem importa: `<ReactLenis>` cria a instância do Lenis
  dentro de um `useEffect` comum (passivo), enquanto `useGSAP` roda num
  `useLayoutEffect`. Layout effects da árvore inteira rodam antes de
  qualquer effect passivo — ou seja, no primeiro render, a instância do
  Lenis **ainda não existe** quando `useGSAP` executaria se estivesse no
  mesmo componente que declara o `<ReactLenis>`.
- A correção foi mover a lógica GSAP para um componente filho
  (`GsapSync`) que lê a instância via `useLenis()` (hook reativo, que
  atualiza via contexto quando o Lenis termina de montar) em vez de via
  `ref` imperativo. `useGSAP` com `dependencies: [lenis]` só roda de
  verdade quando `lenis` deixa de ser `undefined`.
- `context.add(func)` do GSAP: se a função passada para `useGSAP`
  **retornar uma função**, o GSAP guarda essa função e a chama no
  `revert()` — confirmado lendo `gsap-core.js`
  (`_isFunction(result) && self._r.push(result)`). É assim que o
  `gsap.ticker.remove(update)` do cleanup é garantido de rodar, sem
  precisar de um `useEffect` React separado.

## Limitações observadas

- Essa sincronização assume que só existe **um** ScrollTrigger "dono" do
  loop de rAF por página — se duas instâncias de Lenis coexistissem
  (como nos experimentos isolados da Fase 1, ainda ativos em outras
  rotas), cada uma teria que gerenciar seu próprio `gsap.ticker.add`.

## Quando usar

- Sempre que Lenis e GSAP ScrollTrigger convivem na mesma página — a
  sincronização não é opcional nesse caso, é a única forma de o
  ScrollTrigger acompanhar a posição real e suavizada do scroll.
