# Frontend Lab — Plano do Projeto

## Visão

Construir um laboratório visual de alto nível em Next.js + TypeScript para estudar e comparar bibliotecas modernas de Front-end.

O projeto terá duas funções:

1. Laboratório de aprendizado.
2. Showcase/portfólio experimental.

A prioridade é aprender a escolher e integrar ferramentas, não simplesmente acumular bibliotecas.

## Arquitetura conceitual

### Camada 1 — Scroll e controle de experiência

- Lenis

Responsabilidade:
- smooth scroll
- controle de experiência de rolagem
- integração com animações baseadas em scroll

### Camada 2 — Motores de animação

- GSAP
- Framer Motion
- Motion Primitives

Responsabilidade:
- animações
- timelines
- presença
- layout
- gestures
- microinterações

### Camada 3 — UI e componentes

- Aceternity
- Magic UI
- React Bits

Responsabilidade:
- componentes visuais
- efeitos prontos
- padrões de interface
- inspiração e comparação com implementação própria

### Camada 4 — 3D e WebGL

- Three.js
- Spline
- Vanta

Responsabilidade:
- objetos 3D
- cenas
- WebGL
- backgrounds interativos

### Camada 5 — Efeitos visuais e conteúdo animado

- Lottie
- tsParticles
- Rough Notation
- Typed

Responsabilidade:
- partículas
- animações vetoriais
- tipografia dinâmica
- destaques textuais

### Camada 6 — Sliders e carrosséis

- Swiper
- Embla

Responsabilidade:
- carrosséis
- galerias
- navegação horizontal
- comparação de APIs

## Ordem de estudo

### Fase 0 — Fundação

- arquitetura
- design system
- tipografia
- grid
- tokens
- responsividade
- acessibilidade
- performance

### Fase 1 — Motion

1. Framer Motion
2. GSAP
3. Lenis
4. Rough Notation
5. Typed

### Fase 2 — UI

6. React Bits
7. Motion Primitives
8. Magic UI
9. Aceternity

### Fase 3 — Conteúdo visual

10. Lottie
11. Swiper
12. Embla

### Fase 4 — Visual pesado

13. tsParticles
14. Vanta
15. Spline
16. Three.js

## Fase 5 — Composição

Criar experimentos usando duas ou três bibliotecas.

Exemplos:

- Lenis + GSAP
- GSAP + Three.js
- Motion + React Bits
- Swiper + Motion
- Lottie + Motion
- tsParticles + Lenis
- Rough Notation + GSAP

O objetivo é estudar integração e conflitos.

## Fase 6 — Showcase

Criar uma experiência final utilizando apenas as ferramentas que realmente fizeram sentido.

Não existe obrigação de usar todas as bibliotecas no produto final.

## Estrutura sugerida

```text
app/
  page.tsx
  lab/
    gsap/
    lenis/
    motion/
    three/
    lottie/
    spline/
    particles/
    swiper/
    embla/
  showcase/

components/
  ui/
  animation/
  3d/
  effects/
  navigation/

experiments/
  gsap/
  motion/
  three/

docs/

CLAUDE.md
PROJECT_PLAN.md
LIBRARY_MATRIX.md
DESIGN_DIRECTION.md
```

## Regra de isolamento

Cada biblioteca deve possuir pelo menos um experimento isolado antes de ser utilizada em composição.

Não começar com uma mega seção usando 8 bibliotecas.

## Resultado esperado

Ao terminar, o usuário deverá conseguir explicar:

- qual biblioteca escolher para cada problema
- quando GSAP é melhor que Motion
- quando usar Lenis
- quando Three.js é necessário
- quando Spline é suficiente
- quando um componente pronto deve ser evitado
- diferenças entre Swiper e Embla
- impactos de animação no desempenho
- como integrar bibliotecas client-side ao modelo Server/Client do Next.js
