import type { OrbProps } from '../types';
/** CSS for a single orb's radial gradient */
export declare function generateOrbCSS(point: {
    color: string;
    position: [number, number];
    radius: number;
}, saturation: number): string;
/** Generate the full CSS background string for a theme */
export declare function generateGradientCSS(points: Array<{
    color: string;
    position: [number, number];
    radius: number;
}>, saturation: number): string;
/** Map grain intensity (0-100) to canvas opacity (0-0.5) */
export declare function generateGrainIntensity(grain: number): number;
/** Generate a unique keyframe animation for an orb */
export declare function generateOrbAnimation(_props: OrbProps, index: number, breathing: number): {
    keyframeCSS: string;
    animationName: string;
    duration: number;
    delay: number;
};
//# sourceMappingURL=css-renderer.d.ts.map