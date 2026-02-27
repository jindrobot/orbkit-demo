/**
 * Inject a CSS @keyframes rule into the document head via a <style> tag.
 * Deduplicates by animation name. No-op during SSR.
 */
export declare function injectKeyframes(name: string, css: string): void;
/**
 * Remove a previously injected @keyframes rule from the document.
 */
export declare function removeKeyframes(name: string): void;
//# sourceMappingURL=keyframe-registry.d.ts.map