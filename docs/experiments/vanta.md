# Experimento — Vanta (Background WebGL)

## Objetivo

Entender Vanta como camada de conveniência sobre Three.js — cenas
prontas, configuráveis por algumas dezenas de opções, em troca de
abrir mão do controle fino que o Three.js puro oferece (comparação
completa no próximo experimento, `docs/experiments/three.md`).

## Biblioteca

`vanta` 0.5.24 + `three` 0.185 (peer real, não declarado no
`package.json` do Vanta — descoberto lendo o código-fonte).

## Vanta não é uma biblioteca TypeScript

Não existe `@types/vanta` no npm, e o pacote não publica `.d.ts`
próprios. Os tipos usados aqui foram escritos à mão em `types/vanta.d.ts`,
cobrindo só os dois efeitos usados (`NET`, `DOTS`) — não a biblioteca
inteira, para não inventar tipagem de opções nunca testadas.

## Como o Three.js é injetado

Lendo `node_modules/vanta/src/vanta.waves.js` (e os outros efeitos):

```js
let THREE = (typeof window == 'object' && window.THREE)
constructor(userOptions) {
  THREE = userOptions.THREE || THREE
  ...
}
```

Ou seja: Vanta foi desenhado originalmente para uso via `<script>` com
`window.THREE` global. Em bundlers (Next.js incluso), a forma correta é
importar `* as THREE from "three"` e passar como `options.THREE`
explicitamente — sem isso, o efeito falha silenciosamente ou lança erro
ao tentar acessar propriedades de `undefined`.

**Isso não é verdade para todos os efeitos.** Testando no navegador
(2026-08-24), `VANTA.DOTS` quebrava com
`TypeError: Cannot read properties of undefined (reading 'PerspectiveCamera')`
mesmo recebendo `options.THREE` explicitamente. Lendo
`vanta.dots.js`, o motivo ficou claro: ao contrário de `vanta.waves.js`
e `vanta.net.js`, a classe `Effect` do `DOTS` **não tem constructor
próprio** — nunca lê `userOptions.THREE`, só o `THREE` capturado no
escopo do módulo a partir de `window.THREE` **no momento em que o
módulo é avaliado**, não em quando o efeito é instanciado.

Uma primeira tentativa de correção (`window.THREE = THREE` dentro do
`useEffect`, antes de chamar `DOTS({...})`) continuou falhando com o
mesmo erro. A causa: `import DOTS from "vanta/dist/vanta.dots.min.js"`
no topo do arquivo é um import estático — em módulos ES, todos os
imports estáticos de um arquivo são resolvidos e avaliados **antes** de
qualquer código do próprio arquivo rodar, incluindo o corpo de
componentes e efeitos. Ou seja, `vanta.dots.min.js` (e seu
`let THREE = window.THREE` de escopo de módulo) já tinha sido avaliado
muito antes do `useEffect` do React sequer existir — atribuir
`window.THREE` depois disso não tem efeito nenhum sobre aquele módulo
já carregado.

**Correção final**: trocar o import estático por um `import()` dinâmico
dentro do próprio `useEffect`, depois de atribuir `window.THREE`. Import
dinâmico só avalia o módulo no momento em que é chamado — nunca antes —
o que garante a ordem correta independentemente de qual efeito Vanta
está sendo carregado ou se ele lê `options.THREE` ou não. Aplicado nos
dois componentes (`NetBackground` e `DotsBackground`) por consistência,
mesmo o `NET` já funcionando com o import estático.

## Componentes construídos

- **NetBackground** (`VANTA.NET`): malha triangulada que reage à
  posição do mouse — visual mais próximo de "wireframe técnico".
- **DotsBackground** (`VANTA.DOTS`): grade de pontos conectados por
  linhas, com duas cores independentes (`color`/`color2`).

Escolhidos entre os 14 efeitos disponíveis (`RINGS`, `CELLS`, `GLOBE`
etc.) porque ambos aceitam cor via opção simples — outros efeitos (como
`RINGS`) têm paletas de cores parcialmente hardcoded no código-fonte,
incompatíveis com a regra de "uma cor de destaque com moderação" do
projeto.

## Conceitos utilizados

- Cores em hexadecimal numérico (`0xff4d1c`), não string CSS — os
  tokens do projeto (`--accent`, `--muted`, `--surface`) são lidos via
  `useCssVariable` (mesmo hook do experimento tsParticles) e convertidos
  com `hexStringToNumber` (`lib/color.ts`), um utilitário pequeno o
  bastante para não justificar uma dependência de terceiros.
- `effect.destroy()` no cleanup do `useEffect` — sem isso, o loop de
  render do Three.js interno ao Vanta continua consumindo GPU mesmo com
  o componente desmontado.
- Lazy loading idêntico ao experimento tsParticles:
  `next/dynamic(..., { ssr: false })` isola Vanta + Three.js em chunks
  próprios de `/lab/vanta`.

## O que foi aprendido

- `lib/color.ts` já nasce reutilizável para o próximo experimento
  (Three.js puro), que vai precisar da mesma conversão de token CSS para
  cor numérica.
- Escrever um `.d.ts` local para uma biblioteca sem tipos oficiais é
  mais seguro do que usar `// @ts-ignore` ou tipar como `any` — força a
  descrever exatamente a superfície de API realmente usada, e o
  TypeScript ainda verifica erros de digitação nas opções.

## Limitações observadas

- Sem tipos oficiais, atualizar a versão do Vanta no futuro exige
  conferir manualmente se a assinatura de `NET`/`DOTS` mudou — o
  `types/vanta.d.ts` local não é atualizado automaticamente.
- Cada instância de efeito Vanta cria seu próprio renderer Three.js;
  duas instâncias simultâneas nesta página (NET + DOTS) significam dois
  contextos WebGL ativos ao mesmo tempo.

## Alternativas

Ver `docs/experiments/three.md` para o mesmo problema resolvido com
controle total da cena, ao custo de escrever a cena inteira à mão.

## Quando usar

- Fundo decorativo em uma seção isolada, quando um dos efeitos prontos
  já é visualmente o que se precisa.

## Quando evitar

- Quando a cena precisa de geometria, câmera ou interação muito
  específicas — nesse ponto, a camada de conveniência do Vanta atrapalha
  mais do que ajuda, e Three.js puro é o caminho mais direto.
