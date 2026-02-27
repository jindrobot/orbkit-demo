import type { Preset } from '../types';
export declare const ocean: Preset;
export declare const sunset: Preset;
export declare const forest: Preset;
export declare const aurora: Preset;
export declare const minimal: Preset;
/** All built-in presets + any custom presets */
export declare const presets: Record<string, Preset>;
/**
 * Register a custom preset. Overwrites any existing preset with the same name.
 */
export declare function registerPreset(preset: Preset): void;
//# sourceMappingURL=index.d.ts.map