# FlyKey Jump Character Rig

## Goal

The player character must turn around the vertical Y axis when moving left or right.
This is not a 2D tilt, not a mirrored front sprite, and not a scale trick.

## Required Visual States

- `front`: neutral/front-facing body.
- `left`: clear three-quarter turn to the left.
- `side-left`: clear left profile with one dominant eye and narrowed body.
- `right`: clear three-quarter turn to the right.
- `side-right`: clear right profile with one dominant eye and narrowed body.

## Layered Parts

- Body pose sprites carry the actual Y-axis turn.
- Wings remain separate sprites and adjust opacity/scale by body turn.
- Antennae remain separate sprites and sway while following body turn.
- Shadow remains separate and changes opacity during jump/fall.

## Code Contract

- Direction must be based on control intent: target pointer/tilt position relative to the player.
- The turn must persist while the player is being steered in that direction.
- The body sprite is selected from the current turn value:
  - strong negative: `side-left`
  - weak negative: `left`
  - neutral: `front`
  - weak positive: `right`
  - strong positive: `side-right`
- `scaleX(-1)` must not be used as the main turn behavior.
