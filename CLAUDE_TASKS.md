# Frontend Lab — Tasks para Claude

Use este arquivo como roteiro de execução.

## Fase 0 — Fundação

- [x] Auditar o projeto atual.
- [x] Identificar stack e versões.
- [x] Verificar estrutura de pastas.
- [x] Verificar dependências instaladas.
- [x] Verificar configuração do Next.js.
- [x] Verificar TypeScript.
- [x] Verificar lint.
- [x] Verificar build.
- [x] Avaliar o design atual.
- [x] Identificar problemas visuais.
- [x] Criar/ajustar direção visual.
- [x] Criar base de design system.

Projeto inicializado com Next.js 16 (App Router, Turbopack) + React 19 +
TypeScript + Tailwind v4. Design system: Fraunces + Geist Sans/Mono,
paleta neutra com acento laranja-sinal, tokens em `app/globals.css`.
Homepage com Hero, Experiments, Library Stack e Featured Experiment.
Estrutura `/lab` criada com página índice. Testado: `tsc --noEmit`, lint
e build de produção sem erros; rotas `/`, `/lab`, `/lab/motion`
retornando 200 e `/lab/rota-invalida` retornando 404 via `next dev`.
Testagem visual em navegador não foi possível nesta sessão (extensão do
Chrome desconectada) — pendente validação visual do usuário.

## Fase 1 — Motion

- [x] Lab Framer Motion (pacote `motion`)
- [x] Lab GSAP (timelines + ScrollTrigger)
- [x] Lab Lenis (scroll suave isolado + scrollTo)
- [x] Lab Rough Notation (annotate + annotationGroup)
- [x] Lab Typed (new Typed() + controle imperativo)

Fase 1 concluída. Os cinco experimentos cobrem os dois modelos de
animação do laboratório: declarativo (Motion, ligado ao ciclo de vida de
componentes) e imperativo (GSAP, Rough Notation, Typed.js, cada um com
seu próprio padrão de cleanup). Lenis cobre a camada de scroll,
isolada, ainda sem compor com GSAP (isso é Fase 5).

## Fase 2 — UI

Bibliotecas "de cópia" (sem pacote npm) — decisão de arquitetura em
`docs/decisions/0002-bibliotecas-de-copia.md`: código-fonte buscado no
GitHub de cada projeto e adaptado manualmente aos tokens do laboratório,
sem rodar `shadcn init` (que sobrescreveria o design system da Fase 0).

- [x] Lab React Bits (SpotlightCard + TiltedCard)
- [x] Lab Motion Primitives (Magnetic + InView)
- [x] Lab Magic UI (BorderBeam + Marquee)
- [x] Lab Aceternity (TextRevealCard + FollowerPointerCard)

Fase 2 concluída. As quatro bibliotecas de UI são todas "de cópia", sem
pacote npm — cada uma com seu próprio mecanismo de distribuição (ver
docs/decisions/0002-bibliotecas-de-copia.md). Nenhuma rodou a CLI do
shadcn; todo componente foi buscado no GitHub/registry oficial e
adaptado manualmente aos tokens do design system da Fase 0.

## Fase 3 — Conteúdo visual

- [x] Lab Lottie (declarativo + lottieRef imperativo)
- [x] Lab Swiper (Navigation/Pagination + EffectCards)
- [x] Lab Embla (setas/pontos próprios + dragFree)

Fase 3 concluída. Swiper e Embla resolvem o mesmo problema de carrossel
com filosofias opostas (módulos prontos vs. primitivas), documentado
como comparação direta entre os dois experimentos.

## Fase 4 — Visual pesado

- [x] Lab tsParticles (repulse + grab, lazy via dynamic ssr:false)
- [x] Lab Vanta (NET + DOTS, tipos locais em types/vanta.d.ts)
- [x] Lab Spline (cena oficial de demonstração; runtime fixado em 1.12.98 por bug upstream)
- [x] Lab Three.js (wireframe + point wave, sem OrbitControls)

Fase 4 concluída — as 16 bibliotecas do laboratório têm experimento
funcional. tsParticles e Three.js/Vanta isolados via
next/dynamic(ssr:false); Spline exigiu fixar @splinetool/runtime em
1.12.98 por bug de empacotamento na versão 2.x (documentado em
docs/decisions/0003-spline-runtime-pin.md).

