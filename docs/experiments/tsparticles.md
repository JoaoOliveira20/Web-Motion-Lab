# Experimento — tsParticles (Sistema de Partículas)

## Objetivo

Primeiro experimento da Fase 4 ("visual pesado") — validar na prática a
regra de performance do projeto: nada de WebGL/Canvas deve entrar no
bundle de páginas que não o usam. E entender a arquitetura de plugins da
versão 4 do tsParticles, bem mais modular do que versões anteriores.

## Biblioteca

`@tsparticles/react` + `@tsparticles/slim` + `@tsparticles/engine`, todas
na versão 4.3.2.

## A API mudou mais do que o esperado

Antes de escrever qualquer config, inspecionei os `.d.ts` instalados —
e a memória de treinamento sobre tsParticles (v1/v2/v3 antigo) estava
desatualizada em vários pontos:

- `initParticlesEngine()` (helper clássico de várias versões) **não
  existe mais** em `@tsparticles/react` 4.x. O padrão atual é
  `<ParticlesProvider init={async (engine) => { await loadSlim(engine); }}>`,
  que só renderiza os filhos depois que o engine termina de carregar.
  `init` precisa ser uma referência estável (definida fora do
  componente) — passar uma função inline diferente a cada render lança
  erro.
- `interactivity` (eventos de hover/click) e `particles.links` **não
  aparecem** na interface `IParticlesOptions`/`IOptions` do
  `@tsparticles/engine` — a tipagem base só declara `bounce`, `effect`,
  `groups`, `move`, `number`, `paint`, `palette`, `reduceDuplicates`,
  `shape`, `zIndex`. Cada plugin (`@tsparticles/plugin-interactivity`,
  `@tsparticles/interaction-particles-links`) estende esse tipo por
  fora, mas como a interface base já tem `[name: string]: unknown`, o
  TypeScript aceita as chaves extras sem reclamar — só não te avisa se
  errar o nome de um campo.
- Para confirmar o formato real e atual (não confiar em memória nem
  inventar), instalei temporariamente dois pacotes de preset oficiais
  (`@tsparticles/preset-links`, `@tsparticles/preset-stars`, ambos na
  mesma versão 4.3.2 já instalada) só para ler o `options.js` que eles
  exportam, depois desinstalei os dois. Isso confirmou: `particles.size`,
  `particles.opacity` e `particles.links` continuam existindo como
  campos "soltos" em `particles`, e cor vai em
  `particles.paint.fill.color.value` (não em `particles.color` nem em
  `particles.paint.color` direto).

## Componentes construídos

- **RepulseField**: hover afasta partículas (`interactivity.modes.repulse`),
  clique adiciona partículas (`modes.push`), com links entre partículas
  próximas formando uma constelação.
- **GrabField**: hover desenha linhas só entre o cursor e partículas
  próximas (`modes.grab`) — sem links entre as partículas em si, para
  deixar o contraste com o RepulseField óbvio.

## Performance

- `TsParticlesLazySection` usa `next/dynamic(..., { ssr: false })` para
  isolar todo o código do tsParticles (engine + slim + plugins) em
  chunks JS próprios, carregados só quando `/lab/tsparticles` é visitada
  — confirmado inspecionando `.next/static/chunks` após o build: o
  código do tsParticles vive em arquivos separados dos chunks
  compartilhados pela aplicação.
- Cor das partículas não vem de CSS: `getComputedStyle` lê o valor
  resolvido de `--accent`/`--muted`/`--foreground` uma vez no cliente
  (hook `useCssVariable`, em `hooks/`) porque a API Canvas 2D não
  entende `var(--accent)` como valor de `fillStyle`.

## Bug encontrado na revisão visual: `fullScreen.enable` é `true` por padrão

Ao testar no navegador (2026-08-24), as partículas apareciam espalhadas
pela página inteira em vez de ficarem confinadas nos cartões. Causa:
`IOptions.fullScreen` tem `enable: true` como padrão no
`@tsparticles/engine` (confirmado em
`Options/Classes/FullScreen/FullScreen.js`) — sem configuração
explícita, o Canvas vira `position: fixed` cobrindo o viewport inteiro,
ignorando por completo o contêiner onde o componente foi montado. Esse
comportamento não estava documentado nos exemplos oficiais que consultei
(`preset-links`/`preset-stars`), porque os presets deles são pensados
para fundo de página inteira, não para um cartão. Corrigido adicionando
`fullScreen: { enable: false }` em ambas as configs
(`RepulseField`/`GrabField`) — com isso o Canvas passa a ocupar 100% do
elemento pai, como esperado.

## O que foi aprendido

- "Slim" não significa mais "quase tudo menos as formas pesadas" como em
  versões antigas — a v4 bundla `@tsparticles/slim` a partir de uma
  lista explícita de plugins individuais (visível em
  `node_modules/@tsparticles/slim/package.json`), o que deixa claro
  exatamente o que está incluído sem precisar adivinhar.
- Testar contra pacotes oficiais reais (mesmo que temporários, só para
  leitura) foi mais confiável do que tentar deduzir a API a partir de
  `.d.ts` incompletos — os tipos declarados nem sempre refletem o que o
  runtime aceita quando plugins estendem a configuração dinamicamente.

## Limitações observadas

- Cor fixa lida uma vez por render do hook `useCssVariable`; troca de
  tema em runtime é detectada via `MutationObserver`/`matchMedia`, mas
  isso é código extra que a Motion e o Rough Notation não precisaram
  (eles usam `currentColor`, que o CSS já resolve sozinho).
- Com `prefers-reduced-motion`, as partículas ficam paradas e a
  interatividade é desligada — ainda assim, o Canvas roda um loop de
  render interno; para uma página que nunca deveria animar, seria melhor
  nem montar o `<Particles>`.

## Alternativas

Vanta (próximo experimento) resolve fundos animados de forma mais
opinativa/pronta, com menos configuração e menos controle fino sobre
partículas individuais.

## Quando usar

- Fundos decorativos com interação leve, em uma única seção — não a
  página inteira.

## Quando evitar

- Múltiplas instâncias simultâneas de `<Particles>` na mesma tela — cada
  uma roda seu próprio loop de Canvas.
