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
- **"Exemplos relacionados" no rodapé da página individual** — um link
  simples pro(s) outro(s) exemplo(s) da mesma biblioteca.

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

## Piloto

Só a Motion foi dividida por enquanto: `/lab/motion/presence` e
`/lab/motion/gestures`, cada uma com seu próprio preview
(`presence-preview.tsx`, `gestures-preview.tsx`). `data/experiments.ts`
aceita slug com `/` (ex: `"motion/presence"`) — vira a URL aninhada
automaticamente, sem mudar `ExperimentCard`.

`docs/experiments/motion.md` continua cobrindo a biblioteca como um
todo (aprendizados, alternativas, quando usar) — não foi dividido em
dois; a divisão é só da camada de apresentação (páginas + preview), não
da documentação de aprendizado.

## Se for expandir pro resto

Faltam 14 experimentos isolados nesse mesmo molde (todos exceto Spline,
que já tem só 1 demo). Por experimento: 1 preview novo em
`components/lab/<slug>/`, 1 entrada nova em `example-previews.tsx`, 2
páginas novas em vez de 1, `data/experiments.ts` com slug `<lib>/<x>`,
doc original mantido como está. Repetitivo, mas mecânico — o padrão já
está validado neste piloto.