## Fase 5 — Composição

- [x] Lenis + GSAP (gsap.ticker sincronizando lenis.raf, sem autoRaf)
- [x] GSAP + Three.js (timeline com scrub controlando câmera e rotação)
- [x] Motion + React Bits (AnimatePresence + SpotlightCard reaproveitado)
- [x] Swiper + Motion (onSlideChange alimentando legenda animada)
- [x] Lottie + Motion (onHoverStart/onHoverEnd comandando lottieRef)
- [x] tsParticles + Lenis (parallax via lenis.scroll em camada separada)
- [x] Rough Notation + GSAP (ScrollTrigger substitui IntersectionObserver)

Fase 5 concluída. As sete composições cobrem os padrões de integração
mais comuns entre bibliotecas de animação (ver fechamento em
docs/experiments/compose-rough-notation-gsap.md). Nenhuma exigiu
modificar o código dos experimentos isolados das Fases 1-4 — todas
reaproveitaram componentes/padrões já existentes.

## Fase 6 — Showcase

- [x] Definir conceito final.
- [x] Selecionar bibliotecas relevantes.
- [x] Criar experiência final.
- [x] Otimizar bundle.
- [x] Testar mobile.
- [ ] Testar acessibilidade.
- [ ] Testar reduced motion.
- [x] Auditar performance.
- [x] Revisar código.
- [x] Documentar aprendizados.
- [x] Preparar README.
- [x] Preparar projeto para portfólio.

Conceito: `/showcase`, uma narrativa de rolagem única que reaproveita
componentes já construídos (a cena da composição GSAP + Three.js, o
`Marquee` da Fase 2, o hook `useTyped`) em vez de recriar nada —
detalhes e decisões de arquitetura em `docs/experiments/showcase.md`.
Bundle: nenhuma dependência nova; toda peça pesada (Three.js, Vanta,
tsParticles, Spline) confirmada lazy via `next/dynamic(ssr:false)` em
todo experimento e composição que a usa. Código revisado via
`tsc --noEmit` e `pnpm lint` (limpos) e `pnpm build` (31 rotas
estáticas). Aprendizados consolidados em `docs/LEARNINGS.md`,
respondendo diretamente às perguntas que `docs/PROJECT_PLAN.md` definiu
como critério de conclusão.

Testar mobile: o usuário testou manualmente todos os experimentos e
composições construídos até aqui em dispositivo real; os bugs
encontrados (responsividade do showcase e do header, espaçamento em
Motion/GSAP, aviso de touch no Spline) foram corrigidos e estão
registrados nos commits `fix:` correspondentes.

Preparar para portfólio: removido o boilerplate esquecido do
`create-next-app` (5 SVGs não usados em `public/` e o `favicon.ico`
padrão). Favicon, ícone de tela inicial (iOS) e imagem de
Open Graph/Twitter Card agora são gerados via `next/og`
(`app/icon.tsx`, `app/apple-icon.tsx`, `app/opengraph-image.tsx`),
sem nenhuma dependência nova, usando os mesmos tokens de cor do design
system. `app/layout.tsx` ganhou metadata de `openGraph`/`twitter`.
**Pendência para quando o projeto for hospedado**: definir
`metadataBase` em `app/layout.tsx` com o domínio real — sem isso, o
build avisa que as imagens de compartilhamento social resolvem para
`http://localhost:3000`.

Acessibilidade com leitor de tela/teclado e `prefers-reduced-motion`
num dispositivo real continuam **não verificados formalmente** — o
código já considera os dois (`:focus-visible` global, semântica de
heading única por página, todo hook de animação checando
`prefers-reduced-motion`), mas isso é revisão de código, não teste com
tecnologia assistiva de verdade.

## Regra de execução

Não tentar executar todas as tarefas de uma vez.

Claude deve trabalhar em uma tarefa por vez, explicando o objetivo e esperando a implementação/teste correspondente antes de avançar.

## Regra de comentários

Nenhum comentário deve ser adicionado ao código em qualquer etapa.
