# Experimento — Motion (Presença e Gestures)

## Objetivo

Entender o modelo declarativo de animação da Motion (sucessora da Framer
Motion): descrever estados em vez de manipular estilo diretamente, e usar
esse modelo para resolver dois problemas concretos — animar a saída de
elementos do DOM e responder a gestures do usuário.

## Biblioteca

`motion` (pacote atual no npm; `framer-motion` hoje é um alias do mesmo
pacote, mantido por compatibilidade). Instalado via `pnpm add motion`.
Importado a partir de `motion/react`.

## Conceitos utilizados

- `motion.div` / `motion.button` como wrappers animáveis de elementos HTML.
- `initial` / `animate` / `transition` para animação de entrada.
- `AnimatePresence` para animar a saída de elementos antes da remoção do
  DOM — algo que o React sozinho não permite, já que o elemento some da
  árvore antes de qualquer animação rodar.
- `whileHover`, `whileTap`, `whileFocus` para gestures diretas sem
  `onMouseEnter`/`onMouseLeave` manuais.
- `useReducedMotion` (hook nativo da biblioteca) para ler
  `prefers-reduced-motion` do sistema e desligar as animações sem remover
  a funcionalidade.

## O que foi aprendido

- A Motion assume Client Component: qualquer arquivo que use `motion.*`
  precisa de `"use client"` no topo.
- `AnimatePresence` só anima a saída de elementos que são filhos diretos
  seus no momento da desmontagem — o elemento precisa de uma `key` estável.
- `useReducedMotion` retorna `null` no primeiro render em algumas
  condições de SSR; por isso as variantes de animação foram escritas para
  aceitar `undefined` (sem animação) sem quebrar tipos.

## Limitações observadas

- Cada componente animado carrega o runtime da Motion no bundle do
  cliente — ainda pequeno, mas é custo real que cresce se a biblioteca for
  usada em excesso na aplicação inteira.
- Animações de `height: auto` (usadas no painel do `AnimatePresence`)
  dependem de medição em tempo de execução; funcionam bem aqui, mas podem
  ficar instáveis em conteúdo muito dinâmico.

## Alternativas

GSAP resolve o mesmo problema de forma imperativa e com mais controle de
timeline, mas exige mais código para casos simples de entrada/saída. Para
animações declarativas amarradas ao ciclo de vida de componentes React, a
Motion tem menos fricção.

## Quando usar

- Microinterações amarradas ao estado de componentes React (abrir/fechar,
  hover, foco).
- Animações de entrada/saída de elementos que montam e desmontam.

## Quando evitar

- Coreografia complexa de múltiplos elementos com sincronização fina de
  tempo — nesse caso GSAP com timelines tende a ser mais direto (comparar
  no experimento GSAP, ainda planejado).
