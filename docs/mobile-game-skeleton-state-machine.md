# FlyKey Jump Skeleton State Machine

## Runtime Scope

The local project does not include Rive, Spine, or Unity authoring tools, so the game implements the skeleton animation runtime directly in `app/mobile-game.js`.

The runtime uses the exported rig package:

- `assets/game/key-rig/parts/*.png`
- `assets/game/key-rig/metadata.json`

## Layers

Draw order:

1. Wings
2. Legs and feet
3. Body
4. Arms
5. Head
6. Eyes / expression eyes
7. Antennae

## States

- `idle`
- `turnLeft`
- `turnRight`
- `jump`
- `fall`
- `land`
- `shoot`

The player chooses the active state from motion and action signals:

- upward velocity -> `jump`
- downward velocity -> `fall`
- platform contact -> `land`
- pointer/tilt direction -> `turnLeft` / `turnRight`
- shot input -> `shoot`
- otherwise -> `idle`

## Secondary Motion

Always-on life:

- breathing scale on body and head
- antenna spring/sway
- wing flutter and hover flutter
- eye blinking
- jump stretch
- landing squash
- shooting recoil

## Blend Rules

The runtime does not switch frame sheets. It blends through transforms:

- state timers decay smoothly (`landTimer`, `shootTimer`)
- `turn` eases toward `turnIntent`
- blink amount eases back to open eyes
- body/head/wing/antenna transforms are continuous functions of velocity, turn, and timers

This keeps `idle -> jump -> fall -> land -> idle` continuous without hand-drawn frame transitions.
