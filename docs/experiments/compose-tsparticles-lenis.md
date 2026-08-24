# Composição — tsParticles + Lenis (Partículas com Parallax de Scroll)

## Objetivo

Duas bibliotecas que não têm nenhuma noção uma da outra — tsParticles
não sabe o que é scroll, Lenis não sabe o que é uma partícula — compostas
através de uma camada de sincronização escrita inteiramente por fora
das duas.

## Bibliotecas

`@tsparticles/react` (via o mesmo `TsParticlesEngineProvider` do
experimento isolado) + `lenis` (via `useLenis`).

## Conceitos utilizados

- Duas camadas de DOM sobrepostas: um contêiner `absolute inset-0`
  atrás com as partículas, e o `<ReactLenis>` (com o conteúdo real) na
  frente, com `position: relative` e `z-10`.
- `useLenis((lenis) => { ... })`: o callback roda a cada evento de
  scroll do Lenis. Lê `lenis.scroll` (getter público, posição já
  interpolada em pixels) e escreve diretamente
  `layer.style.transform = translateY(...)` na camada de partículas —
  mutação de DOM direta via ref, sem passar por estado do React (mesmo
  motivo de performance do `SpotlightCard` na Fase 2: isso rodaria a
  cada frame de scroll).
- Fator `0.4`: a camada de partículas se move a 40% da velocidade do
  conteúdo — a definição de parallax é exatamente essa diferença de
  velocidade entre camadas.

## Um cuidado que quase virou bug: `ParticlesProvider` é um singleton

O `ParticlesProvider` do `@tsparticles/react` guarda a promise de
inicialização do engine numa variável de módulo compartilhada
por **toda a aplicação** (não por componente) — e lança um erro
("ParticlesProvider init callback must be stable across the app
lifecycle") se a função `init` recebida for diferente da primeira usada.
Escrever uma segunda função `initEngine` local para esta composição
(mesmo chamando `loadSlim` exatamente igual à do experimento isolado)
teria dois `initEngine` com identidades de função diferentes — e
quebraria ao navegar entre `/lab/tsparticles` e esta página numa mesma
sessão SPA. Corrigido reaproveitando `TsParticlesEngineProvider`
(`components/lab/tsparticles/particles-provider.tsx`) diretamente, em
vez de duplicar.

## O que foi aprendido

- Sincronizar duas bibliotecas às vezes não exige nenhuma API de
  integração — só um observador de uma escrevendo no DOM que a outra
  desenha. É o mesmo padrão do `useCssVariable` (Fase 4): ler de um
  lugar, aplicar em outro, sem que nenhuma biblioteca precise saber.
- Reaproveitar o provider existente em vez de duplicar não foi só
  DRY — era estruturalmente necessário por causa do singleton do
  `ParticlesProvider`, uma restrição real da biblioteca.

## Limitações observadas

- O `translateY` na camada de partículas é aplicado via mutação direta
  de `style`, fora do ciclo do React — se outro código também escrever
  `style.transform` nesse mesmo elemento, os dois vão brigar
  silenciosamente.

## Quando usar

- Qualquer fundo decorativo que deveria se mover em velocidade diferente
  do conteúdo em primeiro plano — parallax clássico, aqui construído com
  posição de scroll real (via Lenis) em vez de `IntersectionObserver` ou
  `scroll` nativo.
