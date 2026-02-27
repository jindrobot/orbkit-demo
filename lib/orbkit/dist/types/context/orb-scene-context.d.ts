import { type RefObject } from 'react';
import type { OrbSceneContextValue, RendererType } from '../types';
declare const OrbSceneContext: import("react").Context<OrbSceneContextValue | null>;
export { OrbSceneContext };
/**
 * Read scene context values. Returns null when used outside an OrbScene
 * (standalone orb usage is valid — callers should handle null).
 */
export declare function useOrbSceneContext(): OrbSceneContextValue | null;
/**
 * Hook used inside OrbScene to create the context value with a stable
 * monotonic orb index counter and orb config registration for imperative renderers.
 */
export declare function useOrbSceneProvider({ background, grain, breathing, renderer, saturation, containerRef, }: {
    background: string;
    grain: number;
    breathing: number;
    renderer: RendererType;
    saturation: number;
    containerRef: RefObject<HTMLElement | null>;
}): OrbSceneContextValue;
//# sourceMappingURL=orb-scene-context.d.ts.map