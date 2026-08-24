# Decisão 0003 — Fixar @splinetool/runtime em 1.12.98

## Contexto

`@splinetool/runtime@2.0.5` (latest no momento) quebra `next build` com
Turbopack e com Webpack: o `DRACOLoader` embutido referencia arquivos
`libs/draco/draco_decoder.wasm`, `draco_wasm_wrapper.js` etc. via
`new URL(caminho, import.meta.url)` — caminhos que não existem no pacote
publicado no npm. Confirmado como bug conhecido em
[`splinetool/react-spline#239`](https://github.com/splinetool/react-spline/issues/239),
aberta e sem correção no momento desta decisão.

## Decisão

Fixar `@splinetool/runtime` em `1.12.98` (última versão da série 1.x,
anterior à reescrita que introduziu essas referências quebradas). Essa
versão não referencia arquivos DRACO — build limpo com Turbopack e
Webpack. `@splinetool/react-spline` declara
`peerDependencies: { "@splinetool/runtime": "*" }`, então não há
conflito de versões entre os dois pacotes.

## Impacto

O experimento Spline (`docs/experiments/spline.md`) não tem acesso a
recursos adicionados na série 2.x do runtime (não investigados, já que
não eram necessários para o experimento). Revisitar esta decisão quando
a issue #239 for corrigida upstream — nesse momento, tentar atualizar
para a versão mais recente e remover o pin.
