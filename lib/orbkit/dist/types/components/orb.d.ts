import { type JSX } from 'react';
import type { OrbProps } from '../types';
/**
 * Orb — An individual animated orb primitive.
 *
 * Can be used inside an OrbScene for composed backgrounds,
 * or standalone for individual orb effects. When inside an
 * OrbScene, inherits breathing/renderer from context.
 *
 * For CSS rendering: renders a `<div>` with radial-gradient, blur, and blend mode.
 * For Canvas/WebGL rendering: registers config with the scene and renders nothing
 * (the imperative renderer draws all orbs on a shared canvas).
 */
export declare function Orb({ color, position, size, blur, blendMode, wavy, drift, renderer: _renderer, interactive, className, style, }: OrbProps): JSX.Element | null;
//# sourceMappingURL=orb.d.ts.map