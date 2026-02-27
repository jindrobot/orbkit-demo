import { type JSX } from 'react';
import type { OrbSceneProps } from '../types';
/**
 * OrbScene — Container and compositor for Orb components.
 *
 * Provides scene context (background, grain, breathing, renderer)
 * that child Orb components inherit from. When a `preset` is given,
 * auto-renders the preset's orbs with drift enabled. Auto-injects
 * a Grain overlay when grain > 0 (CSS renderer only — imperative
 * renderers handle grain internally). Tracks pointer position for
 * interactive orbs via CSS custom properties.
 *
 * Renderer selection:
 * - `'css'` (default): orbs are `<div>` elements with CSS gradients/animations
 * - `'canvas'`: all orbs drawn on a single `<canvas>` via Canvas 2D API
 * - `'webgl'`: all orbs rendered via WebGL fragment shader
 * - `'auto'`: auto-detect best renderer (WebGL > Canvas > CSS)
 */
export declare function OrbScene({ background, grain, breathing, preset, renderer, className, style, as, children, }: OrbSceneProps): JSX.Element;
//# sourceMappingURL=orb-scene.d.ts.map