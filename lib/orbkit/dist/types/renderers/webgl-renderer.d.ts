import type { BlendMode, OrbRenderer } from '../types';
/** Maps BlendMode strings to integer indices used in the GLSL shader */
export declare const BLEND_MODE_INDEX: Record<BlendMode, number>;
/** Parse hex color to [r, g, b] floats (0-1) */
export declare function hexToVec3(hex: string): [number, number, number];
/**
 * Create a WebGL renderer implementing the OrbRenderer interface.
 * Uses WebGL2 with automatic WebGL1 fallback. Falls back to Canvas 2D
 * renderer if WebGL is not available at all.
 */
export declare function createWebGLRenderer(): OrbRenderer;
//# sourceMappingURL=webgl-renderer.d.ts.map