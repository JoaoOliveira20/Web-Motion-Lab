# Experimento — Aceternity (Efeitos Avançados)

## Objetivo

Fechar a Fase 2 com os dois efeitos mais elaborados da coleção: uma
revelação de texto controlada por arraste do ponteiro e um cursor
totalmente customizado com legenda — ambos dependentes de estado local
mais complexo que os experimentos anteriores da fase.

## Biblioteca

Aceternity UI (`ui.aceternity.com`). Sem monorepo público como React
Bits/Magic UI/Motion Primitives — o site expõe um registry compatível
com o shadcn CLI em `ui.aceternity.com/registry.json`, com o código-fonte
de cada componente embutido diretamente no JSON de
`ui.aceternity.com/registry/<nome>.json` (descoberto por tentativa, já
que a documentação de CLI não expõe esse caminho explicitamente). Mesma
decisão de `docs/decisions/0002-bibliotecas-de-copia.md`: buscar o JSON
e adaptar manualmente, sem rodar a CLI.

## Componentes adaptados

- **TextRevealCard** (`components/lab/aceternity/text-reveal-card.tsx`):
  adaptado do registry `text-reveal-card`. Mudanças: cores hardcoded
  (`#1d1c20`, `text-white`, `#323238`) trocadas pelos tokens do projeto;
  `w-[40rem]` fixo trocado por `w-full` (o cartão precisa caber no grid
  responsivo da página, não ocupar uma largura fixa); `rounded-lg`
  removido (o projeto não usa cantos arredondados em nenhum outro
  lugar); eventos de mouse e touch separados do original unificados em
  Pointer Events; posições aleatórias das estrelas de fundo movidas de
  "calculadas a cada render" para `useState(() => ...)` — calculadas uma
  única vez, porque chamar `Math.random()` durante o render é
  exatamente o tipo de impureza que a regra `react-hooks/purity` do
  ESLint (React Compiler) rejeita.
- **FollowerPointerCard**
  (`components/lab/aceternity/following-pointer-card.tsx`): adaptado do
  registry `following-pointer`. Mudanças: removida a paleta de 7 cores
  aleatórias do rótulo (trocada pelo `--accent` único do projeto,
  consistente com a regra de "uma cor de destaque com moderação" de
  `docs/DESIGN_DIRECTION.md`); texto padrão "William Shakespeare"
  removido — o rótulo agora é obrigatório via prop; cursor customizado
  desligado por completo (`cursor: "default"`, sem seguir o ponteiro)
  quando `prefers-reduced-motion` está ativo.

## Conceitos utilizados

- `clip-path: inset(0 X% 0 0)` calculado a partir da posição X do
  ponteiro relativa ao card — a mesma ideia de "porcentagem de scroll"
  do Lenis, aqui aplicada a uma posição horizontal dentro de um
  elemento, não à página inteira.
- `cursor: none` + elemento posicionado via `MotionValue` — troca
  completa do cursor do sistema operacional por um elemento React.
- `AnimatePresence` para o cursor customizado montar/desmontar com
  animação ao entrar/sair da área — o mesmo padrão do experimento Motion
  da Fase 1, reaparecendo aqui em um contexto diferente.

## O que foi aprendido

- O registry do Aceternity não segue o padrão `/r/<nome>.json` de outras
  ferramentas shadcn-compatíveis — é `/registry/<nome>.json`. Isso só
  ficou claro testando URLs candidatas, reforçando por que a decisão
  0002 evita depender da CLI (que abstrai esse detalhe, mas falha
  silenciosamente se a URL mudar de novo).
- A regra `react-hooks/purity` (nova neste setup de lint, ligada ao
  React Compiler) pegou um anti-padrão que o componente original do
  Aceternity tinha (`Math.random()` direto no JSX durante o render) — um
  lembrete de que código copiado de fora nem sempre segue as regras mais
  recentes do próprio ecossistema React.
- Cursor customizado (`cursor: none`) é um efeito que precisa de
  desligamento binário com `prefers-reduced-motion`, não de atenuação —
  não existe uma versão "mais suave" de esconder o cursor do usuário.

## Limitações observadas

- `getBoundingClientRect()` do `FollowerPointerCard` é medido uma única
  vez no mount (`useEffect` vazio); redimensionar a janela ou rolar a
  página desalinha a posição do cursor customizado até a próxima
  navegação. O componente original tinha a mesma limitação.
- `TextRevealCard` depende de `pointermove` contínuo — em touch, o
  equivalente seria `touchmove`, que Pointer Events já cobre no Chrome/
  Safari modernos, mas o comportamento tátil (arrastar sobre texto) é
  menos natural que em desktop.

## Alternativas

O mesmo efeito de revelação poderia usar `scroll-timeline` do CSS
(revelar por scroll em vez de arraste), eliminando JavaScript, mas
perderia o controle direto por posição do ponteiro que é o ponto central
do componente.

## Quando usar

- `TextRevealCard`: um único elemento de destaque (hero, seção "antes/
  depois") onde a interação de descoberta vale o código extra.
- `FollowerPointerCard`: mockups de colaboração em tempo real (cursores
  de outros usuários) ou qualquer contexto onde reforçar "isto é uma área
  interativa" com um cursor customizado faz sentido.

## Quando evitar

- Qualquer um dos dois em conteúdo que precise funcionar bem em touch
  como interação primária — ambos foram desenhados pensando em mouse.
