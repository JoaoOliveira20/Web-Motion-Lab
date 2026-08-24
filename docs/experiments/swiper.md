# Experimento — Swiper (Carrossel Completo)

## Objetivo

Entender o modelo modular do Swiper — funcionalidade e efeitos como
plugins opt-in — e preparar a comparação direta com Embla (próximo
experimento desta fase), que resolve o mesmo problema com uma filosofia
oposta.

## Biblioteca

`swiper` 14, usando `swiper/react` (`Swiper`, `SwiperSlide`) e
`swiper/modules` (`Navigation`, `Pagination`, `EffectCards`).

## Conceitos utilizados

- Módulos importados individualmente e passados via prop `modules={[...]}`
  — nada de navegação/paginação/efeitos existe até ser explicitamente
  habilitado.
- CSS por módulo (`swiper/css`, `swiper/css/navigation`,
  `swiper/css/pagination`, `swiper/css/effect-cards`) — importar só o
  necessário evita carregar estilos de efeitos não usados.
- `--swiper-theme-color`: custom property que tematiza setas e bullets
  sem precisar sobrescrever classes internas do Swiper — aplicada como
  `var(--accent)` do projeto.
- `effect="cards"` + módulo `EffectCards`: transição 3D de pilha de
  cartões, configurada via prop declarativa, sem nenhuma linha de
  cálculo de transform manual.

## O que foi aprendido

- Nenhum dos dois carrosséis usa o módulo `Autoplay`. Um carrossel que
  avança sozinho sem controle de pausa é uma falha de acessibilidade
  reconhecida (WCAG 2.2.2, "Pause, Stop, Hide") — a omissão aqui é
  deliberada, não um efeito não implementado.
- A API do Swiper para React é inteiramente declarativa: nenhum dos dois
  experimentos precisou de `ref` para nada além do que a própria
  biblioteca já resolve via props. Isso contrasta com quase todos os
  experimentos anteriores do laboratório, que em algum ponto precisaram
  de acesso imperativo.
- `slidesPerView` fracionário (`1.15`, `2.2`) é o que cria a "espiada" do
  próximo slide na borda — um detalhe pequeno que comunica que há mais
  conteúdo para rolar, sem precisar de nenhum indicador extra.

## Limitações observadas

- O peso do pacote cresce com cada módulo/CSS importado; um carrossel
  simples de Navigation+Pagination carrega bem menos do que um com
  vários efeitos 3D habilitados ao mesmo tempo.
- `EffectCards` fixa a largura/altura do container (`w-40 h-48` aqui);
  não é fluido por padrão como o carrossel de Navigation.

## Alternativas

Ver `docs/experiments/embla.md` (a ser escrito) para a comparação direta
via primitivas de baixo nível em vez de um framework de plugins.

## Quando usar

- Quando os efeitos prontos (cards, coverflow, cube, fade) resolvem
  exatamente o que é necessário, sem exigir CSS/JS customizado.
- Projetos que precisam de muitos comportamentos de carrossel diferentes
  (RTL, thumbs, zoom, virtual slides) sem escrever cada um do zero.

## Quando evitar

- Quando o carrossel final precisa de um comportamento muito específico
  que nenhum módulo cobre — nesse caso, construir sobre primitivas (como
  Embla) dá mais controle com menos código não utilizado.
