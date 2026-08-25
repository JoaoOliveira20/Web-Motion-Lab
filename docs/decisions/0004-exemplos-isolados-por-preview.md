# Decisão 0004 — Exemplos isolados por página, com preview no card

## Contexto

Cada experimento isolado (exceto Spline) mostrava 2 demos numa página só
(ex: `/lab/motion` = AnimatePresence + Gestures). Ao planejar um preview
visual no card do catálogo (`/lab`), ficou claro que 1 card com 2 demos
não tem como virar 1 preview sem escolher um dos dois arbitrariamente ou
fazer uma colagem confusa.

## Inspiração (não cópia)

Olhamos a galeria de exemplos do próprio site da Motion
(`motion.dev/examples`) — não pra reproduzir o design, só pra entender o
padrão. De lá, o que fazia sentido puxar:

- **Preview estático (imagem), não demo ao vivo rodando no card** — numa
  grade com várias cenas WebGL (Three.js, Vanta, tsParticles, Spline),
  demo ao vivo em todo card deixaria a página de índice pesada. Decisão
  confirmada com o usuário: "o preview realmente precisa ser estático".
- **Código num bloco expansível** — já é exatamente o `<details>` que
  o laboratório já tinha antes desta decisão.

Testado no piloto e removido em seguida: um link "Exemplos
relacionados" no rodapé de cada página, apontando pro outro exemplo da
mesma biblioteca. O usuário pediu pra tirar — o filtro por biblioteca
já cumpre esse papel, o link era redundante.

O que ficou de fora de propósito: nota de qualidade ("MotionScore"),
paywall, favoritos — aparato de produto comercial sem função aqui. O
filtro por biblioteca também não precisou ser recriado — o
`LabCatalog` (Fase 6) já filtra por biblioteca e cumpre o papel de
"ver tudo dessa lib junto" que a página combinada fazia.

## Como o preview foi resolvido sem screenshot

Sem acesso a navegador nesta sessão (não há como tirar print de verdade)
e sem justificativa pra adicionar uma ferramenta de captura automática
(Puppeteer/Playwright) só pra isso, os previews são **miniaturas
estáticas feitas em CSS puro**, reproduzindo o layout real de cada demo
em escala menor — não é uma foto, é um "wireframe" fiel (mesmas bordas,
cores e proporções do demo de verdade), renderizado como Server
Component sem nenhum JavaScript no cliente. Mais barato que até uma
imagem: sem requisição extra, sem decode de imagem.

Registro dos previews fica em `components/lab-detail/example-previews.tsx`
— um mapa `slug → componente`, consultado pelo `ExperimentCard`. Cards
sem entrada no mapa mostram um placeholder neutro (nome da biblioteca em
mono) em vez de ficarem vazios ou com altura diferente do resto da
grade.

## Piloto e rollout

Piloto na Motion primeiro (`/lab/motion/presence` e
`/lab/motion/gestures`), aprovado, depois estendido pras 14 bibliotecas
restantes na mesma sessão — todo experimento isolado (exceto Spline,
que já tinha só 1 demo) virou 2 páginas com preview próprio. 31
experimentos isolados no total (antes 16), mais as 7 composições, que
não precisaram de nada disso — já eram 1 card = 1 demo desde a Fase 5.

`data/experiments.ts` aceita slug com `/` (ex: `"motion/presence"`) —
vira a URL aninhada automaticamente, sem mudar `ExperimentCard`.

`docs/experiments/<slug>.md` continuam cobrindo cada biblioteca como um
todo (aprendizados, alternativas, quando usar) — nenhum foi dividido; a
divisão é só da camada de apresentação (páginas + preview), não da
documentação de aprendizado.

## Proporção áurea nos cards (aplicada seletivamente)

Depois do piloto, o card de Presença ganhou `aspect-[1.618/1]` como
teste visual, aprovado e estendido — mas não em todo lugar. Só em
cards de texto/UI de conteúdo único, sem altura funcional própria:
`FollowerPointerCard`, `BorderBeamShowcase`, `TiltedCard`,
`AnnotationShowcase`, `HoverAnnotation`, `LoopTypedDemo`,
`TerminalTypedDemo`. Pulado em carrosséis (o tamanho do slide já é
decisão de conteúdo) e em todo canvas WebGL (Three.js, Vanta,
tsParticles) — forçar uma proporção fixa numa câmera ou canvas
dimensionado de propósito arrisca distorcer a cena, e sem navegador
nesta sessão não havia como confirmar visualmente que ficou bem.
