import type { RendererType } from '../types';
/** @internal Reset cached detection — for testing only */
export declare function _resetDetectionCache(): void;
/**
 * Detect the best available renderer for the current environment.
 *
 * Returns CSS by default — it is the most feature-complete renderer,
 * supporting blur, wavy edges (SVG filters), interactive parallax,
 * and smooth gradient blending. Canvas and WebGL renderers are available
 * for high-orb-count scenes where DOM-based rendering becomes a bottleneck,
 * but must be explicitly opted into via `renderer="canvas"` or `renderer="webgl"`.
 *
 * The detection still validates that CSS is viable (i.e., we're in a browser),
 * falling back gracefully in edge cases.
 */
export declare function detectBestRenderer(): RendererType;
//# sourceMappingURL=detect.d.ts.map