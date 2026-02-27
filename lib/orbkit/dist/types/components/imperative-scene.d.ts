import { type JSX } from 'react';
/**
 * ImperativeScene — Bridges React props to Canvas/WebGL imperative renderers.
 *
 * Rendered inside OrbScene when the renderer is 'canvas' or 'webgl'.
 * Creates the renderer instance, mounts it into its container div,
 * and syncs scene-level props (background, grain) via effects.
 * Orb configs are synced via the context registration callbacks.
 *
 * @internal Not exported from the public API.
 */
export declare function ImperativeScene({ rendererType, }: {
    rendererType: 'canvas' | 'webgl';
}): JSX.Element;
//# sourceMappingURL=imperative-scene.d.ts.map