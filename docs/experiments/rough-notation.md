# Experimento — Rough Notation (Anotações Manuscritas)

## Objetivo

Entender uma biblioteca pequena e de propósito único: desenhar marcações
com aparência de traço à mão sobre elementos de texto já existentes, sem
qualquer opinião sobre quando isso deve acontecer.

## Biblioteca

`rough-notation` (usa `roughjs` internamente para gerar os traços em
SVG). Sem wrapper React — a API vanilla (`annotate`, `annotationGroup`) é
pequena o suficiente para justificar um hook próprio em vez de mais uma
dependência (`react-rough-notation`).

## Conceitos utilizados

- `annotate(element, config)`: cria a anotação, mas não a exibe —
  `.show()`/`.hide()` controlam a visibilidade, `.remove()` limpa o SVG
  do DOM.
- `annotationGroup(annotations)`: sincroniza múltiplas anotações para
  aparecerem em sequência como se fossem uma única animação.
- `color` omitido no config → a biblioteca usa `currentColor` como
  padrão, herdando a cor de texto do elemento via CSS em vez de exigir
  uma cor hardcoded ou resolução manual de variável CSS.
- Um hook próprio (`useRoughAnnotation`) encapsula o ciclo de vida
  create/remove em um `useEffect` e expõe show/hide como um único
  booleano (`isVisible`) — o padrão de estado mais comum em React.

## O que foi aprendido

- Rough Notation não observa a viewport sozinho. Ligar a exibição ao
  scroll é responsabilidade da aplicação — aqui, um `IntersectionObserver`
  simples dispara `annotationGroup().show()` quando 60% do contêiner
  entra em vista.
- O SVG de cada anotação é medido a partir do `getBoundingClientRect` do
  elemento-alvo no momento de `.show()`. Isso significa que a anotação
  precisa ser recriada (ou ter `.show()` chamado de novo) se o layout do
  texto mudar — não há observação automática de resize além do listener
  interno de resize da própria janela.
- Passar um `config` novo a cada render (objeto literal inline) faz o
  hook recriar a anotação sem necessidade — por isso `useRoughAnnotation`
  depende do objeto `config` inteiro, e quem chama o hook precisa
  memoizá-lo (`useMemo`) para manter uma única anotação viva.

## Limitações observadas

- Anotações do tipo `bracket` exigem a propriedade `brackets` (lados);
  omitir gera um bracket vazio silenciosamente, sem erro em tempo de
  execução — só se percebe olhando o resultado visual.
- Como o traço é recalculado a partir da geometria do elemento, textos
  que quebram linha de forma diferente em mobile podem produzir anotações
  com proporção distinta da versão desktop.

## Alternativas

Um `text-decoration` ou `box-shadow` em CSS resolve destaques estáticos
sem nenhuma dependência, mas não produz o traço orgânico "desenhado à
mão" nem a animação de desenho progressivo.

## Quando usar

- Destacar 1-3 palavras-chave em um bloco editorial, de forma que pareça
  uma anotação humana e não um `<mark>` genérico.

## Quando evitar

- Textos que mudam de layout com frequência (conteúdo dinâmico, i18n com
  comprimentos muito diferentes) sem um plano para recriar a anotação
  quando o texto muda.
