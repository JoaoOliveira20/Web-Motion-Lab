# Experimento — Lottie (Animação Vetorial)

## Objetivo

Entender o formato Lottie/Bodymovin e as duas formas de reprodução da
`lottie-react` v3 (a versão instalada é uma reescrita completa da API
v2, mais antiga e mais conhecida) — declarativa via `<Lottie>` e
imperativa via `lottieRef`.

## Biblioteca

`lottie-react` 3.1.0. A API mudou bastante entre v2 e v3: `animationData`
virou `src` (aceita string/URL ou objeto já parseado), e o hook
`useLottie` deixou de ser a forma recomendada de expor controles
imperativos — isso só ficou claro lendo os `.d.ts` do pacote instalado,
não pela memória de treinamento (que teria sugerido a API v2, hoje
incorreta).

## Asset usado

`public/lottie/ripple.json`, copiado da suíte de testes oficial do
`airbnb/lottie-web` (MIT), 11KB. Não foi desenhado para este projeto — o
objetivo do experimento é a API de reprodução, não a peça de motion
design. Licença e origem documentadas aqui para rastreabilidade.

## Componentes construídos

- **AutoplayDemo** (`components/lab/lottie/autoplay-demo.tsx`): uso
  declarativo do componente `<Lottie src loop autoplay />`.
- **ControlledDemo** (`components/lab/lottie/controlled-demo.tsx`): uso
  imperativo via `lottieRef` (tipo `LottieHandle`), com controle de
  velocidade (`setSpeed`) e play/pause manuais.

## Conceitos utilizados

- `src` aceita tanto uma URL (`/lottie/ripple.json`, buscada em runtime)
  quanto o objeto já parseado — usei a URL para manter o JSON fora do
  bundle JavaScript, carregado sob demanda pelo navegador.
- `lottieRef` expõe `LottieHandle`: os mesmos comandos de `useLottie`
  (`play`, `pause`, `setSpeed`, `playSegments`...) mas **sem** o valor
  reativo `state` — a biblioteca deliberadamente separa "comandos" de
  "valores que causam re-render" em dois tipos diferentes.

## O que foi aprendido

- Tentei inicialmente usar `useLottie()` com o valor `state` retornado
  para controlar o rótulo do botão Play/Pausar. A regra de lint
  `react-hooks/refs` (parte do conjunto de regras do React Compiler)
  acusou "Cannot access ref value during render" nesse ponto e também no
  `setDisplayRef`. Inspecionando o código-fonte do pacote, `state` é de
  fato `useState` puro e `setDisplayRef` é um `useCallback` — não são
  refs. Ainda assim, reestruturar para `<Lottie lottieRef={ref}>` +
  estado local próprio (que é literalmente para isso que `LottieHandle`
  existe, com `state` removido do tipo) resolveu o alerta e resultou em
  código mais simples: eu já sei se cliquei em play ou pause, não
  preciso reler isso da biblioteca.
- Diferente do SVG do Rough Notation (que herda `currentColor`), as
  cores de uma animação Lottie ficam fixas no JSON exportado do After
  Effects — não há como temizar via CSS sem pós-processar o arquivo ou
  usar a API de "dinâmica de cor" da própria lottie-web (fora do escopo
  aqui).

## Limitações observadas

- O peso de um arquivo Lottie escala com a complexidade da animação, não
  com o tamanho de tela — uma peça elaborada pode pesar mais que um
  vídeo curto comprimido.
- Sem pós-processamento, a cor da animação não acompanha o tema claro/
  escuro do projeto — uma peça desenhada para fundo escuro pode ficar
  ilegível no tema claro.

## Alternativas

Para ícones/microinterações simples, SVG animado com CSS ou Motion
resolve com arquivos muito menores e cores themáveis via `currentColor`
(como no experimento Rough Notation). Lottie vale a pena quando a peça
vem pronta de um motion designer trabalhando em After Effects.

## Quando usar

- Peças de motion design complexas entregues por um designer, onde
  recriar o efeito à mão em CSS/SVG seria inviável.

## Quando evitar

- Ícones ou microinterações simples que uma sequência de keyframes CSS
  ou Motion já resolve com um arquivo muito menor.
