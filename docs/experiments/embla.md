# Experimento — Embla (Carrossel Controlável)

## Objetivo

Fechar a comparação com o experimento Swiper: resolver o mesmo problema
(carrossel com navegação e paginação) a partir de uma primitiva sem
opinião sobre UI, e sentir na prática o que isso custa em código próprio.

## Biblioteca

`embla-carousel-react` 8.6. Nenhum componente de slide, seta ou bullet —
só o hook `useEmblaCarousel(options, plugins)`.

## Conceitos utilizados

- `useEmblaCarousel()` retorna `[ref, api]`: `ref` vai no elemento
  viewport (o contêiner com `overflow: hidden`), `api` é `undefined` até
  o carrossel montar e só then permite `scrollNext`/`scrollPrev`/`scrollTo`.
- Setas e pontos de navegação são 100% construídos neste projeto
  (`components/lab/embla/carousel-controls.tsx`) — não existe equivalente
  pronto na biblioteca, ao contrário do Swiper.
- `emblaApi.on('select', callback)` / `on('reInit', callback)`: o
  carrossel notifica a aplicação quando o slide ativo muda ou quando o
  layout é recalculado — a sincronização entre estado React e o motor de
  scroll é responsabilidade de quem usa a API, não da biblioteca.
- `dragFree: true`: desliga completamente o snap, virando um scroll
  horizontal com inércia livre — mesma ideia visual do Marquee (Magic
  UI), mas dirigido pelo usuário via arraste em vez de CSS autoplay.

## O que foi aprendido

- Construir `useEmblaControls` (o hook que sincroniza `selectedIndex` e
  `scrollSnaps` com os eventos do Embla) esbarrou na regra de lint
  `react-hooks/set-state-in-effect`: chamar `setScrollSnaps(...)`
  diretamente no corpo do efeito foi sinalizado, mas a mesma leitura
  feita dentro de uma função nomeada (`onSelect`) chamada uma vez e
  também registrada como listener não foi. A correção foi extrair a
  leitura inicial de `scrollSnapList()` para uma função `onReInit`
  seguindo exatamente o mesmo padrão — o efeito continua fazendo a mesma
  coisa, só nomeado de um jeito que deixa claro que é "sincronização com
  sistema externo", não um cálculo derivado que deveria ter sido feito
  fora do efeito.
- O tipo `EmblaCarouselType` não é reexportado por `embla-carousel-react`
  — só o tipo da tupla `UseEmblaCarouselType`. Em vez de adicionar
  `embla-carousel` como dependência direta só para importar um tipo, usei
  acesso indexado (`UseEmblaCarouselType[1]`) para derivar o tipo da API
  sem uma dependência nova.
- Comparado ao Swiper, o Embla exigiu bem mais código para o mesmo
  resultado visual (setas, pontos, sincronização de estado) — o
  `carrossel-controls.tsx` e o `use-embla-controls.ts` juntos somam mais
  linhas do que o experimento Swiper inteiro.

## Limitações observadas

- Sem um módulo de acessibilidade pronto (o Swiper tem `A11y`), o
  `role="tablist"`/`aria-selected` dos pontos de navegação teve que ser
  escrito à mão.
- `dragFree` sem `containScroll: "trimSnaps"` deixaria espaço vazio
  navegável nas pontas; a opção foi necessária para conter o scroll
  dentro do conteúdo real.

## Alternativas

Ver `docs/experiments/swiper.md` para a mesma funcionalidade com módulos
prontos.

## Quando usar

- Quando o design do carrossel é específico o suficiente para que
  componentes prontos exigiriam mais sobrescrita de CSS do que vale a
  pena, ou quando o peso de bundle de módulos não usados importa.

## Quando evitar

- Protótipos rápidos ou quando os efeitos prontos do Swiper (cards,
  coverflow, fade) já resolvem o problema — reescrever setas e pontos à
  mão não agrega nada nesse caso.
