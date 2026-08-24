# Experimento — Typed.js (Texto Digitado)

## Objetivo

Entender o padrão de integração de uma biblioteca puramente imperativa,
que manipula `textContent` diretamente, dentro do modelo declarativo do
React — e por que o cleanup é obrigatório aqui de um jeito que outras
bibliotecas do laboratório (Motion, GSAP) já resolvem por conta própria.

## Biblioteca

`typed.js`. Sem wrapper React (`react-typed` está com manutenção
irregular); a API vanilla é pequena o suficiente para um hook próprio
(`useTyped`), seguindo o mesmo padrão já usado no experimento Rough
Notation.

## Conceitos utilizados

- `new Typed(elemento, options)`: recebe um elemento (ou seletor) e
  escreve/apaga texto nele diretamente, fora do controle do React.
- `.destroy()`: essencial no cleanup do `useEffect` — sem isso, cada
  remontagem do componente (Fast Refresh, navegação) cria uma nova
  instância escrevendo no mesmo elemento, duplicando o efeito.
- `.toggle()` / `.reset(restart)`: controle imperativo externo, acessado
  aqui a partir de botões React comuns — o hook expõe a instância via
  `ref` para isso.
- Fallback estático: com `prefers-reduced-motion`, o hook nem chega a
  criar a instância (`ref` é substituído por `{ current: null }`), e o
  texto final aparece direto como conteúdo estático.

## O que foi aprendido

- Diferente de Motion e GSAP (que já lidam com SSR/hydration de forma
  transparente), Typed.js espera um elemento real do DOM — o `<span>`
  alvo precisa estar vazio no HTML gerado pelo servidor, e só ganha
  conteúdo depois que o efeito roda no cliente. Isso é aceitável aqui
  porque o texto não carrega informação essencial sozinho (o parágrafo ao
  redor já contextualiza).
- Cada nova instância assume que o elemento está "limpo"; reaproveitar o
  mesmo `ref` para duas configurações diferentes sem `destroy()` entre
  elas produz texto duplicado/concatenado.
- O hook precisa de `options` memoizado (`useMemo` com deps vazias) pelo
  mesmo motivo do `useRoughAnnotation`: um objeto literal recriado a cada
  render forçaria destroy+recreate da instância a cada render.

## Limitações observadas

- Textos digitados via Typed.js não são "reais" para leitores de tela até
  a animação terminar de escrever — por isso o fallback de reduced motion
  aqui não é apenas "sem animação", é o texto completo, imediato e
  estático.
- Não há uma forma nativa de sincronizar múltiplas instâncias de Typed.js
  (como o `annotationGroup` do Rough Notation faz) — orquestração de
  várias digitações em paralelo precisaria ser feita manualmente.

## Alternativas

Uma implementação própria com `setInterval`/`requestAnimationFrame`
sobre uma string React state resolveria o mesmo efeito com controle total
sobre acessibilidade e SSR, ao custo de reescrever back/pause/loop que a
biblioteca já resolve.

## Quando usar

- Headlines ou taglines que se beneficiam de um elemento de "ao vivo",
  como uma lista curta de sinônimos ou capacidades.

## Quando evitar

- Qualquer texto que carregue informação que o usuário precise ler
  imediatamente e por completo (títulos de página, mensagens de erro,
  instruções) — a espera pela digitação atrasa a leitura sem benefício.
