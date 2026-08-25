# Ideias de experimento

Backlog de composições e experimentos que ainda não foram construídos.
Sem compromisso de prazo — a lista cresce conforme surgem ideias.
Nenhuma delas exige adicionar biblioteca nova; são todas recombinações
ou ângulos diferentes das 16 já presentes no laboratório.

Ao mover uma ideia daqui para o código: criar a composição, o doc em
`docs/experiments/`, a entrada em `data/compositions.ts`, e marcar como
feita abaixo (com link para o doc).

## Feitas

- [x] **Lenis + Three.js — câmera por scroll direto.** `lenis.progress`
  move a câmera sem GSAP no meio — pergunta se o intermediário da
  composição GSAP + Three.js era necessário. Ver
  `docs/experiments/compose-lenis-three.md`.

## Backlog

- [ ] **Embla + Rough Notation.** Legenda do slide ativo ganha uma
  anotação desenhada à mão, sincronizada pelo evento `select` do Embla.
  Espelha a composição Swiper + Motion, mas troca as duas peças —
  revela diferença de DX entre Swiper e Embla quando quem consome os
  eventos é uma biblioteca de anotação, não Motion.
- [ ] **Vanta + Motion.** Um `motion.div` com `whileHover`/gesture
  muda uma opção do efeito Vanta em tempo real (cor, velocidade).
  Testa se dá pra tratar as opções do Vanta como um alvo de animação
  declarativa, não só configuração estática de inicialização.
- [ ] **tsParticles + Typed.js.** Cada caractere digitado dispara uma
  rajada de partículas. Duas bibliotecas sem nenhuma relação de
  scroll/gesture entre si, sincronizadas só por um evento de DOM
  (`onStringTyped` do Typed.js) — ângulo diferente das composições
  atuais, que são quase todas scroll-driven.
- [ ] **Spline + GSAP.** GSAP anima `object.rotation` de um objeto de
  uma cena Spline, em vez de uma cena Three.js pura. Mede quanto do
  padrão da composição GSAP + Three.js transfere para uma cena
  desenhada visualmente em vez de escrita em código.
