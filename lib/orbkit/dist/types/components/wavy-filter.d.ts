import type { JSX } from 'react';
import type { WavyConfig } from '../types';
interface WavyFilterProps {
    /** Unique filter ID for this orb */
    filterId: string;
    /** Wavy configuration */
    config: WavyConfig;
    /** Seed for deterministic noise variation */
    seed: number;
    /** Blur value in px — displacement scales up to remain visible through blur */
    blur?: number;
}
/**
 * WavyFilter — Inline SVG filter that applies organic edge distortion to an orb.
 *
 * Uses feTurbulence (Perlin noise) + feDisplacementMap to warp the orb's edges.
 * The displacement scale increases with blur so wavy edges remain visible even
 * when heavy blur is applied. Animation is via SVG <animate> — no JS, GPU-accelerated.
 */
export declare function WavyFilter({ filterId, config, seed, blur }: WavyFilterProps): JSX.Element;
export {};
//# sourceMappingURL=wavy-filter.d.ts.map