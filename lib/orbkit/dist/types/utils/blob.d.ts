/**
 * Generate CSS @keyframes for a blob morph animation.
 * Each orb gets a unique, deterministic morph based on its seed.
 * Returns the animation name and CSS keyframe text.
 */
export declare function generateBlobMorphKeyframes(seed: number, speed: number): {
    animationName: string;
    keyframeCSS: string;
    duration: number;
};
//# sourceMappingURL=blob.d.ts.map