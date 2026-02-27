import type { OrbitParams } from '../types';
/**
 * Calculate orbit parameters for a drift animation.
 * Each orb gets a deterministic elliptical path based on its position.
 *
 * @param x - Normalized x position (0-1)
 * @param y - Normalized y position (0-1)
 * @param index - Orb index in the scene (affects duration/delay)
 * @param breathing - Global animation intensity 0-100
 */
export declare function getOrbitParams(x: number, y: number, index: number, breathing: number): OrbitParams;
/**
 * Generate CSS keyframe values for an elliptical drift orbit.
 *
 * Returns an array of 9 keyframe stops (0% through 100%)
 * using the 8-step elliptical path from the source implementation.
 */
export declare function generateDriftKeyframes(amplitudeX: number, amplitudeY: number): Array<{
    offset: number;
    transform: string;
}>;
/**
 * Calculate the drift offset for a given time (frame-based, for canvas/webgl).
 * Uses the same elliptical path as CSS keyframes but evaluated per-frame.
 *
 * @param params - Pre-computed orbit parameters
 * @param timeMs - Current time in milliseconds (e.g. from rAF)
 * @returns Normalized x/y offset (percentage / 100)
 */
export declare function calculateDriftOffset(params: OrbitParams, timeMs: number): {
    x: number;
    y: number;
};
/**
 * Generate a CSS @keyframes string for an elliptical drift orbit.
 */
export declare function generateDriftKeyframeCSS(name: string, ax: number, ay: number): string;
//# sourceMappingURL=animation.d.ts.map