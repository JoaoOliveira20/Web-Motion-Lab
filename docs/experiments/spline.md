# Experimento — Spline (Cena 3D Colaborativa)

## Objetivo

Entender o modelo do Spline: a cena não é escrita em código, é desenhada
no editor visual e só referenciada aqui por uma URL — o oposto completo
do experimento Three.js (Fase 4), onde cada vértice é código.

## Biblioteca

`@splinetool/react-spline` 4.1.0 + `@splinetool/runtime` — ver seção de
compatibilidade abaixo para a versão realmente usada.

## Cena de demonstração

`https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode` — a cena
oficial de exemplo publicada no próprio README do `react-spline`
(contém um objeto chamado `"Cube"`). Não foi desenhada para este
projeto; não tenho acesso ao editor do Spline para criar uma cena
própria, e usar a cena de referência oficial da biblioteca é a mesma
lógica já aplicada ao `ripple.json` do experimento Lottie.

## Problema de compatibilidade encontrado (e resolvido)

`@splinetool/runtime@2.0.5` (a versão mais recente, instalada
inicialmente) quebra o build tanto com Turbopack quanto com Webpack:

```
Module not found: Can't resolve '../libs/draco/draco_decoder.wasm'
Module not found: Can't resolve '../libs/draco/draco_wasm_wrapper.js'
Module not found: Can't resolve 'boolean_wasm_bg.wasm'
```

O `DRACOLoader` embutido no runtime referencia arquivos de decodificação
DRACO via `new URL("../libs/draco/...", import.meta.url)` — caminhos que
simplesmente não existem em lugar nenhum do pacote publicado no npm (não
é um problema de resolução de bundler; os arquivos não estão no tarball).
Confirmado como bug conhecido e ainda sem correção: issue aberta
[`splinetool/react-spline#239`](https://github.com/splinetool/react-spline/issues/239),
reportando exatamente os mesmos erros com Next.js 16 + Turbopack.

**Solução aplicada**: fixar `@splinetool/runtime` em `1.12.98` (a última
versão da série 1.x, anterior à reescrita que introduziu essas
referências quebradas a arquivos DRACO). Essa versão não referencia
nenhum arquivo `libs/draco/*` — o build passa limpo tanto com Turbopack
quanto com Webpack. `@splinetool/react-spline` aceita qualquer versão de
runtime (`peerDependencies: { "@splinetool/runtime": "*" }`), então não
há conflito de versão.

Isso significa abrir mão de recursos adicionados na 2.x (não
investigados, já que não eram necessários para este experimento) até que
o bug upstream seja corrigido.

## Componentes construídos

- **CubeScene**: carrega a cena, localiza o objeto `"Cube"` via
  `findObjectByName`, e expõe um botão que gira o cubo mutando
  `object.rotation.y` diretamente — a manipulação imperativa documentada
  no próprio README do react-spline. Também escuta `onSplineMouseDown`
  para mostrar qual objeto foi clicado.

## Conceitos utilizados

- `onLoad(spline: Application)`: único ponto de entrada para consultar
  ou manipular objetos da cena a partir de React.
- `findObjectByName(name)` / `findObjectById(uuid)`: buscam objetos
  definidos visualmente no editor — não há como descobrir esses nomes
  pelo código, só inspecionando a cena no Spline.
- Mutação direta de propriedades do objeto (`.rotation.y +=`): assim
  como no Three.js puro, a cena não re-renderiza via React — o SDK do
  Spline atualiza o WebGL diretamente.

## O que foi aprendido

- A cena embutida não expõe nenhum controle do React sobre
  `prefers-reduced-motion`: se a própria cena tiver animação contínua
  configurada no editor do Spline, não há como desligá-la a partir do
  código sem reconfigurar a cena no editor — uma limitação de
  acessibilidade estrutural do modelo "cena desenhada visualmente".
- Testar contra um bug real (não hipotético) mostrou o valor de rodar o
  build cedo: o erro só aparece em `next build`/produção, não em alguns
  fluxos de desenvolvimento — reforça a regra do projeto de nunca
  considerar um experimento pronto só porque compila em dev.

## Limitações observadas

- Fixado em uma versão mais antiga do runtime por causa do bug upstream;
  isso precisa ser revisitado quando a issue #239 for corrigida.
- Sem acesso ao editor do Spline, não é possível demonstrar a criação de
  uma cena do zero — só o consumo de uma cena já pronta.

## Alternativas

Ver `docs/experiments/three.md` para o mesmo problema (objeto 3D
interativo) resolvido inteiramente em código.

## Quando usar

- Quando há um designer (ou o próprio time) confortável desenhando a
  cena visualmente no Spline, e o código só precisa reagir a eventos ou
  mover objetos já definidos.

## Quando evitar

- Quando o projeto não pode depender de uma cena hospedada externamente
  no domínio `prod.spline.design`, ou quando controle total sobre
  performance/acessibilidade da cena é obrigatório.
