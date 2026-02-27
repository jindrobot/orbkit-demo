import type { BlendMode, OrbRenderer } from '../types';
/** Blend mode mapping: CSS mix-blend-mode → Canvas globalCompositeOperation */
export declare const BLEND_MODE_MAP: Record<BlendMode, GlobalCompositeOperation>;
/** Create a Canvas 2D renderer implementing the OrbRenderer interface */
export declare function createCanvasRenderer(): OrbRenderer;
//# sourceMappingURL=canvas-renderer.d.ts.map